import React, { useState } from 'react';
import { Terminal, Key, Command, Plus, HelpCircle, Check, Zap, Calculator, Split, Download, Bot } from 'lucide-react';
import { calculateFinancialSavings } from '../services/tokenCalculator';

export default function Navbar({ 
  provider, 
  setProvider, 
  apiKey, 
  setApiKey, 
  analytics, 
  onOpenShortcuts, 
  onOpenCustomBlueprint,
  onOpenRoiCalculator,
  onOpenDiffComparison,
  onOpenIdeIntegration,
  onOpenIdeConfigExporter,
  onToggleNavigator
}) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const tokensSaved = analytics?.total_tokens_saved ?? 0;
  const financial = calculateFinancialSavings(tokensSaved, provider);

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowKeyModal(false);
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-dev-border bg-dev-bg/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand & System Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-dev-surface border border-dev-border flex items-center justify-center text-dev-text font-mono font-bold text-xs shadow-dev-subtle">
              /
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-sm text-white tracking-tight">AI_SLICE</span>
              <span className="text-[10px] font-mono text-dev-muted font-medium">v1.6.0</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded bg-dev-surface border border-dev-border text-[11px] font-mono text-dev-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero-Token-Bloat Engine</span>
          </div>

          {/* Real-time Dollars Saved Pill */}
          <button
            onClick={onOpenRoiCalculator}
            className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold transition-all"
            title="Open Interactive ROI Token Calculator"
          >
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>Saved: {financial.formattedDollars} USD</span>
          </button>
        </div>

        {/* Controls, Shortcuts & API Key */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* AI Platform Navigator Button */}
          <button
            onClick={onToggleNavigator}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-purple-500/30 bg-purple-600/15 text-purple-300 hover:text-white hover:bg-purple-600/25 text-xs font-mono flex items-center space-x-1 transition-all"
            title="Open Groq-Powered AI Navigator Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">AI Navigator</span>
          </button>

          {/* Universal IDE Config Exporter */}
          <button
            onClick={onOpenIdeConfigExporter}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-emerald-500/30 bg-emerald-600/15 text-emerald-300 hover:text-white hover:bg-emerald-600/25 text-xs font-mono flex items-center space-x-1 transition-all"
            title="Export Universal IDE Rules & Configs (.agents, .vscode, .cursor rules, mcp.json)"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">IDE Config</span>
          </button>

          {/* Download Free IDE Blueprints Button */}
          <button
            onClick={() => onOpenIdeIntegration('/sec-audit')}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-blue-500/30 bg-blue-600/15 text-blue-300 hover:text-white hover:bg-blue-600/25 text-xs font-mono flex items-center space-x-1 transition-all"
            title="Download Standalone .md System Blueprints for Antigravity & VS Code (Free)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">IDE .md</span>
          </button>

          {/* Compare Blueprint Diff Button */}
          <button
            onClick={onOpenDiffComparison}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-dev-border bg-dev-surface text-dev-muted hover:text-white text-xs font-mono flex items-center space-x-1 transition-all"
            title="Side-by-Side Blueprint vs Conversational AI Diff"
          >
            <Split className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xl:inline">Compare Diff</span>
          </button>

          {/* ROI Calculator Button */}
          <button
            onClick={onOpenRoiCalculator}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:text-white text-xs font-mono flex items-center space-x-1 transition-all"
            title="Calculate Team Token Savings & ROI"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden md:inline">ROI Calc</span>
          </button>

          {/* Shortcuts Button */}
          <button
            onClick={onOpenShortcuts}
            className="p-1.5 sm:px-2 sm:py-1 rounded border border-dev-border bg-dev-surface text-dev-muted hover:text-white text-xs font-mono flex items-center space-x-1 transition-all"
            title="Keyboard Shortcuts Cheatsheet"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Custom Blueprint Button */}
          <button
            onClick={onOpenCustomBlueprint}
            className="p-1.5 sm:px-2 sm:py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:text-white text-xs font-mono flex items-center space-x-1 transition-all"
            title="Create Custom System Blueprint"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {/* Provider Switcher */}
          <div className="flex bg-dev-surface p-0.5 rounded border border-dev-border text-xs font-mono">
            <button
              onClick={() => setProvider('openai')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                provider === 'openai' 
                  ? 'bg-dev-card text-white border border-dev-border shadow-dev-subtle' 
                  : 'text-dev-muted hover:text-dev-text'
              }`}
            >
              gpt-4o-mini
            </button>
            <button
              onClick={() => setProvider('anthropic')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                provider === 'anthropic' 
                  ? 'bg-dev-card text-white border border-dev-border shadow-dev-subtle' 
                  : 'text-dev-muted hover:text-dev-text'
              }`}
            >
              haiku-3.5
            </button>
            <button
              onClick={() => setProvider('groq')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                provider === 'groq' 
                  ? 'bg-purple-600 text-white border border-purple-500 shadow-dev-subtle' 
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              groq-llama3
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all ${
              apiKey 
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' 
                : 'border-dev-border bg-dev-surface text-dev-muted hover:text-white hover:border-dev-muted'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{apiKey ? 'Key Set' : 'API Key'}</span>
          </button>
        </div>

      </div>

      {/* API Key Drawer Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dev-surface border border-dev-border rounded-xl max-w-md w-full p-5 shadow-dev-popup relative font-sans">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono font-bold text-white flex items-center space-x-2 uppercase">
                <Key className="w-3.5 h-3.5 text-blue-400" />
                <span>API Key Configuration ({provider.toUpperCase()})</span>
              </h3>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-dev-muted hover:text-white font-mono text-sm"
              >
                [Esc]
              </button>
            </div>
            
            <p className="text-xs text-dev-muted mb-4 font-sans leading-relaxed">
              API keys are stored exclusively in browser memory. Leaving this blank automatically defaults to high-density zero-token demo mode.
            </p>

            <input
              type="password"
              placeholder={provider === 'openai' ? 'sk-proj-...' : provider === 'anthropic' ? 'sk-ant-api03-...' : 'gsk_...'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-xs font-mono text-white focus:outline-none focus:border-blue-500 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 text-xs font-mono text-dev-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-all flex items-center space-x-1"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
