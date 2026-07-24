import React, { useState, useEffect } from 'react';
import { Search, FolderCheck, Plus, Zap, CheckCircle2, FileText, ArrowRight, Eye } from 'lucide-react';
import { fetchDocuments, createDocument } from '../services/api';

const CATEGORIES = ['All', 'Backend', 'Frontend', 'Database', 'DevOps', 'AI Architecture'];

export default function DocumentHub({ onSelectDocForCommand, onInspectDoc }) {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Backend');
  const [newDescription, setNewDescription] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  const loadDocs = async () => {
    setIsLoading(true);
    const docs = await fetchDocuments(searchQuery, selectedCategory);
    setDocuments(docs);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDocs();
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const handleCreateDoc = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    await createDocument({
      title: newTitle,
      category: newCategory,
      description: newDescription,
      content: newContent || newDescription,
      tags: newTags
    });

    setNewTitle('');
    setNewDescription('');
    setNewContent('');
    setNewTags('');
    setShowAddModal(false);
    loadDocs();
  };

  return (
    <div className="dev-panel rounded-xl p-5 border border-dev-border mb-8 shadow-dev-card">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-dev-border">
        <div>
          <div className="flex items-center space-x-2">
            <FolderCheck className="w-4 h-4 text-blue-400" />
            <h3 className="text-base font-bold text-white tracking-tight font-mono">Documentation & Specifications Repository</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-dev-bg text-dev-muted border border-dev-border rounded">
              {documents.length} Specifications
            </span>
          </div>
          <p className="text-xs text-dev-muted mt-1 font-sans">
            Search completed project specifications. Click to inspect or trigger zero-fluff system blueprints.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium flex items-center space-x-1 transition-all shadow-dev-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Specification</span>
        </button>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="space-y-3 mb-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-dev-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter specifications by title, description, stack (e.g. FastAPI, Stripe, JWT, Docker)..."
            className="w-full pl-9 pr-4 py-2 bg-dev-bg border border-dev-border rounded text-xs text-white placeholder-dev-muted focus:outline-none focus:border-blue-500 transition-all font-mono"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-dev-subtle font-medium'
                  : 'bg-dev-bg text-dev-muted hover:text-white border border-dev-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid List */}
      {isLoading ? (
        <div className="text-center py-8 text-xs font-mono text-dev-muted animate-pulse">
          Indexing repository documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-10 bg-dev-bg rounded border border-dev-border">
          <FileText className="w-6 h-6 text-dev-muted mx-auto mb-2" />
          <p className="text-xs text-white font-mono">No matching specifications found</p>
          <p className="text-[11px] text-dev-muted mt-1 font-sans">Adjust filter parameters or create a new entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="dev-card p-3.5 rounded-lg border border-dev-border hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 
                    onClick={() => onInspectDoc && onInspectDoc(doc)}
                    className="font-semibold text-xs sm:text-sm text-white hover:text-blue-400 cursor-pointer transition-colors line-clamp-1 font-mono flex items-center space-x-1.5"
                  >
                    <span>{doc.title}</span>
                  </h4>
                  <span className="flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{doc.status || 'Completed'}</span>
                  </span>
                </div>

                {/* Description */}
                <p 
                  onClick={() => onInspectDoc && onInspectDoc(doc)}
                  className="text-xs text-dev-muted line-clamp-2 mb-3 leading-relaxed font-sans cursor-pointer hover:text-dev-text"
                >
                  {doc.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1 mb-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {doc.category}
                  </span>
                  {doc.tags && doc.tags.split(',').map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-dev-bg text-dev-muted border border-dev-border">
                      #{t.trim()}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-dev-border/50 font-mono text-[11px]">
                  <button
                    onClick={() => onInspectDoc && onInspectDoc(doc)}
                    className="text-dev-muted hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectDocForCommand(`/plan Analyze execution blueprint for: ${doc.title}`)}
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-blue-400" />
                      <span>Run /plan</span>
                    </button>

                    <button
                      onClick={() => onSelectDocForCommand(`/api TypeScript API spec for: ${doc.title}`)}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition-colors"
                    >
                      <span>/api Spec</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dev-surface border border-dev-border rounded-xl max-w-lg w-full p-5 shadow-dev-popup relative font-sans">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono font-bold text-white flex items-center space-x-2 uppercase">
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Store Completed Specification</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-dev-muted hover:text-white font-mono text-sm"
              >
                [Esc]
              </button>
            </div>

            <form onSubmit={handleCreateDoc} className="space-y-3 text-xs">
              <div>
                <label className="block text-dev-muted mb-1 font-mono">Specification Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Redis Cache & Token Revocation Pipeline"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-dev-muted mb-1 font-mono">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-dev-muted mb-1 font-mono">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="redis,cache,auth"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-dev-muted mb-1 font-mono">Description & Scope</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Brief summary of specification & implementation details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-dev-bg border border-dev-border rounded text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 font-mono text-dev-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-mono font-medium transition-all"
                >
                  Save Specification
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
