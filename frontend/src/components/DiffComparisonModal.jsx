import React from 'react';
import { Zap, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function DiffComparisonModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-4xl w-full p-6 shadow-dev-popup relative font-sans max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-dev-border">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Side-by-Side Comparison: Conversational AI vs System Blueprint</span>
            </h3>
            <p className="text-xs text-dev-muted font-sans mt-0.5">
              Demonstrating over 70% token savings achieved by intercepting prompt chatter.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-dev-muted hover:text-white font-mono text-xs"
          >
            [Esc]
          </button>
        </div>

        {/* Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          
          {/* Left: Standard AI Response */}
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex items-center justify-between mb-2 font-mono text-xs pb-2 border-b border-red-500/20">
              <span className="font-bold text-red-400 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Standard ChatGPT / Claude</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-300 text-[10px]">
                680 Tokens Used
              </span>
            </div>

            <div className="text-xs text-dev-muted space-y-2 font-sans leading-relaxed">
              <p className="italic text-gray-400">
                "Hello there! Sure, I would be delighted to help you fix your Python null dereference error! This error usually happens when a variable is None..."
              </p>
              <pre className="p-2.5 bg-dev-bg rounded text-[11px] font-mono text-gray-300 overflow-x-auto">
{`# Here is the fixed code:
def get_user_email(user):
    if user is not None:
        return user.email
    return None`}
              </pre>
              <p className="italic text-gray-400">
                "I hope this explanation was helpful! Please feel free to ask if you have any more questions about Python programming!"
              </p>
            </div>
          </div>

          {/* Right: AI SLICE Blueprint Response */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2 font-mono text-xs pb-2 border-b border-emerald-500/20">
              <span className="font-bold text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI SLICE Blueprint (/error)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                165 Tokens (75% Saved)
              </span>
            </div>

            <div className="text-xs text-dev-text space-y-2 font-sans leading-relaxed">
              <div>
                <strong className="text-white font-mono text-[11px] block text-blue-400">### Root Cause</strong>
                <p className="text-xs text-gray-300">Unchecked property access on uninitialized state object before async response resolve.</p>
              </div>

              <div>
                <strong className="text-white font-mono text-[11px] block text-blue-400">### Direct Fix</strong>
                <pre className="p-2.5 bg-dev-bg rounded text-[11px] font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20">
{`def get_user_email(user: Optional[User]) -> Optional[str]:
    return user.email if user else None`}
                </pre>
              </div>

              <div>
                <strong className="text-white font-mono text-[11px] block text-blue-400">### Prevention Note</strong>
                <p className="text-xs text-gray-300">• Enforce explicit optional type annotations and nullish guard conditions.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-all"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
