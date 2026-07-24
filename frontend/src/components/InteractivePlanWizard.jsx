import React from 'react';
import { marked } from 'marked';
import { CheckCircle2, ChevronRight, Download, Sparkles, Zap } from 'lucide-react';
import { STEPS_CONFIG } from '../services/interactivePlanEngine';

export default function InteractivePlanWizard({ planData, onSelectOption, onDownloadMaster }) {
  if (!planData || !planData.session) return null;

  const { content, session } = planData;
  const currentStep = session.currentStep || 1;
  const stepConfig = STEPS_CONFIG.find(s => s.step === currentStep) || STEPS_CONFIG[0];
  const isFinalStep = currentStep === 7;

  const rawHtml = marked.parse(content || '');

  return (
    <div className="dev-panel rounded-xl p-5 border border-dev-border mb-6 shadow-dev-card relative font-sans">
      
      {/* Step Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-dev-border">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            /plan Architect
          </span>
          <span className="text-xs font-mono text-white font-semibold">
            {stepConfig.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-dev-muted">
            Progress: <strong className="text-blue-400">{currentStep} / 7</strong>
          </span>
          {isFinalStep && (
            <button
              onClick={onDownloadMaster}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium rounded flex items-center space-x-1.5 transition-all shadow-dev-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Blueprint (.md)</span>
            </button>
          )}
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="w-full bg-dev-bg h-1.5 rounded-full mb-5 overflow-hidden border border-dev-border">
        <div 
          className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${(currentStep / 7) * 100}%` }}
        ></div>
      </div>

      {/* Main Step Content */}
      <div 
        className="markdown-body text-xs sm:text-sm text-gray-200 mb-5"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />

      {/* Interactive MCQ Options Selector (For Steps 1 through 6) */}
      {!isFinalStep && stepConfig.options && (
        <div className="mt-4 pt-4 border-t border-dev-border">
          <h4 className="text-xs font-mono font-bold text-blue-400 mb-2.5 flex items-center space-x-1.5 uppercase">
            <Zap className="w-3.5 h-3.5 fill-blue-400" />
            <span>{stepConfig.mcqQuestion}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {stepConfig.options.map(opt => (
              <button
                key={opt.key}
                onClick={() => onSelectOption(opt.key)}
                className="p-3 rounded bg-dev-bg hover:bg-blue-600/15 border border-dev-border hover:border-blue-500/50 text-left transition-all group flex items-start space-x-2.5"
              >
                <span className="w-5 h-5 rounded bg-dev-surface border border-dev-border font-mono font-bold text-xs text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white">
                  {opt.key}
                </span>
                <span className="text-xs text-dev-text group-hover:text-white font-sans line-clamp-2 leading-tight">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          <p className="text-[11px] font-mono text-dev-muted mt-3">
            Click an option above or type <code className="text-blue-400">A</code>, <code className="text-blue-400">B</code>, <code className="text-blue-400">C</code>, or <code className="text-blue-400">D</code> in the command prompt to advance.
          </p>
        </div>
      )}

    </div>
  );
}
