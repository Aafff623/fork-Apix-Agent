# LANGUAGES.md · 共享词汇入口

> 单一事实源：人 ⇄ Agent 共享的用词。  
> 与 `CONTEXT.md` 互不重复：本文管「用哪些词」，`CONTEXT.md` 管「事实是什么」。  
> **禁止**再维护 `docs/agents/language.md`（重复件）。

## 1. 产品与模块

| 词 | 含义 | 不要混用 |
|---|---|---|
| APIX | 产品名 / 开源 Agent 协作平台 | 「本工具」可作代称，正式标题用 APIX |
| Agent 运行时 | `AGENT/agent_module` 服务 | 勿称「后端」笼统指代四服务 |
| Memory 服务 | `MEMORY/memory_module` | 勿与「工作区记忆容器」概念混为一谈而不加限定 |
| File 服务 | `FILE/file_service` | 含 RAG / Skill 文件能力 |
| Task 服务 / 任务流服务 | `TASK/task_flow_module` | 与 git 任务分支区分 |
| 客户端 / Electron 客户端 | `CLIENT/apix-app` | 勿称「前端」而忽略主进程 |
| 沙箱 / Docker 沙箱 | `agent-sandbox` 镜像内的代码执行环境 | 勿称「虚拟机」 |
| 工作区 | 客户端侧的工作目录 / 记忆作用域 | 勿与 monorepo 根目录混用 |

## 2. Agent 运行时概念

| 词 | 含义 |
|---|---|
| 主 Agent | LangGraph `main` 权限级调度者 |
| 子 Agent | LangGraph `sub` 权限级并行工作者 |
| 生成 / generation | 一次进行中的对话生成会话（可 abort/suspend） |
| 消息节点 / message node | 可编辑、可分支的消息树节点 |
| 角色卡 | Memory 中保存的 Agent 角色配置 |
| Provider | LLM 供应商配置（OpenAI / DeepSeek / MoonShot / Ollama / 自定义） |
| MCP | Model Context Protocol 工具适配 |
| 工具注册表 | Agent 侧 tools registry |
| RAG / 向量检索 | File 服务 + Milvus（可选）的文档检索 |
| 技能 / Skill（文件） | File 服务管理的技能文件，非 Cursor Agent Skill |

## 3. 客户端概念

| 词 | 含义 |
|---|---|
| 主进程 | Electron `src/main/` |
| 渲染进程 | Vue SPA `src/renderer/` |
| preload | `src/preload/` 暴露 `window.api` / `window.electron` |
| IPC | 主进程与渲染进程桥接 |
| pageRegistry | 侧栏页面中央注册表 |
| 任务流编辑器 | 客户端可视化编排 UI（线性已有；图编辑进行中） |

## 4. 仓库 / 流程

| 词 | 含义 |
|---|---|
| 仓 | 仓库（repo） |
| 主题（theme） | 一项业务功能，挂接 `docs/outputs/{prd,report,handoff,commit-history}/<theme>/` |
| Issue | 默认本地 `.scratch/<feature>/` markdown；见 `docs/agents/issue-tracker.md` |
| 调研 | `docs/outputs/report/<theme>/` |
| PRD | `docs/outputs/prd/<theme>/prd.md` |
| Handoff | `docs/outputs/handoff/<theme>/YYYY-MM-DD-<branch>-<task>.md`，**覆盖式** |
| Commit-history | `docs/outputs/commit-history/<branch>/YYYY-MM-DD.md` |
| Archive | 已合并分支移入 `commit-history/archive/` |
| ADR | `docs/adr/000N-kebab-title.md` |
| Preview | README 中「仓库可浏览资产」模块；**本仓声明省略 Preview 站** |
| Showcase | README 中「产品主链路」真机截图模块 |
| Preview 壳 | `preview-readme.{html,css,js}`，本地 HTTP 渲染 README |
| 配图 brief | `docs/outputs/prd/readme-diagrams/readme-diagram-brief.md` |
| 出图 prompt | `docs/outputs/prd/readme-diagrams/readme-image-prompts.md` |
| 目录结构图 | **不用** `structure.png`；以 README `#structure` Markdown 树为准 |

## 5. 五种 Triage 标签

| 标签 | 含义 |
|---|---|
| `needs-triage` | 待维护者评估 |
| `needs-info` | 待补充信息 |
| `ready-for-agent` | 规格完整，可供 Agent 实施 |
| `ready-for-human` | 需人工实施 |
| `wontfix` | 不做 |

映射见 `docs/agents/triage-labels.md`。

## 6. 端口与服务名（称呼约定）

写文档或 handoff 时用下表服务名，避免「后端 5091」这类含糊说法：

| 称呼 | 端口 |
|---|---:|
| Task 服务 | 5090 |
| Agent 服务 | 5091 |
| Memory 服务 | 5093 |
| File 服务 | 5094 |
