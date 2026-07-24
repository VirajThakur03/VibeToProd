import React from 'react';
import { History, Zap, ArrowUpRight } from 'lucide-react';

export default function HistorySidebar({ historyItems, onSelectHistory }) {
  if (!historyItems || historyItems.length === 0) return null;

  return (
    <div className="dev-panel rounded-xl p-4 border border-dev-border mb-6">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-dev-border">
        <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider flex items-center space-x-1.5">
          <History className="w-3.5 h-3.5 text-blue-400" />
          <span>Execution Telemetry History</span>
        </h3>
        <span className="text-[10px] font-mono text-dev-muted">{historyItems.length} records logged</span>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {historyItems.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => onSelectHistory(item)}
            className="p-2 rounded bg-dev-bg hover:bg-dev-hover border border-dev-border cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {item.command_used}
              </span>
              <span className="text-xs text-dev-text truncate font-mono group-hover:text-white">
                {item.user_query}
              </span>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-0.5">
                <Zap className="w-3 h-3 fill-emerald-400" />
                <span>+{item.estimated_tokens_saved ?? item.tokens?.tokens_saved ?? 0}</span>
              </span>
              <ArrowUpRight className="w-3 h-3 text-dev-muted group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
