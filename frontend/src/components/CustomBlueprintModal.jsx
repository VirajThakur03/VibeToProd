import React, { useState } from 'react';
import { Terminal, Plus, Check, X } from 'lucide-react';
import { saveCustomBlueprint } from '../services/blueprints';

export default function CustomBlueprintModal({ onClose, onSaved }) {
  const [commandName, setCommandName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [maxTokens, setMaxTokens] = useState('400');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commandName.trim() || !systemPrompt.trim()) return;

    saveCustomBlueprint(commandName, description, systemPrompt, maxTokens);
    setSavedSuccess(true);
    setTimeout(() => {
      onSaved();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-lg w-full p-5 shadow-dev-popup relative font-sans">
        
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-dev-border">
          <h3 className="text-xs font-mono font-bold text-white flex items-center space-x-2 uppercase">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Create Custom System Blueprint</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-dev-muted hover:text-white font-mono text-sm"
          >
            [Esc]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-dev-muted mb-1 font-mono">Slash Command Name</label>
            <input
              type="text"
              required
              placeholder="e.g. /refactor or /security"
              value={commandName}
              onChange={(e) => setCommandName(e.target.value)}
              className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-dev-muted mb-1 font-mono">Short Description</label>
              <input
                type="text"
                placeholder="Refactor code for memory & O(N) performance"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-dev-muted mb-1 font-mono">Max Token Cap</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
                className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-dev-muted mb-1 font-mono">System Blueprint Instructions</label>
            <textarea
              required
              rows={4}
              placeholder="Enter strict instructions for the LLM. e.g. You are a senior refactoring engineer. Output ONLY the improved code block and 2 bullet points detailing performance improvements. Omit conversational filler."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs leading-relaxed"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-dev-muted hover:text-white font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-mono font-medium flex items-center space-x-1 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Blueprint Registered</span>
                </>
              ) : (
                <span>Register Blueprint</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
