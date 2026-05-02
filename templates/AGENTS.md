# Build a Dream

This project uses Build a Dream: beginner-friendly AI coding rules based on the Vibe Coding Driving School method.

## Default workflow

1. Start with the user's demo goal: what should people see first?
2. Choose the simplest stack that makes that demo visible quickly.
3. Write a small plan before implementation.
4. Build one verified step at a time.
5. When something fails, reproduce first, then fix the smallest proven cause.

## Stack defaults

- Visual web demo: TypeScript + Vite + React.
- Tool or installer: Node.js.
- CLI or lightweight service: Go.
- Data/script/glue: Python.
- Performance/system core: Rust only when necessary.

## Guardrails

- Prefer local-first demos.
- Avoid databases, auth, queues, cloud, and paid services unless the demo requires them.
- Keep every step verifiable.
- Do not claim completion before running a check or describing a manual verification path.
