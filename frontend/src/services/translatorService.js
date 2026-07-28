// Multilingual & Code-Mixed (Hinglish/Minglish) Auto-Translation & 30+ YOE Prompt Enhancer Service

// Devanagari to English Dictionary Mapping
const DEVANAGARI_TRANSLATIONS = [
  { regex: /वेबसाईट|वेबसाइट|साइट/gi, val: 'website' },
  { regex: /अ‍ॅप|ऐप|एप्लिकेशन/gi, val: 'app' },
  { regex: /बनाई\s+जाए|बनवायची|बनवायचं|बनानी|बनाना|बनाओ|बनाएं|बनाये|बनाओ/gi, val: 'build' },
  { regex: /मला|मुझे|हमे|हमारा|मेरे\s+लिए/gi, val: '' },
  { regex: /पाहिजे|चाहिए|ज़रूरत|जरूरत/gi, val: '' },
  { regex: /कॉफी\s*शॉप|कॉफी/gi, val: 'coffee shop' },
  { regex: /रेस्टॉरंट|रेस्टोरेंट|हॉटेल|होटल/gi, val: 'restaurant' },
  { regex: /दुकान|स्टोर/gi, val: 'store' },
  { regex: /एरर|बग|खामी/gi, val: 'bug error' },
  { regex: /पेमेंट|पैसे/gi, val: 'payment' },
  { regex: /लॉगिन|साइनइन/gi, val: 'login' },
  { regex: /एक/gi, val: 'a' }
];

/**
 * Advanced Multilingual & Code-Mixed (Hindi + Marathi + English) Auto-Translator
 * Guarantees 100% Pure English Output for the Translated Prompt Line
 */
export function translateToEnglishPrompt(transcript) {
  if (!transcript || !transcript.trim()) {
    return { detectedLang: 'English', translatedText: '', isTranslated: false };
  }

  const clean = transcript.trim();
  let detectedLang = 'English';
  let isCodeMixed = false;

  const hasDevanagari = /[\u0900-\u097F]/.test(clean);
  const hasEnglishWords = /[a-zA-Z]/.test(clean);

  if (hasDevanagari && hasEnglishWords) {
    detectedLang = 'Hindi + Marathi + English (Code-Mixed)';
    isCodeMixed = true;
  } else if (hasDevanagari) {
    const isMarathi = /[ळोपाहिजेबनवायचीमला]/i.test(clean);
    detectedLang = isMarathi ? 'Marathi (मराठी)' : 'Hindi (हिंदी)';
    isCodeMixed = true;
  } else if (/(?:banao|banaana|chahiye|pahije|banvaychi|banvaych|banaao|karo|banao)\s+/i.test(clean)) {
    detectedLang = 'Hinglish / Minglish (Code-Mixed)';
    isCodeMixed = true;
  }

  if (!isCodeMixed) {
    return {
      detectedLang: 'English',
      translatedText: clean,
      isTranslated: false
    };
  }

  // 1. Apply Devanagari translation mappings
  let translated = clean;
  for (const rule of DEVANAGARI_TRANSLATIONS) {
    translated = translated.replace(rule.regex, rule.val);
  }

  // 2. Remove Hinglish / Minglish filler words
  translated = translated.replace(/(?:banao|banaana|chahiye|pahije|banvaychi|banvaych|banaao|karo|banao|hai|hu|hoon|chahiye|ek|mera|meri|ahe)\s+/gi, ' ');

  // 3. CRITICAL: STRIP ALL REMAINING DEVANAGARI CHARACTERS TO GUARANTEE 100% PURE ENGLISH OUTPUT
  translated = translated.replace(/[\u0900-\u097F]/g, ' ');

  // 4. Clean up spaces and formatting
  translated = translated.replace(/\s+/g, ' ').trim();

  // If empty after stripping, provide fallback
  if (!translated) {
    translated = 'build a professional website';
  }

  // Ensure prompt starts with action verb if not starting with slash or verb
  const lower = translated.toLowerCase();
  if (!lower.startsWith('/') && !lower.startsWith('build') && !lower.startsWith('create') && !lower.startsWith('fix') && !lower.startsWith('generate')) {
    translated = `build a ${translated}`;
  }

  // Deduplicate redundant consecutive words like "build build" or "website website"
  translated = translated.replace(/\b(\w+)\s+\1\b/gi, '$1');

  return {
    detectedLang: detectedLang,
    translatedText: translated,
    isTranslated: true
  };
}

/**
 * 30+ YOE Principal Prompt Engineer Transformer
 * Transforms basic user prompts into enterprise-grade specifications
 */
export function enhanceToExpertPrompt(rawInput) {
  if (!rawInput || !rawInput.trim()) return rawInput;

  const trimmed = rawInput.trim();
  const match = trimmed.match(/^(\/[\w\-]+)\s*(.*)/s);
  
  let cmd = '';
  let query = trimmed;

  if (match) {
    cmd = match[1];
    query = match[2].trim() || trimmed;
  }

  if (query.toLowerCase().includes('enterprise') && query.toLowerCase().includes('architecture')) {
    return rawInput;
  }

  const baseCmd = cmd || '/plan';
  return `${baseCmd} build an enterprise-grade, high-conversion ${query} with 30+ YOE principal architecture, high-density modular component breakdown, OWASP Top 10 security guards, responsive Tailwind CSS styling, 3NF database schema, and low-latency API data contracts`;
}
