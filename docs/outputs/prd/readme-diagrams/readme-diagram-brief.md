# README Diagram Brief · APIX

- 主题：readme-diagrams
- 日期：2026-08-04
- 产品类型：Electron + 多服务 Agent 平台（Showcase 为主）
- Architecture 标杆选型：microservices / layered capability

## 章节地图

| 章节 | 配图 | 备注 |
|---|---|---|
| Header | `banner.png` | 3:1 气质横幅 |
| 功能 | `features.png` | 8 能力模块 |
| Preview | （省略） | 单产品无资产 Gallery；声明省略 Preview 站 |
| Showcase | `showcase-*.png` | 已有真机截图迁移 |
| 架构 | `architecture.png` | Client + 四服务 + 依赖 |
| 技术栈 | `tech-stack.png` | 分层栈 |
| 主链路 | `workflow.png` | 对话主路径 |
| 目录结构 | Markdown 树（优先）· 可选 `structure.png` | 禁止 `<details>` |

## 资产清单

| 文件 | 来源 | 状态 |
|---|---|---|
| banner / features / architecture / tech-stack / workflow | 生图 | Phase B 生成 |
| structure.png | 可选 | 可用 Markdown 树代替 |
| showcase-main/editor/settings/workspace | `README/source/*` | 已迁移 |
| preview-shell.png | N/A | 声明省略 Preview 站 |

## 设计语言

- 色板（≤6）：深蓝 `#0B3D5C` · 青绿 `#1F8A70` · 电青 `#3DBEBE` · 浅灰底 `#F5F7FA` · 炭黑文字 `#1A1F24` · 警告橙 `#D97706`（仅进度）
- 材质：扁平分层卡片 + 正交连线；克制暗色横幅可接受
- 否决：彩虹、蜘蛛网、假 UI 冒充 Showcase、紫粉 AI 默认风

## Preview / Showcase 决策

- **Preview 站**：省略（理由：单产品 Electron 平台，无组件/模板 Gallery）
- **README 预览壳**：创建 `preview-readme.{html,css,js}`，端口 **8090**
- **Showcase**：主对话 / 编辑器 / 设置 / 工作区 四槽

## 验收

- [ ] 契约文件名落盘或书面占位
- [ ] README 引用相对路径 `assets/images/readme/…`
- [ ] Preview 省略理由已写
- [ ] Showcase 引用真机图
- [ ] 目录树直接呈现
