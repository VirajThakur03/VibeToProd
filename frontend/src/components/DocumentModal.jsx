import React, { useState } from 'react';
import { marked } from 'marked';
import { FileText, Copy, Check, Zap, CheckCircle2, X, ArrowRight } from 'lucide-react';

export default function DocumentModal({ doc, onClose, onRunBlueprint }) {
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const rawHtml = marked.parse(doc.content || doc.description || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(doc.content || doc.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-dev-popup relative overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-dev-border bg-dev-bg flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded bg-dev-card border border-dev-border flex items-center justify-center text-blue-400 font-mono text-xs flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold font-mono text-white truncate">{doc.title}</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {doc.status || 'Completed'}
                </span>
              </div>
              <p className="text-xs text-dev-muted font-mono">{doc.category} Specification</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded bg-dev-card hover:bg-dev-hover text-dev-muted hover:text-white border border-dev-border text-xs font-mono flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Spec'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-dev-card hover:bg-dev-hover text-dev-muted hover:text-white border border-dev-border font-mono text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm leading-relaxed">
          <div className="mb-4 p-3 rounded bg-dev-bg border border-dev-border text-xs text-dev-muted font-sans">
            <strong className="text-white font-mono block mb-1">Scope & Description:</strong>
            {doc.description}
          </div>

          <div 
            className="markdown-body text-gray-200"
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />

          {/* Tags */}
          {doc.tags && (
            <div className="mt-6 pt-4 border-t border-dev-border flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-dev-muted mr-1">Tags:</span>
              {doc.tags.split(',').map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-dev-bg text-dev-muted border border-dev-border">
                  #{t.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-5 py-3 border-t border-dev-border bg-dev-bg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-dev-muted">ID: {doc.id}</span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onRunBlueprint(`/plan Architect execution steps for specification: ${doc.title}`);
              }}
              className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center space-x-1.5 transition-all shadow-dev-subtle"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Run /plan on Specification</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onRunBlueprint(`/api Generate TypeScript data interfaces for: ${doc.title}`);
              }}
              className="px-3 py-1.5 rounded bg-dev-card hover:bg-dev-hover text-emerald-400 border border-dev-border font-medium flex items-center space-x-1.5 transition-all"
            >
              <span>/api Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
