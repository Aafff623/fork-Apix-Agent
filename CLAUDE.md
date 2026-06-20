# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

APIX is a full-stack AI Agent collaboration platform. The repository is organized as a monorepo of loosely coupled services plus an Electron desktop client.

- `CLIENT/apix-app` — Electron + Vue 3 desktop application (renderer + main process IPC)
- `AGENT/agent_module` — Python FastAPI service; the agent runtime built on LangGraph
- `MEMORY/memory_module` — Python FastAPI service; conversation/message persistence and user state (MySQL + Redis)
- `FILE/file_service` — Python FastAPI service; file storage, RAG embedding, and vector search (Milvus optional)
- `TASK/task_flow_module` — Python FastAPI service; task-flow execution/coordination

There is no existing test suite in the repository.

## Tech stack

- **Client:** Electron 37, Vue 3.5, Pinia, Vue Router, Element Plus, CodeMirror 6, electron-vite, Sass, Prettier, ESLint
- **Agent runtime:** Python 3.11+, FastAPI, Uvicorn, LangGraph, LangChain, crawl4ai, tavily, ddgs, docker sandbox
- **Memory / File / Task:** Python 3.12+, FastAPI, Uvicorn, Redis, MySQL, Milvus (optional for RAG)
- **Package managers:** `uv` for Python modules, `npm` + Volta for the client

## One-time setup

Run the provided setup script from the repo root. It builds the Docker sandbox image, starts Redis and MySQL, initializes the database, and installs dependencies.

- Windows (PowerShell):
  ```powershell
  Set-ExecutionPolicy Bypass -Scope Process -Force
  .\setup.ps1
  ```
- macOS / Linux:
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```

Manual setup steps are documented in `README/README_zh.md` and `README/README_en.md`.

## Running services during development

Start the dependency containers (Redis on 6379, MySQL on 3307) and the four Python services. Each service uses `uv` and has its own `pyproject.toml`.

```bash
# Agent runtime — port 5091
cd AGENT/agent_module
uv sync
uv run main.py

# Memory service — port 5093
cd MEMORY/memory_module
uv sync
uv run main.py

# File service — port 5094
cd FILE/file_service
uv sync
uv run main.py

# Task flow service — port 5090
cd TASK/task_flow_module
uv sync
uv run main.py
```

Then start the Electron client:

```bash
cd CLIENT/apix-app
npm install   # if not already installed
npm run dev
```

## Client scripts

All client scripts run from `CLIENT/apix-app`:

- `npm run dev` — start Electron dev mode
- `npm run build` — build renderer + main with electron-vite
- `npm run start` — preview the production build
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
- `npm run build:win` / `build:mac` / `build:linux` — package installers with electron-builder
- `npm run postinstall` — rebuild native deps via electron-builder

## Code style

- **Client:** Prettier config in `CLIENT/apix-app/.prettierrc.yaml`: `singleQuote: true`, `semi: false`, `printWidth: 100`, `trailingComma: none`.
- **Python:** There is no formatter/linter config committed. Follow the existing conventions in each module.

## High-level architecture

### Service topology and ports

| Service | Port | Responsibilities |
|---------|------|------------------|
| Task flow | 5090 | Task-flow scheduling and execution |
| Agent runtime | 5091 | WebSocket gateway, LLM streaming, tool use, multi-agent dispatch |
| Memory | 5093 | Conversations, users, message nodes, role cards, provider/MCP settings |
| File | 5094 | File records, RAG documents/skills, embedding, vector retrieval |

Default base URLs are hard-coded in `CLIENT/apix-app/src/main/config.js` and the Python `global_config.py` files.

### Client architecture

The Electron app uses a main-process / renderer-process split:

- `src/main/index.js` — entry point; creates the main window and initializes the WebSocket client.
- `src/main/app/app.js` — main-window creation and menu setup.
- `src/main/ws/wsClient.js` — persistent WebSocket connection to the agent runtime (`ws://127.0.0.1:5091/ws/default/{client_id}`), with auto-reconnect and IPC fan-out to renderer subscribers.
- `src/main/ipc/` — IPC handlers that bridge renderer calls to REST APIs (memory/file/agent) or the WebSocket. Key files: `ai_chat.js`, `ai_files.js`, `ai_configuration.js`, `ai_task.js`, `file.js`, `local_task.js`, `login_register.js`.
- `src/preload/index.js` — exposes `window.api.*` and `window.electron.*` to the renderer.
- `src/renderer/src/` — Vue 3 SPA. `router/pageRegistry.js` is the central registry for sidebar pages; `router/index.js` dynamically registers them and guards login state against the Pinia `auth` store.

Renderer state is mostly in Pinia stores (`store/auth.js`, `store/app.js`, `store/globalData.js`) plus a few reactive globals in `store/globalData.js`.

### Agent runtime architecture

The agent service is built on LangGraph and runs as a FastAPI app with WebSocket support.

- `apix_agent_core/agent.py` — `AgentRuningtime` singleton. Manages background workers that dispatch and cancel sub-agent tasks.
- `apix_agent_core/agent_factory/agent_creator.py` — `AgentCreator` singleton. Builds and caches compiled LangGraph graphs keyed by `(agent_name, role, config)`. Supports `main` and `sub` permission levels.
- `apix_agent_core/agent_factory/agent_node/main_agent_node.py` / `sub_agent_node.py` — node implementations for context prepare, context summary, LLM call, message persist, and routing.
- `apix_agent_core/generation_manager.py` — tracks in-flight generations per `client_id`, handles abort/suspend, and persists interrupted message buffers.
- `apix_event_pipe/agent_stream_writer.py` — structured event envelope writer used inside graph nodes; supports blocking events resolved by the client.
- `apix_event_pipe/apix_event_gateway.py` — `EventHandler` invoked from the WebSocket router; builds the LangGraph initial state, streams events back to the client, and manages generation lifecycle.
- `apix_platform/register.py` + platform modules — abstraction for sending events to different client platforms; the default platform is WebSocket.
- `apix_agent_core/tools/` — tool registry and implementations. Important subsystems:
  - `basic_tools/` — file manager, communication, todo list, skills, task flow
  - `code_runner/` — Python/cmd code execution in the Docker sandbox
  - `mcp/` — MCP tool adapters (with and without lifecycle management)
  - `web_search/` — multiple search providers (bing, bocha, crawl4ai, duckduckgo, google, jina, searxng)
  - `vector_search/` — RAG retrieval
- `sandbox_manager/` — Docker sandbox lifecycle and workspace file/git management.

### Memory service architecture

FastAPI service for structured data:

- `routers/memory_record.py` — conversation CRUD, message node CRUD (with branch support), role cards, workspace memory.
- `routers/user_record.py` — user auth, LLM provider configs, MCP server configs, settings.
- `core/domain/mysql_server.py` — MySQL access layer.
- `core/domain/redis_server.py` — Redis cache/queue layer.
- `core/domain/data_server_manager.py` — async worker pool for query execution.

### File service architecture

FastAPI service for files and RAG:

- `routers/file_record.py` — file upload/download/management.
- `routers/rag_record.py` — RAG document ingestion and retrieval.
- `routers/skill_record.py` — skill file management.
- `core/domain/milvus_server.py` — vector store (Milvus).
- `core/domain/mysql_server.py` — metadata persistence.
- `core/embedding_models/` — embedding-model adapter/factory (defaults to Ollama via the `BASE_URL` mapping).

### Task flow service architecture

FastAPI service for linear task-flow execution:

- `app/routers/task.py` — task-flow REST endpoints.
- `app/core/task_manager.py` — task execution engine.
- `app/core/translator.py` — task-flow DSL translation.

All four Python services auto-load `APIRouter` instances from their `routers` packages during startup.

## Data flow for a chat

1. Renderer calls `window.api.chatComplations(...)` → main-process IPC `api:chat`.
2. Main process sends `{ action: "chat_with_llm", data: {...} }` over the WebSocket to the agent runtime.
3. `routers/websocket.py` routes `chat_with_llm` to `EventHandler.chat_with_llm()`.
4. The handler creates a generation, builds a `MainAgentState`, and runs the compiled LangGraph.
5. Graph nodes emit `ApixEventEnvelope` events; the gateway forwards them to the WebSocket platform.
6. Main process receives WebSocket messages and forwards them to subscribed renderer windows via `ws:message`.
7. Renderer consumes the stream and updates the message tree (which supports branching nodes).

## Important conventions

- **Port hard-coding:** Service URLs are scattered in `global_config.py` files and `CLIENT/apix-app/src/main/config.js`. Changing a port requires updating all of these.
- **Router auto-discovery:** Python services discover routers by scanning the `routers` package and including any `APIRouter` instance. To add a new route, create a module in the appropriate `routers/` directory and expose a router variable.
- **Graph caching:** Agent graphs are cached by `(agent_name, role, config)` in `AgentCreator`. The cache has a TTL and only expired graphs marked `done` are cleaned.
- **Custom LLM providers:** The agent runtime fetches provider metadata from the memory service at runtime and injects the endpoint into `BASE_URL` using a `custom-{type}-{id}` key.
- **Sandbox:** Code execution requires the `agent-sandbox` Docker image (`agent-sandbox:latest`) built from `README/script/AgentSandbox/Dockerfile`.
- **MySQL init:** The database schema is initialized from `README/script/init_mysql_backup.sql` by the setup scripts.
- **No tests:** There are currently no unit, integration, or E2E tests. Any new test infrastructure should be added deliberately rather than assumed.

## Common development tasks

### Add a new tool to the agent

1. Implement the tool function in `AGENT/agent_module/apix_agent/apix_agent_core/tools/` (pick the right subdirectory).
2. Register it in `AGENT/agent_module/apix_agent/apix_agent_core/tools/registry.py`.
3. Ensure the permission string you use is collected by `AgentCreator._collect_permission()` so it is included when the matching capability is enabled.

### Add a new page in the client

1. Create the Vue component in `CLIENT/apix-app/src/renderer/src/views/`.
2. Add an entry to `CLIENT/apix-app/src/renderer/src/router/pageRegistry.js`.
3. The sidebar and router will pick it up automatically.

### Add a new backend service route

1. Create a module under the appropriate `routers/` directory.
2. Expose an `APIRouter` instance (commonly named `router`).
3. Start the service; the route will be auto-loaded.

## Dependencies and external services

- **Docker Desktop** — required for the agent sandbox and dependency containers.
- **Redis** — running on `localhost:6379`.
- **MySQL** — running on `localhost:3307` (container port 3306) with credentials `apix/apixapix`, database `apix_database`.
- **Milvus** — optional, only needed for RAG; default URI `http://localhost:19530`.
- **Ollama** — optional, only needed for local models / RAG embeddings; default `http://localhost:11434`.

## Agent skills

### Issue tracker

Issues live as GitHub issues in this repo. Use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the canonical five labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: read `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
