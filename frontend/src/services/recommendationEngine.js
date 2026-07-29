// Contextual Recommendation Engine for Slash Commands & IDE .md Blueprint Downloads
import { detectBestSlashCommand } from './intentClassifier';

const RECOMMENDATION_MAP = {
  '/plan': {
    commands: [
      { name: '/professional', desc: 'Refactor prototype into 50+ YOE enterprise architecture' },
      { name: '/sec-audit', desc: 'Run OWASP Top 10 security & vulnerability assessment' },
      { name: '/db', desc: 'Generate 3NF PostgreSQL DDL & Prisma database schema' },
      { name: '/fullstack', desc: 'Generate 4-tier SaaS architecture specification' }
    ],
    mdFiles: [
      { name: 'professional.md', cmd: '/professional', desc: 'Senior Enterprise Refactor Blueprint' },
      { name: 'sec-audit.md', cmd: '/sec-audit', desc: 'OWASP Penetration Security Blueprint' },
      { name: 'db.md', cmd: '/db', desc: '3NF Database Architecture Blueprint' },
      { name: 'fullstack.md', cmd: '/fullstack', desc: 'Multi-Tier SaaS Spec Blueprint' }
    ]
  },
  '/professional': {
    commands: [
      { name: '/sec-audit', desc: 'Conduct OWASP Top 10 penetration security audit' },
      { name: '/gen-tests', desc: 'Generate Vitest/Jest unit and integration test suite' },
      { name: '/a11y-audit', desc: 'Perform WCAG 2.1 AAA accessibility audit' }
    ],
    mdFiles: [
      { name: 'sec-audit.md', cmd: '/sec-audit', desc: 'OWASP Security Audit Blueprint' },
      { name: 'refactor.md', cmd: '/refactor', desc: 'AST Clean Code Refactoring Blueprint' },
      { name: 'perf-audit.md', cmd: '/perf-audit', desc: 'Web Vitals Performance Blueprint' }
    ]
  },
  '/sec-audit': {
    commands: [
      { name: '/github', desc: 'Run GitHub Repository Security & secret leak scan' },
      { name: '/professional', desc: 'Harden code structure with defensive enterprise guards' },
      { name: '/gen-tests', desc: 'Write regression unit tests for security fixes' }
    ],
    mdFiles: [
      { name: 'github.md', cmd: '/github', desc: 'GitHub Security & .gitignore Blueprint' },
      { name: 'sec-audit.md', cmd: '/sec-audit', desc: 'OWASP Security Defense Blueprint' }
    ]
  },
  '/ui': {
    commands: [
      { name: '/a11y-audit', desc: 'Scan UI components for WCAG 2.1 AAA accessibility' },
      { name: '/professional', desc: 'Refactor UI code into production React components' },
      { name: '/api', desc: 'Connect UI components to strict API data contracts' }
    ],
    mdFiles: [
      { name: 'ui.md', cmd: '/ui', desc: 'UI/UX Design System Blueprint' },
      { name: 'api.md', cmd: '/api', desc: 'API Data Contract Blueprint' }
    ]
  },
  '/api': {
    commands: [
      { name: '/db', desc: 'Design supporting 3NF database schema & ORM models' },
      { name: '/sec-audit', desc: 'Audit API endpoints for auth & CORS vulnerabilities' },
      { name: '/fullstack', desc: 'Build complete full-stack SaaS layer around API' }
    ],
    mdFiles: [
      { name: 'api.md', cmd: '/api', desc: 'Precision API Spec Blueprint' },
      { name: 'db.md', cmd: '/db', desc: 'Database Architecture Blueprint' }
    ]
  },
  '/db': {
    commands: [
      { name: '/api', desc: 'Build FastAPI/Express endpoints consuming DB schema' },
      { name: '/fullstack', desc: 'Generate end-to-end multi-layer SaaS application' },
      { name: '/sec-audit', desc: 'Audit SQL query parameters against injection flaws' }
    ],
    mdFiles: [
      { name: 'db.md', cmd: '/db', desc: 'Database Architecture Blueprint' },
      { name: 'fullstack.md', cmd: '/fullstack', desc: 'Fullstack SaaS Spec Blueprint' }
    ]
  }
};

const DEFAULT_RECOMMENDATION = {
  commands: [
    { name: '/professional', desc: 'Transform prototype to Senior Enterprise code' },
    { name: '/sec-audit', desc: 'Perform OWASP Top 10 security audit' },
    { name: '/gen-tests', desc: 'Generate Vitest/Jest unit test suite' },
    { name: '/ide-config', desc: 'Export IDE rules for Antigravity, VS Code, & Cursor' }
  ],
  mdFiles: [
    { name: 'professional.md', cmd: '/professional', desc: 'Senior Enterprise Refactor Blueprint' },
    { name: 'sec-audit.md', cmd: '/sec-audit', desc: 'OWASP Security Defense Blueprint' },
    { name: 'github.md', cmd: '/github', desc: 'GitHub Security & .gitignore Blueprint' }
  ]
};

/**
 * Get contextual slash command & .md file recommendations based on executed command & query
 */
export function getContextualRecommendations(commandUsed, userQuery = '') {
  let key = (commandUsed || '').toLowerCase();
  
  if (!key || key === '/plan') {
    const detected = detectBestSlashCommand(userQuery);
    if (detected && detected.confidence !== 'fallback') {
      key = detected.cmd;
    } else {
      key = '/plan';
    }
  }

  const matched = RECOMMENDATION_MAP[key] || DEFAULT_RECOMMENDATION;
  return matched;
}
