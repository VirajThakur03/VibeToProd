// Interactive 7-Step Website Architect Engine for /plan

const PLAN_SESSIONS_KEY = 'ai_slice_plan_sessions_v1';

export const STEPS_CONFIG = [
  {
    step: 1,
    title: 'Step 1: Market Research & Competitor Analysis',
    mcqQuestion: 'Choose your Primary Competitive Positioning:',
    options: [
      { key: 'A', label: 'Premium / Luxury Positioning (High-end artisanal brand & custom packaging)' },
      { key: 'B', label: 'Budget / Value Focus (Competitive pricing, bulk subscriptions & discount tiers)' },
      { key: 'C', label: 'Eco-Friendly & Sustainable (Direct-trade sourcing, zero-waste packaging)' },
      { key: 'D', label: 'Tech-Forward & Automated (App-based ordering, subscription AI recommendations)' }
    ]
  },
  {
    step: 2,
    title: 'Step 2: Main Structural Components & Architecture',
    mcqQuestion: 'Select your preferred User Access & Account Model:',
    options: [
      { key: 'A', label: 'Guest Checkouts Only (Frictionless, high-speed single purchase flow)' },
      { key: 'B', label: 'Mandatory User Accounts (Saved addresses, order tracking & history)' },
      { key: 'C', label: 'Social & One-Click Login (Google, Apple, OAuth 2.0 integration)' },
      { key: 'D', label: 'Multi-Tier Memberships (VIP perks, points system, recurring access levels)' }
    ]
  },
  {
    step: 3,
    title: 'Step 3: Core & Essential Features',
    mcqQuestion: 'Select your Catalog & Product Presentation Style:',
    options: [
      { key: 'A', label: 'Dynamic Grid View with Multi-Attribute Filters (Roast Level, Origin, Flavor)' },
      { key: 'B', label: 'Single-Page Infinite Scroll Catalog (Minimalist fluid experience)' },
      { key: 'C', label: 'Narrative & Story-Driven Layout (Immersive brand storytelling per product)' },
      { key: 'D', label: 'Interactive 3D / AR Visualizer (360° product inspection & custom bean builder)' }
    ]
  },
  {
    step: 4,
    title: 'Step 4: Advanced Utilities & Payment Integrations',
    mcqQuestion: 'Select your Primary Transaction & Payment Gateway Setup:',
    options: [
      { key: 'A', label: 'Standard Credit Cards & Digital Wallets (Stripe, Apple Pay, Google Pay)' },
      { key: 'B', label: 'Subscription-Based Recurring Billing (Weekly/Monthly automated shipments)' },
      { key: 'C', label: 'Buy-Now-Pay-Later Integration (Klarna, Afterpay split payments)' },
      { key: 'D', label: 'Local Pickup & Cash-on-Delivery (Geofenced store locator & COD)' }
    ]
  },
  {
    step: 5,
    title: 'Step 5: Technology Stack Recommendation',
    mcqQuestion: 'Select your preferred Engineering Ecosystem:',
    options: [
      { key: 'A', label: 'Rapid No-Code / Shopify Storefront (Fast deployment, managed hosting)' },
      { key: 'B', label: 'Robust Python / FastAPI Backend (Data-heavy, custom ML recommendations)' },
      { key: 'C', label: 'Scalable Next.js / React Framework (Ultra-fast SSR, Vercel edge deployment)' },
      { key: 'D', label: 'Lightweight PHP / Headless WordPress (Flexible CMS content control)' }
    ]
  },
  {
    step: 6,
    title: 'Step 6: Strategic Differentiation & Unique Features',
    mcqQuestion: 'Select the Primary Unique Feature to prioritize for your MVP:',
    options: [
      { key: 'A', label: 'AI Flavor Profile Quiz (Matches user taste preferences to custom roasts)' },
      { key: 'B', label: 'Live Roastery Webcam & Batch Tracker (Transparent real-time preparation stream)' },
      { key: 'C', label: 'Custom Coffee Club Gifting & Corporate Bulk Engine' },
      { key: 'D', label: 'Interactive Carbon Footprint & Bean Traceability Map' }
    ]
  },
  {
    step: 7,
    title: 'Step 7: Future Scale & Long-Term Master Blueprint',
    mcqQuestion: null,
    options: []
  }
];

export function getActivePlanSession(idea) {
  try {
    const raw = localStorage.getItem(PLAN_SESSIONS_KEY);
    if (raw) {
      const sessions = JSON.parse(raw);
      if (sessions[idea]) return sessions[idea];
    }
  } catch (e) {}

  return {
    idea,
    currentStep: 1,
    choices: {},
    history: []
  };
}

export function savePlanSession(session) {
  try {
    const raw = localStorage.getItem(PLAN_SESSIONS_KEY);
    const sessions = raw ? JSON.parse(raw) : {};
    sessions[session.idea] = session;
    localStorage.setItem(PLAN_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {}
}

export function processPlanStep(idea, choice = null) {
  const session = getActivePlanSession(idea);

  if (choice && choice.length === 1) {
    const validChoice = choice.toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(validChoice)) {
      session.choices[`step_${session.currentStep}`] = validChoice;
      if (session.currentStep < 7) {
        session.currentStep += 1;
      }
    }
  }

  const stepConfig = STEPS_CONFIG.find(s => s.step === session.currentStep) || STEPS_CONFIG[0];
  let content = '';

  const cleanIdea = idea.replace(/^\/plan\s*/i, '').trim() || 'New Web Application';

  if (session.currentStep === 1) {
    content = `### Step 1: Market Research & Competitor Analysis for "${cleanIdea}"

**Top Competitor Landscape & Industry Standards:**
- **Market Dynamics**: Leading platforms in this vertical emphasize high-speed checkout, mobile-first responsive layouts, and transparent brand storytelling.
- **Key Competitor Best Practices**:
  1. High-contrast typography and clear call-to-action (CTA) hero sections.
  2. Integrated customer reviews, Trustpilot badges, and social proof feeds.
  3. Optimized search & multi-attribute filter navigation.
- **Identified Market Gap**: Most competitors lack hyper-personalized user onboarding quizzes and real-time order customizers.

---
### Interactive MCQ - Positioning Decision:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to proceed to Step 2.*`;

  } else if (session.currentStep === 2) {
    const p1 = session.choices['step_1'] || 'A';
    content = `### Step 2: Main Structural Components & Architecture
*(Incorporating Positioning Choice: Option ${p1})*

**Technical Architecture Breakdown:**
1. **Frontend Presentation Layer**:
   - Single Page Application (SPA) with server-side pre-rendering for SEO.
   - Dynamic Hero Banner, Filterable Catalog, Interactive Cart Drawer.
2. **Backend & Database Infrastructure**:
   - Schema tables: \`users\`, \`products\`, \`orders\`, \`inventory\`, \`analytics\`.
   - Redis caching for product catalog queries (<15ms response latency).
3. **Admin Dashboard Capabilities**:
   - Inventory management, order status pipeline, customer analytics charts.

---
### Interactive MCQ - User Access & Account Model:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to proceed to Step 3.*`;

  } else if (session.currentStep === 3) {
    const p2 = session.choices['step_2'] || 'B';
    content = `### Step 3: Core & Essential Features
*(Incorporating User Access Model: Option ${p2})*

**Essential Site Utilities Checklist:**
- [x] **Header Navigation**: Sticky navbar with multi-currency toggle and search bar.
- [x] **Product Catalog**: Detail cards with zoom gallery, stock badges, and quick-add drawer.
- [x] **Checkout Engine**: Multi-step checkout with address validation and promo codes.
- [x] **Customer Portal**: Order history, shipment tracking, and saved payment profiles.
- [x] **Security Layer**: SSL/TLS encryption, CORS policies, and rate-limited endpoints.

---
### Interactive MCQ - Catalog Presentation Style:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to proceed to Step 4.*`;

  } else if (session.currentStep === 4) {
    const p3 = session.choices['step_3'] || 'A';
    content = `### Step 4: Advanced Utilities & Payment Integrations
*(Incorporating Catalog Presentation: Option ${p3})*

**Financial & Transactional Infrastructure:**
- **Primary Payment Gateways**: Stripe Elements + PayPal Smart Buttons integration.
- **Automated Billing Engine**: Webhook event processing for instant receipt generation (\`invoice.payment_succeeded\`).
- **Security & Compliance**: PCI-DSS compliant checkout tokenization (zero credit card numbers touched on server).
- **Localization**: Currency conversion and geo-detected tax calculations.

---
### Interactive MCQ - Transaction Priority Setup:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to proceed to Step 5.*`;

  } else if (session.currentStep === 5) {
    const p4 = session.choices['step_4'] || 'A';
    content = `### Step 5: Technology Stack Recommendation
*(Incorporating Transaction Priority: Option ${p4})*

**Recommended Engineering Ecosystem for "${cleanIdea}":**
- **Frontend**: React 18 / Next.js + Tailwind CSS (Fast client rendering + SSR SEO).
- **Backend API**: Python FastAPI (High-performance async routing & data contracts).
- **Database**: PostgreSQL (Structured ACID relational integrity for orders/users) + Redis cache.
- **Hosting / Infra**: Vercel (Frontend Edge) + Render / AWS EC2 (Backend FastAPI) + Cloudflare CDN.

---
### Interactive MCQ - Engineering Preference:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to proceed to Step 6.*`;

  } else if (session.currentStep === 6) {
    const p5 = session.choices['step_5'] || 'C';
    content = `### Step 6: Strategic Differentiation & Unique Features
*(Incorporating Tech Stack Preference: Option ${p5})*

**4 Hyper-Specific MVP Differentiators:**
1. **AI Recommendation Quiz**: Dynamic prompt engine guiding users to ideal products based on preferences.
2. **Real-time Order Tracker**: Live visual timeline tracking order preparation and shipping.
3. **Automated Re-order Portal**: One-click SMS/email recurring orders.
4. **Interactive Custom Product Configurator**: Real-time visual assembly before checkout.

---
### Interactive MCQ - Primary MVP Priority:
${stepConfig.mcqQuestion}
- **A)** ${stepConfig.options[0].label}
- **B)** ${stepConfig.options[1].label}
- **C)** ${stepConfig.options[2].label}
- **D)** ${stepConfig.options[3].label}

*Please reply with A, B, C, or D to finalize your Master Blueprint.*`;

  } else if (session.currentStep === 7) {
    const c1 = session.choices['step_1'] || 'A';
    const c2 = session.choices['step_2'] || 'B';
    const c3 = session.choices['step_3'] || 'A';
    const c4 = session.choices['step_4'] || 'A';
    const c5 = session.choices['step_5'] || 'C';
    const c6 = session.choices['step_6'] || 'A';

    content = `# Master Website Architecture Blueprint: "${cleanIdea}"
*(Compiled Strategic Specification)*

## 1. Executive Summary & Market Positioning
- **Target Idea**: ${cleanIdea}
- **Selected Competitive Position**: Option ${c1}
- **Core Value Proposition**: High-performance, zero-friction web platform optimized for maximum user conversion.

## 2. Architecture & Account Infrastructure
- **User Access Model**: Option ${c2}
- **Database Engine**: PostgreSQL + Redis Caching
- **API Spec**: RESTful JSON endpoints with JWT Bearer security.

## 3. Feature Matrix & Catalog Design
- **Catalog Presentation**: Option ${c3}
- **Essential Features**: Responsive Navigation, Dynamic Search, Cart Drawer, Customer Portal.

## 4. Financial & Payment Stack
- **Transaction Preference**: Option ${c4}
- **Payment Processing**: Stripe API + Automated Invoicing Webhooks.

## 5. Technology Stack
- **Selected Ecosystem**: Option ${c5} (React / Next.js + FastAPI + PostgreSQL).
- **Deployment Strategy**: GitHub Pages / Vercel Edge Frontend + Cloud Backend.

## 6. Strategic MVP Differentiator
- **Priority Feature**: Option ${c6}

---
🎉 **Master Blueprint Complete!** Click **Download Blueprint File** above to export your complete specification.`;
  }

  savePlanSession(session);

  return {
    content,
    session,
    stepConfig
  };
}
