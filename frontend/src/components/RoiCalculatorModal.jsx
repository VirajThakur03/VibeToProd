import React, { useState } from 'react';
import { Calculator, DollarSign, Zap, Users, Activity, X } from 'lucide-react';
import { calculateFinancialSavings } from '../services/tokenCalculator';

export default function RoiCalculatorModal({ onClose, provider = 'openai' }) {
  const [devCount, setDevCount] = useState(5);
  const [queriesPerDev, setQueriesPerDev] = useState(25);

  const totalQueriesPerDay = devCount * queriesPerDev;
  const avgTokensSavedPerQuery = 450; // Average tokens saved by low-token system blueprint
  const dailyTokensSaved = totalQueriesPerDay * avgTokensSavedPerQuery;
  const yearlyTokensSaved = dailyTokensSaved * 265; // ~265 working days/year

  const dailyFinancial = calculateFinancialSavings(dailyTokensSaved, provider);
  const yearlyFinancial = calculateFinancialSavings(yearlyTokensSaved, provider);

  const yearlyDollars = (dailyFinancial.dollarsSaved * 265).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-lg w-full p-6 shadow-dev-popup relative font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-dev-border">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>LLM Token Cost & ROI Calculator</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-dev-muted hover:text-white font-mono text-xs"
          >
            [Esc]
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-4 mb-6">
          
          {/* Dev Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs font-mono">
              <span className="text-dev-muted flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Engineering Team Size:</span>
              </span>
              <span className="font-bold text-white text-sm">{devCount} Developers</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={devCount}
              onChange={(e) => setDevCount(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500 bg-dev-bg h-2 rounded cursor-pointer"
            />
          </div>

          {/* Queries Per Dev Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs font-mono">
              <span className="text-dev-muted flex items-center space-x-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Queries per Developer / Day:</span>
              </span>
              <span className="font-bold text-white text-sm">{queriesPerDev} Queries</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={queriesPerDev}
              onChange={(e) => setQueriesPerDev(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 bg-dev-bg h-2 rounded cursor-pointer"
            />
          </div>

        </div>

        {/* ROI Results Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          
          <div className="p-3.5 rounded-lg bg-dev-bg border border-dev-border text-center">
            <span className="text-[10px] font-mono uppercase text-dev-muted block mb-1">Daily Tokens Saved</span>
            <span className="text-lg font-bold font-mono text-emerald-400">+{dailyTokensSaved.toLocaleString()}</span>
            <span className="text-[10px] font-mono text-dev-muted block mt-0.5">~{dailyFinancial.formattedDollars} / day</span>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">Annual Cost Reduction</span>
            <span className="text-xl font-bold font-mono text-white">${yearlyDollars}</span>
            <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">⚡ {yearlyTokensSaved.toLocaleString()} Tokens</span>
          </div>

        </div>

        <p className="text-[11px] text-dev-muted font-sans leading-relaxed mb-4">
          Calculated based on a 70% token compression ratio comparing standard conversational AI chatter (~650 tokens) vs zero-fluff System Blueprints (~180 tokens).
        </p>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-all"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
}
