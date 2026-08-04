# ADR-0000 · 采用 ADR 记录架构与流程决策

## 状态

Accepted · 2026-08-04

## 背景

本仓在 `project-init` Full（老项目迁移对齐）落地过程中引入 ADR，作为架构与流程决策的可追溯层。决策若散落在 README / 注释 / 聊天记录，难以检索与对齐。

## 决策

- 所有架构、流程、长期选型决策，落到 `docs/adr/000N-kebab-title.md`。
- ADR **不可改写**历史；更新时写新文件并在旧文件 `Status` 标 `Superseded by 000M`。
- ADR 不写实现细节；只写为什么选 / 备选 / 取舍 / 后果。
- 跨 ADR 时在文末 `## 关联` 双向引用。

## 备选

| 备选 | 否决理由 |
|---|---|
| 散落在 README | 与产品文案混杂，不可检索 |
| 全部进 `CONTEXT.md` | 决策需要历史性，混进事实库会被覆盖 |
| 外部 Wiki | 与代码脱钩 |

## 后果

- `AGENTS.md` / `CLAUDE.md` 声明重要决策保留在 `docs/adr/`。
- 新增决策时附 ADR；Review 时校对是否与既有 ADR 冲突。

## 关联

- 根入口：`AGENTS.md` · `CLAUDE.md` · `CONTEXT.md`
- 规范：project-init §2.8 · §7
