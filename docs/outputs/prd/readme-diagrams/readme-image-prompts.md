# README Image Prompts · APIX

## §0 全局规范

- 视觉标准：readme-polish `references/visual-standards.md`
- 色板：深蓝 `#0B3D5C` · 青绿 `#1F8A70` · 电青 `#3DBEBE` · 浅灰 `#F5F7FA` · 炭黑 `#1A1F24`
- 命名契约：`assets/images/readme/{banner,features,architecture,tech-stack,workflow,structure,showcase-*}.png`
- 系统指令：Professional product diagram for open-source README. Flat layered UI, 4–6 colors, clean typography, no fake UI screenshots for Showcase, no spider-web lines, no purple neon AI cliché.

### Showcase / Preview

| 资产 | method |
|---|---|
| showcase-*.png | screenshot（已从 README/source 迁移） |
| preview-shell.png | N/A（本仓省略 Preview 站） |

---

## banner.png

- 比例：约 3:1（生成可用 21:9 / 16:9 再裁）
- Prompt (EN): Wide README banner for APIX, open-source AI Agent collaboration platform. Dark blue to teal gradient plane, large clean wordmark "APIX", short subtitle "Multi-agent runtime · Electron · LangGraph", subtle geometric network nodes, lots of whitespace, professional SaaS brand system, no characters, no fake UI, 4-6 colors.

## features.png

- Prompt (EN): Infographic of eight feature modules for APIX in a clean 2x4 or 4x2 card grid: Multi-agent orchestration, Docker sandbox, Multi-provider LLM, MCP tools, Multi-level memory, Visual task flow, Message node branching, RAG knowledge base. Flat icons, short English labels, light gray background, teal/blue accents, consistent corner radius.

## architecture.png

- Prompt (EN): Layered microservices architecture diagram for APIX. Top: Electron Client (Vue renderer + main process). Middle: four services with ports — Task :5090, Agent :5091, Memory :5093, File :5094. Bottom deps: Redis, MySQL, Milvus optional, Docker sandbox, Ollama optional. Orthogonal arrows only, clear boundaries, ByteByteGo style, light background.

## tech-stack.png

- Prompt (EN): Tech stack layers for APIX: Client layer Electron Vue Pinia Element Plus; Runtime layer FastAPI LangGraph LangChain; Data layer MySQL Redis Milvus; Tooling uv npm Docker. Horizontal stacked bars or icon wall, real tech names, not repeating architecture topology.

## workflow.png

- Prompt (EN): Single happy-path workflow: User input → Electron main → Agent WebSocket → LangGraph main agent → Tools (file/search/code/MCP) → Docker sandbox / vector DB → stream events back to UI. Decision diamonds ≤2, SIPOC-like lanes, clean arrows.

## structure.png

- Optional; README uses Markdown tree. If generated: folder tree showing AGENT CLIENT FILE MEMORY TASK docs assets README setup scripts.
