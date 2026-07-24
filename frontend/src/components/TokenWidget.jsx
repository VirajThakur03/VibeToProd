import React from 'react';
import { Zap, Activity, Cpu, ShieldCheck } from 'lucide-react';

export default function TokenWidget({ analytics }) {
  const tokensSaved = analytics?.total_tokens_saved ?? 0;
  const efficiency = analytics?.efficiency_percentage ?? 0.0;
  const totalRequests = analytics?.total_requests ?? 0;
  const avgTokens = Math.round(analytics?.avg_tokens_per_request ?? 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      
      {/* 1. Tokens Saved */}
      <div className="dev-panel p-3.5 rounded-lg border border-dev-border relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono font-medium text-dev-muted uppercase tracking-wider">Tokens Saved</span>
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold font-mono text-white tracking-tight">+{tokensSaved.toLocaleString()}</span>
          <span className="text-[10px] font-mono font-semibold text-emerald-400">⚡ Saved</span>
        </div>
        <p className="text-[10px] text-dev-muted font-mono mt-1">Vs standard conversational AI</p>
      </div>

      {/* 2. Token Reduction Efficiency */}
      <div className="dev-panel p-3.5 rounded-lg border border-dev-border relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono font-medium text-dev-muted uppercase tracking-wider">Efficiency Compression</span>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold font-mono text-white tracking-tight">{efficiency}%</span>
          <span className="text-[10px] font-mono text-blue-400">Reduced</span>
        </div>
        <div className="w-full bg-dev-bg h-1 rounded mt-2 overflow-hidden border border-dev-border/50">
          <div 
            className="bg-blue-500 h-full transition-all duration-500" 
            style={{ width: `${Math.min(100, Math.max(8, efficiency))}%` }}
          ></div>
        </div>
      </div>

      {/* 3. Commands Executed */}
      <div className="dev-panel p-3.5 rounded-lg border border-dev-border relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono font-medium text-dev-muted uppercase tracking-wider">Executions</span>
          <Cpu className="w-3.5 h-3.5 text-dev-muted" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold font-mono text-white tracking-tight">{totalRequests}</span>
          <span className="text-[10px] font-mono text-dev-muted">queries</span>
        </div>
        <p className="text-[10px] text-dev-muted font-mono mt-1">Wrapped system blueprints</p>
      </div>

      {/* 4. Avg Tokens / Query */}
      <div className="dev-panel p-3.5 rounded-lg border border-dev-border relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono font-medium text-dev-muted uppercase tracking-wider">Avg Tokens / Query</span>
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold font-mono text-white tracking-tight">{avgTokens}</span>
          <span className="text-[10px] font-mono text-emerald-400">tokens</span>
        </div>
        <p className="text-[10px] text-dev-muted font-mono mt-1">Target cap: ~350-400 tokens</p>
      </div>

    </div>
  );
}
