<a name="readme-top"></a>

> [!NOTE]
> **Independently maintained FOSS fork of [Onyx](https://github.com/onyx-dot-app/onyx).**
>
> This is a streamlined, 100% MIT-licensed fork of Onyx, maintained on its own `main`
> trunk. It is **not** affiliated with, nor automatically synced from, the upstream
> project. Enterprise Edition features are stripped out and disabled in this build.
> The upstream code is kept on the `upstream-mirror` branch for reference and merges.

<h2 align="center">
    <img width="50%" src="https://github.com/onyx-dot-app/onyx/blob/logo/OnyxLogoCropped.jpg?raw=true" />
</h2>

<p align="center">
    <a href="https://docs.onyx.app/" target="_blank">
        <img src="https://img.shields.io/badge/docs-view-blue" alt="Documentation" />
    </a>
    <a href="https://github.com/onyx-dot-app/onyx/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=blue" alt="License" />
    </a>
</p>

# Onyx (FOSS) — The Open Source AI Platform

**Onyx** is the application layer for LLMs — a feature-rich interface that can be easily hosted by anyone.
Onyx enables LLMs through advanced capabilities like RAG, web search, code execution, file creation, deep research and more.

Connect your applications with 50+ indexing-based connectors provided out of the box or via MCP.

![Onyx Chat Silent Demo](https://github.com/onyx-dot-app/onyx/releases/download/v3.0.0/Onyx.gif)

---

## ⭐ Features

- **🔍 Agentic RAG:** Best-in-class search and answer quality based on a hybrid index + AI agents for information retrieval.
- **🔬 Deep Research:** In-depth reports via a multi-step research flow.
- **🤖 Custom Agents:** Build AI agents with unique instructions, knowledge, and actions.
- **🌍 Web Search:** Browse the web for up-to-date information.
  - Supports Serper, Google PSE, Brave, SearXNG, and others.
  - Comes with an in-house web crawler and support for Firecrawl/Exa.
- **📄 Artifacts:** Generate documents, graphics, and other downloadable artifacts.
- **▶️ Actions & MCP:** Let agents interact with external applications, with flexible auth options.
- **💻 Code Execution:** Execute code in a sandbox to analyze data, render graphs, or modify files.
- **🎙️ Voice Mode:** Chat via text-to-speech and speech-to-text.
- **🎨 Image Generation:** Generate images from prompts.

Onyx supports all major LLM providers, both self-hosted (Ollama, LiteLLM, vLLM, etc.) and proprietary (Anthropic, OpenAI, Gemini, etc.).

For background on the underlying project, see the upstream [Onyx docs](https://docs.onyx.app/welcome).

---

## 🚀 Deployment Modes

Onyx supports two deployment options: standard and lite. For general deployment background, the upstream [deployment guides](https://docs.onyx.app/deployment/overview) cover Docker, Kubernetes, and Helm/Terraform.

#### Onyx Lite

The Lite mode is a lightweight Chat UI. It requires fewer resources (under 1GB memory) and runs a less complex stack.
It is great for trying Onyx quickly or for teams interested only in the Chat UI and Agents functionality.

#### Standard Onyx

The complete feature set, recommended for serious users and larger teams. Additional components not included in Lite mode:
- Vector + keyword index for RAG.
- Background containers running job queues and workers that sync knowledge from connectors.
- AI model inference servers for the deep learning models used during indexing and inference.
- Performance optimizations for large-scale use via an in-memory cache (Redis) and blob store (MinIO).

---

## 📚 Licensing

This fork is distributed entirely under the MIT license. It covers the core features for Chat, RAG,
Agents, and Actions. The Enterprise Edition (EE) code paths present in upstream Onyx are removed or
disabled here — there is no paywall, license check, or billing surface in this build.

## 💡 Contributing

Looking to contribute? See the [Contribution Guide](CONTRIBUTING.md) for details.
