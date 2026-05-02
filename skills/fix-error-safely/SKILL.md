---
name: fix-error-safely
description: Diagnose and fix errors without random trial-and-error. Use when tests fail, a command errors, a demo does not run, or the user reports broken behavior during vibe coding.
---

# Fix Error Safely

Fix the smallest proven cause. Do not guess repeatedly.

## Workflow

1. Capture the exact failing command, the exact error line or command output, and the expected behavior.
2. Reproduce the failure with the smallest command or manual action.
3. Quote the precise failing line or output snippet you are using as evidence before naming a root cause.
4. Identify the likely root cause from that evidence.
5. Make the smallest fix.
6. Re-run the same failing check.
7. If it passes, run one nearby regression check if available.
8. Report root cause, fix, and verification evidence.

## Guardrails

- Do not hide errors by deleting tests or weakening checks.
- Do not introduce a new dependency unless the current stack cannot solve the issue.
- Do not make broad rewrites while debugging.
- Every diagnosis must cite the exact failing command output or error line it is based on.
- If the root cause is unclear after two attempts, stop and narrow the reproduction.

## Do not use when

- The task is a planned feature build with no failure evidence yet.
- The issue is a broad product redesign rather than a concrete failing command or behavior.

## Output format

```md
## Root cause
[short evidence-based cause, with the quoted error line or output]

## Fix
[what changed]

## Verification
- Failing check before: `[command]` -> [failure summary]
- Same check after: `[command]` -> [pass summary]
```

## Example

**Input**: "`npm test` fails with `Cannot find module './config'` after I renamed a file."

**Expected output shape**:

```md
## Root cause
`npm test` reported `Cannot find module './config'`, which points to an import path that no longer matches the renamed file.

## Fix
Updated the stale import to the current file name.

## Verification
- Failing check before: `npm test` -> failed with `Cannot find module './config'`
- Same check after: `npm test` -> passed
```
