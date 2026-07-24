-- SQL Schema for Hyper-Efficient AI Command & Document Platform
-- Compatible with SQLite and PostgreSQL

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Commands Table (Stores slash commands & hidden System Blueprints)
CREATE TABLE IF NOT EXISTS commands (
    id VARCHAR(36) PRIMARY KEY,
    command_name VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    description VARCHAR(255) NOT NULL,
    system_blueprint TEXT NOT NULL,
    max_token_limit INTEGER DEFAULT 400,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. History Table (Stores user queries, commands used, AI output & token metrics)
CREATE TABLE IF NOT EXISTS history (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    command_used VARCHAR(50) NOT NULL,
    user_query TEXT NOT NULL,
    wrapped_prompt TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    estimated_tokens_saved INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Documents Table (Repository of 100-200 completed project docs)
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(255) DEFAULT '',
    status VARCHAR(50) DEFAULT 'Completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Core Production Slash Commands
INSERT OR IGNORE INTO commands (id, command_name, category, description, system_blueprint, max_token_limit) VALUES
('cmd-101', '/plan', 'Architecture & Design', 'Interactive 7-Step Discovery Engine building master architectural specifications', 'You are a Principal Software Architect. Execute the 7-Step Interactive Discovery loop. Return Step 1 with market analysis and MCQ positioning options A, B, C, D.', 600),
('cmd-102', '/error', 'Debugging & Errors', 'Cross-file error scanner diagnosing stack traces with exact line fixes', 'You are an automated debugger. Analyze error stack trace across imports. Output: 1) Root Cause (1 sentence), 2) Corrected Code Block, 3) Prevention Note.', 350),
('cmd-103', '/api', 'API & Data Contracts', 'Design lean REST/GraphQL API specs & TypeScript data contracts', 'You are a precision API Spec Architect. Generate production-ready TypeScript interfaces or Pydantic models. Output directly starting with the code block.', 400),
('cmd-104', '/ui', 'UI/UX & Frontend', 'Create production-ready React component styled with Tailwind CSS', 'You are a Principal Frontend Engineer. Generate self-contained React JSX components styled with Tailwind CSS. Code block only.', 500),
('cmd-105', '/refactor-o-n', 'Performance & Refactoring', 'Refactor O(N^2) nested loops into O(N) Hash Map lookups', 'Refactor code complexity from O(N^2) to O(N) using Hash Maps / Sets. Output improved code + time/space complexity comparison.', 350),
('cmd-106', '/db-schema', 'Database & Storage', 'Generate production-grade SQL DDL schemas with indexes & foreign keys', 'You are a DB Administrator. Output PostgreSQL/SQLite DDL statements with primary keys, foreign key constraints, and performance indexes. SQL block only.', 400),
('cmd-107', '/security-audit', 'Security & Audits', 'Perform OWASP Top 10 vulnerability audit on provided code snippet', 'Perform OWASP Top 10 Security Audit: 1) Vulnerability Identified, 2) CVSS Severity, 3) Remediated Code Block. Compact output.', 400),
('cmd-108', '/dockerfile', 'DevOps & Infrastructure', 'Write ultra-lean multi-stage Dockerfile using Alpine Linux base', 'Write multi-stage build Dockerfile minimizing final image size. Include non-root user security practices. Dockerfile block only.', 350),
('cmd-109', '/unit-test', 'Testing & QA', 'Write high-coverage Jest / PyTest unit tests with boundary mocks', 'Write unit test suite using PyTest / Jest: Test happy path, error cases, and mock external API dependencies. Code block only.', 400),
('cmd-110', '/readme-gen', 'Documentation & ADRs', 'Generate high-impact GitHub README.md with badges, features, and setup steps', 'Generate professional GitHub README.md containing Badges, Features, Prerequisites, Quick Start commands, and License block.', 450);

-- Seed Sample Completed Documents
INSERT OR IGNORE INTO documents (id, title, category, description, content, tags, status) VALUES
('doc-101', 'FastAPI JWT Auth & Refresh Token Pipeline', 'Backend', 'Completed JWT authentication service with access tokens, HTTP-only refresh cookies, and password hashing.', 'Implementation details for OAuth2 Bearer password flow using PassLib bcrypt and PyJWT.', 'python,fastapi,jwt,auth', 'Completed'),
('doc-102', 'Stripe Payment Gateway Webhook Handler', 'Backend', 'Production ready Stripe checkout session workflow with subscription tier webhooks and signature validation.', 'Handles invoice.payment_succeeded and customer.subscription.deleted events.', 'stripe,backend,payments,webhooks', 'Completed'),
('doc-103', 'React Glassmorphism Modern UI Component Kit', 'Frontend', 'Completed Tailwind CSS UI design library featuring dark mode, blurred cards, and interactive modal dialogs.', 'Includes Modal, Toast, Navbar, and CommandInput components.', 'react,tailwind,ui,frontend', 'Completed'),
('doc-104', 'PostgreSQL Database Index & Query Optimizer', 'Database', 'Optimized database indexes on history and query tables reducing latency from 450ms to 12ms under load.', 'B-tree index configuration on history(user_id, created_at).', 'sql,postgres,indexing,performance', 'Completed'),
('doc-105', 'Docker Multi-Stage Build & Compose Workflow', 'DevOps', 'Lean production Dockerfile for Python FastAPI and Vite React app using Nginx reverse proxy.', 'Alpine based multi-stage image minimizing container footprint to 110MB.', 'docker,devops,nginx,container', 'Completed'),
('doc-106', 'OpenAI & Anthropic LLM Token Capping Service', 'AI Architecture', 'Low-token prompt wrapper that caps max completion tokens and injects zero-fluff markdown system directives.', 'Reduces token usage by >65% across multi-turn interactions.', 'llm,openai,anthropic,tokens', 'Completed'),
('doc-107', 'Redis Rate Limiter Middleware for API Endpoints', 'Backend', 'Sliding window rate limiter enforcing 100 requests per minute per IP address.', 'Uses Redis EVAL SHA scripts for atomic token bucket evaluation.', 'redis,rate-limit,fastapi,security', 'Completed'),
('doc-108', 'Vite & Tailwind CSS GitHub Pages Deployment Pipeline', 'DevOps', 'Automated GitHub Actions YAML workflow building React apps and publishing directly to gh-pages branch.', 'Handles base path resolution and asset hashing automatically.', 'github-actions,vite,gh-pages', 'Completed');
