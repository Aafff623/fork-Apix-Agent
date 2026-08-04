import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

/** 分区导航键 */ // 中文注释：画布交互分区
type Section =
  | "overview"
  | "stack"
  | "dirs"
  | "modules"
  | "arch"
  | "run"
  | "highlights"
  | "risks";

export default function ApixAgentDeepAnalysis() {
  const theme = useHostTheme();
  const [section, setSection] = useCanvasState<Section>("apix-section", "overview");

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 1120 }}>
      {/* 页头 */}
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <H1>APIX Agent 深度分析</H1>
          <Pill tone="info">fork-Apix-Agent</Pill>
          <Pill>Version_2.1</Pill>
          <Pill>GPL-3.0</Pill>
        </Row>
        <Text tone="secondary">
          开源 AI Agent 协作平台：Electron 桌面端 + 四后端 FastAPI 微服务（Agent / Memory / File /
          Task），以 LangGraph 多智能体运行时为核心。项目路径：
          D:/OneDrive/Desktop/project/fork-Apix-Agent
        </Text>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="5" label="顶层模块（含 CLIENT）" />
        <Stat value="149" label="Python 源文件" />
        <Stat value="59" label="Vue 组件" />
        <Stat value="0" label="测试文件" tone="warning" />
      </Grid>

      <Callout tone="info" title="仓库形态说明">
        AGENT / CLIENT / FILE / MEMORY / TASK 是同仓目录，并非 git submodule（无 .gitmodules）。
        远程：https://github.com/Aafff623/fork-Apix-Agent.git · 默认分支 Version_2.1。
        CLAUDE.md 对架构有较完整的工程说明。
      </Callout>

      {/* 导航：可点击切换分析分区 */}
      <Row gap={8} wrap>
        <Pill active={section === "overview"} onClick={() => setSection("overview")}>
          概览
        </Pill>
        <Pill active={section === "stack"} onClick={() => setSection("stack")}>
          技术栈
        </Pill>
        <Pill active={section === "dirs"} onClick={() => setSection("dirs")}>
          目录
        </Pill>
        <Pill active={section === "modules"} onClick={() => setSection("modules")}>
          核心模块
        </Pill>
        <Pill active={section === "arch"} onClick={() => setSection("arch")}>
          架构
        </Pill>
        <Pill active={section === "run"} onClick={() => setSection("run")}>
          如何运行
        </Pill>
        <Pill active={section === "highlights"} onClick={() => setSection("highlights")}>
          亮点
        </Pill>
        <Pill active={section === "risks"} onClick={() => setSection("risks")}>
          风险/改进
        </Pill>
      </Row>

      <Divider />

      {section === "overview" && <Overview />}
      {section === "stack" && <TechStack />}
      {section === "dirs" && <Directory />}
      {section === "modules" && <CoreModules />}
      {section === "arch" && <Architecture theme={theme} />}
      {section === "run" && <HowToRun />}
      {section === "highlights" && <Highlights />}
      {section === "risks" && <Risks />}
    </Stack>
  );
}

function Overview() {
  return (
    <Stack gap={16}>
      <H2>概览</H2>
      <Text>
        APIX 定位为「完整 Agent 运行时」，而非单轮聊天壳：用户一句话经 WebSocket 进入 LangGraph
        主 Agent，可按能力开关派生子 Agent、调用工具（文件/命令沙箱/搜索/RAG/MCP/任务流），
        事件流回传桌面端渲染。消息以节点树存储，支持分支编辑。
      </Text>
      <Table
        headers={["维度", "结论"]}
        rows={[
          ["产品目标", "多智能体协作、安全沙箱执行、多模型/MCP/RAG 一体化桌面工作台"],
          ["架构风格", "松耦合单体仓库 + 本地微服务（端口硬编码）"],
          ["交互主路径", "Renderer → IPC → Electron 主进程 WS → Agent:5091 → 事件回流"],
          ["数据层", "MySQL:3307（持久化）+ Redis:6379（缓存）+ 可选 Milvus:19530（RAG）"],
          ["成熟度", "多 Agent / MCP / Docker 沙箱已完成；图任务流进行中；测试与多端未开始"],
          ["文档质量", "根 README + README_zh/en + CLAUDE.md 较完整；根 README 在部分环境存在编码乱码"],
        ]}
        striped
      />
      <H3>模块进度（摘自 README）</H3>
      <Table
        headers={["能力", "状态", "说明"]}
        rows={[
          ["多智能体运行时", "已完成", "LangGraph 主/子 Agent 调度"],
          ["MCP 集成", "已完成", "支持生命周期自定义"],
          ["线性任务流编辑", "已完成", "卡片化；相关代码曾有损毁风险备注"],
          ["Docker 沙箱", "已完成", "Ubuntu 22.04 基础镜像 agent-sandbox"],
          ["图任务流编辑", "进行中", "非线性编排下一阶段"],
          ["工作区时间旅行 / 定时任务 / 插件市场 / 多端", "未开始", "路线图项"],
        ]}
        rowTone={["success", "success", "success", "success", "warning", "neutral"]}
      />
    </Stack>
  );
}

function TechStack() {
  return (
    <Stack gap={16}>
      <H2>技术栈</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>桌面客户端 CLIENT</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Electron 37 · electron-vite 4 · Vue 3.5 · Pinia · Vue Router</Text>
              <Text>Element Plus · Naive UI · CodeMirror 6 · Cherry Markdown</Text>
              <Text>Axios · ws · Sass · ESLint / Prettier · Volta Node 22.19.0</Text>
              <Text>打包：electron-builder（win / mac / linux）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Agent 运行时 AGENT</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Python ≥3.11 · FastAPI · Uvicorn · uv</Text>
              <Text>LangGraph ≥1.0 · LangChain · MCP adapters</Text>
              <Text>LLM：OpenAI / DeepSeek / Google / Ollama / Moonshot 等</Text>
              <Text>工具：crawl4ai · tavily · ddgs · Docker 沙箱 · Redis</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Memory / File / Task</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Python ≥3.12 · FastAPI · Uvicorn · uv</Text>
              <Text>MySQL（aiomysql）· Redis · PyCryptodome（登录加解密）</Text>
              <Text>File：Milvus · LangChain-Milvus · Ollama 嵌入 · PyMuPDF</Text>
              <Text>Task：线性任务流 DSL 翻译与执行（config.yaml）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>基础设施</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Docker：agent-sandbox / redis:7 / mysql:8.0 / 可选 Milvus</Text>
              <Text>可选 Ollama（本地模型与嵌入）</Text>
              <Text>一键脚本：setup.ps1 / setup.sh</Text>
              <Text>协议：HTTP REST + WebSocket 事件信封</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <H3>服务端口一览</H3>
      <Table
        headers={["服务", "端口", "入口"]}
        rows={[
          ["Task flow", "5090", "TASK/task_flow_module/main.py"],
          ["Agent runtime", "5091", "AGENT/agent_module/main.py · WS /ws/{platform}/{client_id}"],
          ["Memory", "5093", "MEMORY/memory_module/main.py"],
          ["File / RAG", "5094", "FILE/file_service/main.py"],
          ["MySQL", "3307→3306", "Docker apix-mysql"],
          ["Redis", "6379", "Docker redis-memo"],
          ["Milvus（可选）", "19530", "standalone embed"],
        ]}
        striped
      />
    </Stack>
  );
}

function Directory() {
  return (
    <Stack gap={16}>
      <H2>目录结构</H2>
      <Table
        headers={["路径", "职责", "规模（约）"]}
        rows={[
          ["AGENT/agent_module/", "Agent 运行时：LangGraph、工具、沙箱、WS 网关", "84 .py"],
          ["CLIENT/apix-app/", "Electron + Vue 桌面端（main / preload / renderer）", "59 .vue + 30 .js"],
          ["MEMORY/memory_module/", "会话、消息节点、用户、供应商/MCP 配置", "24 .py"],
          ["FILE/file_service/", "文件存储、Skills、RAG 向量检索", "30 .py"],
          ["TASK/task_flow_module/", "任务流调度与 DSL 翻译", "11 .py"],
          ["README/", "中英部署文档、MySQL 初始化、沙箱 Dockerfile", "—"],
          ["docs/agents/", "Agent 技能域文档（domain / triage / issue-tracker）", "—"],
          ["setup.ps1 / setup.sh", "Windows / Unix 一键依赖与容器初始化", "—"],
          ["CLAUDE.md", "面向 AI 助手的仓库指南（架构/约定/扩展点）", "—"],
        ]}
        striped
      />
      <CollapsibleSection title="AGENT 内部关键目录" defaultOpen>
        <Table
          headers={["相对 apix_agent/", "说明"]}
          rows={[
            ["apix_agent_core/", "AgentRuntime、AgentCreator、节点、工具、沙箱、上下文"],
            ["apix_event_pipe/", "EventHandler 网关 + AgentStreamWriter 事件信封"],
            ["apix_platform/", "多端发送抽象（WebSocket / default / QQ 骨架）"],
            ["routers/", "websocket / settings / git / information"],
            ["commons/", "日志、类型、自动初始化、资源清理"],
            ["global_config.py", "端口、BASE_URL、TTL、沙箱镜像名"],
          ]}
        />
      </CollapsibleSection>
      <CollapsibleSection title="CLIENT 内部关键目录" defaultOpen>
        <Table
          headers={["相对 src/", "说明"]}
          rows={[
            ["main/", "窗口、IPC（ai_chat/files/config/task）、WS 客户端、config.js"],
            ["preload/", "暴露 window.api / window.electron"],
            ["renderer/src/views/", "智能体 / 任务流 / 数据中心 / 任务 / 设置等页面"],
            ["renderer/src/router/pageRegistry.js", "侧栏页面中央注册表"],
            ["renderer/src/store/", "auth / app / globalData（Pinia）"],
          ]}
        />
      </CollapsibleSection>
    </Stack>
  );
}

function CoreModules() {
  return (
    <Stack gap={16}>
      <H2>核心模块</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader trailing={<Pill tone="info">5091</Pill>}>AGENT · 运行时</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>AgentRuningtime：子 Agent 后台 worker / 取消</Text>
              <Text>AgentCreator：按 (name, role, config) 缓存编译图</Text>
              <Text>权限位：file / web / RAG / cmd / skill / task / assign</Text>
              <Text>工具：工作区文件、沙箱代码、多搜索源、MCP、OCR、todo</Text>
              <Text>GenerationManager：中止/挂起与缓冲持久化</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="info">CLIENT</Pill>}>桌面端</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>主进程持久 WS：ws://127.0.0.1:5091/ws/default/{"{id}"}</Text>
              <Text>IPC 桥接 REST（Memory/File/Agent/Task）</Text>
              <Text>页面：智能体、文件资源、数据中心、任务、设置</Text>
              <Text>组件族：role / provider / mcp / rag / skill / msg bubble</Text>
              <Text>消息气泡支持工具卡片、todo、用户提问阻塞事件</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="info">5093</Pill>}>MEMORY</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>会话 / 消息节点（含分支）/ 角色卡 / 工作区记忆</Text>
              <Text>用户注册登录、LLM Provider、MCP Server、设置</Text>
              <Text>DataServerManager 异步查询池 + MySQL/Redis</Text>
              <Text>Snowflake/Yuki ID 生成工具链</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="info">5094 / 5090</Pill>}>FILE · TASK</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>FILE：上传下载、RAG 入库检索、Skill 文件</Text>
              <Text>嵌入默认走 Ollama；向量库 Milvus</Text>
              <Text>TASK：task_manager 执行 + translator DSL</Text>
              <Text>Agent 工具可回调任务流服务更新/查询测试任务</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <H3>工具权限注册表（registry.py）</H3>
      <Table
        headers={["permission", "典型工具"]}
        rows={[
          ["default", "write_todos / read|update_memory / ocr / send_images / request_user_input"],
          ["file_opration", "fetch/list/read/write/move/delete workspace files"],
          ["web_search", "search_web_by_keywords / by_urls（多 provider）"],
          ["knowledge_retrieval", "search_knowledge_base"],
          ["command_opration", "run_workspace_command / run_python_code（沙箱）"],
          ["skill_load", "load_skill"],
          ["sab_agent_assign", "assign / query / stop sub_assistant（仅 main）"],
          ["task_flow", "任务流 + 文件/命令子集"],
          ["forbidden", "纯聊天：清空工具"],
        ]}
        striped
      />
    </Stack>
  );
}

function Architecture({ theme }: { theme: ReturnType<typeof useHostTheme> }) {
  return (
    <Stack gap={16}>
      <H2>架构</H2>
      <Text tone="secondary">一次聊天的主数据流（本地开发默认拓扑）</Text>
      <Stack
        gap={0}
        style={{
          padding: 16,
          background: theme.fill.tertiary,
          borderRadius: 8,
          border: `1px solid ${theme.stroke.tertiary}`,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 12,
          lineHeight: 1.55,
        }}
      >
        <Text>
          {`Vue Renderer
  │  window.api.chatComplations / IPC api:chat
  ▼
Electron Main  ──WS──►  Agent :5091  /ws/default/{client_id}
  │                       │ action: chat_with_llm
  │                       ▼
  │                 EventHandler → GenerationManager
  │                       │
  │                       ▼
  │                 LangGraph MainAgent
  │                 (prepare → LLM → tools → persist → route)
  │                       │ 子 Agent worker 并行
  │                       │ Docker sandbox / MCP / RAG / Web
  │                       ▼
  │                 ApixEventEnvelope ──► Platform.send (WS)
  ▼
Renderer 订阅 ws:message → 更新消息节点树`}
        </Text>
      </Stack>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>横向依赖</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Agent → Memory（配置/历史/记忆）</Text>
              <Text>Agent → File（RAG / 文件）</Text>
              <Text>Agent → Task（任务流工具）</Text>
              <Text>Client → Memory / File / Agent / Task（REST）</Text>
              <Text>Memory/File → MySQL + Redis</Text>
              <Text>File → Milvus + Ollama（可选）</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>关键设计约定</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>各服务 routers 包自动扫描注册 APIRouter</Text>
              <Text>端口/URL 分散在 global_config.py 与 config.js</Text>
              <Text>图缓存 TTL，仅清理 status=done 的过期图</Text>
              <Text>自定义 Provider：runtime 从 Memory 拉取并注入 BASE_URL</Text>
              <Text>平台可扩展：@send_interface / PLATFORM_REGISTRY</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <Callout tone="warning" title="部署边界">
        服务默认绑定 0.0.0.0，客户端指向 127.0.0.1。当前无网关鉴权、无服务间 mTLS；适合本机/受信局域网，不适合直接公网暴露。
      </Callout>
    </Stack>
  );
}

function HowToRun() {
  return (
    <Stack gap={16}>
      <H2>如何运行</H2>
      <H3>方式 A：一键脚本（推荐首次）</H3>
      <Table
        headers={["平台", "命令"]}
        rows={[
          ["Windows", "Set-ExecutionPolicy Bypass -Scope Process -Force; .\\setup.ps1"],
          ["macOS/Linux", "chmod +x setup.sh && ./setup.sh"],
        ]}
      />
      <Text tone="secondary">
        脚本会：构建 agent-sandbox 镜像、拉起 Redis/MySQL、执行 init SQL、对各 Python 模块 uv sync
        并安装客户端依赖。
      </Text>
      <H3>方式 B：手动分步</H3>
      <Table
        headers={["步骤", "要点"]}
        rows={[
          ["1. Docker 沙箱", "cd README/script/AgentSandbox && docker build -t agent-sandbox ."],
          ["2. Redis", "docker run redis:7 -p 6379，数据卷挂 MEMORY/.../data/redis"],
          ["3. MySQL", "mysql:8.0 -p 3307，用户 apix / 密码 apixapix，导入 README/script/init_mysql.sql"],
          ["4. 可选 RAG", "Milvus standalone + ollama pull 嵌入模型"],
          ["5. 四个 Python 服务", "各目录 uv sync && uv run main.py"],
          ["6. 客户端", "CLIENT/apix-app：volta node@22.19.0 → npm install → npm run dev"],
        ]}
        striped
      />
      <H3>日常开发启动顺序</H3>
      <Table
        headers={["顺序", "命令目录", "端口"]}
        rows={[
          ["1", "TASK/task_flow_module", "5090"],
          ["2", "AGENT/agent_module", "5091"],
          ["3", "MEMORY/memory_module", "5093"],
          ["4", "FILE/file_service", "5094"],
          ["5", "CLIENT/apix-app → npm run dev", "Electron"],
        ]}
      />
      <Callout tone="info" title="健康检查">
        各服务提供 GET /health。Agent 需 Docker 可用才能执行代码/命令类工具。
      </Callout>
    </Stack>
  );
}

function Highlights() {
  return (
    <Stack gap={16}>
      <H2>亮点</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>多智能体运行时</CardHeader>
          <CardBody>
            <Text>Main/Sub 权限分离、子 Agent 并行 worker、任务冲突相关工具设计</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>事件驱动流式协议</CardHeader>
          <CardBody>
            <Text>ApixEventEnvelope + 阻塞事件 resolve_block，支持人机协同中断</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Docker 代码沙箱</CardHeader>
          <CardBody>
            <Text>按 client_id+workspace 哈希隔离容器，TTL 回收</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>工具生态完整</CardHeader>
          <CardBody>
            <Text>文件/命令/多搜索源/RAG/MCP/Skills/OCR/任务流统一权限门控</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>消息节点树</CardHeader>
          <CardBody>
            <Text>可编辑删除历史消息并分支，非线性对话管理</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>桌面体验一体化</CardHeader>
          <CardBody>
            <Text>角色卡、Provider、MCP、RAG、Skill、文件树与迷你聊天同屏</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>工程文档友好</CardHeader>
          <CardBody>
            <Text>CLAUDE.md + 一键 setup，降低二次开发门槛</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>多模型即插即用</CardHeader>
          <CardBody>
            <Text>内置多家 BASE_URL，支持 custom-{"{type}-{id}"} 动态注入</Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function Risks() {
  return (
    <Stack gap={16}>
      <H2>风险与改进建议</H2>
      <Table
        headers={["优先级", "问题", "建议"]}
        rows={[
          [
            "高",
            "无自动化测试（全仓 0 测试文件）",
            "先补 Agent 图节点单测 + Memory API 集成测 + Client 关键 IPC 冒烟",
          ],
          [
            "高",
            "硬编码密钥：AES_KEY/IV、MySQL 密码 apixapix、Milvus root:Milvus",
            "环境变量/密钥管理；生产禁用示例密钥；文档明确仅限本地",
          ],
          [
            "高",
            "服务 0.0.0.0 暴露且无统一鉴权",
            "本机默认 127.0.0.1；加 API Token / 网关；WS 连接校验 client 会话",
          ],
          [
            "中",
            "端口与 URL 多处硬编码，改动易漏",
            "抽取共享 .env / settings 模块，Client 与 Python 同源配置",
          ],
          [
            "中",
            "密码哈希为裸 SHA256（无 salt/迭代）",
            "改用 argon2/bcrypt；固定 AES 密钥改为协商或应用密钥库",
          ],
          [
            "中",
            "遗留文件：mcp_tool copy 2.py、TASK config 指向作者本机路径",
            "清理死代码；config 改为相对路径或环境变量",
          ],
          [
            "中",
            "DEBUG/TRACE 默认 True；根 README 编码在部分终端乱码",
            "按环境切换日志级别；统一 UTF-8 文档与 .gitattributes",
          ],
          [
            "中",
            "线性任务流代码曾标注损毁风险；图任务流未完成",
            "锁定 TASK 契约与回归用例后再推进图编辑器",
          ],
          [
            "低",
            "Python 版本分裂（Agent 3.11+ / 其他 3.12+）",
            "统一 requires-python 与 CI matrix",
          ],
          [
            "低",
            "拼写债务（Runingtime、opration、sab_agent、CONTIANER_TTL）",
            "渐进重命名并保留兼容别名",
          ],
        ]}
        rowTone={[
          "danger",
          "danger",
          "danger",
          "warning",
          "warning",
          "warning",
          "warning",
          "warning",
          "info",
          "info",
        ]}
        striped
      />
      <H3>建议演进路径</H3>
      <Table
        headers={["阶段", "动作"]}
        rows={[
          ["P0", "密钥外置 + 绑定本机 + 最小鉴权；补 /health 与登录冒烟测试"],
          ["P1", "共享配置层；清理遗留文件；修复任务流回归"],
          ["P2", "Agent 核心路径单测 + Docker Compose 一键编排"],
          ["P3", "图任务流 / 时间旅行 / 插件市场按 README 路线图推进"],
        ]}
      />
    </Stack>
  );
}
