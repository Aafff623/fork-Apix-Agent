# project-init · 五维调研报告（fork-Apix-Agent）

- 日期：2026-08-04
- 模式：Full（老项目）
- 策略结论：**迁移对齐（非轻量化）**

## 1. 项目结构

| 根目录 | 角色 |
|---|---|
| `AGENT/agent_module/` | Agent 运行时（FastAPI + LangGraph） |
| `CLIENT/apix-app/` | Electron + Vue 3 客户端 |
| `FILE/file_service/` | 文件 + RAG |
| `MEMORY/memory_module/` | 会话 / 用户 / 配置 |
| `TASK/task_flow_module/` | 任务流服务 |
| `README/` | 部署文档 + script + 历史截图 |
| `canvases/` | 深度分析 canvas（只读参考） |
| `setup.ps1` / `setup.sh` | 一键安装 |

入口：客户端 `CLIENT/apix-app`（`npm run dev`）；四服务各自 `uv run main.py`。  
**无**统一根 `package.json` / 单一 `src/`。

## 2. 技术栈

- Client：Electron 37 · Vue 3.5 · Pinia · Element Plus · electron-vite · Volta Node 22
- Agent：Python 3.11+ · FastAPI · LangGraph · LangChain · Docker sandbox · 多搜索/MCP
- Memory / File / Task：Python · FastAPI · MySQL · Redis · Milvus（可选）
- 包管理：`uv`（Python）· `npm`（Client）
- 许可：GPL-3.0

## 3. 资产现状（init 前）

| 资产 | 状态 |
|---|---|
| `.cursor/rules/` 五份 MDC | 缺失 → 本轮同步 |
| `AGENTS.md` / `CONTEXT.md` / `LANGUAGES.md` | 缺失 → 本轮新建 |
| `CLAUDE.md` | 已有技术说明 → 本轮补治理引用 |
| `docs/agents/` | 仅 domain / issue-tracker(GitHub) / triage-labels → 补齐并改 tracker 默认 |
| `docs/adr` · `outputs` · `glossary` · `knowledge` | 缺失 → 本轮新建 |
| `assets/` | 缺失 → 本轮新建并迁移截图 |
| README 配图 | 在 `README/source/`，未按契约命名 |
| Preview 站 | 无（单产品 Electron，可省略） |
| preview-readme 壳 | 缺失 → Phase B 创建 |

## 4. 业务领域

APIX = 本地优先的多智能体协作桌面平台：Leader/子 Agent 调度、Docker 沙箱、多 Provider、MCP、多级记忆、任务流、消息节点分支、RAG。  
主链路：Renderer → IPC → WebSocket(:5091) → LangGraph → 工具/沙箱 → 流式回传。

## 5. 规范差距

| 差距 | 修复 |
|---|---|
| 无根 L0 四件套中的 AGENTS/CONTEXT/LANGUAGES | 新建 |
| issue-tracker 写成 GitHub，与全局默认冲突 | 改为 `.scratch/` |
| 无 ADR / voice / workflow / deliver / archive | 补齐 |
| 媒体不在 `assets/images/readme/` | 迁移 + 契约命名 |
| README 用 `<details>` 折叠结构 | Phase B 改为直接呈现 |
| 无 project-init 报告 | 本文件 |

## 6. 轻量化判定

**非轻量化。**

理由：多服务 monorepo + Electron 客户端 + 部署脚本与真机截图资产 + 已有部分 Agent 文档；需要完整 docs 骨架、assets 契约、README Polish（Showcase 为主）与治理入口，而非 Lite/Minimal。

## 7. 重构策略

**迁移对齐**（非重建、非仅增量补丁）：

1. 保留全部业务源码与 `README/` 部署文档。
2. 叠加规范目录与根入口；覆盖式更新 `CONTEXT`/`LANGUAGES`/`AGENTS`（无旧 CONTEXT 可备份痕迹）。
3. 图片：工作副本进 `assets/`；`README/source` 保留历史。
4. 不写业务功能代码。
