#!/usr/bin/env node
import { copyFile, mkdir, readdir, stat, access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { validateSkillsDirectory } from './scripts/validate.mjs';

// 用 fileURLToPath 兼容带空格、中文路径和 Windows 路径。
const root = path.dirname(fileURLToPath(import.meta.url));
const skillSource = path.join(root, 'skills');
const templateAgents = path.join(root, 'templates', 'AGENTS.md');
// 不同 AI 工具会从不同目录读取技能，这里统一映射安装位置。
const targetMap = {
  claude: ['.claude/skills'],
  codex: ['.codex/skills'],
  agents: ['.agents/skills'],
  both: ['.claude/skills', '.codex/skills'],
  all: ['.claude/skills', '.codex/skills', '.agents/skills']
};
const flagOptions = new Set(['dry-run', 'force', 'help', 'h']);
const valueOptions = new Set(['project', 'target']);

let args;
try {
  args = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(`Argument error: ${error.message}`);
  printHelp();
  process.exit(1);
}

if (args.help || args.h) {
  printHelp();
  process.exit(0);
}

const projectDir = path.resolve(args.project ?? process.cwd());
const target = args.target ?? 'all';
const dryRun = Boolean(args['dry-run']);
const force = Boolean(args.force);

if (!targetMap[target]) {
  console.error(`Unknown target: ${target}`);
  printHelp();
  process.exit(1);
}

main().catch((error) => {
  console.error(`Install failed: ${error.message}`);
  process.exit(1);
});

async function main() {
  // 先校验本地技能包，避免把坏的 SKILL.md 安装到用户项目里。
  const validationErrors = await validateSkillsDirectory(skillSource);
  if (validationErrors.length > 0) {
    throw new Error(`Local skills validation failed:\n- ${validationErrors.join('\n- ')}`);
  }

  const skills = await listSkillDirs(skillSource);
  if (skills.length === 0) {
    throw new Error('No skills found in ./skills');
  }

  console.log('Build a Dream installer');
  console.log(`Project: ${projectDir}`);
  console.log(`Target: ${target}`);
  if (dryRun) {
    console.log('Mode: dry run');
  }
  if (force) {
    console.log('Overwrite mode: force');
  }

  for (const relativeTarget of targetMap[target]) {
    const targetRoot = path.join(projectDir, relativeTarget);
    await ensureDir(targetRoot);
    for (const skill of skills) {
      const from = path.join(skillSource, skill);
      const to = path.join(targetRoot, skill);
      await installSkill(from, to, projectDir, skill);
    }
  }

  await installAgentsTemplate(projectDir);

  console.log('\nDone. Try this prompt in Claude or Codex:');
  console.log('Use the start-project skill to turn this idea into a small demo-first plan: [your idea].');
  console.log('Codex users can also mention $start-project if skill mentions are enabled.');
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '-h') {
      parsed.h = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const option = arg.slice(2);
    const eqIndex = option.indexOf('=');
    const key = eqIndex >= 0 ? option.slice(0, eqIndex) : option;
    const inlineValue = eqIndex >= 0 ? option.slice(eqIndex + 1) : undefined;

    if (flagOptions.has(key)) {
      if (inlineValue !== undefined && inlineValue !== '') {
        throw new Error(`--${key} does not take a value`);
      }
      parsed[key] = true;
      continue;
    }

    if (!valueOptions.has(key)) {
      throw new Error(`Unknown option: --${key}`);
    }

    if (inlineValue !== undefined) {
      if (inlineValue === '') {
        throw new Error(`--${key} requires a value`);
      }
      parsed[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith('-')) {
      throw new Error(`--${key} requires a value`);
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: node install.mjs [options]

Options:
  --project <path>       Project folder to install into. Defaults to current directory.
  --target <target>      claude | codex | agents | both | all. Defaults to all.
  --dry-run              Print actions without writing files.
  --force                Overwrite existing installed skill files.
  --help                 Show this help.

Examples:
  node install.mjs
  node install.mjs --target both
  node install.mjs --project ./my-demo --target all --dry-run
  node install.mjs --target codex --force`);
}

async function listSkillDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function ensureDir(dir) {
  if (dryRun) {
    return;
  }
  await mkdir(dir, { recursive: true });
}

// 默认不覆盖已有技能；只有显式 --force 才覆盖，保护新手已有文件。
async function installSkill(from, to, project, skill) {
  const relativeDestination = path.relative(project, to);
  const existing = await skillExists(to);

  if (existing && !force) {
    console.log(`${dryRun ? 'Would skip existing' : 'Skipped existing'} ${skill} -> ${relativeDestination}`);
    return;
  }

  if (dryRun) {
    console.log(`${existing ? 'Would overwrite existing' : 'Would install'} ${skill} -> ${relativeDestination}`);
    return;
  }

  await copyDir(from, to);
  console.log(`${existing ? 'Overwrote existing' : 'Installed'} ${skill} -> ${relativeDestination}`);
}

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(from, entry.name);
    const destination = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(source, destination);
    } else if (entry.isFile()) {
      await copyFile(source, destination);
    }
  }
}

// AGENTS.md 是项目规则入口；如果用户已有规则文件，就只提示跳过。
async function installAgentsTemplate(project) {
  const destination = path.join(project, 'AGENTS.md');
  const exists = await pathExists(destination);
  if (exists) {
    console.log(`${dryRun ? 'Would skip existing' : 'Skipped existing'} AGENTS.md`);
    return;
  }

  if (!dryRun) {
    await mkdir(project, { recursive: true });
    const content = await readFile(templateAgents, 'utf8');
    if (!content.includes('Build a Dream')) {
      throw new Error('Template AGENTS.md looks invalid.');
    }
    await copyFile(templateAgents, destination);
  }

  console.log(`${dryRun ? 'Would install' : 'Installed'} AGENTS.md`);
}

async function skillExists(targetDir) {
  if (await pathExists(targetDir)) {
    return true;
  }
  return pathExists(path.join(targetDir, 'SKILL.md'));
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, constants.F_OK);
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}
