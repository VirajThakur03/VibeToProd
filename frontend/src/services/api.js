// API Client & Interactive Architect Engine for GitHub Pages & Local Backend

import { SYSTEM_BLUEPRINTS, wrapPromptClient } from './blueprints';
import { getStoredHistory, saveHistoryItem, getStoredAnalytics } from './storage';
import { getClientDocuments, saveClientDocument } from './documentStore';
import { processPlanStep } from './interactivePlanEngine';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let lastPlanQuery = 'Coffee Business Website';

function getTimeoutSignal(ms = 1500) {
  try {
    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
      return AbortSignal.timeout(ms);
    }
  } catch (e) {}
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

export async function fetchCommands() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/commands`, { signal: getTimeoutSignal(1500) });
    if (res.ok) return await res.json();
  } catch (err) {}
  return Object.values(SYSTEM_BLUEPRINTS).map((bp, idx) => ({
    id: `cmd-${idx + 1}`,
    command_name: bp.name,
    description: bp.description,
    system_blueprint: bp.systemPrompt,
    max_token_limit: bp.maxTokens
  }));
}

export async function executeSlashCommand(rawInput, provider = 'openai', apiKey = '') {
  const trimmed = (rawInput || '').trim();

  // Special Handler for Interactive /plan Architect or A/B/C/D MCQ responses
  const isMcqChoice = ['A', 'B', 'C', 'D'].includes(trimmed.toUpperCase());
  const isPlanCmd = trimmed.toLowerCase().startsWith('/plan') || isMcqChoice;

  if (isPlanCmd) {
    if (!isMcqChoice) {
      lastPlanQuery = trimmed.replace(/^\/plan\s*/i, '').trim() || 'New Web Application';
      const planRes = processPlanStep(lastPlanQuery, null);
      
      const resultItem = {
        id: `plan-step-${Date.now()}`,
        command_used: '/plan',
        user_query: lastPlanQuery,
        ai_response: planRes.content,
        provider: 'interactive-architect',
        is_plan_interactive: true,
        planData: planRes,
        tokens: {
          prompt_tokens: 45,
          completion_tokens: 140,
          total_tokens: 185,
          baseline_tokens: 650,
          tokens_saved: 465
        }
      };
      saveHistoryItem(resultItem);
      return resultItem;
    } else {
      const planRes = processPlanStep(lastPlanQuery, trimmed.toUpperCase());
      const resultItem = {
        id: `plan-step-${Date.now()}`,
        command_used: '/plan',
        user_query: `Choice: ${trimmed.toUpperCase()} (${lastPlanQuery})`,
        ai_response: planRes.content,
        provider: 'interactive-architect',
        is_plan_interactive: true,
        planData: planRes,
        tokens: {
          prompt_tokens: 20,
          completion_tokens: 160,
          total_tokens: 180,
          baseline_tokens: 600,
          tokens_saved: 420
        }
      };
      saveHistoryItem(resultItem);
      return resultItem;
    }
  }

  // Standard API call or Mock Execution for other commands
  try {
    const res = await fetch(`${API_BASE_URL}/api/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw_input: rawInput, provider, api_key: apiKey }),
      signal: getTimeoutSignal(2000)
    });
    if (res.ok) {
      const data = await res.json();
      saveHistoryItem(data);
      return data;
    }
  } catch (err) {}

  const wrapped = wrapPromptClient(rawInput);
  const cmd = wrapped.commandUsed;
  const query = wrapped.userQuery;

  let aiResponse = generateClientMock(cmd, query);
  const promptTokens = Math.ceil(((wrapped.systemPrompt || '').length + (query || '').length) / 4);
  const completionTokens = Math.ceil(aiResponse.length / 4);
  const totalTokens = promptTokens + completionTokens;
  const baselineTokens = Math.ceil(totalTokens * 2.5 + 300);
  const tokensSaved = Math.max(150, baselineTokens - totalTokens);

  const resultItem = {
    id: `gh-pages-${Date.now()}`,
    command_used: cmd,
    user_query: query,
    ai_response: aiResponse,
    provider: `${provider}-demo`,
    is_mock: true,
    tokens: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      baseline_tokens: baselineTokens,
      tokens_saved: tokensSaved
    }
  };

  saveHistoryItem(resultItem);
  return resultItem;
}

function generateClientMock(cmd, query) {
  if (cmd === '/error') {
    return (
      `### Root Cause\n` +
      `Unchecked property access on uninitialized state object before async response resolve.\n\n` +
      `### Direct Fix\n` +
      `\`\`\`typescript\n` +
      `const safeValue = response?.data?.result ?? fallbackValue;\n` +
      `\`\`\`\n\n` +
      `### Prevention Note\n` +
      `- Use optional chaining (\`?.\`) and nullish coalescing (\`??\`) for async states.`
    );
  } else if (cmd === '/api') {
    return (
      `\`\`\`typescript\n` +
      `export interface SlashCommandPayload {\n` +
      `  commandName: '/plan' | '/error' | '/api' | '/ui';\n` +
      `  userQuery: string;\n` +
      `  maxTokenCap: number;\n` +
      `}\n\n` +
      `export interface TokenMetrics {\n` +
      `  promptTokens: number;\n` +
      `  completionTokens: number;\n` +
      `  tokensSaved: number;\n` +
      `}\n` +
      `\`\`\``
    );
  } else if (cmd === '/ui') {
    return (
      `\`\`\`jsx\n` +
      `export default function SavingsBadge({ count }) {\n` +
      `  return (\n` +
      `    <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono text-xs font-bold">\n` +
      `      <span>⚡ +{count} Tokens Saved</span>\n` +
      `    </div>\n` +
      `  );\n` +
      `}\n` +
      `\`\`\``
    );
  }
  return `### Output for: ${query}\n- Zero conversational chatter attached.\n- High-density output delivered cleanly.`;
}

export async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/analytics`, { signal: getTimeoutSignal(1500) });
    if (res.ok) return await res.json();
  } catch (err) {}
  return getStoredAnalytics();
}

export async function fetchHistory() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/history`, { signal: getTimeoutSignal(1500) });
    if (res.ok) {
      const data = await res.json();
      return data.history || [];
    }
  } catch (err) {}
  return getStoredHistory();
}

export async function fetchDocuments(search = '', category = 'All') {
  try {
    const params = new URLSearchParams({ search, category });
    const res = await fetch(`${API_BASE_URL}/api/documents?${params.toString()}`, { signal: getTimeoutSignal(1500) });
    if (res.ok) {
      const data = await res.json();
      return data.documents || [];
    }
  } catch (err) {}
  return getClientDocuments(search, category);
}

export async function createDocument(docData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docData),
      signal: getTimeoutSignal(1500)
    });
    if (res.ok) return await res.json();
  } catch (err) {}
  return saveClientDocument(docData);
}
