import React, { useState, useMemo } from 'react';
import { Play, Code, Monitor, Tablet, Smartphone, X, ShieldCheck, Terminal } from 'lucide-react';

export default function LiveSandboxModal({ code, onClose }) {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code'
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // Extract raw HTML/CSS/JS or wrap JSX into runnable standalone HTML
  const srcDoc = useMemo(() => {
    if (!code) return '';

    // Extract code block inside ```html or ```jsx or ``` if available
    const codeMatch = code.match(/```(?:html|jsx|tsx|javascript|js|css)?([\s\S]*?)```/i);
    const cleanCode = codeMatch ? codeMatch[1].trim() : code;

    // Check if it's already an HTML document
    if (cleanCode.toLowerCase().includes('<!doctype html>') || cleanCode.toLowerCase().includes('<html')) {
      return cleanCode;
    }

    // Wrap plain HTML/JSX snippets with Tailwind CSS CDN for instant live preview
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0f172a; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; }
  </style>
</head>
<body>
  <div id="sandbox-root">
    ${cleanCode}
  </div>
  <script>
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error("Sandbox Error: " + msg);
    };
  </script>
</body>
</html>`;
  }, [code]);

  const viewportStyles = {
    desktop: 'w-full h-[520px]',
    tablet: 'w-[768px] mx-auto h-[520px]',
    mobile: 'w-[375px] mx-auto h-[520px]'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-dev-surface border border-dev-border rounded-xl max-w-5xl w-full p-6 shadow-dev-popup relative font-sans max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex flex-wrap justify-between items-center pb-3 mb-4 border-b border-dev-border gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Play className="w-4 h-4 text-emerald-400" />
              <span>In-Browser Live Code Sandbox & Preview</span>
            </h3>
          </div>

          {/* Device Viewport Selector & Tab Switcher */}
          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="flex bg-dev-bg p-1 rounded border border-dev-border">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-all flex items-center space-x-1 ${
                  activeTab === 'preview' ? 'bg-emerald-600 text-white font-medium' : 'text-dev-muted hover:text-white'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>Live Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded transition-all flex items-center space-x-1 ${
                  activeTab === 'code' ? 'bg-emerald-600 text-white font-medium' : 'text-dev-muted hover:text-white'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Source Code</span>
              </button>
            </div>

            {activeTab === 'preview' && (
              <div className="flex bg-dev-bg p-1 rounded border border-dev-border">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1 rounded ${viewport === 'desktop' ? 'bg-blue-600 text-white' : 'text-dev-muted'}`}
                  title="Desktop (100%)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1 rounded ${viewport === 'tablet' ? 'bg-blue-600 text-white' : 'text-dev-muted'}`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1 rounded ${viewport === 'mobile' ? 'bg-blue-600 text-white' : 'text-dev-muted'}`}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1 text-dev-muted hover:text-white font-mono text-xs rounded hover:bg-dev-hover"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sandbox Content Body */}
        <div className="flex-1 bg-dev-bg border border-dev-border rounded-lg overflow-hidden relative">
          {activeTab === 'preview' ? (
            <div className="w-full h-full bg-slate-950 flex items-center justify-center p-2 overflow-auto">
              <iframe
                title="Live Sandbox Output"
                srcDoc={srcDoc}
                className={`${viewportStyles[viewport]} bg-slate-900 rounded border border-dev-border transition-all shadow-2xl`}
                sandbox="allow-scripts allow-modals"
              />
            </div>
          ) : (
            <pre className="w-full h-[520px] p-4 bg-black/80 text-emerald-300 font-mono text-xs overflow-auto whitespace-pre-wrap">
              {code}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-dev-border flex items-center justify-between text-xs font-mono text-dev-muted">
          <span className="flex items-center space-x-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Isolated Security Sandbox Sandbox Active</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-dev-bg hover:bg-dev-hover border border-dev-border text-white rounded font-medium transition-all"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
}
