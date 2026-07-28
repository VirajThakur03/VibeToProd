import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Terminal, CornerDownLeft, Info, Zap, Search, Mic, MicOff, Wand2, Globe } from 'lucide-react';
import CommandDropdown from './CommandDropdown';
import { translateToEnglishPrompt, enhanceToExpertPrompt } from '../services/translatorService';

export default function CommandInput({ availableCommands, onSubmit, isLoading }) {
  const [text, setText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredBlueprint, setHoveredBlueprint] = useState(null);
  const [filteredCommands, setFilteredCommands] = useState(availableCommands || []);

  // Voice & Translation States
  const [isListening, setIsListening] = useState(false);
  const [nativeTranscript, setNativeTranscript] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [isEnhanced, setIsEnhanced] = useState(false);

  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const shouldKeepListeningRef = useRef(false);
  const accumulatedTranscriptRef = useRef('');

  // Global Ctrl+K / Cmd+K focus shortcut listener
  useEffect(() => {
    const handleGlobalFocus = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalFocus);
    return () => window.removeEventListener('keydown', handleGlobalFocus);
  }, []);

  // Initialize Speech Recognition API with Persistent Accumulation
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'hi-IN'; // Multi-accent default, auto-detects Marathi, Hindi, English

      rec.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            accumulatedTranscriptRef.current += ' ' + result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        const fullNativeText = (accumulatedTranscriptRef.current + ' ' + interim).replace(/\s+/g, ' ').trim();
        if (fullNativeText) {
          setNativeTranscript(fullNativeText);
          const translation = translateToEnglishPrompt(fullNativeText);
          setDetectedLanguage(translation.detectedLang);
          setText(translation.translatedText || fullNativeText);
        }
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        if (e.error !== 'no-speech') {
          shouldKeepListeningRef.current = false;
          setIsListening(false);
        }
      };

      rec.onend = () => {
        if (shouldKeepListeningRef.current) {
          try {
            rec.start();
          } catch (err) {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      shouldKeepListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      accumulatedTranscriptRef.current = '';
      shouldKeepListeningRef.current = true;
      setNativeTranscript('');
      setDetectedLanguage('');
      setIsEnhanced(false);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition", err);
        shouldKeepListeningRef.current = false;
      }
    }
  };

  // 30+ YOE Expert Prompt Enhancer
  const handleEnhancePrompt = () => {
    if (!text.trim()) return;
    const enhanced = enhanceToExpertPrompt(text);
    setText(enhanced);
    setIsEnhanced(true);
  };

  // Intelligent Slash Command Auto-Suggester
  useEffect(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setShowDropdown(false);
      return;
    }

    if (trimmed.startsWith('/')) {
      const matchText = trimmed.split(' ')[0].toLowerCase();
      const matches = availableCommands.filter(c => 
        (c.command_name || c.name || '').toLowerCase().startsWith(matchText)
      );
      setFilteredCommands(matches);
      setShowDropdown(matches.length > 0 && !trimmed.includes(' '));
      setSelectedIndex(0);
    } else {
      const queryWords = trimmed.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !['need', 'for', 'the', 'how', 'want', 'with'].includes(w));
      
      const matches = availableCommands.filter(c => {
        const name = (c.command_name || c.name || '').toLowerCase();
        const desc = (c.description || '').toLowerCase();
        const cat = (c.category || '').toLowerCase();
        const combined = `${name} ${desc} ${cat}`;
        
        return queryWords.some(w => combined.includes(w));
      });

      if (matches.length > 0) {
        setFilteredCommands(matches);
        setShowDropdown(true);
        setSelectedIndex(0);
      } else {
        setShowDropdown(false);
      }
    }
  }, [text, availableCommands]);

  const handleKeyDown = (e) => {
    if (showDropdown && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        selectCommand(filteredCommands[selectedIndex]);
        return;
      }
      if (e.key === 'Escape') {
        setShowDropdown(false);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const selectCommand = (cmd) => {
    const name = cmd.command_name || cmd.name;
    setText(`${name} `);
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    onSubmit(text);
    setText('');
    setNativeTranscript('');
    setDetectedLanguage('');
    setIsEnhanced(false);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Autocomplete Dropdown Popup */}
      {showDropdown && (
        <CommandDropdown
          commands={filteredCommands}
          selectedIndex={selectedIndex}
          onSelectCommand={selectCommand}
        />
      )}

      {/* Main Command Bar Input Container */}
      <div className="dev-panel rounded-xl p-2 border border-dev-border focus-within:border-blue-500/60 transition-all shadow-dev-card relative">
        
        {/* Hover Blueprint Description Tooltip Card */}
        {hoveredBlueprint && (
          <div className="absolute bottom-full left-0 right-0 mb-3 p-3 rounded-lg bg-dev-bg border border-blue-500/40 shadow-dev-popup text-xs z-40 animate-fade-in font-sans">
            <div className="flex items-center justify-between mb-1.5 font-mono">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-400 font-mono text-xs">{hoveredBlueprint.command_name || hoveredBlueprint.name}</span>
                {hoveredBlueprint.category && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {hoveredBlueprint.category}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-dev-muted">
                Cap: ~{hoveredBlueprint.max_token_limit || hoveredBlueprint.maxTokens || 400} tokens
              </span>
            </div>
            <p className="text-dev-text leading-relaxed text-xs">
              {hoveredBlueprint.description}
            </p>
          </div>
        )}

        {/* DUAL-LAYER DISPLAY: Native Spoken Transcript (Marathi/Hindi/Spanish/etc.) */}
        {nativeTranscript && (
          <div className="mb-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="font-bold text-purple-400">{detectedLanguage || 'Multilingual Voice'}:</span>
              <span className="text-white italic truncate">"{nativeTranscript}"</span>
            </div>
            <span className="text-[10px] text-purple-400 shrink-0 ml-2">Auto-Translated ↓</span>
          </div>
        )}

        <div className="flex items-center space-x-2.5 px-2">
          
          <div className="w-6 h-6 rounded bg-dev-bg border border-dev-border flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
            /
          </div>

          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (text.trim().length > 0) {
                setShowDropdown(true);
              }
            }}
            placeholder="Type / or speak in any language (Marathi, Hindi, English, Spanish)..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-dev-muted focus:outline-none py-2 font-mono"
            disabled={isLoading}
          />

          {/* Voice Input Microphone Toggle */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-1.5 rounded-lg border transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-dev-subtle'
                : 'bg-dev-bg hover:bg-dev-hover text-dev-muted hover:text-white border-dev-border'
            }`}
            title={isListening ? "Listening... Click to stop" : "Speak in Marathi, Hindi, English, Spanish, etc."}
          >
            {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* 30+ YOE Expert Prompt Enhancer Button */}
          {text.trim() && (
            <button
              type="button"
              onClick={handleEnhancePrompt}
              className={`px-2.5 py-1.5 rounded text-xs font-mono font-medium flex items-center space-x-1 transition-all ${
                isEnhanced
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                  : 'bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 border border-purple-500/30'
              }`}
              title="Enhance raw prompt into 30+ YOE Senior Principal Architect specification"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">🪄 30+ YOE Enhance</span>
            </button>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center space-x-1.5 transition-all ${
              text.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-dev-subtle'
                : 'bg-dev-bg text-dev-muted border border-dev-border cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-300" />
                <span className="hidden sm:inline">Executing...</span>
              </>
            ) : (
              <>
                <span>Run</span>
                <CornerDownLeft className="w-3 h-3" />
              </>
            )}
          </button>

        </div>

        {/* Developer Blueprint Quick Select Bar */}
        <div className="flex flex-wrap items-center gap-1.5 px-2 pt-2 border-t border-dev-border/50 mt-1">
          <span className="text-[10px] font-mono text-dev-muted uppercase tracking-wider">Quick Blueprints:</span>
          {availableCommands.slice(0, 10).map(cmd => {
            const name = cmd.command_name || cmd.name;
            return (
              <button
                key={name}
                onClick={() => selectCommand(cmd)}
                onMouseEnter={() => setHoveredBlueprint(cmd)}
                onMouseLeave={() => setHoveredBlueprint(null)}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-dev-bg hover:bg-blue-600/20 text-blue-300 hover:text-blue-100 border border-dev-border hover:border-blue-500/50 transition-all relative group"
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
