# Vibe Coding Driving School Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a small hackathon-ready package that installs Claude/Codex-compatible skills for beginner-friendly vibe coding.

**Architecture:** Use a zero-dependency Node installer to copy a shared `skills/` pack into Claude and Codex skill locations. Keep the product explainable through README, a static demo page, and an example generated plan.

**Tech Stack:** Node.js ESM for installer/validation, Markdown `SKILL.md` files for agent skills, static HTML/CSS/JS for the silent demo.

---

## File Map

- `package.json`: npm metadata and runnable scripts.
- `install.mjs`: zero-dependency installer with `--target`, `--project`, and `--dry-run` options.
- `scripts/validate.mjs`: repository validation for required files and skill frontmatter.
- `skills/*/SKILL.md`: four Claude/Codex-compatible beginner workflow skills.
- `templates/AGENTS.md`: optional project guidance copied during install.
- `examples/beginner-demo-plan.md`: sample output showing the product promise.
- `demo/index.html`: no-speech demo page for judges.
- `README.md`: install, demo, and positioning.

## Tasks

### Task 1: Project skeleton

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `docs/superpowers/plans/2026-05-02-vibe-coding-driving-school.md`

- [x] Create package metadata and scripts.
- [x] Add lightweight gitignore.
- [x] Save this implementation plan.

### Task 2: Skill pack

**Files:**
- Create: `skills/choose-stack/SKILL.md`
- Create: `skills/start-project/SKILL.md`
- Create: `skills/build-step-by-step/SKILL.md`
- Create: `skills/fix-error-safely/SKILL.md`

- [ ] Write concise frontmatter with `name` and `description`.
- [ ] Keep each skill focused on one job.
- [ ] Encode display-first stack recommendations and demo-first planning.

### Task 3: Installer

**Files:**
- Create: `install.mjs`
- Create: `templates/AGENTS.md`

- [ ] Implement copy logic for `.claude/skills`, `.codex/skills`, and `.agents/skills`.
- [ ] Support project-local install by default.
- [ ] Support `--target claude|codex|both|agents|all` and `--dry-run`.
- [ ] Copy beginner `AGENTS.md` unless one exists.

### Task 4: Demo and docs

**Files:**
- Create: `README.md`
- Create: `demo/index.html`
- Create: `examples/beginner-demo-plan.md`

- [ ] Explain the product without requiring speech.
- [ ] Show before/after behavior.
- [ ] Include one copy-paste prompt for users.

### Task 5: Validation

**Files:**
- Create: `scripts/validate.mjs`

- [ ] Check each skill has valid frontmatter.
- [ ] Check required demo/docs files exist.
- [ ] Run `node scripts/validate.mjs`.
- [ ] Run `node install.mjs --dry-run --target all --project /tmp/vibe-driving-school-test`.
