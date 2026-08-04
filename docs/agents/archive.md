# Archive · 归档策略

## commit-history 归档

- 分支合并到主线后，将该分支文件夹整体移入 `docs/outputs/commit-history/archive/`。
- 长期主分支（如 `Version_2.1` / 未来 `main`）永不归档整夹。
- 任务分支不写入 commit-history，因此不归档。

## handoff 归档

- handoff **覆盖式**：文件内嵌 `## Status`（shipped | partial | reverted）。
- Review 通过后，在对应 `commit-history/{branch}/YYYY-MM-DD.md` 的「关联」段列出已交付 handoff。
- 同一 theme **不保留**多份旧 handoff，直接删除。

## docs 删除原则

- 删除前确认主题已 shipped 或 wontfix。
- 重要决策保留在 `docs/adr/`（ADR 不删除）。
- 调研报告在主题关闭后至少保留一个发布周期，便于追溯。
