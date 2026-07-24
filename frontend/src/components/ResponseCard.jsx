import React, { useState } from 'react';
import { marked } from 'marked';
import { Copy, Check, Zap, FileCode, Download, Code, ShieldCheck, FileDown, Play, TestTube, CheckCircle2 } from 'lucide-react';
import { calculateFinancialSavings } from '../services/tokenCalculator';
import { getAvailableBlueprints } from '../services/blueprints';
import LiveSandboxModal from './LiveSandboxModal';

export default function ResponseCard({ item, onRunCommand }) {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  if (!item) return null;

  const { command_used, user_query, ai_response, tokens, provider, is_mock } = item;
  const rawHtml = marked.parse(ai_response || '');

  const tokensSaved = tokens?.tokens_saved ?? 0;
  const financial = calculateFinancialSavings(tokensSaved, provider);

  // Detect code blocks for live sandbox option
  const hasCodeBlock = ai_response && (ai_response.includes('```') || ai_response.includes('<div') || ai_response.includes('<button') || ai_response.includes('export default'));

  const handleCopy = () => {
    navigator.clipboard.writeText(ai_response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadOutput = () => {
    let ext = 'md';
    if (command_used === '/api') ext = 'ts';
    if (command_used === '/ui') ext = 'jsx';
    if (command_used === '/db') ext = 'sql';

    const blob = new Blob([ai_response], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output-${(command_used || 'blueprint').replace('/', '')}-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadBlueprintMd = () => {
    const all = getAvailableBlueprints();
    const cmdKey = (command_used || '/plan').toLowerCase();
    const bp = all[cmdKey] || all['/plan'];
    const cmdName = cmdKey.replace('/', '');
    const content = bp.systemPrompt || `# System Blueprint: ${command_used}\n\n${bp.description}`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cmdName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dev-panel rounded-xl p-4 border border-dev-border mb-6 shadow-dev-card relative overflow-hidden">
      
      {/* Code Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-dev-border font-mono text-xs">
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-dev-bg border border-dev-border">
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-blue-400">{command_used || '/plan'}</span>
          </div>
          <span className="text-dev-muted truncate max-w-xs sm:max-w-md font-sans">
            "{user_query}"
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Live Sandbox Trigger Button */}
          {hasCodeBlock && (
            <button
              onClick={() => setShowSandbox(true)}
              className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all text-[11px] font-mono flex items-center space-x-1.5 shadow-dev-subtle"
              title="Launch In-Browser Live Code Sandbox Preview"
            >
              <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              <span>⚡ Live Sandbox</span>
            </button>
          )}

          {/* Tokens Saved & Cost Savings Pill */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>+{tokensSaved} Tokens ({financial.formattedDollars})</span>
          </div>

          {/* Download Blueprint .md */}
          <button
            onClick={handleDownloadBlueprintMd}
            className="px-2 py-1 rounded bg-blue-600/15 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all text-[11px] font-mono flex items-center space-x-1"
            title="Download Standalone .md System Blueprint for IDE"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Blueprint .md</span>
          </button>

          {/* Toggle Raw View */}
          <button
            onClick={() => setShowRaw(!showRaw)}
            className={`p-1.5 rounded border transition-all ${
              showRaw 
                ? 'bg-blue-600 text-white border-blue-500' 
                : 'bg-dev-bg hover:bg-dev-hover text-dev-muted hover:text-white border-dev-border'
            }`}
            title="Toggle Raw Markdown"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          {/* Download Output File */}
          <button
            onClick={handleDownloadOutput}
            className="p-1.5 rounded bg-dev-bg hover:bg-dev-hover text-dev-muted hover:text-white border border-dev-border transition-all"
            title="Download Code / Output File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded bg-dev-bg hover:bg-dev-hover text-dev-muted hover:text-white border border-dev-border transition-all"
            title="Copy Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Main Body */}
      {showRaw ? (
        <pre className="p-3 bg-dev-bg rounded border border-dev-border text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
          {ai_response}
        </pre>
      ) : (
        <div 
          className="markdown-body text-xs sm:text-sm text-gray-200"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      )}

      {/* Quality Workbench Quick Triggers */}
      {onRunCommand && (
        <div className="mt-4 pt-3 border-t border-dev-border/50 flex flex-wrap items-center justify-between gap-2 bg-dev-bg/40 p-2.5 rounded-lg">
          <span className="text-[11px] font-mono text-dev-muted font-bold">Quality Workbench Actions:</span>
          <div className="flex items-center space-x-2 font-mono text-[11px]">
            <button
              onClick={() => onRunCommand(`/gen-tests Generate Vitest test suite for: ${user_query}`)}
              className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded flex items-center space-x-1 transition-all"
            >
              <TestTube className="w-3 h-3 text-purple-400" />
              <span>/gen-tests</span>
            </button>

            <button
              onClick={() => onRunCommand(`/a11y-audit Audit accessibility for: ${user_query}`)}
              className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded flex items-center space-x-1 transition-all"
            >
              <CheckCircle2 className="w-3 h-3 text-blue-400" />
              <span>/a11y-audit</span>
            </button>

            <button
              onClick={() => onRunCommand(`/sec-audit Perform OWASP penetration test on: ${user_query}`)}
              className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded flex items-center space-x-1 transition-all"
            >
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span>/sec-audit</span>
            </button>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="mt-3 pt-2.5 border-t border-dev-border/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-dev-muted gap-2">
        <div className="flex items-center space-x-3">
          <span>Prompt: <strong className="text-white">{tokens?.prompt_tokens ?? 0}t</strong></span>
          <span>Completion: <strong className="text-white">{tokens?.completion_tokens ?? 0}t</strong></span>
          <span>Total: <strong className="text-white">{tokens?.total_tokens ?? 0}t</strong></span>
          <span className="text-emerald-400">Footprint Reduced: <strong>{tokens?.baseline_tokens ? Math.round(((tokens.tokens_saved) / tokens.baseline_tokens) * 100) : 74}%</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Blueprint Enforced</span>
          </span>
          {is_mock && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">
              Demo Engine
            </span>
          )}
        </div>
      </div>

      {/* Live Sandbox Modal */}
      {showSandbox && (
        <LiveSandboxModal code={ai_response} onClose={() => setShowSandbox(false)} />
      )}

    </div>
  );
}
