# Workflow · 任务流门禁

本仓任务流：`Issue → PRD → handoff → 实施 → Review → commit-history → archive`。  
`AGENTS.md` 中的任务流摘要是对本文档的指针。

## 阶段与产物

| # | 阶段 | 产物路径 | 门禁 | 谁做 |
|---|------|----------|------|------|
| 1 | Issue | `.scratch/<feature>/issue.md` | 标题 + 8 段模板 | 用户 / 调研 Agent |
| 2 | Report（可选） | `docs/outputs/report/{theme}/` | 调研后产出 | 调研 Agent |
| 3 | PRD | `docs/outputs/prd/{theme}/prd.md` | 用户 approve | 产品 Agent |
| 4 | Handoff | `docs/outputs/handoff/{theme}/YYYY-MM-DD-{branch}-{task}.md` | 覆盖式更新 | 实施 Agent |
| 5 | 实施 | 代码（各服务 / 客户端） | handoff 内有验收口径 | 实施 Agent |
| 6 | Review | 评论 / Commit | 用户通过 | 用户 |
| 7 | Commit-history | `docs/outputs/commit-history/{branch}/YYYY-MM-DD.md` | Review 通过后起草 | 实施 Agent |
| 8 | Archive | `docs/outputs/commit-history/archive/{branch}/` | 合并后移入 | 实施 Agent |

## 门禁红线

- **PRD 未批准不写功能代码**。
- **handoff 覆盖式更新**（旧文件直接删除）。
- **Review 先于 commit**。
- 任务分支**不写入** commit-history。

## 关联文档

- `deliver.md` — 交付物清单  
- `archive.md` — 归档策略  
- `domain.md` — 领域文档消费方式  
- `issue-tracker.md` — Issue 落地方式  
- `triage-labels.md` — 五种 canonical 标签  
- `voice.md` — 项目级输出语气  
