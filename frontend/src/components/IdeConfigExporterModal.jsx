import React, { useState } from 'react';
import { Download, Copy, Check, Terminal, Code, Cpu, Layers, ShieldCheck, X, FileCode } from 'lucide-react';

export default function IdeConfigExporterModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('antigravity'); // 'antigravity' | 'vscode' | 'cursor' | 'mcp'
  const [copiedKey, setCopiedKey] = useState('');

  const configs = {
    antigravity: {
      filename: 'skills.json',
      filepath: '.agents/skills.json',
      content: JSON.stringify(
        {
          version: '1.0',
          skills: [
            {
              name: 'professional',
              path: '.agents/skills/professional/SKILL.md',
              description: 'Vibe-code to Senior Principal Enterprise architecture refactor'
            },
            {
              name: 'sec-audit',
              path: '.agents/skills/sec-audit/SKILL.md',
              description: '50+ YOE OWASP penetration testing & security vulnerability audit'
            },
            {
              name: 'fullstack',
              path: '.agents/skills/fullstack/SKILL.md',
              description: 'Full-stack production SaaS spec generator'
            },
            {
              name: 'gen-tests',
              path: '.agents/skills/gen-tests/SKILL.md',
              description: 'Automated Vitest/Jest unit test generator'
            }
          ]
        },
        null,
        2
      )
    },
    vscode: {
      filename: 'settings.json',
      filepath: '.vscode/settings.json',
      content: JSON.stringify(
        {
          'github.copilot.chat.welcomeMessage': 'AI_SLICE Prompt Interceptor Enabled',
          'editor.formatOnSave': true,
          'typescript.tsc.autoDetect': 'off',
          'copilot.promptInstructions': {
            'systemPrompt': 'Enforce zero conversational fluff. Output clean production code with zero prompt chatter.'
          }
        },
        null,
        2
      )
    },
    cursor: {
      filename: '.cursorrules',
      filepath: '.cursorrules',
      content: `# AI_SLICE Enterprise Rule Blueprint
# Standardized prompt instructions for Cursor / Windsurf

[CORE DIRECTIVES]
1. ZERO CONVERSATIONAL FLUFF: Never explain basic syntax, never offer unnecessary pleasantries.
2. PRODUCTION READY: Write clean, modular, scalable code with complete TypeScript types and error handling.
3. SECURITY FIRST: Apply OWASP Top 10 prevention standards on all API routes and data structures.
4. HIGH EFFICIENCY: Minimize token footprint by intercepting repetitive boilerplate chatter.

[SLASH COMMANDS ACTIVE]
- /professional: Convert vibe-coded prototypes into senior production architecture.
- /sec-audit: Run 50+ YOE security exploit & vulnerability audit.
- /fullstack: Generate end-to-end multi-layer SaaS architecture.
- /gen-tests: Create automated unit and integration tests.
- /a11y-audit: Execute WCAG 2.1 AAA accessibility audit.
`
    },
    mcp: {
      filename: 'mcp.json',
      filepath: '.mcp/mcp.json',
      content: JSON.stringify(
        {
          mcpServers: {
            'ai-slice-server': {
              command: 'node',
              args: ['./mcp-server.js'],
              env: {
                GROQ_API_KEY: 'gsk_your_groq_key_here'
              }
            }
          }
        },
        null,
        2
      )
    }
  };

  const currentConfig = configs[activeTab];

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleDownload = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-3xl w-full p-6 shadow-dev-popup relative font-sans max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-dev-border">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Universal IDE Config Exporter Tool (`/ide-config`)</span>
            </h3>
            <p className="text-xs text-dev-muted font-sans mt-0.5">
              Export pre-configured rule files and skill blueprints for your local development setup.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-dev-muted hover:text-white font-mono text-xs rounded hover:bg-dev-hover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-dev-bg p-1.5 rounded-lg border border-dev-border font-mono text-xs mb-5">
          <button
            onClick={() => setActiveTab('antigravity')}
            className={`py-2 px-3 rounded flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'antigravity'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-white hover:bg-dev-surface'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Antigravity</span>
          </button>

          <button
            onClick={() => setActiveTab('vscode')}
            className={`py-2 px-3 rounded flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'vscode'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-white hover:bg-dev-surface'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>VS Code</span>
          </button>

          <button
            onClick={() => setActiveTab('cursor')}
            className={`py-2 px-3 rounded flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'cursor'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-white hover:bg-dev-surface'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Cursor</span>
          </button>

          <button
            onClick={() => setActiveTab('mcp')}
            className={`py-2 px-3 rounded flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'mcp'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-white hover:bg-dev-surface'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>MCP Config</span>
          </button>
        </div>

        {/* File Config Card */}
        <div className="bg-dev-bg border border-dev-border rounded-lg p-4 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-dev-border">
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-bold">
                {currentConfig.filename}
              </span>
              <span className="text-dev-muted">Path: <code className="text-emerald-400">{currentConfig.filepath}</code></span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={() => handleCopy(activeTab, currentConfig.content)}
                className="px-2.5 py-1 bg-dev-surface hover:bg-dev-hover text-dev-muted hover:text-white rounded border border-dev-border flex items-center space-x-1 transition-all"
              >
                {copiedKey === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>

              <button
                onClick={() => handleDownload(currentConfig.filename, currentConfig.content)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded flex items-center space-x-1 transition-all shadow-dev-subtle"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre className="p-3 bg-black/60 rounded border border-dev-border text-xs font-mono text-emerald-300 overflow-x-auto max-h-64 whitespace-pre-wrap">
            {currentConfig.content}
          </pre>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-dev-border flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-400 flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Ready for instant local IDE copy-paste</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-dev-bg hover:bg-dev-hover border border-dev-border text-white rounded font-medium transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
