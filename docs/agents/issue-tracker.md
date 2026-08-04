# Issue tracker: Local Markdown

Issues and PRDs for this repo live as **local markdown** under `.scratch/<feature>/`（project-init 全局默认）。

## Conventions

- **Create an issue**: 在 `.scratch/<feature>/issue.md`（或同目录多文件）写入 8 段模板（见 project-init §5.0）。
- **Read an issue**: 直接打开对应路径；Agent 以用户给出的路径为准，禁止扫全库猜「最新」。
- **List issues**: `Get-ChildItem .scratch -Recurse -Filter *.md`（Windows）或等价命令。
- **Close**: 在文件 frontmatter / `## Status` 标 `closed` / `wontfix`，必要时移入 `.scratch/archive/`。

可选：若后续改回 GitHub Issues，更新本文件与 `AGENTS.md` §7，并用 `gh` CLI。

## When a skill says "publish to the issue tracker"

写入 `.scratch/<feature>/issue.md`（新建目录）。

## When a skill says "fetch the relevant ticket"

读取用户给出的 `.scratch/<feature>/…` 路径。

## Bug Issue 8 段结构

```markdown
## 问题描述
## 根因
## 复现
## 关键代码位置
## 修复方向（供修复 Agent 参考）
## 接手 Agent 引导
## 关联
## 复现脚本
```
