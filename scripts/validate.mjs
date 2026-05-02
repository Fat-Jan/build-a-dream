#!/usr/bin/env node
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const moduleFile = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(moduleFile), '..');
// 最小交付物检查：这些文件缺任何一个，黑客松展示都会断一环。
const requiredFiles = [
  'README.md',
  'install.mjs',
  'demo/index.html',
  'examples/beginner-demo-plan.md',
  'templates/AGENTS.md',
  'package.json'
];
const expectedSkills = ['build-step-by-step', 'choose-stack', 'fix-error-safely', 'start-project'];
const placeholderPattern = /\b(?:TODO|TBD)\b|fill in/i;

// 返回错误列表而不是直接退出，方便安装器复用同一套校验逻辑。
export async function collectValidationErrors(options = {}) {
  const rootDir = options.rootDir ?? root;
  const files = options.requiredFiles ?? requiredFiles;
  const skills = options.expectedSkills ?? expectedSkills;
  const errors = [];

  for (const file of files) {
    await requireFile(rootDir, file, errors);
  }

  const skillErrors = await validateSkillsDirectory(path.join(rootDir, 'skills'), { expectedSkills: skills });
  errors.push(...skillErrors);
  return errors;
}

// 校验每个 skill 的基本格式，确保 Claude/Codex 能读到 name 和 description。
export async function validateSkillsDirectory(skillsDir, options = {}) {
  const errors = [];
  let entries = [];

  try {
    entries = await readdir(skillsDir, { withFileTypes: true });
  } catch {
    errors.push(`${path.relative(root, skillsDir) || 'skills'} directory is missing`);
    return errors;
  }

  const skillDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const skill of options.expectedSkills ?? []) {
    if (!skillDirs.includes(skill)) {
      errors.push(`${relativeFromRoot(path.join(skillsDir, skill))} is missing`);
    }
  }

  for (const skill of skillDirs) {
    errors.push(...(await validateSkillDirectory(skillsDir, skill)));
  }

  return errors;
}

async function validateSkillDirectory(skillsDir, skill) {
  const errors = [];
  const skillFile = path.join(skillsDir, skill, 'SKILL.md');
  let content = '';

  try {
    content = await readFile(skillFile, 'utf8');
  } catch {
    errors.push(`${relativeFromRoot(skillFile)} is missing`);
    return errors;
  }

  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    errors.push(`${relativeFromRoot(skillFile)} has no YAML frontmatter`);
    return errors;
  }

  const name = getField(frontmatter, 'name');
  const description = getField(frontmatter, 'description');

  if (!name) {
    errors.push(`${relativeFromRoot(skillFile)} is missing frontmatter name`);
  } else if (name !== skill) {
    errors.push(`${relativeFromRoot(skillFile)} name must be "${skill}"`);
  }

  if (!description) {
    errors.push(`${relativeFromRoot(skillFile)} is missing frontmatter description`);
  }

  if (placeholderPattern.test(content)) {
    errors.push(`${relativeFromRoot(skillFile)} contains placeholder text`);
  }

  return errors;
}

async function requireFile(rootDir, relativePath, errors) {
  const file = path.join(rootDir, relativePath);
  try {
    await access(file, constants.R_OK);
    const info = await stat(file);
    if (!info.isFile()) {
      errors.push(`${relativePath} is not a file`);
    }
  } catch {
    errors.push(`${relativePath} is missing`);
  }
}

// 这里只做轻量 frontmatter 解析，保持零依赖、启动快。
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return match ? match[1] : '';
}

function getField(frontmatter, field) {
  const pattern = new RegExp(`^${field}:\\s*(.+)$`, 'm');
  const match = frontmatter.match(pattern);
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

function relativeFromRoot(file) {
  return path.relative(root, file) || file;
}

async function runCli() {
  const errors = await collectValidationErrors();

  if (errors.length > 0) {
    console.error('Validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Validation passed.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === moduleFile) {
  await runCli();
}
