---
name: choose-stack
description: Recommend a beginner-friendly language and tech stack from the user's idea and desired demo surface. Use when a user asks what to build with, starts a new vibe-coding project, has a vague app idea, or needs the fastest path to show a working demo.
---

# Choose Stack

Help the user choose the fastest stack for a visible demo. Optimize for what the user wants to show, not for novelty.

## Workflow

1. Ask one question if the demo surface is unclear: "What do you want people to see first: a web page, a tool/installer, a CLI, a data result, an API, or something else?"
2. Recommend one primary stack and one fallback only if useful.
3. Explain the recommendation in plain language.
4. State what not to use for this MVP.
5. Hand off to `start-project` when the user wants a plan.

## Default stack map

| Demo goal | Default stack | Why |
|---|---|---|
| Website, landing page, dashboard, form, visual app | TypeScript + Vite + React | Fastest visible feedback in browser |
| Small tool, installer, project generator, local automation | Node.js | Easy to run, package, and install |
| CLI, lightweight service, distributable binary | Go | Stable, simple deployment, single binary |
| Data cleanup, batch script, glue automation | Python | Good for scripts and data tasks |
| Performance core, local systems module | Rust | Use only when performance or safety is central |
| Mobile demo | Responsive web first | Avoid native app overhead |
| Desktop demo | Web first | Avoid Electron unless desktop APIs are required |

## Defaults

- If there is no existing stack, prefer TypeScript/Node.
- For hackathons, prefer the shortest path to a visible demo.
- Do not pick Python as the main product stack unless the work is clearly data/script-heavy.
- Do not pick Rust for beginners unless there is a real performance or systems reason.
- Avoid adding databases, auth, queues, or cloud services unless the demo cannot work without them.

## Do not use when

- The project already has a committed stack and the user wants implementation inside it.
- The user is asking for architecture, folder structure, or execution steps rather than stack choice.

## Output format

```md
## Recommended stack
[stack]

## Why this fits the demo
- [reason 1]
- [reason 2]

## Avoid for MVP
- [technology or feature]: [reason]

## Next step
Use `start-project` to turn this into a small execution plan.
```

## Example

**Input**: "I want a weekend demo where people upload a CSV and see a clean summary page."

**Expected output shape**:

```md
## Recommended stack
TypeScript + Vite + React

## Why this fits the demo
- Browser UI is the thing people will see first.
- CSV parsing and a simple summary are easy to demo locally.

## Avoid for MVP
- Database: keep uploads local and temporary for the first demo.

## Next step
Use `start-project` to turn this into a small execution plan.
```
