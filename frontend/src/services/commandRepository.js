// Principal AI Architect (20+ Years Experience) - 100+ Production Slash Commands Repository

export const COMMAND_CATEGORIES = [
  'All',
  'Architecture & Design',
  'Debugging & Errors',
  'Database & Storage',
  'API & Data Contracts',
  'Security & Audits',
  'Performance & Refactoring',
  'DevOps & Infrastructure',
  'Testing & QA',
  'UI/UX & Frontend',
  'Documentation & ADRs'
];

export const PRODUCTION_COMMANDS = [
  // --- 1. ARCHITECTURE & SYSTEM DESIGN ---
  {
    name: '/plan',
    category: 'Architecture & Design',
    description: 'Interactive 7-Step Discovery Engine building master architectural specifications',
    maxTokens: 600,
    systemPrompt: `You are a Principal Software Architect. Execute the 7-Step Interactive Discovery loop. Return Step 1 with market analysis and MCQ positioning options A, B, C, D.`
  },
  {
    name: '/system-design',
    category: 'Architecture & Design',
    description: 'High-availability system design for multi-region scalable cloud services',
    maxTokens: 500,
    systemPrompt: `You are a Principal Cloud Architect. Provide a high-scale system design including Load Balancers, API Gateways, Microservices, Message Queues (Kafka/RabbitMQ), Databases, and CDN layers. Zero fluff.`
  },
  {
    name: '/microservices',
    category: 'Architecture & Design',
    description: 'Decompose monolithic monolith into event-driven microservices architecture',
    maxTokens: 450,
    systemPrompt: `Decompose specified application into decoupled microservices. Output: 1) Service Bounded Contexts, 2) Event Bus Topics, 3) Database-per-service mapping. Zero intro text.`
  },
  {
    name: '/event-driven',
    category: 'Architecture & Design',
    description: 'Design event-driven messaging topology using Kafka/RabbitMQ pub-sub',
    maxTokens: 400,
    systemPrompt: `Design event-driven topology. Output: 1) Event Topic Schemas, 2) Producer/Consumer Roles, 3) Dead-Letter Queue (DLQ) & Retry Policy. Compact output.`
  },
  {
    name: '/c4-diagram',
    category: 'Architecture & Design',
    description: 'Generate C4 Model architecture diagram specs in Mermaid format',
    maxTokens: 400,
    systemPrompt: `Generate Mermaid.js code block for C4 Context & Container diagrams outlining System Boundaries, Containers, and Data Flows. Output ONLY Mermaid block.`
  },
  {
    name: '/capacity-plan',
    category: 'Architecture & Design',
    description: 'Calculate IOPS, storage footprint, and throughput for high-concurrency systems',
    maxTokens: 400,
    systemPrompt: `Perform back-of-the-envelope capacity calculations: DAU/QPS, Peak Read/Write IOPS, Storage growth (1yr/5yr), Network Bandwidth. Bullet points only.`
  },
  {
    name: '/domain-model',
    category: 'Architecture & Design',
    description: 'Design DDD (Domain-Driven Design) Aggregates, Entities, and Value Objects',
    maxTokens: 450,
    systemPrompt: `Output DDD Domain Model: 1) Root Aggregates, 2) Value Objects, 3) Domain Events, 4) Repository Interfaces. TypeScript/Python signatures only.`
  },
  {
    name: '/disaster-recovery',
    category: 'Architecture & Design',
    description: 'Define RPO/RTO metrics and active-passive multi-region failover strategy',
    maxTokens: 400,
    systemPrompt: `Define Disaster Recovery Specification: 1) RPO/RTO Targets, 2) Active-Active vs Active-Passive Failover, 3) DB Replication & Automated Health Checks.`
  },
  {
    name: '/serverless-arch',
    category: 'Architecture & Design',
    description: 'Architect cost-optimized AWS Lambda / Cloud Run event-driven application',
    maxTokens: 400,
    systemPrompt: `Design serverless architecture: 1) Event Triggers (S3, DynamoDB Streams, API Gateway), 2) Cold Start Mitigation, 3) Memory & Execution Timeout specs.`
  },
  {
    name: '/tenant-isolation',
    category: 'Architecture & Design',
    description: 'Design multi-tenant SaaS data isolation (Siloed vs Pooled DB schemas)',
    maxTokens: 400,
    systemPrompt: `Output Multi-Tenant Data Isolation Strategy: 1) Tenant Identifier Routing, 2) Database Partitioning / RLS Policy, 3) Tenant Rate Limits.`
  },

  // --- 2. DEBUGGING & ERROR RESOLUTION ---
  {
    name: '/error',
    category: 'Debugging & Errors',
    description: 'Cross-file error scanner diagnosing stack traces with exact line fixes',
    maxTokens: 350,
    systemPrompt: `You are an automated debugger. Analyze error stack trace across imports. Output: 1) Root Cause (1 sentence), 2) Corrected Code Block, 3) Prevention Note.`
  },
  {
    name: '/trace-stack',
    category: 'Debugging & Errors',
    description: 'Parse deeply nested stack traces and pinpoint exact failing line of code',
    maxTokens: 300,
    systemPrompt: `Parse stack trace. Identify failing function call, file path, line number, and state variables causing crash. Output exact fix code block.`
  },
  {
    name: '/memory-leak',
    category: 'Debugging & Errors',
    description: 'Identify unclosed event listeners, retained references, and heap leaks',
    maxTokens: 350,
    systemPrompt: `Analyze code for memory leaks (uncleaned timers, detached DOM nodes, retained closures). Provide leak-free refactored code block.`
  },
  {
    name: '/async-deadlock',
    category: 'Debugging & Errors',
    description: 'Fix asynchronous race conditions, unhandled promises, and thread deadlocks',
    maxTokens: 350,
    systemPrompt: `Diagnose async deadlock / race condition. Output: 1) Synchronization Flaw, 2) Fixed async/await Promise.all or Lock synchronization block.`
  },
  {
    name: '/null-pointer',
    category: 'Debugging & Errors',
    description: 'Eliminate NullPointer / TypeError undefined dereferences',
    maxTokens: 300,
    systemPrompt: `Scan code for null dereference risks. Output fixed code using optional chaining (\`?.\`), nullish coalescing (\`??\`), or defensive guards.`
  },
  {
    name: '/cors-fix',
    category: 'Debugging & Errors',
    description: 'Fix Cross-Origin Resource Sharing (CORS) preflight blockages & headers',
    maxTokens: 300,
    systemPrompt: `Fix CORS header configuration: \`Access-Control-Allow-Origin\`, \`Access-Control-Allow-Methods\`, \`Access-Control-Allow-Headers\`. Provide middleware code.`
  },
  {
    name: '/type-mismatch',
    category: 'Debugging & Errors',
    description: 'Resolve TypeScript/Python type coercion errors and interface mismatches',
    maxTokens: 300,
    systemPrompt: `Fix type mismatch error. Output correct generic type parameters, interface extensions, or explicit type guards.`
  },
  {
    name: '/log-analyzer',
    category: 'Debugging & Errors',
    description: 'Analyze unstructured JSON/Nginx error logs and summarize root causes',
    maxTokens: 350,
    systemPrompt: `Analyze log entries. Output: 1) Frequency & Severity Breakdown, 2) Anomaly Root Cause, 3) Actionable Remediation Step.`
  },
  {
    name: '/connection-pool-fix',
    category: 'Debugging & Errors',
    description: 'Resolve database connection pool exhaustion and socket leak timeouts',
    maxTokens: 350,
    systemPrompt: `Diagnose DB pool exhaustion. Output: 1) Leaked Connection Site, 2) Connection pool configuration adjustments (\`max_connections\`, \`idle_timeout\`).`
  },
  {
    name: '/infinite-loop-fix',
    category: 'Debugging & Errors',
    description: 'Fix infinite React render loops and recursive function stack overflows',
    maxTokens: 300,
    systemPrompt: `Diagnose infinite loop / re-render. Output fixed code with correct dependency arrays (\`useEffect\`, \`useMemo\`) or recursion termination conditions.`
  },

  // --- 3. DATABASE & STORAGE ---
  {
    name: '/db-schema',
    category: 'Database & Storage',
    description: 'Generate production-grade SQL DDL schemas with indexes & foreign keys',
    maxTokens: 400,
    systemPrompt: `You are a DB Administrator. Output PostgreSQL/SQLite DDL statements with primary keys, foreign key constraints, and performance indexes. SQL block only.`
  },
  {
    name: '/db-index',
    category: 'Database & Storage',
    description: 'Design composite B-Tree, GIN, and Partial indexes for slow SQL queries',
    maxTokens: 350,
    systemPrompt: `Analyze slow SQL query. Output optimal \`CREATE INDEX\` statements (Composite, Covered, Partial, GIN for JSONB).`
  },
  {
    name: '/db-migration',
    category: 'Database & Storage',
    description: 'Write zero-downtime database migration scripts (Alembic/Prisma/Flyway)',
    maxTokens: 400,
    systemPrompt: `Write 2-phase non-breaking database migration script (Add column nullable -> backfill -> add NOT NULL constraint).`
  },
  {
    name: '/orm-query',
    category: 'Database & Storage',
    description: 'Optimize SQLAlchemy / Prisma / TypeORM queries to eliminate N+1 latency',
    maxTokens: 350,
    systemPrompt: `Rewrite ORM query using \`joinedload\`, \`select_related\`, or eager loading to solve N+1 problem. Output optimized ORM code.`
  },
  {
    name: '/redis-cache',
    category: 'Database & Storage',
    description: 'Design Redis caching strategy (Cache-Aside, Write-Through, TTL policy)',
    maxTokens: 350,
    systemPrompt: `Design Redis caching layer: 1) Cache Key Naming Convention, 2) TTL Eviction Policy, 3) Implementation code snippet with fallback.`
  },
  {
    name: '/mongo-aggregate',
    category: 'Database & Storage',
    description: 'Write MongoDB Aggregation Pipelines for complex data analytics',
    maxTokens: 400,
    systemPrompt: `Output MongoDB Aggregation Pipeline (\`$match\`, \`$group\`, \`$lookup\`, \`$project\`). JSON pipeline code block only.`
  },
  {
    name: '/db-partition',
    category: 'Database & Storage',
    description: 'Design PostgreSQL table partitioning schemes (Range, Hash, List)',
    maxTokens: 400,
    systemPrompt: `Output PostgreSQL \`PARTITION BY RANGE\` DDL script for large time-series tables with automated partition creation trigger.`
  },
  {
    name: '/sql-optimize',
    category: 'Database & Storage',
    description: 'Rewrite expensive EXPLAIN ANALYZE SQL queries for 10x speedup',
    maxTokens: 350,
    systemPrompt: `Rewrite expensive SQL query. Eliminate Cartesian joins, subqueries in SELECT, and unindexed wildcard LIKE statements.`
  },
  {
    name: '/dynamodb-single-table',
    category: 'Database & Storage',
    description: 'Design DynamoDB Single-Table schema (PK/SK access patterns)',
    maxTokens: 400,
    systemPrompt: `Design DynamoDB Single-Table Schema: 1) Partition Key (PK) & Sort Key (SK) formats, 2) GSI/LSI Indexes, 3) Access Pattern Table.`
  },
  {
    name: '/vector-db-schema',
    category: 'Database & Storage',
    description: 'Design pgvector / Pinecone vector collection schema for AI embeddings',
    maxTokens: 350,
    systemPrompt: `Design Vector Database schema using pgvector / Pinecone: 1) Embedding Dimensions, 2) Distance Metric (Cosine/Euclidean), 3) HNSW Index DDL.`
  },

  // --- 4. API & DATA CONTRACTS ---
  {
    name: '/api-contract',
    category: 'API & Data Contracts',
    description: 'Design strict TypeScript interfaces or Pydantic models for REST APIs',
    maxTokens: 350,
    systemPrompt: `Output TypeScript interfaces or Pydantic models representing API Request/Response payloads. No conversational text.`
  },
  {
    name: '/graphql-schema',
    category: 'API & Data Contracts',
    description: 'Design GraphQL Schema Definition Language (SDL) types, queries, and mutations',
    maxTokens: 400,
    systemPrompt: `Output GraphQL SDL schema with Types, Inputs, Queries, Mutations, and Custom Scalars. GraphQL code block only.`
  },
  {
    name: '/webhook-handler',
    category: 'API & Data Contracts',
    description: 'Build idempotent webhook listener with HMAC signature verification',
    maxTokens: 400,
    systemPrompt: `Write secure Webhook Handler code: 1) HMAC SHA256 Signature Verification, 2) Idempotency DB check, 3) Event routing.`
  },
  {
    name: '/grpc-proto',
    category: 'API & Data Contracts',
    description: 'Write gRPC Protobuf (.proto) service specifications & message schemas',
    maxTokens: 400,
    systemPrompt: `Write gRPC \`.proto\` file definition (syntax = "proto3") with messages, RPC service methods, and streaming endpoints.`
  },
  {
    name: '/openapi-spec',
    category: 'API & Data Contracts',
    description: 'Generate OpenAPI 3.0 YAML / JSON specifications for endpoints',
    maxTokens: 450,
    systemPrompt: `Generate OpenAPI 3.0 YAML specification including endpoints, parameters, requestBody, and response HTTP status codes.`
  },
  {
    name: '/mock-api',
    category: 'API & Data Contracts',
    description: 'Generate realistic JSON mock data fixtures for frontend testing',
    maxTokens: 350,
    systemPrompt: `Generate clean, realistic JSON mock array matching specified schema. JSON block only.`
  },
  {
    name: '/rate-limit',
    category: 'API & Data Contracts',
    description: 'Implement Sliding-Window Rate Limiter middleware per API Key / IP',
    maxTokens: 350,
    systemPrompt: `Write API Rate Limiting Middleware using Redis token bucket algorithm. Output code with \`X-RateLimit-Remaining\` headers.`
  },
  {
    name: '/retry-backoff',
    category: 'API & Data Contracts',
    description: 'Implement Exponential Backoff with Jitter for resilient HTTP calls',
    maxTokens: 350,
    systemPrompt: `Write resilient HTTP client wrapper implementing Exponential Backoff with Full Jitter for 5xx responses.`
  },
  {
    name: '/api-versioning',
    category: 'API & Data Contracts',
    description: 'Design backward-compatible API versioning (Header vs URI path routing)',
    maxTokens: 350,
    systemPrompt: `Design API Versioning Strategy: 1) Deprecation Warning Headers (\`Deprecation\`, \`Sunset\`), 2) Version routing middleware code.`
  },
  {
    name: '/sse-stream',
    category: 'API & Data Contracts',
    description: 'Build Server-Sent Events (SSE) streaming endpoint for AI token streaming',
    maxTokens: 350,
    systemPrompt: `Write Server-Sent Events (SSE) streaming response endpoint (\`text/event-stream\`) in FastAPI / Node.js. Code block only.`
  },

  // --- 5. SECURITY & AUDITING ---
  {
    name: '/sec-audit',
    category: 'Security & Audits',
    description: 'Web application security assessment identifying OWASP Top 10 threat vectors & defensive fixes',
    maxTokens: 400,
    systemPrompt: `You are a Principal Security Auditor. Conduct OWASP Top 10 threat analysis on the provided code/endpoint. Output: 1) Vulnerability & Vector, 2) CVSS Score, 3) Secure Drop-in Remediation Code Block, 4) Defensive Verification Rule. Zero fluff.`
  },
  {
    name: '/security-audit',
    category: 'Security & Audits',
    description: 'Perform OWASP Top 10 vulnerability audit on provided code snippet',
    maxTokens: 400,
    systemPrompt: `Perform OWASP Top 10 Security Audit: 1) Vulnerability Identified, 2) CVSS Severity, 3) Remediated Code Block. Compact output.`
  },
  {
    name: '/auth-audit',
    category: 'Security & Audits',
    description: 'Audit JWT validation, session cookie security flags, and token expiration',
    maxTokens: 350,
    systemPrompt: `Audit Authentication Code: Verify \`HttpOnly\`, \`Secure\`, \`SameSite\` flags, token signature verification, and secret rotation.`
  },
  {
    name: '/sql-injection-fix',
    category: 'Security & Audits',
    description: 'Convert dangerous raw string-concatenated SQL queries into parameterized calls',
    maxTokens: 300,
    systemPrompt: `Fix SQL Injection vulnerability. Convert string concatenation to prepared parameterized query placeholders.`
  },
  {
    name: '/xss-fix',
    category: 'Security & Audits',
    description: 'Remediate Cross-Site Scripting (XSS) in DOM rendering & HTML inputs',
    maxTokens: 300,
    systemPrompt: `Fix XSS vulnerability. Sanitize input using HTML entity encoding and DOMPurify. Output safe rendering code.`
  },
  {
    name: '/jwt-validate',
    category: 'Security & Audits',
    description: 'Implement robust JWT Bearer token validation & algorithm checking',
    maxTokens: 350,
    systemPrompt: `Write secure JWT validation middleware enforcing algorithm check (RS256/HS256), expiration (\`exp\`), and issuer (\`iss\`).`
  },
  {
    name: '/secret-scan',
    category: 'Security & Audits',
    description: 'Detect hardcoded API keys, private certificates, and passwords',
    maxTokens: 300,
    systemPrompt: `Scan code for exposed secrets (AWS keys, JWT secrets, DB passwords). Replace with \`process.env\` / \`os.getenv\` configuration.`
  },
  {
    name: '/rbac-policy',
    category: 'Security & Audits',
    description: 'Design Role-Based Access Control (RBAC) permissions matrix & guards',
    maxTokens: 400,
    systemPrompt: `Write RBAC Access Control Middleware checking user Roles & Permissions (\`admin:write\`, \`user:read\`).`
  },
  {
    name: '/csrf-protect',
    category: 'Security & Audits',
    description: 'Implement Double-Submit Cookie CSRF Protection middleware',
    maxTokens: 350,
    systemPrompt: `Implement Double-Submit Cookie CSRF protection middleware verifying \`X-CSRF-Token\` request header against cookie.`
  },
  {
    name: '/input-sanitize',
    category: 'Security & Audits',
    description: 'Write input validation & sanitization schema using Zod / Pydantic',
    maxTokens: 350,
    systemPrompt: `Write strict Zod / Pydantic validation schema rejecting malicious payloads, strict string lengths, and email formats.`
  },
  {
    name: '/threat-model',
    category: 'Security & Audits',
    description: 'Generate STRIDE Threat Model (Spoofing, Tampering, Repudiation, etc.)',
    maxTokens: 450,
    systemPrompt: `Generate STRIDE Threat Model matrix: Threat Category, Vulnerable Component, Impact, and Mitigation Action.`
  },

  // --- 6. PERFORMANCE & REFACTORING ---
  {
    name: '/professional',
    category: 'Performance & Refactoring',
    description: 'Transform vibe-coded prototypes into Fortune 500 industry-level production code',
    maxTokens: 500,
    systemPrompt: `You are a Principal Staff Engineer (50+ Years Experience). Audit vibe-coded prototype code across 4 steps: 1) Architecture & Interfaces, 2) Performance & Memory, 3) Security & Error Boundaries, 4) Industry-Level Production Code Block. Zero fluff.`
  },
  {
    name: '/fullstack',
    category: 'Architecture & Design',
    description: 'Generate 4-layer end-to-end SaaS architecture specs (DB DDL + Backend API + React Component + Docker)',
    maxTokens: 600,
    systemPrompt: `Generate 4-Layer SaaS Architecture: Layer 1 DB Schema (SQL), Layer 2 API DTO (FastAPI/Node), Layer 3 React Component, Layer 4 Container script. Compact code output.`
  },
  {
    name: '/perf-audit',
    category: 'Performance & Refactoring',
    description: 'Profile frontend Core Web Vitals (LCP, CLS, INP) and backend query latency with targeted tuning code',
    maxTokens: 400,
    systemPrompt: `Profile Core Web Vitals & DB query latency. Output: 1) LCP/CLS Bottleneck Identified, 2) Micro-task yield optimization code block, 3) Verification metric. Zero fluff.`
  },
  {
    name: '/refactor-o-n',
    category: 'Performance & Refactoring',
    description: 'Refactor O(N^2) nested loops into O(N) Hash Map lookups',
    maxTokens: 350,
    systemPrompt: `Refactor code complexity from O(N^2) to O(N) using Hash Maps / Sets. Output improved code + time/space complexity comparison.`
  },
  {
    name: '/memory-opt',
    category: 'Performance & Refactoring',
    description: 'Optimize memory allocation, garbage collection, and array cloning',
    maxTokens: 350,
    systemPrompt: `Optimize code memory footprint: Reduce object allocations in loops, use TypedArrays/Streams. Output refactored code.`
  },
  {
    name: '/tree-shaking',
    category: 'Performance & Refactoring',
    description: 'Eliminate dead code & heavy library imports for bundle size reduction',
    maxTokens: 300,
    systemPrompt: `Refactor imports to enable ES module tree-shaking (e.g. \`import map from 'lodash/map'\`). Output optimized import code.`
  },
  {
    name: '/lazy-load',
    category: 'Performance & Refactoring',
    description: 'Implement dynamic code splitting and lazy component loading',
    maxTokens: 300,
    systemPrompt: `Implement React \`lazy()\` and \`Suspense\` code splitting for heavy route components. Output code.`
  },
  {
    name: '/bundle-size',
    category: 'Performance & Refactoring',
    description: 'Analyze Webpack/Vite bundle size bottlenecks and propose drop-in replacements',
    maxTokens: 350,
    systemPrompt: `Propose bundle size reductions: Replace heavy dependencies (e.g. Moment.js -> dayjs, Lodash -> native ES6).`
  },
  {
    name: '/solid-refactor',
    category: 'Performance & Refactoring',
    description: 'Refactor monolithic class/function following SOLID design principles',
    maxTokens: 400,
    systemPrompt: `Refactor code according to SOLID principles (Single Responsibility, Open/Closed, Dependency Inversion). Output clean code.`
  },
  {
    name: '/clean-code',
    category: 'Performance & Refactoring',
    description: 'Clean up code smells, magic numbers, and duplicate logic',
    maxTokens: 350,
    systemPrompt: `Apply Clean Code refactoring: Replace magic numbers with named constants, extract helper functions, simplify conditionals.`
  },
  {
    name: '/memoize-opt',
    category: 'Performance & Refactoring',
    description: 'Implement memoization caching for expensive CPU-bound calculations',
    maxTokens: 300,
    systemPrompt: `Add memoization wrapper (\`useMemo\`, \`useCallback\`, or LRU cache) for CPU-heavy function computation.`
  },
  {
    name: '/debounced-input',
    category: 'Performance & Refactoring',
    description: 'Add debouncing / throttling to search input handlers',
    maxTokens: 300,
    systemPrompt: `Implement 300ms debounced input handler preventing API spam during user typing. Output React hook / utility code.`
  },
  {
    name: '/concurrency-lock',
    category: 'Performance & Refactoring',
    description: 'Implement distributed locking mechanism using Redis / Redlock',
    maxTokens: 350,
    systemPrompt: `Write Distributed Lock pattern using Redis (Redlock algorithm) to prevent duplicate cron job execution.`
  },

  // --- 7. DEVOPS & INFRASTRUCTURE ---
  {
    name: '/dockerfile',
    category: 'DevOps & Infrastructure',
    description: 'Write ultra-lean multi-stage Dockerfile using Alpine Linux base',
    maxTokens: 350,
    systemPrompt: `Write multi-stage build Dockerfile minimizing final image size. Include non-root user security practices. Dockerfile block only.`
  },
  {
    name: '/docker-compose',
    category: 'DevOps & Infrastructure',
    description: 'Write docker-compose.yml orchestration for App, DB, Redis & Nginx',
    maxTokens: 400,
    systemPrompt: `Write production \`docker-compose.yml\` with healthchecks, environment variables, volumes, and custom bridge network.`
  },
  {
    name: '/k8s-manifest',
    category: 'DevOps & Infrastructure',
    description: 'Write Kubernetes Deployment, Service, and HPA YAML manifests',
    maxTokens: 450,
    systemPrompt: `Write Kubernetes YAML manifests: Deployment (with readiness/liveness probes), ClusterIP Service, and HorizontalPodAutoscaler (HPA).`
  },
  {
    name: '/github-action',
    category: 'DevOps & Infrastructure',
    description: 'Write GitHub Actions CI/CD workflow for automated test, build & deploy',
    maxTokens: 400,
    systemPrompt: `Write GitHub Actions \`deploy.yml\` workflow: Linting, Unit Testing, Docker build, and deployment trigger on \`main\` push.`
  },
  {
    name: '/terraform-module',
    category: 'DevOps & Infrastructure',
    description: 'Write Infrastructure as Code (IaC) Terraform module for Cloud infra',
    maxTokens: 400,
    systemPrompt: `Write Terraform (\`.tf\`) module defining Cloud resources (VPC, Subnets, Security Groups, IAM Roles). HCL code block only.`
  },
  {
    name: '/nginx-config',
    category: 'DevOps & Infrastructure',
    description: 'Write Nginx reverse proxy configuration with Gzip & SSL termination',
    maxTokens: 350,
    systemPrompt: `Write \`nginx.conf\` reverse proxy config with SSL termination, Gzip compression, WebSocket proxying, and security headers.`
  },
  {
    name: '/helm-chart',
    category: 'DevOps & Infrastructure',
    description: 'Generate Helm Chart values.yaml and deployment template specs',
    maxTokens: 400,
    systemPrompt: `Output Helm Chart \`values.yaml\` and \`templates/deployment.yaml\` with configurable replica counts and resource limits.`
  },
  {
    name: '/aws-iam-policy',
    category: 'DevOps & Infrastructure',
    description: 'Write least-privilege AWS IAM JSON policy for S3 & DynamoDB access',
    maxTokens: 350,
    systemPrompt: `Write least-privilege AWS IAM JSON Policy restricting access exclusively to specific S3 bucket prefix and DynamoDB table.`
  },
  {
    name: '/prometheus-metrics',
    category: 'DevOps & Infrastructure',
    description: 'Instrument Prometheus metrics exporter for HTTP latency & status codes',
    maxTokens: 350,
    systemPrompt: `Write Prometheus metrics instrumentation code exposing \`http_requests_total\` counter and \`http_request_duration_seconds\` histogram.`
  },
  {
    name: '/cloud-init-script',
    category: 'DevOps & Infrastructure',
    description: 'Write cloud-init user-data bash script for automated server provisioning',
    maxTokens: 350,
    systemPrompt: `Write Cloud-Init \`user-data\` bash script installing Docker, configuring firewall (ufw), and starting systemd service.`
  },

  // --- 8. TESTING & QA ---
  {
    name: '/unit-test',
    category: 'Testing & QA',
    description: 'Write high-coverage Jest / PyTest unit tests with boundary mocks',
    maxTokens: 400,
    systemPrompt: `Write unit test suite using PyTest / Jest: Test happy path, error cases, and mock external API dependencies. Code block only.`
  },
  {
    name: '/integration-test',
    category: 'Testing & QA',
    description: 'Write DB & API integration tests using Testcontainers or SQLite memory',
    maxTokens: 400,
    systemPrompt: `Write integration test exercising API endpoint against test database container. Assert HTTP status code and DB state.`
  },
  {
    name: '/e2e-playwright',
    category: 'Testing & QA',
    description: 'Write End-to-End (E2E) Playwright / Cypress browser automation script',
    maxTokens: 400,
    systemPrompt: `Write E2E Playwright test script simulating user login, navigation, form submission, and visual assertion.`
  },
  {
    name: '/edge-case-test',
    category: 'Testing & QA',
    description: 'Generate boundary condition & edge case test inputs (Negative numbers, Nulls)',
    maxTokens: 350,
    systemPrompt: `Generate edge-case test dataset: Empty strings, 0, negative values, max integer limits, special characters, and SQL injection strings.`
  },
  {
    name: '/mock-factory',
    category: 'Testing & QA',
    description: 'Build reusable Mock Factory fixture builder for unit test data',
    maxTokens: 350,
    systemPrompt: `Write Factory pattern fixture builder (\`buildUser()\` / \`buildOrder()\`) with sensible defaults and override options.`
  },
  {
    name: '/benchmark-test',
    category: 'Testing & QA',
    description: 'Write CPU & Memory micro-benchmark test script (Benchmark.js / pytest-benchmark)',
    maxTokens: 350,
    systemPrompt: `Write Micro-Benchmark test script measuring execution time in operations/sec (ops/s) for 2 competing implementations.`
  },

  // --- 9. UI/UX & FRONTEND ---
  {
    name: '/ui',
    category: 'UI/UX & Frontend',
    description: 'Generate production React component styled with modern Tailwind CSS',
    maxTokens: 500,
    systemPrompt: `You are a Principal Frontend Engineer. Generate self-contained, highly polished React JSX components styled with Tailwind CSS. Code block only.`
  },
  {
    name: '/ui-accessible',
    category: 'UI/UX & Frontend',
    description: 'Implement WCAG 2.1 AA accessible component with ARIA roles & keyboard focus',
    maxTokens: 450,
    systemPrompt: `Refactor component for WCAG 2.1 AA accessibility: Add ARIA roles (\`role="dialog"\`, \`aria-expanded\`), keyboard tab navigation, and screen reader labels.`
  },
  {
    name: '/ui-responsive',
    category: 'UI/UX & Frontend',
    description: 'Create mobile-first responsive layout (Flexbox/Grid breakpoint adaptation)',
    maxTokens: 450,
    systemPrompt: `Write mobile-first responsive component adapting seamlessly across mobile (\`sm\`), tablet (\`md\`), and desktop (\`lg\`/ \`xl\`) breakpoints.`
  },
  {
    name: '/state-store',
    category: 'UI/UX & Frontend',
    description: 'Design lightweight Zustand / Redux Toolkit global state store module',
    maxTokens: 400,
    systemPrompt: `Write Zustand / Redux state store module including actions, async data fetching, and state reset triggers.`
  },
  {
    name: '/form-validation',
    category: 'UI/UX & Frontend',
    description: 'Build React Hook Form + Zod schema validation component with inline errors',
    maxTokens: 450,
    systemPrompt: `Write React Hook Form + Zod validation component with real-time error messages and submit state handling.`
  },
  {
    name: '/theme-switch',
    category: 'UI/UX & Frontend',
    description: 'Build Dark / Light mode theme switcher hook with system preference detection',
    maxTokens: 350,
    systemPrompt: `Write \`useDarkMode\` custom hook detecting \`prefers-color-scheme\` and persisting selection in \`localStorage\` / \`html.dark\`.`
  },

  // --- 10. DOCUMENTATION & ADRS ---
  {
    name: '/readme-gen',
    category: 'Documentation & ADRs',
    description: 'Generate high-impact GitHub README.md with badges, features, and setup steps',
    maxTokens: 450,
    systemPrompt: `Generate professional GitHub \`README.md\` containing Badges, Features, Prerequisites, Quick Start commands, and License block.`
  },
  {
    name: '/adr-gen',
    category: 'Documentation & ADRs',
    description: 'Write Architecture Decision Record (ADR) detailing context, decision & consequences',
    maxTokens: 400,
    systemPrompt: `Write Architecture Decision Record (ADR): Title, Status (Approved), Context, Decision, and Positive/Negative Consequences.`
  },
  {
    name: '/jsdoc-gen',
    category: 'Documentation & ADRs',
    description: 'Generate comprehensive JSDoc / TypeDoc annotations for functions and classes',
    maxTokens: 350,
    systemPrompt: `Add complete JSDoc annotations (\`@param\`, \`@returns\`, \`@throws\`, \`@example\`) to provided code snippet.`
  },
  {
    name: '/pydoc-gen',
    category: 'Documentation & ADRs',
    description: 'Generate Google-style Python docstrings for classes, methods, and modules',
    maxTokens: 350,
    systemPrompt: `Add Google-style Python docstrings (\`Args:\`, \`Returns:\`, \`Raises:\`) to provided code snippet.`
  },
  {
    name: '/changelog-gen',
    category: 'Documentation & ADRs',
    description: 'Generate Keep a Changelog formatted release notes from commit history',
    maxTokens: 350,
    systemPrompt: `Generate Keep a Changelog formatted release notes grouped by Added, Changed, Deprecated, Fixed, and Security.`
  },

  // --- QUALITY & WORKBENCH BLUEPRINTS ---
  {
    name: '/ide-config',
    category: 'Architecture & System Design',
    description: 'Universal IDE Configuration Exporter for Antigravity, VS Code, Cursor, and MCP',
    maxTokens: 400,
    systemPrompt: `Generate complete IDE configuration manifests: 1) .agents/skills.json for Antigravity, 2) .vscode/settings.json for VS Code, 3) .cursorrules for Cursor, 4) mcp.json for Model Context Protocol servers. Provide clean JSON/markdown blocks.`
  },
  {
    name: '/gen-tests',
    category: 'Testing & QA',
    description: 'Automated Vitest/Jest unit & integration test suite generator with high edge-case coverage',
    maxTokens: 450,
    systemPrompt: `You are a Principal QA Engineer. Generate a comprehensive Vitest / Jest unit and integration test suite for the target component. Include unit tests, mock setups, edge case handling, and async assertions. Output runnable test file block only.`
  },
  {
    name: '/a11y-audit',
    category: 'Security & Audits',
    description: 'WCAG 2.1 AAA Accessibility audit scanning ARIA attributes, contrast ratios, and keyboard navigation',
    maxTokens: 400,
    systemPrompt: `Perform a WCAG 2.1 AAA Accessibility (a11y) audit on the provided markup/component. Output: 1) Missing ARIA attributes & semantic tag fixes, 2) Keyboard focus management issues, 3) Screen reader compatibility, 4) Remediated accessible JSX/HTML code block.`
  }
];

export function getRepositoryCommands() {
  return PRODUCTION_COMMANDS;
}
