// Privacy Policy Content - Strive Tech LLC / SAI Platform
// Last Updated: January 9, 2026

export interface PrivacySection {
  id: string;
  title: string;
  content: (string | SubSection | ListContent | TableContent | BoldText)[];
}

export interface SubSection {
  type: "subsection";
  id: string;
  title: string;
  content: (string | ListContent | TableContent | BoldText)[];
}

export interface ListContent {
  type: "list";
  items: string[];
}

export interface BoldText {
  type: "bold";
  text: string;
}

export interface TableContent {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface LinkContent {
  type: "link";
  text: string;
  url: string;
}

export const privacyPolicyMetadata = {
  title: "Privacy Policy",
  subtitle: "STRIVE TECH LLC. – SAI PLATFORM",
  lastUpdated: "January 9, 2026",
};

export const companyInfo = {
  name: "Strive Tech LLC",
  address: "700 Arbor Trace Circle",
  city: "Nashville, TN 37207",
  email: "contact@strivetech.ai",
  phone: "(731) 431-2320",
  website: "https://strivetech.ai",
};

export const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      'This Privacy Policy describes how Strive Tech LLC ("Strive," "we," "us," or "our") collects, uses, shares, and protects personal information when you use our SAI platform, an AI-powered enterprise real estate operating system for professionals (the "Platform" or "Services").',
      {
        type: "bold",
        text: "Company Information:",
      },
      "Strive Tech LLC\n700 Arbor Trace Circle\nNashville, TN 37207\nEmail: contact@strivetech.ai\nPhone: (731) 431-2320\nWebsite: https://strivetech.ai",
      "By using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please discontinue use of the Services.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      {
        type: "subsection",
        id: "information-you-provide",
        title: "2.1 Information You Provide",
        content: [
          { type: "bold", text: "Account Information:" },
          {
            type: "list",
            items: [
              "Name, email, phone number, business address",
              "Real estate license number, licensing state, brokerage affiliation",
              "Professional credentials, headshot, bio, website, social media links",
            ],
          },
          { type: "bold", text: "Billing Information:" },
          {
            type: "list",
            items: [
              "Payment card details (processed by Stripe)",
              "Billing address and tax identification numbers",
            ],
          },
          { type: "bold", text: "CRM and Client Data:" },
          {
            type: "list",
            items: [
              "Contact information for your leads, clients, and prospects",
              "Property preferences, financial qualifications, transaction details",
              "Information about third parties in transactions (lenders, attorneys, title companies, etc.)",
            ],
          },
          { type: "bold", text: "Content and Communications:" },
          {
            type: "list",
            items: [
              "Messages sent through the Platform",
              "Conversations with our AI assistant (SaiBot)",
              "Documents uploaded (DocuSign documents stored by DocuSign; we store only metadata)",
              "QuickBooks financial data accessed via API (not stored locally)",
              "Customer support inquiries",
            ],
          },
          { type: "bold", text: "Third-Party Integration Credentials:" },
          {
            type: "list",
            items: [
              "OAuth tokens for connected accounts (encrypted using AES-256)",
            ],
          },
          {
            type: "bold",
            text: "Important: You are responsible for ensuring appropriate authority and consent when entering information about third parties.",
          },
        ],
      },
      {
        type: "subsection",
        id: "information-collected-automatically",
        title: "2.2 Information Collected Automatically",
        content: [
          { type: "bold", text: "Technical Information:" },
          {
            type: "list",
            items: [
              "IP address and approximate geolocation",
              "Device type, operating system, browser type",
              "Usage data: pages viewed, features used, time spent, search queries",
              "Property search criteria and saved favorites",
              "Error logs (retained 90 days for troubleshooting)",
            ],
          },
          { type: "bold", text: "Location Information:" },
          {
            type: "list",
            items: [
              "Approximate location from IP address",
              "Precise geolocation (with consent) for mileage tracking",
            ],
          },
          { type: "bold", text: "Marketing Data:" },
          {
            type: "list",
            items: [
              "Email campaign engagement metrics",
              "Social media post performance",
            ],
          },
          { type: "bold", text: "Activity Logs:" },
          {
            type: "list",
            items: [
              "Actions within the Platform (creating, updating, and deleting records)",
              "Transaction history (retained 7 years for real estate compliance)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "third-party-data-sources",
        title: "2.3 Third-Party Data Sources",
        content: [
          "We use third-party services for infrastructure, AI, market data, mapping, and analytics. Some of these providers only supply public market data to us and do not receive your personal information.",
        ],
      },
      {
        type: "subsection",
        id: "what-we-do-not-collect",
        title: "2.4 What We Do NOT Collect",
        content: [
          "We explicitly do not collect:",
          {
            type: "list",
            items: [
              "Biometric information",
              "Racial/ethnic origin, religious beliefs, genetic data, or health information (except incidentally in free-text fields)",
              "Information from children under 18",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "3. How We Use Your Information",
    content: [
      { type: "bold", text: "Service Delivery:" },
      {
        type: "list",
        items: [
          "Provide Platform features (CRM, AI assistant, analytics, content tools)",
          "Process billing via Stripe",
          "Enable third-party integrations",
          "Customer support",
        ],
      },
      { type: "bold", text: "AI and Predictive Features:" },
      {
        type: "list",
        items: [
          "Power SaiBot AI assistant for personalized responses",
          "Generate market predictions and property valuations",
          "Create AI-generated marketing content",
          "Convert content to searchable embeddings for improved search",
        ],
      },
      { type: "bold", text: "Communications:" },
      {
        type: "list",
        items: [
          "Transactional emails (receipts, confirmations, password resets)",
          "Service announcements",
          "Marketing communications (with consent; unsubscribe anytime)",
        ],
      },
      { type: "bold", text: "Security and Compliance:" },
      {
        type: "list",
        items: [
          "Detect fraud and security threats",
          "Comply with legal obligations (real estate licensing, Fair Housing Act, privacy laws)",
          "Enforce Terms of Service",
          "Protect rights and safety",
        ],
      },
      { type: "bold", text: "Analytics:" },
      {
        type: "list",
        items: [
          "Analyze usage to improve the Platform",
          "Develop new features",
          "Conduct market research",
        ],
      },
    ],
  },
  {
    id: "how-we-share-your-information",
    title: "4. How We Share Your Information",
    content: [
      {
        type: "subsection",
        id: "service-providers",
        title: "4.1 Service Providers",
        content: [
          "We engage third-party service providers who process data on our behalf under their own data policies and agreements:",
          { type: "bold", text: "Infrastructure:" },
          "Vercel (hosting), Supabase (database/storage), Railway (ML hosting)",
          { type: "bold", text: "AI & Machine Learning:" },
          "xAI/Grok, Google/Vertex, Anthropic, and Moonshot (LLMs accessed via OpenRouter, Vercel, or Groq as model providers), OpenAI & Qwen (embeddings), Cohere (search)",
          { type: "bold", text: "Business Tools:" },
          "DocuSign (Document Signatures), Adobe (Document Signatures), Intuit (Taxes & Expenses), Stripe (Payment Processing)",
          { type: "bold", text: "Communications:" },
          "Resend (email delivery) and iPlum (Texting Services)",
          { type: "bold", text: "Background Processing:" },
          "Upstash (job scheduling)",
          "These providers are contractually obligated to protect your data, and their privacy policies govern their processing. All service providers' privacy policies can be found below:",
          "Vercel – https://vercel.com/legal/privacy-policy",
          "Supabase – https://supabase.com/privacy",
          "Railway – https://railway.app/legal/privacy",
          "Groq – https://groq.com/privacy-policy",
          "xAI / Grok – https://x.ai/legal/privacy-policy",
          "Google Cloud / Vertex AI – https://cloud.google.com/terms/cloud-privacy-notice & https://policies.google.com/privacy",
          "Anthropic (Claude) – https://www.anthropic.com/legal/privacy",
          "Moonshot AI – https://moonshot-ai.com/privacy-policy",
          "OpenRouter (model gateway) – https://openrouter.ai/privacy",
          "OpenAI – https://openai.com/policies/privacy-policy",
          "Qwen – https://chat.qwen.ai/legal-agreement/privacy-policy",
          "Cohere (LLMs/search) – https://cohere.com/privacy",
          "DocuSign – https://www.docusign.com/privacy",
          "Adobe – https://www.adobe.com/privacy/policy.html",
          "Intuit (QuickBooks, etc.) – https://www.intuit.com/privacy/statement/",
          "Stripe – https://stripe.com/privacy",
          "Resend – https://resend.com/legal/privacy-policy",
          "iPlum – https://www.iplum.com/privacy",
          "Upstash – https://upstash.com/trust/privacy.pdf",
        ],
      },
      {
        type: "subsection",
        id: "mls-data-sharing",
        title: "4.2 MLS Data Sharing",
        content: [
          "When you access MLS data through our Platform via IDX (Internet Data Exchange) or VOW (Virtual Office Website) functionality:",
          {
            type: "list",
            items: [
              "MLS data is provided for your professional use in accordance with MLS rules",
              "You must comply with MLS policies regarding data use and display",
              "MLS data may not be used for unauthorized purposes",
              "We maintain audit trails as required by MLS policies",
              "Sellers may opt out of having their listings displayed online",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "within-your-organization",
        title: "4.3 Within Your Organization",
        content: [
          "If you're part of a brokerage or team:",
          { type: "bold", text: "Organization Admins Can See:" },
          {
            type: "list",
            items: [
              "Your profile, role, and usage statistics",
              "Activity logs for shared resources",
            ],
          },
          { type: "bold", text: "Organization Admins Cannot See:" },
          {
            type: "list",
            items: [
              "Your passwords or OAuth tokens",
              "Content marked as private",
              "Your personal (non-organization) activity",
            ],
          },
          'You maintain ownership of your "book of business" (contacts, leads, client relationships).',
        ],
      },
      {
        type: "subsection",
        id: "real-estate-industry-partners",
        title: "4.4 Real Estate Industry Partners",
        content: [
          "We may share information with:",
          {
            type: "list",
            items: [
              "Other real estate professionals involved in transactions (with authorization)",
              "Title companies, escrow services, closing agents",
              "Mortgage lenders (at your discretion)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "legal-disclosures",
        title: "4.5 Legal Disclosures",
        content: [
          "We may disclose information when required by law:",
          {
            type: "list",
            items: [
              "To comply with legal process (subpoena, court order)",
              "To respond to government requests",
              "To cooperate with law enforcement",
              "To protect rights, property, or safety",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "business-transfers",
        title: "4.6 Business Transfers",
        content: [
          "In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change in order to give you the ability to opt out of the data transfer.",
        ],
      },
      {
        type: "subsection",
        id: "no-sale-of-personal-information",
        title: "4.7 No Sale of Personal Information",
        content: [
          {
            type: "bold",
            text: "We do not sell your personal information.",
          },
          "We do not exchange personal information for monetary consideration or share it for cross-context behavioral advertising.",
        ],
      },
      {
        type: "subsection",
        id: "data-processing-for-business-customers",
        title: "4.8 Data Processing for Business Customers",
        content: [
          "When you use our Platform to manage client data, Strive acts as a service provider/processor. We:",
          {
            type: "list",
            items: [
              "Process data only as necessary to provide Services",
              "Do not sell or share client data",
              "Implement appropriate security measures",
              "Notify you of data breaches within 72 hours",
              "Maintain a list of subprocessors",
            ],
          },
          {
            type: "bold",
            text: 'To obtain a Data Processing Addendum (DPA): Contact contact@strivetech.ai with "DPA Request" in the subject line.',
          },
        ],
      },
    ],
  },
  {
    id: "ai-and-automated-processing",
    title: "5. AI and Automated Processing",
    content: [
      {
        type: "subsection",
        id: "ai-features",
        title: "5.1 AI Features",
        content: [
          {
            type: "bold",
            text: "SaiBot (AI Assistant):",
          },
          "Powered by xAI's Grok model via OpenRouter; processes your queries and contextual data to generate responses.",
          {
            type: "bold",
            text: "Predictive Market Analytics:",
          },
          "AI forecasting of market trends and property values using publicly accessible and licensed market data.",
          {
            type: "bold",
            text: "Content Generation:",
          },
          "AI-assisted creation of property descriptions and marketing materials.",
        ],
      },
      {
        type: "subsection",
        id: "how-ai-processes-your-data",
        title: "5.2 How AI Processes Your Data",
        content: [
          { type: "bold", text: "AI Providers and Their Privacy Policies:" },
          {
            type: "list",
            items: [
              "xAI (Grok): Processes SaiBot conversations",
              "OpenAI: Text embeddings for semantic search",
              "Cohere: Search result reranking",
              "OpenRouter: AI request routing",
            ],
          },
          "We selected these providers based on their data security commitments and willingness to use only input and output prompts for model training, which excludes any personal data. Their privacy policies govern their data processing procedures.",
          {
            type: "bold",
            text: "Embeddings:",
          },
          "Text converted to numerical representations for intelligent search; stored in our database and scoped to your account.",
          {
            type: "bold",
            text: "Conversation Summaries:",
          },
          "AI-powered summaries of SaiBot history to improve responses; private to your account.",
        ],
      },
      {
        type: "subsection",
        id: "profiling-and-automated-decision-making",
        title: "5.3 Profiling and Automated Decision-Making",
        content: [
          {
            type: "bold",
            text: "Property Search Alerts:",
          },
          "Automated matching based on your specified criteria.",
          {
            type: "bold",
            text: "Investment Analytics:",
          },
          "Automated scoring and ranking of investment opportunities (advisory only, not a replacement for professional judgment).",
          { type: "bold", text: "Your Rights:" },
          {
            type: "list",
            items: [
              "Be informed about automated decision-making",
              "Opt out of profiling for decisions with legal or significant effects",
              "Request human review of automated decisions",
              "Contest automated decisions",
            ],
          },
          {
            type: "bold",
            text: "Important: Our systems are advisory tools that assist, not replace, human decision-making.",
          },
        ],
      },
      {
        type: "subsection",
        id: "ai-usage-tracking",
        title: "5.4 AI Usage Tracking",
        content: [
          "We track:",
          {
            type: "list",
            items: [
              "SaiBot message volume and token usage",
              "AI model selection and tool invocations",
              "Feature usage frequency",
            ],
          },
          "This data is used for billing, resource allocation, and platform improvement.",
        ],
      },
      {
        type: "subsection",
        id: "applicable-law-regulation-mls-rules",
        title: "5.5 Applicable Law, Regulation, and MLS Rules",
        content: [
          "You acknowledge and agree you shall comply with all applicable laws, rules, and regulations related to your use of Workspace, including but not limited to any applicable MLS Rules.",
        ],
      },
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "6. Cookies and Tracking",
    content: [
      {
        type: "subsection",
        id: "cookies-we-use",
        title: "6.1 Cookies We Use",
        content: [
          {
            type: "table",
            headers: ["Cookie Name", "Purpose", "Type", "Duration"],
            rows: [
              ["sb-access-token", "Authentication", "Strictly Necessary", "Session"],
              ["sb-refresh-token", "Token refresh", "Strictly Necessary", "7 days"],
              ["sb-auth-token", "User authentication", "Strictly Necessary", "Session"],
              ["theme", "UI theme preference", "Functional", "1 year"],
              ["locale", "Language preference", "Functional", "1 year"],
            ],
          },
          {
            type: "bold",
            text: "Strictly Necessary Cookies:",
          },
          "Essential for Platform operation (cannot opt out).",
          {
            type: "bold",
            text: "Functional Cookies:",
          },
          "Remember your preferences.",
          "We do not use advertising or third-party tracking cookies.",
        ],
      },
      {
        type: "subsection",
        id: "managing-cookies",
        title: "6.2 Managing Cookies",
        content: [
          "You can manage cookies through browser settings. Note that disabling necessary cookies may prevent Platform use.",
          {
            type: "bold",
            text: "Do Not Track:",
          },
          "We do not currently respond to DNT signals. You may exercise privacy rights under Section 8.",
        ],
      },
    ],
  },
  {
    id: "data-security-and-retention",
    title: "7. Data Security and Retention",
    content: [
      {
        type: "subsection",
        id: "security-measures",
        title: "7.1 Security Measures",
        content: [
          { type: "bold", text: "Technical Safeguards:" },
          {
            type: "list",
            items: [
              "Encryption in transit (TLS) and at rest (AES-256, where confirmed)",
              "Role-based access control (RBAC)",
              "Secure authentication via Supabase Auth",
              "Network security (firewalls, intrusion detection, DDoS protection)",
              "Multi-tenant data isolation",
            ],
          },
          { type: "bold", text: "Administrative Safeguards:" },
          {
            type: "list",
            items: [
              "Information security policies",
              "Employee confidentiality agreements",
              "Security awareness training",
              "Incident response plan",
              "Vendor security assessments",
            ],
          },
          {
            type: "bold",
            text: "Your Responsibility:",
          },
          "Use strong passwords, keep credentials confidential, and report unauthorized access to contact@strivetech.ai immediately.",
        ],
      },
      {
        type: "subsection",
        id: "data-retention",
        title: "7.2 Data Retention",
        content: [
          {
            type: "table",
            headers: ["Data Category", "Retention Period", "Justification"],
            rows: [
              ["Account Information", "Duration of account + 3 years", "Service provision, legal defense"],
              ["Transaction Records", "7 years", "Tax/accounting, real estate regulations"],
              ["CRM/Client Data", "Duration of account + 3 years", "Service provision, compliance"],
              ["SaiBot Chat History", "2 years", "Service improvement"],
              ["Usage/Analytics Data", "26 months", "Analytics"],
              ["Security Logs", "1-2 years", "Security, fraud investigation"],
              ["Error Logs", "90 days", "Troubleshooting"],
            ],
          },
          {
            type: "bold",
            text: "Real Estate Records:",
          },
          "Transaction records are retained minimum of 7 years to accommodate state requirements. Tennessee requires 3 years (Tenn. Code Ann. §62-13-309). You are responsible for ensuring that deletions comply with your state licensing obligations.",
          {
            type: "bold",
            text: "Data Clarification:",
          },
          '"Operational" account data: deletable or exportable within 30 days post-termination (self-service tools), subject to exceptions.',
          '"Regulatory" and audit records (real estate, tax, security logs): retained for specified periods (e.g., 7 years) and expressly carved out from early deletion.',
        ],
      },
    ],
  },
  {
    id: "your-privacy-rights",
    title: "8. Your Privacy Rights",
    content: [
      {
        type: "subsection",
        id: "rights-for-all-users",
        title: "8.1 Rights for All Users",
        content: [
          {
            type: "list",
            items: [
              "Access: Request information about personal information we hold",
              "Update: Correct inaccurate information via account settings",
              "Delete: Request deletion (subject to legal retention requirements)",
              "Opt Out: Unsubscribe from marketing emails anytime",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "rights-for-external-parties",
        title: "8.2 Rights for External Parties",
        content: [
          "If your information was entered by a real estate professional, you have rights to:",
          {
            type: "list",
            items: [
              "Know what information we hold",
              "Correct inaccuracies",
              "Request deletion (subject to legal requirements and legitimate business needs)",
              "Opt out of communications",
            ],
          },
          'Contact: contact@strivetech.ai with "External Party Privacy Request" in the subject line.',
        ],
      },
      {
        type: "subsection",
        id: "tennessee-residents",
        title: "8.3 Tennessee Residents (TIPA)",
        content: [
          "Effective July 1, 2025, Tennessee residents have rights to:",
          {
            type: "list",
            items: [
              "Access and obtain a copy of personal information",
              "Delete personal information",
              "Correct inaccuracies",
              "Opt out of targeted advertising, sales, and profiling",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "data-portability-format",
        title: "8.4 Data Portability Format",
        content: [
          { type: "bold", text: "Export Formats:" },
          "JSON (technical users) or CSV (spreadsheet analysis)",
          { type: "bold", text: "Data Included:" },
          {
            type: "list",
            items: [
              "Account information",
              "Contacts, leads, deals, transactions",
              "Calendar events, activity history",
              "AI conversation transcripts & usage",
              "User preferences",
            ],
          },
          { type: "bold", text: "Data NOT Included (obtain from third parties):" },
          {
            type: "list",
            items: [
              "DocuSign documents (contact DocuSign)",
              "QuickBooks data (contact Intuit)",
              "Social media content on third-party platforms",
            ],
          },
          {
            type: "bold",
            text: "Delivery:",
          },
          "Secure download link valid 7 days; generation takes 1-3 business days after verification.",
        ],
      },
      {
        type: "subsection",
        id: "exercising-your-rights",
        title: "8.5 Exercising Your Rights",
        content: [
          { type: "bold", text: "Contact Methods:" },
          {
            type: "list",
            items: [
              'Email: contact@strivetech.ai with "Privacy Request" in the subject line',
              "Phone: (731) 431-2320",
              "Mail: Strive Tech LLC, Attn: Privacy Team, 700 Arbor Trace Circle, Nashville, TN 37207",
            ],
          },
          { type: "bold", text: "Verification:" },
          "We will verify your identity before processing requests.",
          { type: "bold", text: "Response Time:" },
          "45 days (may extend an additional 45 days if needed).",
        ],
      },
      {
        type: "subsection",
        id: "appeals",
        title: "8.6 Appeals",
        content: [
          {
            type: "bold",
            text: "Internal Appeal:",
          },
          'Contact contact@strivetech.ai with "Privacy Appeal" in the subject line. Response within 60 days.',
          { type: "bold", text: "External Complaints:" },
          {
            type: "list",
            items: [
              "California: oag.ca.gov/privacy | (916) 210-6276",
              "Tennessee: tn.gov/attorneygeneral | (615) 741-3491",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    content: [
      {
        type: "bold",
        text: "Our Platform is not directed to children under 18.",
      },
      "Users must be at least 18 years old to create an account. We do not knowingly collect information from children.",
      "If we learn we have collected information from a child, we will delete it immediately. Contact us at contact@strivetech.ai if you believe we have collected information from a child.",
      {
        type: "bold",
        text: "Note:",
      },
      "Real estate professionals may input client data, including information about minors (e.g., household dependents). Professionals are responsible for obtaining appropriate consent and legal basis.",
    ],
  },
  {
    id: "data-location",
    title: "10. Data Location",
    content: [
      "Strive Tech is headquartered in Nashville, Tennessee.",
      {
        type: "bold",
        text: "Our Services are intended solely for users in the United States.",
      },
      "All information is stored and processed in the United States using infrastructure from Supabase (AWS), Vercel, and Railway.",
      "We do not knowingly collect information from individuals outside the U.S.",
    ],
  },
  {
    id: "third-party-links",
    title: "11. Third-Party Links",
    content: [
      "Our Platform may link to third-party websites or services. We are not responsible for their privacy practices. Review their privacy policies.",
      "Third-party integrations collect information directly from you or receive information pursuant to your authorization:",
      {
        type: "list",
        items: [
          "DocuSign: https://www.docusign.com/privacy",
          "QuickBooks/Intuit: https://www.intuit.com/privacy/",
        ],
      },
    ],
  },
  {
    id: "data-breach-notification",
    title: "12. Data Breach Notification",
    content: [
      "In the event of a data breach, we will:",
      {
        type: "list",
        items: [
          "Investigate and contain the breach immediately",
          "Assess nature, scope, and consequences",
          "Report to relevant authorities within timeframes required by law (Tennessee: 45 days)",
          "Notify you if a breach is likely to result in a risk to your rights",
          "Offer appropriate remedial measures",
          "Document and implement improvements",
        ],
      },
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "13. Changes to This Policy",
    content: [
      "We may update this Privacy Policy to reflect changes in practices, technology, or legal requirements.",
      { type: "bold", text: "Notification:" },
      {
        type: "list",
        items: [
          'Posting updated policy on strivetech.ai with new "Last Updated" date',
          "Email notification to your account address",
          "Prominent notice within the Platform",
        ],
      },
      {
        type: "bold",
        text: "Effective Date:",
      },
      "Material changes effective 30 days after notification (unless legal requirement necessitates immediate effectiveness).",
      {
        type: "bold",
        text: "Continued Use:",
      },
      "Continued use after the effective date constitutes acceptance of the revised policy.",
    ],
  },
  {
    id: "contact-us",
    title: "14. Contact Us",
    content: [
      "STRIVE TECH LLC\nAttn: Privacy Team\n700 Arbor Trace Circle\nNashville, TN 37207\nUnited States",
      "Email: contact@strivetech.ai\nPhone: (731) 431-2320\nWebsite: https://strivetech.ai",
      "We will respond to inquiries within 30 days.",
      {
        type: "bold",
        text: "Accessibility:",
      },
      'If you need this policy in an alternative format or require accommodations to exercise privacy rights, contact us with "Accessibility Accommodation" in the subject line.',
    ],
  },
  {
    id: "governing-law",
    title: "15. Governing Law",
    content: [
      "This Privacy Policy is governed by the laws of the State of Tennessee, without regard to conflict of law principles, except where preempted by U.S. federal law. Disputes will be resolved in state or federal courts in Davidson County, Tennessee, or as otherwise required by law.",
    ],
  },
];

export const copyrightNotice = "© 2026 STRIVE TECH LLC. All rights reserved.";
