import React from 'react';
import { Command, X, Terminal, CornerDownLeft } from 'lucide-react';

export default function ShortcutsModal({ onClose }) {
  const shortcuts = [
    { key: '/', desc: 'Focus Slash Command Input bar' },
    { key: '↑ / ↓', desc: 'Navigate Autocomplete Blueprint Menu' },
    { key: 'Enter / Tab', desc: 'Select Highlighted Blueprint' },
    { key: 'Enter', desc: 'Execute Prompt wrapped in System Blueprint' },
    { key: 'Esc', desc: 'Close open dropdown popup or modal overlay' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-md w-full p-5 shadow-dev-popup relative font-sans">
        
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-dev-border">
          <h3 className="text-xs font-mono font-bold text-white flex items-center space-x-2 uppercase">
            <Command className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Keyboard Shortcuts</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-dev-muted hover:text-white font-mono text-sm"
          >
            [Esc]
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {shortcuts.map((sc, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded bg-dev-bg border border-dev-border text-xs">
              <span className="text-dev-muted font-sans">{sc.desc}</span>
              <kbd className="px-2 py-0.5 bg-dev-card border border-dev-border rounded text-[11px] font-mono text-blue-400 font-semibold shadow-dev-subtle">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-dev-card hover:bg-dev-hover text-white rounded border border-dev-border text-xs font-mono"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
