import React, { useState } from 'react';
import { Download, Terminal, Code, Cpu, ShieldCheck, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';
import { getAvailableBlueprints } from '../services/blueprints';

export default function IdeIntegrationModal({ onClose, selectedCommand = '/sec-audit' }) {
  const [activeCmd, setActiveCmd] = useState(selectedCommand);
  const [copiedPath, setCopiedPath] = useState(false);
  const [activeIdeTab, setActiveIdeTab] = useState('antigravity'); // 'antigravity' | 'vscode' | 'cursor'

  const allBlueprints = getAvailableBlueprints();
  const bpList = Object.values(allBlueprints);

  const currentBp = allBlueprints[activeCmd.toLowerCase()] || allBlueprints['/sec-audit'] || bpList[0];
  const cmdName = (currentBp.name || activeCmd).replace('/', '');

  const handleDownloadMd = () => {
    const content = currentBp.systemPrompt || `# System Blueprint: ${activeCmd}\n\n${currentBp.description}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cmdName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySkillPath = (pathText) => {
    navigator.clipboard.writeText(pathText);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-2xl w-full p-6 shadow-dev-popup relative font-sans max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-dev-border">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Download className="w-4 h-4 text-blue-400" />
              <span>100% Free IDE & Antigravity Integration (Download Any `.md` Blueprint)</span>
            </h3>
            <p className="text-xs text-dev-muted font-sans mt-0.5">
              Select any slash command from the repository to download its standalone `.md` blueprint file.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-dev-muted hover:text-white font-mono text-xs"
          >
            [Esc]
          </button>
        </div>

        {/* Blueprint Selector Dropdown */}
        <div className="mb-4">
          <label className="block text-xs font-mono text-dev-muted mb-1.5">
            Select Slash Command Blueprint ({bpList.length} Available):
          </label>
          <select
            value={activeCmd.toLowerCase()}
            onChange={(e) => setActiveCmd(e.target.value)}
            className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500"
          >
            {bpList.map((bpItem, idx) => (
              <option key={bpItem.name || idx} value={(bpItem.name || '').toLowerCase()}>
                {bpItem.name} — {bpItem.description} ({bpItem.category || 'General'})
              </option>
            ))}
          </select>
        </div>

        {/* 1-Click Download Hero Banner */}
        <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/30 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 block uppercase">Selected Blueprint: {cmdName}.md</span>
            <p className="text-xs text-dev-text font-sans mt-0.5">
              {currentBp.description}
            </p>
          </div>
          <button
            onClick={handleDownloadMd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-medium rounded flex items-center space-x-2 transition-all shadow-dev-subtle"
          >
            <Download className="w-4 h-4" />
            <span>Download {cmdName}.md File</span>
          </button>
        </div>

        {/* IDE Selector Tabs */}
        <div className="flex bg-dev-bg p-1 rounded border border-dev-border font-mono text-xs mb-4">
          <button
            onClick={() => setActiveIdeTab('antigravity')}
            className={`flex-1 py-1.5 rounded transition-all text-center ${
              activeIdeTab === 'antigravity'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-dev-text'
            }`}
          >
            Antigravity IDE
          </button>
          <button
            onClick={() => setActiveIdeTab('vscode')}
            className={`flex-1 py-1.5 rounded transition-all text-center ${
              activeIdeTab === 'vscode'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-dev-text'
            }`}
          >
            VS Code / GitHub Copilot
          </button>
          <button
            onClick={() => setActiveIdeTab('cursor')}
            className={`flex-1 py-1.5 rounded transition-all text-center ${
              activeIdeTab === 'cursor'
                ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                : 'text-dev-muted hover:text-dev-text'
            }`}
          >
            Cursor / Windsurf
          </button>
        </div>

        {/* Instructions Body */}
        {activeIdeTab === 'antigravity' && (
          <div className="space-y-3 text-xs font-sans text-dev-text bg-dev-bg p-4 rounded-lg border border-dev-border">
            <h4 className="font-mono font-bold text-white text-xs flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Antigravity Agent Custom Skill Setup:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-dev-muted font-sans">
              <li>Click <strong>Download {cmdName}.md File</strong> above.</li>
              <li>Create directory: <code className="text-emerald-400 font-mono">.agents/skills/{cmdName}/</code> in your workspace root.</li>
              <li>Save the file as <code className="text-emerald-400 font-mono">.agents/skills/{cmdName}/SKILL.md</code>.</li>
              <li>Type <code className="text-blue-400 font-mono">/{cmdName}</code> in Antigravity chat to execute zero-fluff blueprint!</li>
            </ol>
            <div className="pt-2 flex justify-between items-center border-t border-dev-border">
              <span className="font-mono text-[11px] text-dev-muted">Target Path: .agents/skills/{cmdName}/SKILL.md</span>
              <button
                onClick={() => handleCopySkillPath(`.agents/skills/${cmdName}/SKILL.md`)}
                className="px-2.5 py-1 bg-dev-surface hover:bg-dev-hover text-dev-muted hover:text-white rounded border border-dev-border font-mono text-[11px] flex items-center space-x-1"
              >
                {copiedPath ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Path</span>
              </button>
            </div>
          </div>
        )}

        {activeIdeTab === 'vscode' && (
          <div className="space-y-3 text-xs font-sans text-dev-text bg-dev-bg p-4 rounded-lg border border-dev-border">
            <h4 className="font-mono font-bold text-white text-xs flex items-center space-x-1.5">
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>VS Code Prompts & GitHub Copilot Setup:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-dev-muted font-sans">
              <li>Click <strong>Download {cmdName}.md File</strong> above.</li>
              <li>Save file in workspace directory: <code className="text-blue-400 font-mono">.vscode/prompts/{cmdName}.prompt.md</code>.</li>
              <li>Open VS Code Command Palette (<code className="text-white font-mono">Ctrl+Shift+P</code> / <code className="text-white font-mono">Cmd+Shift+P</code>).</li>
              <li>Type <code className="text-emerald-400 font-mono">/{cmdName}</code> in GitHub Copilot or Chat view!</li>
            </ol>
          </div>
        )}

        {activeIdeTab === 'cursor' && (
          <div className="space-y-3 text-xs font-sans text-dev-text bg-dev-bg p-4 rounded-lg border border-dev-border">
            <h4 className="font-mono font-bold text-white text-xs flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Cursor Rules & Windsurf Integration:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-dev-muted font-sans">
              <li>Click <strong>Download {cmdName}.md File</strong> above.</li>
              <li>Save content into <code className="text-purple-400 font-mono">.cursor/rules/{cmdName}.mdc</code>.</li>
              <li>Cursor / Windsurf AI will automatically enforce this low-token System Blueprint rule!</li>
            </ol>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-dev-border flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Free & Open System Blueprints</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
