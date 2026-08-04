# Gate 自检 · project-init Full · fork-Apix-Agent

日期：2026-08-04（Full）· 2026-08-05（细致抽检补缺）

## Phase A

- [x] 五份 `.cursor/rules/*.mdc` 已同步且 `alwaysApply: true`（与用户级哈希一致）
- [x] §2.2 全局默认（本地 Issue · canonical triage · 单 CONTEXT · 同步 MDC）
- [x] matt-pocock 决策写盘：issue-tracker / triage-labels / domain
- [x] 根：`AGENTS` / `CLAUDE` / `CONTEXT` / `LANGUAGES`；humanizer + Windows + answer-format
- [x] `docs/agents` 无 `language.md` / `context.md`
- [x] `docs/outputs/{report,prd,commit-history}` · adr · knowledge · glossary
- [x] `handoff/` **按需**：抽检删除预铺空壳（有产物再建）
- [x] `docs/agents/voice.md` 已产出
- [x] `assets/` + `assets/README.md`；截图已融合
- [x] ADR-0000 已落盘
- [x] 五维调研完成，`CONTEXT.md` 已填充（抽检补安全/部署硬事实）
- [x] 无密钥入库；无本机绝对路径作唯一说明
- [x] 深度分析 canvas 风险已回写 CONTEXT §6–§7（不写业务 WIP）

## Phase B

- [x] README Polish 结构 · 样式 · 配图 · Preview 声明 · Showcase
- [x] `readme-diagram-brief.md` · `readme-image-prompts.md`
- [x] 契约图：banner / features / architecture / tech-stack / workflow + showcase-*
- [x] `structure.png` 已撤除（误画通用骨架）；目录以 Markdown 树为准
- [x] Preview 站省略理由已写；README 预览壳已建（端口 8090）
- [x] 目录树直接呈现（无 `<details>` 折叠结构）
- [x] MiniMax `text_to_image` 抽检时 API key 无效 → 改 GenerateImage；因误图最终不落盘 structure

## 轻量化

非轻量化 · 迁移对齐（见 `five-dimension-research.md`）

## 抽检结论（2026-08-05）

| 项 | 结果 |
|---|---|
| MDC 五份 vs 用户级 | 哈希一致 |
| 缺图 | 无（structure 属误图撤除，非缺图） |
| 业务 WIP | 未改 AGENT/CLIENT/FILE/MEMORY/TASK 源码 |
| Gate | 治理资产可 Review；首个业务 theme 仍须 PRD 批准 |
