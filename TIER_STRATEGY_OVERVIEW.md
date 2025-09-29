# Strive Tech SaaS Platform - Comprehensive Tier Strategy Overview

**Version:** 1.0
**Last Updated:** January 2025
**Platform:** app.strivetech.ai

---

## 🎯 Platform Mission
Intelligent Business HUB - AI-powered enterprise platform serving 21 industries with modular dashboards, 27 tools, and multi-model AI assistants.

**Internal Use:** Used daily by Strive Tech employees and admins for operations
**Architecture:** Next.js 15.5.4 + React 19.1.0 + TypeScript + Prisma + Supabase
**Deployment:** `app.strivetech.ai` (SaaS platform) with `strivetech.ai` (marketing/auth portal)
**Auth Flow:** Users sign up/login via `strivetech.ai` → redirected to `app.strivetech.ai`

---

## 💎 Tier Structure & Pricing

### **Tier 0: Free Trial** (New!)
**Price:** $0/month (14-day trial)
**Target:** Testing & evaluation

**AI Access:**
- Models: Llama 3 8B (Groq), Gemini Flash (OpenRouter)
- Limits: 50 AI requests total
- Transparency: "Using efficient open-source models for trial"

**Dashboards:**
- Generic dashboard (no industry customization)
- Basic widgets only
- Read-only analytics

**Modules:**
- ✅ Basic CRM (view-only)
- ✅ Task board (1 project max)
- ✅ Sai Assistant (basic)
- ❌ No tool activations
- ❌ No integrations

---

### **Tier 1: Solopreneur & Startup**
**Price:** $299/month
**Target:** 1-10 users, early-stage companies

**AI Access:**
- **Open Models (Groq):** Llama 3.1 70B, Llama 3 70B, Mixtral 8x7B
- **Basic Models (OpenRouter):** GPT-3.5 Turbo, Claude 3 Haiku, Gemini Flash
- **Limits:** 100 AI requests/month
- **Transparency:** "Optimized for speed & cost-efficiency"

**Dashboards:**
- Industry-specific templates (choose 1 from 21 industries)
- Basic customization
- Mobile responsive

**Modules (User-facing):**
- ✅ CRM (contacts, pipeline, basic automation)
- ✅ Project Management (5 active projects)
- ✅ Task Management (Kanban)
- ✅ Basic Analytics
- ✅ Time Tracking
- ✅ Sai Assistant

**Tools:** 3 tools maximum from:
- Process Automation (basic)
- Conversational AI (chatbot)
- Content Generation (basic)

---

### **Tier 2: SME & Growth**
**Price:** $699/month
**Target:** 11-50 users, scaling businesses

**AI Access:**
- **Advanced Models (OpenRouter):** GPT-4, Claude 3.5 Sonnet, Command R+
- **Fast Models (Groq):** Llama 3.3 70B, Llama 3.1 70B
- **Limits:** 1,000 AI requests/month
- **Transparency:** "Premium models for complex tasks"

**Dashboards:**
- Industry-specific with company customization
- Advanced widgets & KPIs
- Real-time collaboration

**Modules (User-facing):**
- ✅ Everything in Tier 1 PLUS:
- ✅ Advanced CRM (lead scoring, segmentation)
- ✅ Unlimited Projects
- ✅ Finance & Invoicing
- ✅ HR & Recruitment (basic)
- ✅ Marketing Automation
- ✅ Inventory Management
- ✅ Team Collaboration

**Tools:** 10 tools maximum from all categories:
- Machine Learning & Analytics
- Natural Language Processing
- Computer Vision (basic)
- AI Security (standard)
- Workflow Automation
- API Development

**Industry Dashboards Available:**
- Healthcare: Compliance, patient analytics
- Finance: Risk assessment, portfolio tracking
- Manufacturing: Quality control, production metrics
- Retail: Inventory optimization, customer insights
- Tech: DevOps metrics, sprint tracking

---

### **Tier 3: Enterprise**
**Price:** Custom (starting $2,000/month)
**Target:** 50+ users, enterprises, complex needs

**AI Access:**
- **All Models:** GPT-4 Turbo, Claude 3.5 Opus, Gemini Pro, all Groq models
- **Custom:** Fine-tuned models, local deployment
- **Limits:** Unlimited requests
- **Transparency:** "Full model selection with usage analytics"

**Dashboards:**
- Fully custom per organization
- White-label options
- Multi-tenant isolation
- Custom integrations

**Modules (User-facing):**
- ✅ Everything in Tier 2 PLUS:
- ✅ Custom Agentic Workflows
- ✅ AI Agent Teams
- ✅ Advanced Security & Compliance
- ✅ Custom Module Development
- ✅ Dedicated Support
- ✅ Role-Play Training Module
- ✅ AI Evals Module

**Tools:** Unlimited from all 27 tools:
- All 9 categories fully accessible
- Custom tool development
- Private deployments
- Advanced API access
- Webhook integrations

**Unique Features:**
- Multi-agent orchestration
- Custom agentic workflows
- White-label platform
- Dedicated account manager
- Priority feature requests
- 24/7 support with SLA

---

## 🏢 Internal Dashboards (Strive Tech Use)

### **Admin Role** (Full Access)
**MVP Modules (Phase 1-2):**
1. **AI R&D Module**
   - Model Performance Dashboard
   - Experiment Tracker
   - Dataset Management

2. **Client Projects Module**
   - Project Overview (Gantt/timeline)
   - Deployment Tracker
   - Risk Assessment

3. **Data Management & Ethics**
   - Compliance Checker
   - Data Pipeline Dashboard
   - Ethics Review Board

4. **Sales & CRM Module**
   - AI-powered pipeline
   - Proposal Builder
   - Demo Scheduler

**Post-MVP Modules:**
- Finance & Resource Allocation
- HR & Talent Management
- Marketing & Content (CMS)
- Operations & Infrastructure
- Executive & BI Dashboard
- Settings & Admin

### **Employee Role** (Limited Access)
- ✅ CRM Module only
- ✅ Sales Module only
- ❌ No access to other admin modules

---

## 🤖 AI Model Strategy

### **Provider Architecture:**
```
Primary: OpenRouter (200+ models, unified API)
Secondary: Groq (ultra-fast open-source inference)
Future: Local deployment, custom fine-tuning
```

### **Available Models:**

#### **Open-Source Models (via Groq & OpenRouter):**
- **Meta Llama Series:**
  - Llama 3.3 70B (latest, best open-source)
  - Llama 3.2 90B Vision (multimodal)
  - Llama 3.1 405B/70B/8B
  - Llama 3 70B/8B
  - Llama 2 70B/13B/7B
- **Mistral/Mixtral:**
  - Mixtral 8x22B (MoE)
  - Mixtral 8x7B
  - Mistral 7B
  - Mistral Nemo 12B
- **Google:**
  - Gemma 2 27B/9B
  - Gemma 7B
- **Alibaba:**
  - Qwen 2.5 72B/32B/14B/7B
  - Qwen 2 VL (vision)
- **DeepSeek:**
  - DeepSeek V2.5 Chat
  - DeepSeek Coder V2 236B
- **Others:**
  - Command R+ 104B (Cohere)
  - Command R 35B
  - Phi-3 Medium/Mini (Microsoft)
  - Solar 10.7B
  - Zephyr 7B
  - Yi 34B/6B

#### **Proprietary Models (via OpenRouter):**
- **OpenAI:**
  - GPT-4 Turbo (latest)
  - GPT-4 Vision
  - GPT-4 32k
  - GPT-4
  - GPT-3.5 Turbo (16k/4k)
  - o1 Preview/Mini (reasoning)
- **Anthropic Claude:**
  - Claude 3.5 Opus (most capable)
  - Claude 3.5 Sonnet (balanced)
  - Claude 3.5 Haiku (fast)
  - Claude 3 Opus/Sonnet/Haiku
  - Claude 2.1/2.0
  - Claude Instant
- **Google:**
  - Gemini 1.5 Pro (2M context)
  - Gemini 1.5 Flash (fast)
  - Gemini Pro Vision
  - Gemini Pro
  - PaLM 2 (Bison/Gecko)
- **xAI:**
  - Grok 2 (latest)
  - Grok 1.5
  - Grok 1
- **Perplexity:**
  - Perplexity Online 70B (with search)
  - Perplexity Online 7B
  - Sonar Large/Small (search-enhanced)
- **Cohere:**
  - Command (enterprise)
  - Command Light
  - Rerank (specialized)
- **Others:**
  - Inflection 2.5 (Pi)
  - Databricks DBRX 132B
  - Together AI models

### **Model Allocation by Tier:**

| Tier | Open-Source Models | Proprietary Models | Special Features |
|------|-------------------|-------------------|------------------|
| **Free** | Llama 3 8B, Gemma 7B | Gemini Flash, Claude Haiku | 50 requests/month |
| **T1** | Llama 3.1 70B, Mixtral 8x7B, Qwen 2.5 | GPT-3.5, Claude 3 Haiku, Gemini Pro | 100 requests/month |
| **T2** | All Llama models, Mixtral 8x22B, Command R+ | GPT-4, Claude 3.5 Sonnet, Grok 1.5 | 1,000 requests/month |
| **T3** | All open models + custom fine-tuning | All models including GPT-4 Turbo, Claude 3.5 Opus, Grok 2, o1 | Unlimited, local deployment |

---

## 🚀 Implementation Phases

### **Phase 1: Core Platform** (Foundation)
- Next.js 15.5.4 + React 19.1.0 setup
- Supabase Auth + Prisma
- Basic dashboard framework
- User management & RBAC

### **Phase 2: MVP Modules** (Q1 2025)
- CRM Module
- Project Management
- Sai Assistant (basic)
- 3 core tools

### **Phase 3: Growth Features** (Q2 2025)
- Industry dashboards
- Advanced AI models
- 10+ tools
- Workflow automation

### **Phase 4: Enterprise Features** (Q3 2025)
- Agentic workflows
- Role-Play Module
- AI Evals Module
- White-label options

### **Phase 5: Scale & Optimize** (Q4 2025)
- Multi-agent teams
- Custom fine-tuning
- Advanced analytics
- Global expansion

---

## 📊 Tool Distribution by Tier

### **27 Total Tools across 9 Categories:**

| Category | Tools | T0 | T1 | T2 | T3 |
|----------|-------|----|----|----|----|
| AI Security | 3 | ❌ | ❌ | ✅ | ✅ |
| Computer Vision | 3 | ❌ | ❌ | 1 | ✅ |
| Conversational AI | 3 | ❌ | 1 | ✅ | ✅ |
| Generative AI | 3 | ❌ | 1 | ✅ | ✅ |
| Local AI | 3 | ❌ | ❌ | ❌ | ✅ |
| ML & Analytics | 3 | ❌ | ❌ | ✅ | ✅ |
| NLP | 3 | ❌ | ❌ | ✅ | ✅ |
| Non-AI Solutions | 3 | ❌ | ❌ | 1 | ✅ |
| Process Automation | 3 | ❌ | 1 | ✅ | ✅ |
| **Total Available** | 27 | 0 | 3 | 10 | ∞ |

---

## 🎯 Special Modules (Post-MVP)

### **Role-Play Module** (Phase 4)
**Purpose:** Executive training & skill development

**Scenarios:**
- Sales negotiations
- CEO presentations
- Investor pitches
- Performance reviews
- Crisis management

**Tier Access:**
- T1: 10 sessions/month, 3 scenarios
- T2: 50 sessions/month, 10+ scenarios
- T3: Unlimited, custom scenarios, AI coaching

### **AI Evals Module** (Phase 4)
**Purpose:** Company visibility in AI training data

**Features:**
- Brand presence analysis
- Competitive benchmarking
- AI discoverability score
- SEO-like recommendations

**Tier Access:**
- T2: Monthly reports, 3 competitors
- T3: Real-time tracking, unlimited analysis

---

## 💰 Revenue Projections

### **Target Customer Distribution:**
- Free Trial: 1,000 users (conversion target: 10%)
- Tier 1: 500 customers × $299 = $149,500/mo
- Tier 2: 200 customers × $699 = $139,800/mo
- Tier 3: 50 customers × $3,000 avg = $150,000/mo
- **Total MRR Target:** $439,300
- **ARR Target:** $5.27M

---

## 🔒 Security & Compliance

### **All Tiers:**
- SOC 2 Type II compliance
- GDPR/CCPA compliant
- End-to-end encryption
- Multi-factor authentication

### **Enterprise (T3) Additional:**
- HIPAA compliance option
- Custom data residency
- Private cloud deployment
- Dedicated security team

---

## 📝 Key Differentiators

1. **Transparency:** Users always know which AI model is being used
2. **Flexibility:** Mix of open-source and proprietary models
3. **Industry Focus:** 21 industry-specific configurations
4. **Modular Design:** Pay for what you need
5. **AI-First:** Every feature enhanced with intelligence
6. **Internal Use:** Dogfooding our own platform daily

---

## 🔗 Authentication & Access Flow

### **User Journey:**
1. **Discovery:** Visit `strivetech.ai` marketing site
2. **Sign Up:** Create account on `strivetech.ai`
3. **Auth:** Shared JWT cookies across `.strivetech.ai` domain
4. **Access:** Automatic redirect to `app.strivetech.ai` dashboard
5. **Login:** Always through `strivetech.ai/login` → app redirect

### **Technical Implementation:**
- Marketing site handles all authentication (signup, login, password reset)
- Shared cookie domain: `.strivetech.ai` (works across subdomains)
- App validates JWT and creates session
- Single sign-on experience across marketing and app

---

## 🎬 Next Steps

1. **Immediate (Week 1):**
   - Finalize Tier 0 (free) implementation
   - Set up OpenRouter + Groq integrations
   - Configure rate limiting per tier

2. **Short-term (Month 1):**
   - Launch MVP with T0 and T1
   - Deploy 3 core tools
   - Beta test with 10 customers

3. **Medium-term (Quarter 1):**
   - Release T2 with 10 tools
   - Add industry dashboards
   - Scale to 100 customers

4. **Long-term (Year 1):**
   - Full enterprise features
   - Role-Play & AI Evals modules
   - 1,000+ customers
   - $5M+ ARR

---

## 📚 Related Documentation
- `CLAUDE.md` - Development guidelines
- `internal-dashboard-types.md` - Internal dashboard details
- `user-dashboard-types.md` - User dashboard specifications
- `feature-&-tool-marketplace.md` - Full tool catalog

---

**Remember:** Start simple, iterate based on user feedback, maintain transparency about AI usage.