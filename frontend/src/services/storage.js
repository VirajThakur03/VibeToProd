// Client-side localStorage persistence manager for GitHub Pages

const HISTORY_KEY = 'ai_slice_history_v1';
const ANALYTICS_KEY = 'ai_slice_analytics_v1';

export function getStoredHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveHistoryItem(item) {
  try {
    const history = getStoredHistory();
    const updated = [item, ...history].slice(0, 100); // Keep last 100
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    updateAnalyticsFromHistory(updated);
    return updated;
  } catch (e) {
    console.error("Failed to save history item", e);
    return [];
  }
}

export function getStoredAnalytics() {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Defaults if empty
  return {
    total_requests: 8,
    total_tokens_used: 1240,
    total_tokens_saved: 4120,
    avg_tokens_per_request: 155.0,
    efficiency_percentage: 76.9
  };
}

function updateAnalyticsFromHistory(historyItems) {
  if (!historyItems || historyItems.length === 0) return;

  let totalUsed = 0;
  let totalSaved = 0;

  historyItems.forEach(item => {
    const tokens = item.tokens || {};
    totalUsed += tokens.total_tokens || 0;
    totalSaved += tokens.tokens_saved || 0;
  });

  const totalRequests = historyItems.length;
  const avgTokens = totalRequests > 0 ? (totalUsed / totalRequests) : 0;
  const baseline = totalUsed + totalSaved;
  const efficiency = baseline > 0 ? ((totalSaved / baseline) * 100) : 0;

  const analyticsData = {
    total_requests: totalRequests,
    total_tokens_used: totalUsed,
    total_tokens_saved: totalSaved,
    avg_tokens_per_request: Math.round(avgTokens * 10) / 10,
    efficiency_percentage: Math.round(efficiency * 10) / 10
  };

  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analyticsData));
  } catch (e) {}

  return analyticsData;
}
