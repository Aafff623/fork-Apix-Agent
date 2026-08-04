# Voice · 项目级输出语气与格式规范

> 引用全局 skill：`humanizer-output-style`（去 AI 腔）。  
> 引用全局规则：`.cursor/rules/answer-format.mdc`（先简述再详细，表格/Mermaid 优先）。

本文件只补充**项目层**语气；回答结构仍受 `answer-format.mdc` 约束。

## 1. 中文优先，英文术语括注

- 主用中文。技术名词首次出现可用「中文（English）」：如「沙箱（sandbox）」「消息节点（message node）」。
- 已固化英文专名保持原样：Agent、MCP、RAG、LangGraph、Electron、IPC、WebSocket、Provider、ADR、PRD、Showcase、Preview。

## 2. 多服务指称

- 点名服务：`Agent 服务` / `Memory 服务` / `File 服务` / `Task 服务` / `Electron 客户端`。
- 禁止含糊「后端改一下」而不写服务名与端口（见 `LANGUAGES.md` §6）。

## 3. 安全与隐私

- API Key / Provider 端点：**仅本地存储**口径以根 `README.md` Privacy 与 `CONTEXT.md` 为准，勿扩写上传行为。
- 沙箱：强调「受信任本机/私网」，勿写成「绝对安全」。

## 4. 进度诚实

- 线性任务流编辑代码损坏、图任务流进行中等状态，**跟 README Progress / CONTEXT 缺口表一致**，禁止写成已完备。

## 5. 反模式

- ❌ 「非常乐意帮您」等客套空话  
- ❌ 用说明图冒充 Showcase 真机 UI  
- ❌ 把 Preview 站与 Showcase 混为一谈  
- ❌ 在 commit 标题玩梗、夸大完成度  
