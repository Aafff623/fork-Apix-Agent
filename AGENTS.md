# AGENTS.md · 跨工具硬约束与任务流门禁

> **Output Style**: `humanizer-output-style` skill — 统一语气与去 AI 味。加载路径：`skills/humanizer-output-style/SKILL.md`  
> **Windows Rules**: `.cursor/rules/windows-path-discipline.mdc` · `windows-shell-discipline.mdc`  
> **Answer Format**: `.cursor/rules/answer-format.mdc`（含白话 Mermaid）  
> **Commit History**: `.cursor/rules/commit-history.mdc`  
> **AGENTS mirror**: `.cursor/rules/AGENTS.mdc`  
> **Voice**: [`docs/agents/voice.md`](docs/agents/voice.md)

单一事实源：跨工具硬约束、路径表、任务流摘要、Review 门禁。  
操作细节 → [`docs/agents/workflow.md`](docs/agents/workflow.md)。  
领域事实 → [`CONTEXT.md`](CONTEXT.md)；共享用词 → [`LANGUAGES.md`](LANGUAGES.md)。

## 1. 加载顺序

```text
1. 全局 skill:    project-init → readme-polish → humanizer-output-style
2. 仓库 .cursor/rules/:  windows-path-discipline / windows-shell-discipline
                          answer-format / AGENTS.mdc / commit-history
3. 根入口:        AGENTS.md / CLAUDE.md / CONTEXT.md / LANGUAGES.md
4. docs/agents/:  workflow · deliver · archive · domain · issue-tracker
                  · triage-labels · voice
5. 主题产物:      docs/outputs/{report,prd,handoff,commit-history}/<theme>/
6. ADR:           docs/adr/000N-*.md
```

## 2. 硬约束

### 2.1 路径与 Shell

- Windows：`file_path` 写绝对 Windows 路径（反斜杠）；MINGW `/c/` 立即换算。
- Shell：含空格/反斜杠路径必须双引号；`/dev/null` 一律 `nul`。
- 详见 `.cursor/rules/windows-path-discipline.mdc` · `windows-shell-discipline.mdc`。

### 2.2 回答格式

- Dual-Track：先简述再详细；表格 / Mermaid 优先。
- 详见 `.cursor/rules/answer-format.mdc`。

### 2.3 单一事实源

- 领域术语与硬约束 → `CONTEXT.md`（**禁止** `docs/agents/context.md`）
- 共享用词 → `LANGUAGES.md`（**禁止** `docs/agents/language.md`）
- Agent 硬约束与任务流 → 本文
- 人读入口 → `README.md`（不抢术语真相源）

### 2.4 安全与仓库卫生

- 禁止提交 API Key、数据库生产凭据、私有日志。
- 不删业务源码；project-init 只动治理 / 文档 / 媒体契约资产。
- Docker 沙箱与本机服务仅在受信任环境启用（见 `CONTEXT.md`）。

### 2.5 任务流门禁

- **PRD 未批准不写功能代码**
- **handoff 覆盖式更新**（旧文件直接删除）
- **Review 先于 commit**
- 任务分支不写入 commit-history
- 细节：`docs/agents/workflow.md` · `deliver.md` · `archive.md`

### 2.6 Commit & 历史

- Conventional commits（feat / fix / chore / docs / refactor / test）
- 攒批摘要：`docs/outputs/commit-history/{branch}/YYYY-MM-DD.md`
- 详见 `.cursor/rules/commit-history.mdc`

## 3. 路径表（L0）

| 类型 | 路径 |
|---|---|
| 术语 | `CONTEXT.md` |
| 共享用词 | `LANGUAGES.md` |
| 任务流 | `docs/agents/workflow.md` |
| 交付 | `docs/agents/deliver.md`（默认场景 A） |
| 调研 | `docs/outputs/report/{theme}/` |
| PRD | `docs/outputs/prd/{theme}/` |
| Handoff | `docs/outputs/handoff/{theme}/YYYY-MM-DD-{branch}-{task}.md` |
| Commit 攒批 | `docs/outputs/commit-history/{branch}/` |
| ADR | `docs/adr/` |
| 媒体 | `assets/`（`images/readme/` · `images/icon/` …；无 `structure.png`，目录树看 README） |
| 术语库 | `docs/glossary/` |
| 客户端 | `CLIENT/apix-app/` |
| Agent 服务 | `AGENT/agent_module/` |
| Memory 服务 | `MEMORY/memory_module/` |
| File 服务 | `FILE/file_service/` |
| Task 服务 | `TASK/task_flow_module/` |
| 部署文档 | `README/README_zh.md` · `README/README_en.md` |
| README 预览壳 | `preview-readme.{html,css,js}`（建议端口 8090） |
| 本地 Issue | `.scratch/<feature>/` |

**禁止**：`docs/agents/language.md` / `context.md`、`docs/images/`、空目录 `.gitkeep` 凑骨架。

## 4. 任务流摘要

```text
Issue（.scratch/<feature>/）
  → docs/outputs/report/{theme}/        # 可选调研
  → docs/outputs/prd/{theme}/prd.md     # 需用户 approve
  → docs/outputs/handoff/{theme}/…      # 覆盖式
  → 实施 → awaiting-review【停】
  → commit + docs/outputs/commit-history/{branch}/YYYY-MM-DD.md
  → archive（分支合并后）
```

## 5. Review 门禁

- PRD `approved` 前禁止写功能代码
- 交付后 `awaiting-review` → Agent 必须停止，等用户 Review

## 6. Session start

新会话须提供 **theme + task** 或 **Issue / `.scratch/<feature>/` 路径**。  
缺失时立即停止并请用户补全；禁止扫全库猜「最近在忙什么」。

## 7. Agent skills（matt-pocock 决策）

### Issue tracker

本地 `.scratch/<feature>/` markdown（全局默认）。见 `docs/agents/issue-tracker.md`。

### Triage labels

`needs-triage` · `needs-info` · `ready-for-agent` · `ready-for-human` · `wontfix`。见 `docs/agents/triage-labels.md`。

### Domain docs

单文档：根 `CONTEXT.md` + `docs/adr/`。见 `docs/agents/domain.md`。
