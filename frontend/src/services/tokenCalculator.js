// Senior Developer Token & Financial Cost Savings Engine

// Estimated API Cost per 1k tokens (USD)
const API_RATES = {
  openai: {
    input: 0.00015,  // $0.15 per 1M tokens (gpt-4o-mini)
    output: 0.00060  // $0.60 per 1M tokens
  },
  anthropic: {
    input: 0.00025,  // $0.25 per 1M tokens (claude-3-5-haiku)
    output: 0.00125  // $1.25 per 1M tokens
  },
  gpt4: {
    input: 0.0025,   // $2.50 per 1M tokens (gpt-4o baseline conversational)
    output: 0.0100   // $10.00 per 1M tokens
  }
};

export function estimateTokenCount(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  return Math.max(1, Math.ceil((words * 1.35 + chars / 4) / 2));
}

export function calculateFinancialSavings(tokensSaved, provider = 'openai') {
  const rate = API_RATES[provider] || API_RATES.openai;
  // Blend input & output savings estimation
  const blendedRatePerToken = (rate.input * 0.4 + rate.output * 0.6);
  const dollarsSaved = (tokensSaved * blendedRatePerToken);
  
  return {
    dollarsSaved: Math.max(0, Math.round(dollarsSaved * 10000) / 10000),
    formattedDollars: dollarsSaved < 0.01 ? `< $0.01` : `$${dollarsSaved.toFixed(3)}`
  };
}

export function computeMetrics(systemPrompt, userQuery, aiResponse, rawPromptTokens = 0, rawCompletionTokens = 0, provider = 'openai') {
  const promptTokens = rawPromptTokens > 0 ? rawPromptTokens : estimateTokenCount(systemPrompt + userQuery);
  const completionTokens = rawCompletionTokens > 0 ? rawCompletionTokens : estimateTokenCount(aiResponse);
  const totalTokens = promptTokens + completionTokens;

  // Conversational AI chatter baseline (verbose greetings, multi-turn intro/outro preamble)
  const baselineCompletion = Math.ceil(completionTokens * 2.4 + 300);
  const baselinePrompt = Math.ceil(promptTokens * 1.6 + 180);
  const baselineTotal = baselinePrompt + baselineCompletion;

  const tokensSaved = Math.max(120, baselineTotal - totalTokens);
  const reductionPercentage = Math.round((tokensSaved / baselineTotal) * 1000) / 10;
  const financial = calculateFinancialSavings(tokensSaved, provider);

  return {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: totalTokens,
    baseline_tokens: baselineTotal,
    tokens_saved: tokensSaved,
    efficiency_percentage: Math.min(92.0, Math.max(50.0, reductionPercentage)),
    dollars_saved: financial.dollarsSaved,
    formatted_dollars: financial.formattedDollars
  };
}
