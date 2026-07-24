// Senior Developer Completed Specifications & Architecture Repository

const DOCS_STORAGE_KEY = 'ai_slice_completed_docs_v2';

const INITIAL_COMPLETED_DOCUMENTS = [
  {
    id: 'doc-201',
    title: 'FastAPI JWT Auth & Refresh Token Cookie Pipeline',
    category: 'Backend',
    description: 'OAuth2 password flow with HS256 JWT access tokens (15m expiration), HttpOnly secure refresh cookies (7d), and PassLib bcrypt hashing.',
    content: `### Architecture Specification
- **Access Tokens**: Short-lived (15 min) JWT passed via Authorization header.
- **Refresh Tokens**: Long-lived (7 days) signed cookie (\`SameSite=Lax\`, \`HttpOnly\`).
- **Security Protocols**: CSRF double-submit cookie verification and Redis token revocation list.

### Database Tables
\`\`\`sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\``,
    tags: 'python,fastapi,jwt,oauth2,security',
    status: 'Completed'
  },
  {
    id: 'doc-202',
    title: 'Stripe Subscription & Webhook Processing Engine',
    category: 'Backend',
    description: 'Production-ready Stripe Checkout Session workflow with invoice webhook handlers, idempotency key checking, and subscription status syncing.',
    content: `### Webhook Event Pipeline
1. Receive raw body payload & verify \`Stripe-Signature\` header.
2. Route \`customer.subscription.created\` -> update DB subscription status to \`active\`.
3. Route \`invoice.payment_failed\` -> trigger email notification & downgrade access grace period.`,
    tags: 'stripe,backend,payments,webhooks',
    status: 'Completed'
  },
  {
    id: 'doc-203',
    title: 'React Glassmorphism UI Kit & Monochrome Dark Theme',
    category: 'Frontend',
    description: 'Senior developer UI component library built with React 18, Vite, and Tailwind CSS. Features hairline borders, custom scrollbars, and accessible modal overlays.',
    content: `### Component Design Tokens
- **Surface Dark**: \`#111319\`
- **Card Dark**: \`#161821\`
- **Hairline Border**: \`1px solid #252936\`
- **Typography**: Inter (sans-serif) + JetBrains Mono (code)`,
    tags: 'react,tailwind,design-system,frontend',
    status: 'Completed'
  },
  {
    id: 'doc-204',
    title: 'PostgreSQL High-Concurrency B-Tree Index Optimization',
    category: 'Database',
    description: 'Database query tuning for history and analytics tables. Applied composite indexes reducing lookup latency from 480ms to 11ms under 10k RPS load.',
    content: `### SQL DDL Indexes
\`\`\`sql
CREATE INDEX idx_history_user_created ON history(user_id, created_at DESC);
CREATE INDEX idx_documents_category_title ON documents(category, title);
\`\`\``,
    tags: 'sql,postgres,indexing,performance',
    status: 'Completed'
  },
  {
    id: 'doc-205',
    title: 'Docker Multi-Stage Alpine Build & Nginx Reverse Proxy',
    category: 'DevOps',
    description: 'Production Dockerfile using 2-stage build (Node build container -> Nginx static server). Compressed final image footprint from 850MB down to 24MB.',
    content: `### Dockerfile Structure
\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\``,
    tags: 'docker,devops,nginx,ci-cd',
    status: 'Completed'
  },
  {
    id: 'doc-206',
    title: 'OpenAI & Anthropic Prompt Wrapper & Token Capping Engine',
    category: 'AI Architecture',
    description: 'System blueprint routing engine that intercepts user queries, injects strict markdown constraints, caps max completion tokens, and measures exact token savings.',
    content: `### Prompt Wrapper Pipeline
1. Parse user input for slash command (\`/plan\`, \`/error\`, \`/api\`, \`/ui\`).
2. Load associated System Blueprint instruction markdown.
3. Pass wrapped prompt to LLM SDK with \`max_tokens\` cap.
4. Calculate baseline conversational usage vs wrapped token usage.`,
    tags: 'llm,openai,anthropic,tokens,ai-arch',
    status: 'Completed'
  },
  {
    id: 'doc-207',
    title: 'Redis Sliding-Window Rate Limiting Middleware',
    category: 'Backend',
    description: 'Atomic token bucket rate limiter using Lua evaluation scripts. Enforces per-IP and per-API-key throughput constraints (100 req/min).',
    content: `### Redis Lua Evaluation Script
\`\`\`lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")
if current + 1 > limit then return 0 else redis.call("INCRBY", key, 1) redis.call("EXPIRE", key, 60) return 1 end
\`\`\``,
    tags: 'redis,rate-limit,fastapi,security',
    status: 'Completed'
  },
  {
    id: 'doc-208',
    title: 'Vite & Tailwind CSS GitHub Pages Deployment Pipeline',
    category: 'DevOps',
    description: 'Automated GitHub Actions CI/CD workflow building Vite React static bundles and deploying directly to the gh-pages branch.',
    content: `### GitHub Actions Deployment File
Location: \`.github/workflows/deploy.yml\`
Triggers on \`push\` to \`main\` branch. Builds \`frontend/dist\` and deploys via \`JamesIves/github-pages-deploy-action@v4\`.`,
    tags: 'github-actions,vite,gh-pages,devops',
    status: 'Completed'
  },
  {
    id: 'doc-209',
    title: 'GraphQL Schema & DataLoader N+1 Query Eliminator',
    category: 'Backend',
    description: 'DataLoader batching engine grouping relational database queries in a single event loop tick, reducing SQL query volume by 90%.',
    content: `### DataLoader Implementation
\`\`\`typescript
export const userBatchLoader = new DataLoader<string, User>(async (userIds) => {
  const users = await db.users.findMany({ where: { id: { in: [...userIds] } } });
  return userIds.map(id => users.find(u => u.id === id)!);
});
\`\`\``,
    tags: 'graphql,dataloader,backend,performance',
    status: 'Completed'
  },
  {
    id: 'doc-210',
    title: 'WebSocket Real-Time Notification & Heartbeat Manager',
    category: 'Backend',
    description: 'ASGI FastAPI WebSocket endpoint handling client ping/pong heartbeats, reconnection fallback, and Redis pub/sub broadcast channels.',
    content: `### Connection Manager
Manages active socket sets, client disconnect cleanups, and broadcasting payload frames to specific channel subscriptions.`,
    tags: 'websocket,realtime,python,fastapi',
    status: 'Completed'
  }
];

export function getClientDocuments(searchQuery = '', category = 'All', statusFilter = 'All') {
  let docs = INITIAL_COMPLETED_DOCUMENTS;
  
  try {
    const customDocsRaw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (customDocsRaw) {
      const customDocs = JSON.parse(customDocsRaw);
      docs = [...customDocs, ...INITIAL_COMPLETED_DOCUMENTS];
    }
  } catch (e) {}

  const s = searchQuery.trim().toLowerCase();
  const cat = category.trim().toLowerCase();
  const st = statusFilter.trim().toLowerCase();

  return docs.filter(doc => {
    const matchCategory = cat === 'all' || doc.category.toLowerCase() === cat;
    const matchStatus = st === 'all' || (doc.status || 'completed').toLowerCase() === st;
    const matchSearch = !s || 
      doc.title.toLowerCase().includes(s) || 
      doc.description.toLowerCase().includes(s) || 
      doc.tags.toLowerCase().includes(s) ||
      (doc.content && doc.content.toLowerCase().includes(s));
    
    return matchCategory && matchStatus && matchSearch;
  });
}

export function saveClientDocument(newDoc) {
  try {
    const customDocsRaw = localStorage.getItem(DOCS_STORAGE_KEY);
    const customDocs = customDocsRaw ? JSON.parse(customDocsRaw) : [];
    
    const docToSave = {
      id: `doc-user-${Date.now()}`,
      title: newDoc.title,
      category: newDoc.category || 'Backend',
      description: newDoc.description,
      content: newDoc.content || newDoc.description,
      tags: newDoc.tags || '',
      status: newDoc.status || 'Completed',
      created_at: new Date().toISOString()
    };

    const updated = [docToSave, ...customDocs];
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    return docToSave;
  } catch (e) {
    console.error("Failed to save custom document", e);
    return null;
  }
}

export function deleteClientDocument(docId) {
  try {
    const customDocsRaw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (!customDocsRaw) return false;
    const customDocs = JSON.parse(customDocsRaw);
    const updated = customDocs.filter(d => d.id !== docId);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}
