---
name: build-step-by-step
description: Execute a demo-first project plan one small verified step at a time. Use when building from an MVP plan, when the user says to implement step by step, or when a beginner needs controlled AI coding without scope creep.
---

# Build Step By Step

Build only the next useful slice. Do not jump ahead.

## Workflow

1. Read the current plan or summarize the user's requested next step.
2. State the single step you will execute now.
3. Make the smallest code or document changes needed for that step.
4. Run the planned verification command, or provide a manual check if no command exists.
5. Report the result, changed files, and the next step.

## Guardrails

- Do not add unplanned frameworks, services, databases, auth, payments, or deployment.
- Do not rewrite the whole project when one small change works.
- If a step is too large, split it into smaller visible slices.
- If verification fails, switch to `fix-error-safely` before continuing.
- Keep the demo usable at the end of every step.

## Do not use when

- There is no agreed plan or no clear next step to execute.
- The task is mainly diagnosis of a failing command or broken behavior.

## Progress report format

```md
## Step completed
[one sentence]

## Changed files
- `path`: [what changed]

## Verification
- Command/check: `[command or manual check]`
- Result: [pass/fail and short evidence]

## Next step
[next single step]
```

## Example

**Input**: "Use the plan and only build the landing page shell first."

**Expected output shape**:

```md
## Step completed
Created the landing page shell with headline, CTA, and placeholder sections.

## Changed files
- `src/App.tsx`: replaced starter content with the landing page shell.

## Verification
- Command/check: `npm run build`
- Result: pass, production build completed.

## Next step
Add the first interactive form section.
```
