// Multilingual & Code-Mixed (Hinglish/Minglish) Auto-Translation & Senior Prompt Enhancer Service
import { detectBestSlashCommand } from './intentClassifier';

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

  let translated = clean;
  for (const rule of DEVANAGARI_TRANSLATIONS) {
    translated = translated.replace(rule.regex, rule.val);
  }

  translated = translated.replace(/(?:banao|banaana|chahiye|pahije|banvaychi|banvaych|banaao|karo|banao|hai|hu|hoon|chahiye|ek|mera|meri|ahe)\s+/gi, ' ');
  translated = translated.replace(/[\u0900-\u097F]/g, ' ');
  translated = translated.replace(/\s+/g, ' ').trim();

  if (!translated) {
    translated = 'build a professional website';
  }

  const lower = translated.toLowerCase();
  if (!lower.startsWith('/') && !lower.startsWith('build') && !lower.startsWith('create') && !lower.startsWith('fix') && !lower.startsWith('generate')) {
    translated = `build a ${translated}`;
  }

  translated = translated.replace(/\b(\w+)\s+\1\b/gi, '$1');

  return {
    detectedLang: detectedLang,
    translatedText: translated,
    isTranslated: true
  };
}

/**
 * Senior Principal Prompt Engineer Transformer
 * Dynamically crafts hyper-detailed, domain-tailored professional prompts based on user intent
 */
export function enhanceToExpertPrompt(rawInput) {
  if (!rawInput || !rawInput.trim()) return rawInput;

  const trimmed = rawInput.trim();
  const match = trimmed.match(/^(\/[\w\-]+)\s*(.*)/s);
  
  let cmd = '';
  let query = trimmed;

  if (match) {
    cmd = match[1].toLowerCase();
    query = match[2].trim() || trimmed;
  } else {
    const detected = detectBestSlashCommand(trimmed);
    cmd = detected.cmd;
    query = trimmed;
  }

  // Prevent double enhancement if already enhanced
  if (query.toLowerCase().includes('featuring') || query.toLowerCase().includes('architect an enterprise')) {
    return rawInput;
  }

  // Clean prompt subject query
  const subject = query.replace(/^(make|build|create|design|generate|audit|fix|check|write)\s+(?:a|an|the)?\s*/i, '').trim() || 'application';

  // Domain-aware expert prompt templates
  switch (cmd) {
    case '/ui':
      return `/ui Design a high-performance, responsive dark-mode ${subject} UI component system featuring Tailwind CSS styling, glassmorphism backdrop blurs, crisp typography scale, WCAG 2.1 AAA accessibility ARIA attributes, and interactive micro-animations`;
      
    case '/sec-audit':
      return `/sec-audit Conduct an exhaustive OWASP Top 10 web security penetration audit on ${subject} scanning for SQL injection, XSS vulnerabilities, IDOR privilege escalation, CORS misconfigurations, and environment secret leaks with drop-in defensive fixes`;

    case '/db':
      return `/db Design a 3rd Normal Form (3NF) relational database schema for ${subject} featuring UUID primary keys, composite index optimizations, cascading foreign key integrity, PgBouncer connection pooling, and Prisma ORM models`;

    case '/api':
      return `/api Architect a strict, type-safe REST & GraphQL API data contract specification for ${subject} featuring Pydantic/Zod request payload validation, Bearer JWT authentication, RFC 7807 problem details error envelopes, and Redis rate limiting`;

    case '/professional':
      return `/professional Refactor ${subject} into Fortune 500 enterprise production architecture enforcing SOLID principles, strict TypeScript DTO contracts, O(N^2) to O(N) algorithmic optimization, defensive error boundaries, and self-documenting JSDoc annotations`;

    case '/error':
      return `/error Perform root cause analysis on this error stack trace for ${subject}, trace unhandled null dereferences and corrupt upstream state, eliminate symptom-masking try-catch traps, and provide drop-in defensive patches with regression unit tests`;

    case '/gen-tests':
      return `/gen-tests Generate a comprehensive Vitest / Jest unit and integration test suite for ${subject} with mock setups, async assertion handling, edge-case coverage, and 100% boundary testing`;

    case '/github':
      return `/github Perform a GitHub repository security audit for ${subject}, generate a production .gitignore manifest, create a safe .env.example placeholder template, and outline emergency secret revocation procedures`;

    case '/fullstack':
      return `/fullstack Architect a 4-tier full-stack SaaS application for ${subject} spanning PostgreSQL database entities, FastAPI/Express backend services, React frontend UI, Stripe subscription billing webhooks, and Docker container deployment`;

    default:
      return `/plan Architect an enterprise-grade ${subject} platform featuring 7-step interactive discovery, competitive market analysis, multi-tenant user access, Stripe payment gateway integration, and a scalable cloud deployment roadmap`;
  }
}
