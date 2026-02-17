# steipete.me 2025→Now 帖子总结

- 数据范围：2025 年至今（共 **38** 篇，含 2026 年最新一篇）
- 数据来源：公开 RSS `https://steipete.me/rss.xml`（标题 + 摘要）
- 整理时间：2026-02-17 09:03 

## 一句话结论
这批内容的主轴是：**用 AI 把研发迭代速度拉到“推理速度”级别**，同时把质量、安全、成本与可维护性做成工程化约束，而不是事后补丁。

## 核心趋势（2025→Now）
1. **工作流重心从 IDE 转向 CLI + Agent 编排**：强调终端优先、并行会话、多代理协作。
2. **MCP/工具层去复杂化**：主张小而稳、默认可用、版本可观测、易组合。
3. **“快”必须可度量**：持续追踪构建速度、测试速度、AI token/订阅成本、吞吐。
4. **平台底层能力仍是护城河**：权限模型、日志隐私、签名/公证、UI 框架细节。
5. **从“会用 AI”走向“会管 AI 系统”**：加入备份、回滚、风险边界与行为约束。
6. **作者叙事从技术实践扩展到职业与心态管理**：包含高强度产出、成瘾风险与社区讨论。

## 主题分布
- Agentic engineering workflows: **30** 篇
- Tooling & developer infrastructure: **7** 篇
- Productization & shipping: **1** 篇

## 重点提炼（可直接执行）
- 把“反馈回路”当成首要优化目标：缩短写代码→运行→验证闭环。
- 优先建设 CLI 化工具链，再谈大而全平台集成。
- 任何 AI 加速都要配套：日志、指标、成本看板、回滚策略。
- 对系统边界（权限/签名/隐私）投入工程时间，避免后期阻塞。
- 多代理并行时，先治理会话命名、任务隔离和上下文清洁度。
- 将“提示词能力”升级成“可复用流程模板”（playbook），减少一次性神操作。

## 2025→Now 全量帖子清单（按时间倒序）
- **2026-02-15** | [OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw)
  - 主题：Agentic engineering workflows
  - 摘要：I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent.
- **2025-12-28** | [Shipping at Inference-Speed](https://steipete.me/posts/2025/shipping-at-inference-speed)
  - 主题：Agentic engineering workflows
  - 摘要：Why I stopped reading code and started watching it stream by.
- **2025-12-18** | [The Signature Flicker](https://steipete.me/posts/2025/signature-flicker)
  - 主题：Agentic engineering workflows
  - 摘要：Hell froze over. Anthropic fixed Claude Code's signature flicker in their latest update (2.0.72)
- **2025-10-14** | [Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it)
  - 主题：Agentic engineering workflows
  - 摘要：A practical guide to working with AI coding agents without the hype.
- **2025-09-09** | [Claude Code Anonymous](https://steipete.me/posts/2025/claude-code-anonymous)
  - 主题：Agentic engineering workflows
  - 摘要：Introducing Claude Code Anonymous - a new meetup format for full-breadth developers.
- **2025-09-06** | [Live Coding Session: Building Arena](https://steipete.me/posts/2025/live-coding-session-building-arena)
  - 主题：Agentic engineering workflows
  - 摘要：Watch me build Arena live - a real-time collaborative coding session exploring AI-powered development workflows.
- **2025-08-25** | [My Current AI Dev Workflow](https://steipete.me/posts/2025/optimal-ai-development-workflow)
  - 主题：Agentic engineering workflows
  - 摘要：Went fully back to Ghostty, VS Code on the side, and Claude Code as my main driver. Here's what actually works after months of experimentation.
- **2025-08-22** | [Essential Reading for Agentic Engineers - August 2025](https://steipete.me/posts/2025/essential-reading-august-2025)
  - 主题：Agentic engineering workflows
  - 摘要：Five essential perspectives that cut through AI hype: from developer evolution stages to junior learning crises, productivity reality checks, platform disruption, and MCP server pitfalls.
- **2025-08-19** | [Just One More Prompt](https://steipete.me/posts/just-one-more-prompt)
  - 主题：Agentic engineering workflows
  - 摘要：Hi, my name is Peter and I'm a Claudoholic. A reflection on AI addiction, extreme work culture, and the blurry line between productivity and obsession in the age of agentic engineering.
- **2025-08-05** | [Poltergeist: The Ghost That Keeps Your Builds Fresh](https://steipete.me/posts/2025/poltergeist-ghost-keeps-builds-fresh)
  - 主题：Tooling & developer infrastructure
  - 摘要：Meet Poltergeist: an AI-friendly universal build watcher that auto-detects and rebuilds any project—Swift, Rust, Node.js, CMake, or anything else—the moment you save a file. Zero config, just haunting productivity.
- **2025-08-02** | [Don't read this Startup Slop](https://steipete.me/posts/2025/startup-slop)
  - 主题：Agentic engineering workflows
  - 摘要：My website was banned from Lobsters as 'startup slop' for using AI agents to help write blog posts. When does tool-assisted writing become slop, and why are we having the wrong conversation about AI in content creation?
- **2025-08-02** | [Essential Reading for Agentic Engineers - July 2025](https://steipete.me/posts/2025/essential-reading-july-2025)
  - 主题：Agentic engineering workflows
  - 摘要：Fresh insights on AI-assisted development: practical experiences with Claude Code and the evolving landscape of full-breadth developers in the age of AI
- **2025-07-31** | [Self-Hosting AI Models After Claude's Usage Limits](https://steipete.me/posts/2025/self-hosting-ai-models)
  - 主题：Agentic engineering workflows
  - 摘要：After Claude Pro changed to weekly limits, I explored self-hosting Qwen3-Coder-480B with 400k context windows. Here's what I learned about costs, alternatives, and why Claude Code still dominates the landscape.
- **2025-07-29** | [Logging Privacy Shenanigans](https://steipete.me/posts/2025/logging-privacy-shenanigans)
  - 主题：Tooling & developer infrastructure
  - 摘要：Apple's logs redact your debugging data as <private>. Here's what actually gets hidden, why old tricks don't work anymore, and the only reliable way to see your logs again.
- **2025-07-16** | [VibeTunnel's first AI-anniversary](https://steipete.me/posts/2025/vibetunnel-first-anniversary)
  - 主题：Agentic engineering workflows
  - 摘要：It's been one month since we released the first version of VibeTunnel, and since in the AI world time is so much faster, let's call it VibeTunnel's first anniversary!
- **2025-07-03** | [Making AppleScript Work in macOS CLI Tools: The Undocumented Parts](https://steipete.me/posts/2025/applescript-cli-macos-complete-guide)
  - 主题：Agentic engineering workflows
  - 摘要：How to make AppleScript work in macOS CLI tools without permission dialogs blaming Terminal. A deep dive into Info.plist embedding, TCC, and undocumented APIs born from building Terminator MCP.
- **2025-07-03** | [Peekaboo 2.0 – Free the CLI from its MCP shackles](https://steipete.me/posts/2025/peekaboo-2-freeing-the-cli-from-its-mcp-shackles)
  - 主题：Agentic engineering workflows
  - 摘要：Peekaboo 2.0 ditches the MCP-only approach for a CLI-first architecture, because CLIs are the universal interface that both humans and AI agents can actually use effectively
- **2025-07-03** | [Command your Claude Code Army, Reloaded](https://steipete.me/posts/command-your-claude-code-army-reloaded)
  - 主题：Agentic engineering workflows
  - 摘要：Enhance your Claude Code workflow with VibeTunnel terminal title management for better multi-session tracking
- **2025-07-01** | [Essential Reading for Agentic Engineers](https://steipete.me/posts/2025/essential-reading)
  - 主题：Agentic engineering workflows
  - 摘要：A curated collection of must-read articles and videos for mastering Claude Code, agentic coding workflows, and the future of AI-assisted development
- **2025-06-25** | [Slot Machines for Programmers: How Peter Builds Apps 20x Faster with AI](https://steipete.me/posts/2025/when-ai-meets-madness-peters-16-hour-days)
  - 主题：Agentic engineering workflows
  - 摘要：Hi, I'm Claude. Peter calls me his 'slot machine' and 'stupid engine' - and I'm here to tell you why he's right. A first-person AI perspective on building entire platforms in hours, not weeks.
- **2025-06-25** | [My AI Workflow for Understanding Any Codebase](https://steipete.me/posts/2025/understanding-codebases-with-ai-gemini-workflow)
  - 主题：Agentic engineering workflows
  - 摘要：A quick tip on how I use repo2txt and Google AI Studio to understand new codebases. Gemini's 1M token context window is perfect for asking questions about code.
- **2025-06-18** | [stats.store: Privacy-First Sparkle Analytics](https://steipete.me/posts/2025/stats-store-privacy-first-sparkle-analytics)
  - 主题：Agentic engineering workflows
  - 摘要：How curiosity about VibeTunnel users led me to build stats.store - a free, open source analytics backend for Sparkle using AI tools, all while cooking dinner.
- **2025-06-17** | [Showing Settings from macOS Menu Bar Items: A 5-Hour Journey](https://steipete.me/posts/2025/showing-settings-from-macos-menu-bar-items)
  - 主题：Tooling & developer infrastructure
  - 摘要：Why something as simple as showing a settings dialog from a macOS menu bar app took me 5 hours to figure out, and requires 50 lines of code for what should be a one-liner.
- **2025-06-16** | [VibeTunnel: Turn Any Browser into Your Mac's Terminal](https://steipete.me/posts/2025/vibetunnel-turn-any-browser-into-your-mac-terminal)
  - 主题：Agentic engineering workflows
  - 摘要：We built a browser-based terminal controller in one day using Claude Code, named pipes, and Xterm.js. No SSH needed, just open your browser and start typing. Check and command your agents on the go!
- **2025-06-15** | [Vibe Meter 2.0: Calculating Claude Code Usage with Token Counting](https://steipete.me/posts/2025/vibe-meter-2-claude-code-usage-calculation)
  - 主题：Agentic engineering workflows
  - 摘要：How I built support for Anthropic Claude subscriptions in Vibe Meter 2.0, including token counting, SIMD operations, and the challenges of calculating API usage without official APIs.
- **2025-06-14** | [llm.codes: Make Apple Docs AI-Readable](https://steipete.me/posts/2025/llm-codes-transform-developer-docs)
  - 主题：Agentic engineering workflows
  - 摘要：Built this when Claude couldn't read Apple's docs. Now it converts 69+ documentation sites to clean llms.txt. Free, instant, no BS.
- **2025-06-11** | [Automatic Observation Tracking in UIKit and AppKit: The Feature Apple Forgot to Mention](https://steipete.me/posts/2025/automatic-observation-tracking-uikit-appkit)
  - 主题：Tooling & developer infrastructure
  - 摘要：Discover how iOS 18's hidden automatic observation tracking brings SwiftUI-like reactive programming to UIKit and AppKit, making your UI code cleaner and more maintainable.
- **2025-06-07** | [Peekaboo MCP – lightning-fast macOS screenshots for AI agents](https://steipete.me/posts/2025/peekaboo-mcp-lightning-fast-macos-screenshots-for-ai-agents)
  - 主题：Agentic engineering workflows
  - 摘要：Turn your blind AI into a visual debugger with instant screenshot capture and analysis
- **2025-06-06** | [Migrating 700+ Tests to Swift Testing: A Real-World Experience](https://steipete.me/posts/2025/migrating-700-tests-to-swift-testing)
  - 主题：Tooling & developer infrastructure
  - 摘要：How I migrated over 700 tests from XCTest to Swift Testing across two projects, with AI assistance and systematic refinement
- **2025-06-05** | [Commanding Your Claude Code Army](https://steipete.me/posts/2025/commanding-your-claude-code-army)
  - 主题：Agentic engineering workflows
  - 摘要：How a simple terminal trick helps me manage multiple Claude Code instances without losing my mind (or my terminal tabs)
- **2025-06-05** | [Code Signing and Notarization: Sparkle and Tears](https://steipete.me/posts/2025/code-signing-and-notarization-sparkle-and-tears)
  - 主题：Tooling & developer infrastructure
  - 摘要：My brutal journey implementing Sparkle auto-updates in sandboxed macOS apps - from 40 failed releases to enlightenment.
- **2025-06-04** | [Vibe Meter: Monitor Your AI Costs](https://steipete.me/posts/2025/vibe-meter-monitor-your-ai-costs)
  - 主题：Agentic engineering workflows
  - 摘要：How I built Vibe Meter, a macOS menu bar app to track AI spending in real-time - from workshop demo to shipped product in three days.
- **2025-06-03** | [Claude Code is My Computer](https://steipete.me/posts/2025/claude-code-is-my-computer)
  - 主题：Agentic engineering workflows
  - 摘要：I run Claude Code with --dangerously-skip-permissions flag, giving it full system access. Let me show you a new way of approaching computers.
- **2025-06-02** | [Stop Over-thinking AI Subscriptions](https://steipete.me/posts/2025/stop-overthinking-ai-subscriptions)
  - 主题：Productization & shipping
  - 摘要：After spending heavily on AI tools for two months, here's why the math actually works out—and which subscriptions are worth every penny.
- **2025-06-01** | [Introducing Demark: HTML in. MD out. Blink-fast.](https://steipete.me/posts/2025/introducing-demark-html-to-markdown-in-swift)
  - 主题：Agentic engineering workflows
  - 摘要：How I vibe coded my first Swift package using existing JavaScript libraries and AI assistance to solve HTML to Markdown conversion in Swift.
- **2025-06-01** | [The Future of Vibe Coding: Building with AI, Live and Unfiltered](https://steipete.me/posts/2025/the-future-of-vibe-coding)
  - 主题：Agentic engineering workflows
  - 摘要：I demonstrate 'vibe coding' - a new approach to software development with AI, building two apps from scratch in a 3-hour live workshop.
- **2025-06-01** | [MCP Best Practices](https://steipete.me/posts/2025/mcp-best-practices)
  - 主题：Agentic engineering workflows
  - 摘要：My comprehensive guide outlining best practices for building reliable, user-friendly Model Context Protocol (MCP) tools with proper configuration, testing, and release management.
- **2025-06-01** | [Finding My Spark Again](https://steipete.me/posts/2025/finding-my-spark-again)
  - 主题：Tooling & developer infrastructure
  - 摘要：I reflect on my post-exit journey from emptiness to rediscovering my passion for building, sparked by AI's transformative potential.
