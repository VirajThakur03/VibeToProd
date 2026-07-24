import React, { useState } from 'react';
import { Terminal, Bug, FileCode, Layout, Zap, Search, ShieldCheck, Database, Cpu, TestTube, BookOpen, Layers, Info } from 'lucide-react';
import { COMMAND_CATEGORIES } from '../services/commandRepository';

const CATEGORY_ICONS = {
  'Architecture & Design': Terminal,
  'Debugging & Errors': Bug,
  'Database & Storage': Database,
  'API & Data Contracts': FileCode,
  'Security & Audits': ShieldCheck,
  'Performance & Refactoring': Cpu,
  'DevOps & Infrastructure': Layers,
  'Testing & QA': TestTube,
  'UI/UX & Frontend': Layout,
  'Documentation & ADRs': BookOpen
};

export default function CommandDropdown({ commands, selectedIndex, onSelectCommand }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterText, setFilterText] = useState('');
  const [hoveredCmd, setHoveredCmd] = useState(null);

  if (!commands || commands.length === 0) return null;

  const filteredCommands = commands.filter(cmd => {
    const name = cmd.command_name || cmd.name || '';
    const matchCat = activeCategory === 'All' || (cmd.category && cmd.category.toLowerCase() === activeCategory.toLowerCase());
    const s = filterText.toLowerCase();
    const matchSearch = !filterText || 
      name.toLowerCase().includes(s) || 
      cmd.description.toLowerCase().includes(s) ||
      (cmd.category && cmd.category.toLowerCase().includes(s));
    return matchCat && matchSearch;
  });

  const activeHoverItem = hoveredCmd || filteredCommands[selectedIndex] || filteredCommands[0];

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 dev-command-popup rounded-xl overflow-hidden z-30 shadow-dev-popup border border-dev-border">
      
      {/* Header Bar with Search & Category Filter */}
      <div className="px-3 py-2 border-b border-dev-border bg-dev-bg">
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 fill-blue-400" />
            <span>Command Repository ({filteredCommands.length} / {commands.length} Commands)</span>
          </span>
          <span className="text-[10px] font-mono text-dev-muted hidden sm:inline">↑↓ Navigate • Enter Select</span>
        </div>

        {/* Filter Input */}
        <div className="relative mb-2">
          <Search className="w-3 h-3 text-dev-muted absolute left-2.5 top-2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search 100+ commands by keyword (e.g. error, db, docker, security, api)..."
            className="w-full pl-8 pr-3 py-1 bg-dev-surface border border-dev-border rounded text-[11px] font-mono text-white placeholder-dev-muted focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {COMMAND_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-medium shadow-dev-subtle'
                  : 'bg-dev-surface text-dev-muted hover:text-white border border-dev-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Command List */}
      <div className="max-h-56 overflow-y-auto py-1 bg-dev-surface">
        {filteredCommands.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-dev-muted">
            No commands found matching "{filterText}" in {activeCategory}
          </div>
        ) : (
          filteredCommands.map((cmd, idx) => {
            const name = cmd.command_name || cmd.name;
            const IconComponent = CATEGORY_ICONS[cmd.category] || Terminal;
            const isSelected = idx === selectedIndex || (hoveredCmd && (hoveredCmd.command_name || hoveredCmd.name) === name);

            return (
              <div
                key={cmd.id || name || idx}
                onClick={() => onSelectCommand(cmd)}
                onMouseEnter={() => setHoveredCmd(cmd)}
                onMouseLeave={() => setHoveredCmd(null)}
                className={`px-3 py-2 flex items-center justify-between cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-blue-600/20 border-l-2 border-blue-500 text-white' 
                    : 'hover:bg-dev-hover text-dev-text'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-mono flex-shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-dev-bg text-dev-muted border border-dev-border'
                  }`}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-blue-400">{name}</span>
                      {cmd.category && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-dev-bg text-dev-muted border border-dev-border hidden sm:inline">
                          {cmd.category}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-dev-muted line-clamp-1 font-sans">{cmd.description}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dev-bg text-dev-muted border border-dev-border">
                    Cap: ~{cmd.max_token_limit || cmd.maxTokens || 400}t
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Expanded Hover Blueprint Description Footer Card */}
      {activeHoverItem && (
        <div className="px-3 py-2 bg-dev-bg border-t border-dev-border text-xs font-sans flex items-start space-x-2 animate-fade-in">
          <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="overflow-hidden">
            <div className="flex items-center space-x-2 font-mono text-[11px] mb-0.5">
              <span className="font-bold text-blue-400">{activeHoverItem.command_name || activeHoverItem.name}</span>
              {activeHoverItem.category && (
                <span className="text-dev-muted">• {activeHoverItem.category}</span>
              )}
            </div>
            <p className="text-[11px] text-dev-text leading-tight line-clamp-2">
              {activeHoverItem.description}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
