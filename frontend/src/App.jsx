import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import TokenWidget from './components/TokenWidget';
import CommandInput from './components/CommandInput';
import ResponseCard from './components/ResponseCard';
import HistorySidebar from './components/HistorySidebar';
import DocumentHub from './components/DocumentHub';
import DocumentModal from './components/DocumentModal';
import ShortcutsModal from './components/ShortcutsModal';
import CustomBlueprintModal from './components/CustomBlueprintModal';
import InteractivePlanWizard from './components/InteractivePlanWizard';
import RoiCalculatorModal from './components/RoiCalculatorModal';
import DiffComparisonModal from './components/DiffComparisonModal';
import IdeIntegrationModal from './components/IdeIntegrationModal';
import IdeConfigExporterModal from './components/IdeConfigExporterModal';
import SiteNavigatorAssistant from './components/SiteNavigatorAssistant';

import { fetchCommands, executeSlashCommand, fetchAnalytics, fetchHistory } from './services/api';
import { Terminal, FolderCheck, Cpu, AlertCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('commands'); // 'commands' | 'documents'
  const [commands, setCommands] = useState([]);
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [analytics, setAnalytics] = useState({
    total_requests: 0,
    total_tokens_used: 0,
    total_tokens_saved: 0,
    avg_tokens_per_request: 0,
    efficiency_percentage: 0.0
  });
  const [currentResponse, setCurrentResponse] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Modals & Assistant
  const [inspectDoc, setInspectDoc] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showCustomBlueprint, setShowCustomBlueprint] = useState(false);
  const [showRoiCalculator, setShowRoiCalculator] = useState(false);
  const [showDiffComparison, setShowDiffComparison] = useState(false);
  const [ideModalCommand, setIdeModalCommand] = useState(null);
  const [showIdeConfigExporter, setShowIdeConfigExporter] = useState(false);
  const [showNavigatorAssistant, setShowNavigatorAssistant] = useState(false);

  const commandSectionRef = useRef(null);

  const loadCommandsList = async () => {
    const cmds = await fetchCommands();
    setCommands(cmds);
  };

  useEffect(() => {
    async function loadInitialData() {
      await loadCommandsList();
      const stats = await fetchAnalytics();
      setAnalytics(stats);
      const logs = await fetchHistory();
      setHistoryItems(logs);
    }
    loadInitialData();
  }, []);

  // Keyboard shortcut handler for ? or Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleExecute = async (rawInput) => {
    if (rawInput && rawInput.trim().toLowerCase().startsWith('/ide-config')) {
      setShowIdeConfigExporter(true);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const result = await executeSlashCommand(rawInput, provider, apiKey);
      setCurrentResponse(result);

      const stats = await fetchAnalytics();
      setAnalytics(stats);

      const logs = await fetchHistory();
      if (logs && logs.length > 0) {
        setHistoryItems(logs);
      } else {
        setHistoryItems(prev => [result, ...prev]);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to execute slash command");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDocForCommand = (promptText) => {
    setActiveTab('commands');
    handleExecute(promptText);
  };

  const handleDownloadMasterBlueprint = () => {
    if (!currentResponse || !currentResponse.ai_response) return;
    const blob = new Blob([currentResponse.ai_response], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Master-Blueprint-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-dev-bg text-dev-text flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navbar Header */}
      <Navbar
        provider={provider}
        setProvider={setProvider}
        apiKey={apiKey}
        setApiKey={setApiKey}
        analytics={analytics}
        onOpenShortcuts={() => setShowShortcuts(true)}
        onOpenCustomBlueprint={() => setShowCustomBlueprint(true)}
        onOpenRoiCalculator={() => setShowRoiCalculator(true)}
        onOpenDiffComparison={() => setShowDiffComparison(true)}
        onOpenIdeIntegration={(cmd) => setIdeModalCommand(cmd || '/sec-audit')}
        onOpenIdeConfigExporter={() => setShowIdeConfigExporter(true)}
        onToggleNavigator={() => setShowNavigatorAssistant(prev => !prev)}
      />

      {/* Main Developer Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        
        {/* Workspace Title & Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-dev-border">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                PROMPT_WRAPPER // INTERACTIVE ARCHITECT
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Interactive /plan Active
              </span>
            </div>
            <p className="text-xs text-dev-muted font-sans mt-1">
              Zero conversational fluff. Wrap prompts in low-token System Blueprints or run 7-Step Interactive Discovery on any website prompt.
            </p>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex bg-dev-surface p-1 rounded border border-dev-border font-mono text-xs shadow-dev-subtle">
            <button
              onClick={() => setActiveTab('commands')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all ${
                activeTab === 'commands'
                  ? 'bg-dev-card text-white font-medium border border-dev-border shadow-dev-subtle'
                  : 'text-dev-muted hover:text-dev-text'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Slash Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all ${
                activeTab === 'documents'
                  ? 'bg-dev-card text-white font-medium border border-dev-border shadow-dev-subtle'
                  : 'text-dev-muted hover:text-dev-text'
              }`}
            >
              <FolderCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Document Index</span>
            </button>
          </div>
        </div>

        {/* Real-time Token Telemetry Panel */}
        <TokenWidget analytics={analytics} />

        {/* TAB 1: Slash Command Engine */}
        {activeTab === 'commands' && (
          <div ref={commandSectionRef}>
            
            {/* Command Bar Input */}
            <div className="mb-6">
              <CommandInput
                availableCommands={commands}
                onSubmit={handleExecute}
                isLoading={isLoading}
              />
            </div>

            {/* Error Notification */}
            {errorMsg && (
              <div className="max-w-4xl mx-auto w-full p-3 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center space-x-2 mb-6">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Active Output Viewer (Supports Interactive Plan Wizard OR Standard ResponseCard) */}
            <div className="max-w-4xl mx-auto w-full">
              {currentResponse ? (
                currentResponse.is_plan_interactive ? (
                  <InteractivePlanWizard
                    planData={currentResponse.planData}
                    onSelectOption={(choiceKey) => handleExecute(choiceKey)}
                    onDownloadMaster={handleDownloadMasterBlueprint}
                  />
                ) : (
                  <ResponseCard item={currentResponse} onRunCommand={handleExecute} />
                )
              ) : (
                <div className="dev-panel rounded-xl p-8 text-center border border-dev-border shadow-dev-card">
                  <div className="w-10 h-10 rounded bg-dev-bg border border-dev-border text-blue-400 flex items-center justify-center mx-auto mb-3 font-mono">
                    /
                  </div>
                  <h3 className="text-sm font-bold font-mono text-white">System Ready for Slash Commands</h3>
                  <p className="text-xs text-dev-muted max-w-md mx-auto mt-1 font-sans mb-3">
                    Type <code className="text-blue-400 font-mono">/plan build coffee business website</code> to launch the 7-Step Interactive Architect Engine!
                  </p>
                  <button
                    onClick={() => setIdeModalCommand('/sec-audit')}
                    className="px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 rounded text-xs font-mono inline-flex items-center space-x-1.5 transition-all"
                  >
                    <span>📥 Download Standalone .md Blueprints for VS Code & Antigravity (Free)</span>
                  </button>
                </div>
              )}
            </div>

            {/* History Logs */}
            {historyItems.length > 0 && (
              <div className="max-w-4xl mx-auto w-full mt-6">
                <HistorySidebar
                  historyItems={historyItems}
                  onSelectHistory={(item) => setCurrentResponse(item)}
                />
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Completed Documents Repository */}
        {activeTab === 'documents' && (
          <div className="max-w-5xl mx-auto w-full">
            <DocumentHub 
              onSelectDocForCommand={handleSelectDocForCommand} 
              onInspectDoc={(doc) => setInspectDoc(doc)}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-dev-border py-4 text-center text-xs font-mono text-dev-muted">
        <p>AI_SLICE Engine • Interactive Website Architect & High-Density System Blueprint Engine</p>
      </footer>

      {/* MODALS & AI ASSISTANT WIDGET */}
      {inspectDoc && (
        <DocumentModal
          doc={inspectDoc}
          onClose={() => setInspectDoc(null)}
          onRunBlueprint={handleSelectDocForCommand}
        />
      )}

      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}

      {showCustomBlueprint && (
        <CustomBlueprintModal
          onClose={() => setShowCustomBlueprint(false)}
          onSaved={loadCommandsList}
        />
      )}

      {showRoiCalculator && (
        <RoiCalculatorModal
          onClose={() => setShowRoiCalculator(false)}
          provider={provider}
        />
      )}

      {showDiffComparison && (
        <DiffComparisonModal
          onClose={() => setShowDiffComparison(false)}
        />
      )}

      {ideModalCommand && (
        <IdeIntegrationModal
          selectedCommand={ideModalCommand}
          onClose={() => setIdeModalCommand(null)}
        />
      )}

      {showIdeConfigExporter && (
        <IdeConfigExporterModal
          onClose={() => setShowIdeConfigExporter(false)}
        />
      )}

      {showNavigatorAssistant && (
        <SiteNavigatorAssistant
          onClose={() => setShowNavigatorAssistant(false)}
          onRunCommand={(cmd) => {
            setActiveTab('commands');
            handleExecute(cmd);
          }}
          onSwitchTab={(tab) => setActiveTab(tab)}
          onOpenIdeModal={(cmd) => setIdeModalCommand(cmd || '/sec-audit')}
          onOpenRoiModal={() => setShowRoiCalculator(true)}
        />
      )}

    </div>
  );
}
