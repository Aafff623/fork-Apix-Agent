# assets/ · 媒体约定

本目录存放**文档与演示媒体**，不是业务运行时资源（客户端 `public/` / `resources/` 仍归应用自身）。

## 目录

| 路径 | 职责 | 状态 |
|---|---|---|
| `images/readme/` | README 契约配图 + Showcase | 已建 |
| `images/icon/` | 品牌图标文档副本 | 已从 `README/source/APIX-icon.png` 复制 |
| `backup/` | 上游原版只读备份 | 按需再建 |
| `video/` · `ppt/` · `speeches/` | 演示媒体 | 按需再建 |

## README 配图契约（`images/readme/`）

| 文件 | 用途 |
|---|---|
| `banner.png` | 页首横幅 |
| `features.png` | 核心功能一览 |
| `architecture.png` | 系统架构 |
| `tech-stack.png` | 技术栈分层 |
| `workflow.png` | 用户主链路 |
| `structure.png` | **已撤除**（曾误画通用 `src/`/`tests/`；目录以 README Markdown 树为准） |
| `showcase-*.png` | 产品真机界面（已由 `README/source/*-page.png` 迁移） |
| `brand-bar.jpeg` | 历史品牌条（来自 `README/source/APIX-bar.jpeg`） |

**本仓无 Preview 站**（非资产库），故不强制 `preview-shell.png`。  
旧路径 `README/source/` 保留作部署文档历史引用；新 README 统一指向本目录。  
`docs/outputs/handoff/` **按需创建**（有 handoff 产物时再建，不预铺空壳）。

## 还原说明

- Showcase 源：`README/source/main-page.png` 等 → `showcase-*.png`
- Icon：`README/source/APIX-icon.png` → `images/icon/APIX-icon.png`
