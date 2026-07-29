// 30+ YOE Senior Principal Architect Semantic Intent Classifier

/**
 * Domain Intent Mapping Rules
 */
const INTENT_RULES = [
  {
    cmd: '/sec-audit',
    keywords: ['security', 'audit', 'owasp', 'vulnerability', 'exploit', 'injection', 'xss', 'sqli', 'penetration', 'idor', 'csrf', 'harden', 'threat']
  },
  {
    cmd: '/github',
    keywords: ['github', 'gitignore', 'git', 'commit', 'push', 'repo', 'repository', 'secrets leak', '.env leak', 'github pages']
  },
  {
    cmd: '/professional',
    keywords: ['professional', 'enterprise', 'vibe code', 'vibe-code', 'refactor', 'senior', 'clean code', 'solid', 'architecture', 'best practice', 'rewrite']
  },
  {
    cmd: '/db',
    keywords: ['database', 'db', 'sql', 'postgresql', 'postgres', 'prisma', 'schema', 'table', 'foreign key', 'migration', '3nf', 'erd', 'index']
  },
  {
    cmd: '/api',
    keywords: ['api', 'endpoint', 'rest', 'graphql', 'grpc', 'proto', 'openapi', 'swagger', 'payload', 'dto', 'request body', 'header', 'http']
  },
  {
    cmd: '/ui',
    keywords: ['ui', 'ux', 'component', 'layout', 'tailwind', 'css', 'design', 'frontend', 'card', 'modal', 'navbar', 'dark mode', 'react component', 'jsx']
  },
  {
    cmd: '/error',
    keywords: ['error', 'bug', 'debug', 'stack trace', 'crash', 'exception', 'typeerror', 'fix error', 'failed', 'issue', 'cannot read property']
  },
  {
    cmd: '/gen-tests',
    keywords: ['test', 'tests', 'testing', 'vitest', 'jest', 'unit test', 'integration test', 'qa', 'assert', 'coverage']
  },
  {
    cmd: '/a11y-audit',
    keywords: ['a11y', 'accessibility', 'wcag', 'aria', 'screen reader', 'contrast']
  },
  {
    cmd: '/fullstack',
    keywords: ['fullstack', 'full-stack', 'saas', 'application', 'end-to-end', 'multi-tier', 'monorepo']
  },
  {
    cmd: '/ide-config',
    keywords: ['ide', 'vscode', 'cursor', 'antigravity', 'mcp', 'settings.json', 'cursorrules', 'skills.json']
  }
];

/**
 * Intelligent Semantic Intent Classifier
 * Inspects any raw text prompt and returns the optimal matching slash command
 */
export function detectBestSlashCommand(rawPrompt) {
  if (!rawPrompt || !rawPrompt.trim()) {
    return { cmd: '/plan', confidence: 'default' };
  }

  const clean = rawPrompt.trim();

  // If prompt already explicitly starts with a slash command (e.g. /sec-audit, /db)
  const match = clean.match(/^(\/[\w\-]+)/);
  if (match) {
    return { cmd: match[1].toLowerCase(), confidence: 'exact' };
  }

  const lower = clean.toLowerCase();

  // Score each command by matching keywords
  let bestCmd = '/plan';
  let maxScore = 0;

  for (const rule of INTENT_RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        // Give higher weight to multi-character key terms
        score += kw.length > 4 ? 2 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestCmd = rule.cmd;
    }
  }

  // If keywords were matched, return detected command; otherwise default to /plan for discovery
  return {
    cmd: maxScore > 0 ? bestCmd : '/plan',
    confidence: maxScore > 0 ? 'high' : 'fallback'
  };
}
