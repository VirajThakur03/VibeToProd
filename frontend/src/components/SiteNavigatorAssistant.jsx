import React, { useState } from 'react';
import { Bot, Send, X, Zap, CornerDownLeft, Sparkles, Compass, Download, Calculator, Terminal, ShieldCheck, Bug, Code } from 'lucide-react';

export default function SiteNavigatorAssistant({ 
  onClose, 
  onRunCommand, 
  onSwitchTab, 
  onOpenIdeModal, 
  onOpenRoiModal 
}) {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "👋 Hi! I'm your AI Platform Navigator & Command Assistant. Click a quick action below or ask me anything about slash commands, security audits, code refactoring, or token cost savings!",
      actions: [
        { label: '🚀 /plan Architect', onClick: () => onRunCommand('/plan build SaaS app') },
        { label: '🐛 /error Debugger', onClick: () => onRunCommand('/error TypeError: undefined reading length') },
        { label: '🛡️ /sec-audit Security', onClick: () => onRunCommand('/sec-audit') },
        { label: '🔥 /professional Refactor', onClick: () => onRunCommand('/professional') },
        { label: '📥 Download .md Blueprints', onClick: () => onOpenIdeModal('/sec-audit') },
        { label: '🧮 Team ROI Calculator', onClick: () => onOpenRoiModal() }
      ]
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || isThinking) return;

    const userText = inputQuery.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const reply = generateNavigationAnswer(userText);
      setMessages(prev => [...prev, { sender: 'assistant', text: reply.text, actions: reply.actions }]);
      setIsThinking(false);
    }, 350);
  };

  const generateNavigationAnswer = (q) => {
    const s = q.toLowerCase();

    if (s.includes('plan') || s.includes('website') || s.includes('architect') || s.includes('future') || s.includes('roadmap')) {
      return {
        text: "To design a comprehensive website specification or future roadmap, use `/plan`! It launches a 7-step interactive discovery loop with multiple-choice questions (A, B, C, D) and outputs a download master blueprint.",
        actions: [{ label: 'Execute /plan Engine', onClick: () => onRunCommand('/plan build SaaS platform') }]
      };
    }

    if (s.includes('error') || s.includes('bug') || s.includes('fix') || s.includes('stack') || s.includes('null')) {
      return {
        text: "To debug errors or stack traces, use `/error [your code]` or `/trace-stack`. It pinpoints the exact root cause and outputs drop-in code fixes with zero conversational fluff.",
        actions: [{ label: 'Execute /error Debugger', onClick: () => onRunCommand('/error TypeError: Cannot read property of undefined') }]
      };
    }

    if (s.includes('professional') || s.includes('vibe') || s.includes('clean') || s.includes('refactor') || s.includes('industry')) {
      return {
        text: "Use `/professional` to transform 'vibe-coded' or messy prototype code into Fortune 500 industry-level production code meeting strict SOLID principles!",
        actions: [{ label: 'Execute /professional Refactor', onClick: () => onRunCommand('/professional') }]
      };
    }

    if (s.includes('security') || s.includes('hack') || s.includes('audit') || s.includes('owasp') || s.includes('sec')) {
      return {
        text: "Use `/sec-audit` or `/security-audit` to conduct an OWASP Top 10 security assessment on your web endpoints and receive secure drop-in fixes!",
        actions: [{ label: 'Execute /sec-audit Hardening', onClick: () => onRunCommand('/sec-audit') }]
      };
    }

    if (s.includes('document') || s.includes('repo') || s.includes('search') || s.includes('spec')) {
      return {
        text: "You can search over 100+ pre-built project specifications, architecture documents, and API contracts in the Document Index tab!",
        actions: [{ label: 'Switch to Document Index', onClick: () => onSwitchTab('documents') }]
      };
    }

    if (s.includes('vscode') || s.includes('download') || s.includes('antigravity') || s.includes('cursor') || s.includes('.md')) {
      return {
        text: "You can download standalone `.md` system blueprints for ANY command to use natively in Antigravity IDE, VS Code, or Cursor 100% free!",
        actions: [{ label: 'Open Free IDE .md Downloader', onClick: () => onOpenIdeModal('/sec-audit') }]
      };
    }

    if (s.includes('cost') || s.includes('save') || s.includes('roi') || s.includes('money') || s.includes('dollar')) {
      return {
        text: "Our low-token System Blueprints reduce LLM API token spend by over 70%! Use our interactive ROI Calculator to see your exact yearly team savings.",
        actions: [{ label: 'Open ROI Token Calculator', onClick: () => onOpenRoiModal() }]
      };
    }

    return {
      text: `I've analyzed your prompt ("${q}"). You can type any slash command like /plan, /error, /api, /ui, /db, /sec-audit, or /professional! Click an option below to execute immediately:`,
      actions: [
        { label: '🚀 Run /plan Architect', onClick: () => onRunCommand('/plan') },
        { label: '🔥 Run /professional Refactor', onClick: () => onRunCommand('/professional') },
        { label: '📥 Download IDE .md Files', onClick: () => onOpenIdeModal('/sec-audit') }
      ]
    };
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full font-sans animate-fade-in">
      <div className="bg-dev-surface border border-dev-border rounded-xl shadow-dev-popup overflow-hidden">
        
        {/* Header */}
        <div className="p-3 bg-dev-bg border-b border-dev-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono font-bold text-xs text-white block leading-tight">AI Platform Navigator</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Powered by Groq High-Speed Inference Engine</span>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-dev-muted hover:text-white font-mono text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="p-3 max-h-72 overflow-y-auto space-y-3 bg-dev-surface text-xs font-sans">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-2.5 rounded-lg max-w-[88%] leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'bg-dev-bg border border-dev-border text-dev-text'
              }`}>
                {m.text}
              </div>

              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        act.onClick();
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded text-[11px] font-mono flex items-center space-x-1 transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-1 text-dev-muted font-mono text-xs">
              <Sparkles className="w-3 h-3 text-blue-400 animate-spin" />
              <span>Analyzing platform navigation...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-2 bg-dev-bg border-t border-dev-border flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask how to navigate, find commands, download .md..."
            className="w-full px-2.5 py-1.5 bg-dev-surface border border-dev-border rounded text-xs font-mono text-white placeholder-dev-muted focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
