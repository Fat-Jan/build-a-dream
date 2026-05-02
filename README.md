# Build a Dream（把想法变成能展示的 Demo）

**一句话：Build a Dream 帮 0 基础新手把一个模糊梦想，变成「先能展示」的技术栈推荐和 AI 可执行计划。**

每个小作品一开始都像一个梦：想法很激动，但不知道从哪里开始。Build a Dream 做的事，就是把这个梦拆成 AI 能一步步执行的路线：先确定要展示什么，再选择最省力的技术栈，最后生成可验证的 Demo 计划。

它内置一套给 Claude / Codex 使用的技能包。你不需要先学一堆编程概念，只需要先回答四个简单问题：

1. 你想让别人先看到什么？
2. 用什么技术栈最快做出可展示 Demo？
3. 第一版只做哪些功能？
4. AI 下一步应该怎么做、怎么验证？

> 核心原则：**Dream → visible demo → stack → verified plan**（梦想/想法 → 可见 Demo → 技术栈 → 可验证计划）。

名字里的 `dream`（梦想）不是大而空的愿望，而是任何一句“我想做一个……”的开始。这个项目帮你把它变成今天就能展示的第一版。

---

## 适合谁

- 0 基础或刚入门，想用 AI 做一个小作品的人。
- 黑客松参赛者，需要快速做出能展示的 Demo。
- 经常对 AI 说“帮我做个 app”，然后项目越做越乱的人。
- Claude / Codex 用户，希望 AI 一步一步做、每一步都能验证。

## 不适合谁

- 已经有完整工程团队、架构设计和技术路线的大项目。
- 想要大型 prompt 库，而不是一个新手引导流程的人。
- 一开始就必须做复杂后端、账号系统、支付、上云部署的项目。

---

## 它怎么帮你 Build a Dream

安装后，你的项目里会多出 4 个技能，像一套“AI 新手导航”：

| 技能 | 作用 | 适合什么时候用 |
|---|---|---|
| `choose-stack` | 根据“想展示什么”推荐技术栈 | 不知道该用什么语言/框架 |
| `start-project` | 把一句想法变成小范围 Demo 计划 | 刚开始一个项目 |
| `build-step-by-step` | 让 AI 一次只做一个可验证步骤 | 开始实现时 |
| `fix-error-safely` | 报错后先复现，再修最小问题 | 跑不起来、测试失败、页面坏了 |

---

## 0 基础怎么用

### 第 1 步：准备

你只需要会打开终端，并且电脑里有 Node.js。

可以先检查：

```bash
node --version
```

如果能看到版本号，比如 `v20.x` 或 `v24.x`，就可以继续。

### 第 2 步：安装技能

在这个项目文件夹里运行：

```bash
node install.mjs
```

如果你想先看看它会安装到哪里，但不真的写入文件：

```bash
node install.mjs --dry-run --target all
```

如果你要安装到另一个项目里：

```bash
node install.mjs --project ../my-demo --target all
```

### 第 3 步：打开 Claude 或 Codex

进入你要做作品的项目文件夹，然后打开 Claude / Codex。

把下面这句话粘进去：

```text
Use the start-project skill to turn this idea into a small demo-first plan: a habit tracker for students.
```

中文也可以：

```text
使用 start-project 技能，把这个想法变成一个优先能展示的 Demo 计划：给学生用的习惯打卡工具。
```

> Codex 用户如果支持技能提及，也可以写 `$start-project`。

### 第 4 步：让 AI 一步一步做

拿到计划后，再粘这句：

```text
Use the build-step-by-step skill. Build step 1 only, then stop and tell me how to verify it.
```

中文版本：

```text
使用 build-step-by-step 技能。只做第 1 步，做完停下，并告诉我怎么验证。
```

如果报错，粘这句：

```text
Use the fix-error-safely skill. Reproduce the problem, fix the smallest cause, and verify again.
```

中文版本：

```text
使用 fix-error-safely 技能。先复现问题，再修最小原因，最后重新验证。
```

---

## 技术栈推荐规则

这套技能不会一上来问“你想用什么语言”，而是先问：**你想最快展示什么？**

| 你想展示的东西 | 默认推荐 | 为什么 |
|---|---|---|
| 网页、作品页、Dashboard、表单 | TypeScript + Vite + React | 浏览器里最快看到效果 |
| 小工具、安装器、脚手架 | Node.js | 容易运行，容易打包 |
| CLI、轻量服务、可分发工具 | Go | 稳定，容易做成单文件工具 |
| 数据处理、批量脚本、临时自动化 | Python | 适合脚本和数据处理 |
| 性能核心、本地底层模块 | Rust | 只在确实需要性能/底层能力时使用 |
| 手机展示 | 先做响应式网页 | 不先做原生 App，节省时间 |
| 桌面展示 | 先做网页 | 不先上 Electron，避免过度工程 |

---

## 60 秒无声演示路径

如果你要交黑客松，没法现场讲太多，可以这样展示：

1. 打开 `demo/index.html`。
2. 指给评委看这一句：`Dream → visible demo → stack → verified plan`。
3. 展示 4 个卡片：`choose-stack`、`start-project`、`build-step-by-step`、`fix-error-safely`。
4. 滚到 Before / After 对比。
5. 打开 `examples/beginner-demo-plan.md`，展示 AI 最终应该产出的计划长什么样。

---

## 安装目标说明

默认 `node install.mjs` 会安装到 3 个位置，方便不同工具读取：

| target | 安装位置 | 说明 |
|---|---|---|
| `claude` | `.claude/skills` | Claude 使用 |
| `codex` | `.codex/skills` | Codex 使用 |
| `agents` | `.agents/skills` | 通用 agent / Codex 风格技能目录 |
| `both` | `.claude/skills` + `.codex/skills` | 同时给 Claude 和 Codex |
| `all` | 上面 3 个都装 | 默认选项 |

常用命令：

```bash
node install.mjs --target claude
node install.mjs --target codex
node install.mjs --target all
```

如果目标位置已经有同名技能，默认会跳过，避免覆盖你的文件。

如果你确认要覆盖：

```bash
node install.mjs --force
```

---

## 安装后怎么检查

运行：

```bash
node scripts/validate.mjs
```

看到下面这句就说明项目文件结构没问题：

```text
Validation passed.
```

也可以检查目标项目里是否出现这些文件夹：

```text
.claude/skills/start-project
.codex/skills/start-project
.agents/skills/start-project
```

---

## 示例输出

可以打开：

```text
examples/beginner-demo-plan.md
```

里面展示了一个“学生习惯打卡工具”的 Demo 计划，包括：

- 作品想法
- 想让别人先看到什么
- 推荐技术栈
- MVP 范围
- 不做什么
- 每一步怎么验证

---

## 黑客松 pitch

**Build a Dream：把一句模糊的梦想，变成 Claude / Codex 能照着执行的 Demo 路线图。**

它先问“你想让别人看到什么”，再推荐最合适的技术栈，最后把项目拆成一步一步可验证的执行计划。

更短的英文版：

**Build a Dream turns a rough idea into a visible demo plan: choose what people should see first, pick the simplest stack, and build one verified step at a time.**

---

# English Version

## What is this?

Build a Dream is a Claude/Codex skill pack for beginners. It turns a rough dream or product idea into a display-first stack recommendation and a step-by-step plan an AI coding agent can execute.

Core flow:

**Dream → visible demo → stack → verified plan**

## Who is it for?

- Beginners building their first AI-assisted demo.
- Hackathon teams that need a visible MVP quickly.
- People who tend to overbuild before they can show anything.
- Claude or Codex users who want controlled, step-by-step execution.

## Quick start

Install from this folder:

```bash
node install.mjs
```

Preview without writing files:

```bash
node install.mjs --dry-run --target all
```

Install into another project:

```bash
node install.mjs --project ../my-demo --target all
```

Then open Claude or Codex in your project and paste:

```text
Use the start-project skill to turn this idea into a small demo-first plan: a habit tracker for students.
```

Then continue with:

```text
Use the build-step-by-step skill. Build step 1 only, then stop and tell me how to verify it.
```

If something breaks:

```text
Use the fix-error-safely skill. Reproduce the problem, fix the smallest cause, and verify again.
```

Codex users can also mention `$start-project`, `$build-step-by-step`, or `$fix-error-safely` if skill mentions are enabled.

## Included skills

| Skill | Job |
|---|---|
| `choose-stack` | Recommends the fastest stack from the desired demo surface |
| `start-project` | Turns a rough idea into a small demo-first project plan |
| `build-step-by-step` | Builds one verified slice at a time |
| `fix-error-safely` | Reproduces errors, fixes the smallest cause, verifies again |

## Stack defaults

| What you want to show | Recommended default |
|---|---|
| Website, dashboard, form, visual product | TypeScript + Vite + React |
| Tool, installer, project generator | Node.js |
| CLI or lightweight service | Go |
| Data cleanup, scripts, glue automation | Python |
| Performance or systems core | Rust only when necessary |
| Mobile or desktop demo | Responsive web first |

## Silent demo

Open `demo/index.html` in a browser. It explains Build a Dream without a live presentation.

For a sample output, open `examples/beginner-demo-plan.md`.
