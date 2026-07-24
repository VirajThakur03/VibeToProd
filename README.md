# AI_SLICE // Interactive Website Architect & System Blueprint Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages%20(100%25%20Free)-emerald)](https://pages.github.com/)
[![Node.js](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-purple)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-Python%20FastAPI-blue)](https://fastapi.tiangolo.com/)

**AI_SLICE** is an enterprise-grade AI developer platform designed to eliminate **"AI Token Bloat"**. It replaces conversational AI chatter with high-density system blueprints, 7-step interactive website discovery, in-browser live code execution, and 1-click standalone `.md` blueprint exports for **Antigravity IDE**, **VS Code**, and **Cursor**.

> [!NOTE]
> **100% Free & Open Source.** Can be run locally, deployed for free on GitHub Pages (zero backend required), or connected to a FastAPI backend.

---

## ✨ Features at a Glance

```
+-----------------------------------------------------------------------------------+
|                            AI_SLICE ARCHITECT ECOSYSTEM                           |
+--------------------------+--------------------------+-----------------------------+
| 1. Interactive /plan     | 2. 100+ Slash Commands   | 3. Live Code Sandbox        |
| 7-step website architect | /professional, /sec-audit| In-browser live JSX/HTML    |
+--------------------------+--------------------------+-----------------------------+
| 4. Universal IDE Config  | 5. Free AI Navigator     | 6. Real-Time Telemetry      |
| .agents, .vscode, .cursor| Floating Groq assistant  | Saved $ tracker + >70% compression|
+--------------------------+--------------------------+-----------------------------+
```

### 1. 🏛️ Interactive Website Architect (`/plan`)
- Takes a simple website idea (e.g. `/plan build coffee business website`) and guides you through a 7-step discovery process.
- Asks 4-option multiple choice questions (A, B, C, D) for market positioning, tech stack, database schema, payment gateways, and differentiation.
- Exports a finalized **Master Blueprint Document** in 1 click.

### 2. ⚡ Senior Enterprise Refactor (`/professional`)
- Converts prototype ("vibe-coded") code into **Fortune 500 Enterprise Production-Ready Code**.
- Enforces strict TypeScript typing, $O(N^2) \to O(N)$ complexity reduction, defensive try-catch guards, and JSDoc annotations.

### 3. 🛡️ Security & OWASP Penetration Audit (`/sec-audit`)
- Conducts an OWASP Top 10 threat vector scan (SQLi, XSS, IDOR, CSRF, secrets leaks).
- Calculates CVSS risk ratings and provides drop-in defensive remediation code blocks.

### 4. ⚡ In-Browser Live Code Sandbox
- Detects generated JSX, HTML, and CSS code blocks in AI responses.
- Click **`⚡ Live Sandbox`** to render an interactive preview inside an isolated browser iframe.
- Test responsive viewports: **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)**.

### 5. 📥 Universal IDE Config Exporter (`/ide-config`)
- Export configuration files for your favorite IDE in 1 click:
  - **Antigravity IDE:** `.agents/skills.json` and `.agents/skills/<skill>/SKILL.md`
  - **VS Code:** `.vscode/settings.json` and prompt instructions
  - **Cursor / Windsurf:** `.cursorrules` and system rules
  - **MCP Servers:** `mcp.json` standard schema definitions

---

## 🚀 Beginner Quick-Start Guide (Get Running in 3 Minutes)

You do **NOT** need advanced coding experience to run this project! Follow these step-by-step instructions.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your computer.

---

### Step 1: Clone or Download the Project
Open your command terminal (Command Prompt, PowerShell, or VS Code Terminal) and type:

```bash
git clone https://github.com/YOUR_USERNAME/prompt.git
cd prompt
```

---

### Step 2: Start the Frontend Application

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies (only needed the first time)
npm install

# 3. Run the application
npm run dev
```

That's it! Open your browser and go to `http://localhost:3000` (or `http://localhost:5173`).

---

### Step 3: (Optional) Run the Python Backend Service

If you want to run the optional FastAPI backend with SQLite history database:

```bash
# 1. Open a new terminal in the project root
cd backend

# 2. Install python dependencies
pip install -r requirements.txt

# 3. Initialize the database & start FastAPI
python init_db.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be live at `http://localhost:8000`.

---

## 🔑 How to Get a Free Groq API Key (Fastest AI Inference)

AI_SLICE supports **100% Free High-Speed Groq AI** inference!

1. Go to [Groq Console](https://console.groq.com/keys) and sign up for free.
2. Click **Create API Key** and copy your key (starts with `gsk_...`).
3. Click the **API Key** button in the AI_SLICE top navbar or paste your key into the **AI Navigator** widget.
4. Enjoy lightning-fast Llama 3 70B responses for free!

---

## 🌐 Deploy to GitHub Pages for FREE (Zero Server Required)

This web application runs **100% client-side** in the browser! You can host it on GitHub Pages for free:

```bash
# From the frontend directory:
cd frontend
npm run deploy
```

Your free live website URL will be:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 💡 Top Slash Commands Cheatsheet

| Command | Purpose | Output |
| :--- | :--- | :--- |
| `/plan [idea]` | 7-Step Interactive Website Architect | Interactive discovery loop + Master Blueprint export |
| `/professional [code]` | Transform vibe-code into Senior Enterprise code | SOLID refactored TypeScript/Python code |
| `/sec-audit [code]` | OWASP Top 10 Security Audit | Vulnerability score + drop-in security fix |
| `/ide-config` | Universal IDE Config Exporter | `.agents`, `.vscode`, `.cursorrules`, `mcp.json` |
| `/gen-tests [code]` | Automated Test Suite Generator | Vitest / Jest unit & integration test file |
| `/a11y-audit [ui]` | WCAG 2.1 AAA Accessibility Audit | ARIA attributes & accessible JSX component |
| `/fullstack [app]` | Multi-Tier SaaS Specification | Database, API, UI, Billing, and Docker config |
| `/ui [component]` | High-Density UI Component | Dark mode Tailwind CSS React component |
| `/api [endpoint]` | Precision API Data Contract | OpenAPI 3.0 YAML / TypeScript DTOs |
| `/db [schema]` | Database Architecture & Migrations | 3NF PostgreSQL DDL + Prisma schema |

---

## 🤝 Contributing & Custom Blueprints

Want to add your own custom slash command blueprints?
1. Click the **`+`** button in the top navbar.
2. Enter your command name (e.g. `/my-custom-rule`).
3. Define your low-token System Blueprint and click **Save**.
4. Custom blueprints are automatically saved to your browser `localStorage` and available instantly!

## 🔒 GitHub Security & Privacy Protection

Before pushing your project to GitHub, make sure to read our detailed **[GitHub Security & Privacy Protection Guide](file:///c:/V/prompt/GITHUB_SECURITY_GUIDE.md)** to ensure API keys, `.env` secrets, passwords, and private databases are 100% safe and never leaked.

---

## 📜 License

Distributed under the **MIT License**. Free for personal, commercial, and open-source use.
