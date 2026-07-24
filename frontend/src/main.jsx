import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dev-bg text-dev-text flex items-center justify-center p-6 font-mono">
          <div className="dev-panel p-6 rounded-xl border border-red-500/40 max-w-lg w-full text-center shadow-dev-popup">
            <div className="w-10 h-10 rounded bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3 font-bold text-base">
              ⚠️
            </div>
            <h2 className="text-base font-bold text-white mb-2">Application Diagnostics Notice</h2>
            <p className="text-xs text-dev-muted mb-4 font-sans leading-relaxed">
              An unexpected runtime state occurred. Click below to clear stale browser cache and reload the workspace.
            </p>
            <div className="p-3 bg-dev-bg rounded border border-dev-border text-[11px] text-red-400 font-mono text-left mb-4 overflow-x-auto">
              {this.state.error?.toString() || 'Unknown error'}
            </div>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-all shadow-dev-subtle"
            >
              Reset Cache & Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
