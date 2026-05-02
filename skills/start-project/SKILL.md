---
name: start-project
description: Turn a beginner's rough product idea into a small, demo-ready project plan. Use when the user has a vague idea, wants to vibe code a new project, needs an MVP scope, or needs an AI-executable plan before implementation.
---

# Start Project

Turn a vague idea into a small plan an AI coding agent can execute safely.

## Principle

The first goal is a working demo, not a complete product. Prefer small, visible, testable slices.

## Workflow

1. Summarize the user's idea in one sentence.
2. Identify the demo surface: what the audience should see first.
3. If stack is undecided, use `choose-stack` first.
4. Define the MVP in 3 to 5 bullets.
5. Define what is explicitly out of scope.
6. Break the work into steps where every step creates visible or verifiable progress.
7. Include a verification command or manual check for every step.
8. End with the exact first prompt the user can paste into Claude or Codex.

## Planning rules

- Ask at most one clarifying question before planning. If a reasonable assumption exists, state it and continue.
- Prefer local-first demos over cloud deployments.
- Prefer static data over databases for first demos.
- Prefer one-page demos over multi-screen apps.
- Add auth only when the user is specifically demonstrating auth.
- Keep names and file paths concrete enough for another agent to execute.

## Do not use when

- The user only wants stack selection; use `choose-stack` first.
- A detailed implementation plan already exists and the next task is to execute one step.

## Output format

```md
# Demo-first plan: [project name]

## Idea
[one sentence]

## What people should see
[demo surface]

## Recommended stack
[stack and short reason]

## MVP scope
- [feature 1]
- [feature 2]
- [feature 3]

## Not in this demo
- [excluded item and why]

## Build steps
1. [step]  
   Verify: [command or manual check]
2. [step]  
   Verify: [command or manual check]
3. [step]  
   Verify: [command or manual check]

## First prompt to paste
`Use this plan. Build step 1 only, then stop and show me how to verify it.`
```

## Example

**Before**: "Make me a simple app that helps roommates split bills."

**After**:

```md
# Demo-first plan: roommate-bill-splitter

## Idea
A small web app that lets roommates enter shared costs and see who owes what.

## What people should see
A single page where costs are entered and totals update immediately.

## Recommended stack
TypeScript + Vite + React for the fastest visible local demo.

## MVP scope
- Add roommate names and shared expenses.
- Show per-person totals instantly.
- Keep data in memory for the first demo.

## Not in this demo
- Login: not needed for a local first pass.

## Build steps
1. Scaffold the app shell and input form.  
   Verify: `npm run dev`
```
