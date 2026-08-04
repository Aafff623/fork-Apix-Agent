# Deliver · 任务交付物清单

每条 handoff 必须给出可核对的交付物清单。**禁止**写「完成情况待定」或「看 commit」。

本仓默认启用 **场景 A**（覆盖式 handoff 快照）。

## 必须列出

| 维度 | 内容 | 例子 |
|---|---|---|
| 涉及文件 | 路径 + 行号段（可读） | `AGENT/agent_module/.../registry.py` L20–L48 |
| 行为变化 | 旧 → 新 | 「子 Agent 取消后 UI 仍显示 running → 同步为 cancelled」 |
| 接口/契约 | REST / WS action / IPC | `chat_with_llm` payload 字段 |
| 服务边界 | 改动落在哪几个服务 | Client + Agent；Memory 无改 |
| 测试 | 新增或更新 | 【待确认】本仓尚无统一测试套件时写明验证步骤 |
| 文档 | 更新哪些 | `CONTEXT.md` · `README.md` |
| 风险 | 边界 / 回退 | 「改端口须同步 config.js 与 global_config.py」 |
| 验收口径 | 可逐条勾选 | 「`npm run dev` 后主链路能流式回包」 |
| commit | 计划标题 | `fix: sync generation abort state` |

## 反模式

- ❌ 写「按计划完成」
- ❌ 把验收只写在 commit body
- ❌ 跳过文件路径
- ❌ 把四服务统称「后端」而不点名
