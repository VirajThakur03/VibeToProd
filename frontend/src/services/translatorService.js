// Multilingual & Code-Mixed (Hinglish/Minglish) Auto-Translation & 30+ YOE Prompt Enhancer Service

// Dictionary of multilingual patterns for auto-detection
const MULTILINGUAL_PATTERNS = [
  // Marathi
  { regex: /मला\s+(.*?)\s+(वेबसाईट|वेबसाइट|अ‍ॅप|कोड|बनवायची|बनवायचं|पाहिजे)/i, lang: 'Marathi (मराठी)' },
  { regex: /वेबसाईट\s+बनवा|बग\s+फिक्स/i, lang: 'Marathi (मराठी)' },

  // Hindi
  { regex: /मुझे\s+(.*?)\s+(वेबसाइट|ऐप|कोड|बनानी|बनाना|चाहिए)/i, lang: 'Hindi (हिंदी)' },
  { regex: /वेबसाइट\s+बनाओ|कोड\s+सुधारो/i, lang: 'Hindi (हिंदी)' },

  // Code-Mixed (Hinglish / Minglish)
  { regex: /(?:banao|banaana|chahiye|pahije|banvaychi|banvaych|banaao|karo|banao)\s+/i, lang: 'Hinglish / Minglish (Mixed)' },

  // Spanish
  { regex: /quiero\s+crear\s+un(?:a)?\s+(sitio\s+web|página|aplicación|app)/i, lang: 'Spanish (Español)' },

  // French
  { regex: /je\s+veux\s+créer\s+un\s+(site\s+web|application)/i, lang: 'French (Français)' },

  // German
  { regex: /ich\s+möchte\s+eine\s+webseite/i, lang: 'German (Deutsch)' },

  // Mandarin / Chinese
  { regex: /我想建一个(.*)(网站|应用)/i, lang: 'Mandarin (中文)' },

  // Japanese
  { regex: /(.*)のWebサイトを作りたい/i, lang: 'Japanese (日本語)' }
];

/**
 * Advanced Multilingual & Code-Mixed (Hindi + Marathi + English) Auto-Translator
 */
export function translateToEnglishPrompt(transcript) {
  if (!transcript || !transcript.trim()) {
    return { detectedLang: 'English', translatedText: '', isTranslated: false };
  }

  const clean = transcript.trim();
  let detectedLang = 'English';
  let isCodeMixed = false;

  // 1. Detect if input contains Devanagari (Hindi / Marathi) characters
  const hasDevanagari = /[\u0900-\u097F]/.test(clean);
  const hasEnglishWords = /[a-zA-Z]/.test(clean);

  if (hasDevanagari && hasEnglishWords) {
    detectedLang = 'Hindi + Marathi + English (Code-Mixed)';
    isCodeMixed = true;
  } else if (hasDevanagari) {
    const isMarathi = /[ळोपाहिजेबनवायचीमला]/i.test(clean);
    detectedLang = isMarathi ? 'Marathi (मराठी)' : 'Hindi (हिंदी)';
    isCodeMixed = true;
  } else {
    // Check regex pattern dictionary
    for (const item of MULTILINGUAL_PATTERNS) {
      if (item.regex.test(clean)) {
        detectedLang = item.lang;
        isCodeMixed = true;
        break;
      }
    }
  }

  if (!isCodeMixed) {
    return {
      detectedLang: 'English',
      translatedText: clean,
      isTranslated: false
    };
  }

  // 2. Translate Code-Mixed & Devanagari Tokens to Clean English Software Query
  let translated = clean
    // Remove Hindi/Marathi auxiliary verbs & filler phrases
    .replace(/(?:मला|मुझे|चाहिए|बनवायची|बनानी|बनाना|बनवायचं|पाहिजे|बनाओ|करो|की|का|के|आहे|हो|एक|ek|banao|banaana|chahiye|pahije|banvaychi)/gi, ' ')
    // Translate domain terms
    .replace(/वेबसाईट|वेबसाइट/gi, 'website')
    .replace(/अ‍ॅप|ऐप/gi, 'app')
    .replace(/कोड/gi, 'code')
    .replace(/दुकान/gi, 'store')
    .replace(/कॉफी/gi, 'coffee shop')
    .replace(/हॉटेल|रेस्टॉरंट/gi, 'restaurant')
    .replace(/एरर|बग/gi, 'bug error')
    .replace(/\s+/g, ' ')
    .trim();

  // Prefix with standard command intent if not present
  if (!translated.toLowerCase().startsWith('/') && !translated.toLowerCase().startsWith('build') && !translated.toLowerCase().startsWith('create') && !translated.toLowerCase().startsWith('fix')) {
    translated = `build a ${translated} website`;
  }

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
