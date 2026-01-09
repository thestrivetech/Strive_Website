// Terms of Service Agreement Content - Strive Tech LLC / SAI Platform
// Last Updated: January 8, 2026

export interface TosSection {
  id: string;
  number: string;
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
  ordered?: boolean;
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

export const tosMetadata = {
  title: "Terms of Service Agreement",
  subtitle: "STRIVE TECH LLC. – SAI PLATFORM",
  lastUpdated: "January 8, 2026",
};

export const tableOfContents = [
  { id: "introduction-acceptance", number: "1", title: "Introduction & Acceptance" },
  { id: "definitions", number: "2", title: "Definitions" },
  { id: "services-overview", number: "3", title: "Services Overview" },
  { id: "your-account", number: "4", title: "Your Account" },
  { id: "fees-billing", number: "5", title: "Fees & Billing" },
  { id: "acceptable-use", number: "6", title: "Acceptable Use & Real Estate Compliance" },
  { id: "intellectual-property", number: "7", title: "Intellectual Property" },
  { id: "warranties-disclaimers", number: "8", title: "Warranties & Disclaimers" },
  { id: "liability-limitations", number: "9", title: "Liability Limitations" },
  { id: "indemnification", number: "10", title: "Indemnification" },
  { id: "term-renewal-termination", number: "11", title: "Term, Renewal & Termination" },
  { id: "confidentiality", number: "12", title: "Confidentiality" },
  { id: "data-protection-privacy", number: "13", title: "Data Protection & Privacy" },
  { id: "service-levels-support", number: "14", title: "Service Levels & Support" },
  { id: "changes-services-pricing", number: "15", title: "Changes to Services & Pricing" },
  { id: "dispute-resolution", number: "16", title: "Dispute Resolution" },
  { id: "general-provisions", number: "17", title: "General Provisions" },
];

export const tosSections: TosSection[] = [
  {
    id: "introduction-acceptance",
    number: "1",
    title: "INTRODUCTION & ACCEPTANCE",
    content: [
      {
        type: "subsection",
        id: "agreement-to-terms",
        title: "1.1 Agreement to Terms",
        content: [
          'These Terms of Service ("Terms") are a binding agreement between Strive Tech LLC. ("Strive," "Strive Tech," "we," "us") and you or your organization ("Customer," "you," "your").',
          'By (a) clicking "I Agree," (b) executing an Order Form, or (c) accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy (incorporated by reference).',
          {
            type: "bold",
            text: "If you are entering into these Terms on behalf of a company, you represent that you have authority to bind that company. If you don't agree to these Terms, you may not use the Services.",
          },
        ],
      },
      {
        type: "subsection",
        id: "business-to-business-service",
        title: "1.2 Business-to-Business Service",
        content: [
          {
            type: "bold",
            text: "Our Services are designed exclusively for real estate professionals",
          },
          "(agents, brokers, teams, brokerages) for professional business purposes. Personal use for non-commercial purposes is not permitted.",
        ],
      },
      {
        type: "subsection",
        id: "minimum-requirements",
        title: "1.3 Minimum Requirements",
        content: [
          {
            type: "bold",
            text: "You must be 18+ years old",
          },
          "with legal capacity to enter into binding contracts.",
        ],
      },
      {
        type: "subsection",
        id: "document-hierarchy",
        title: "1.4 Document Hierarchy",
        content: [
          "If multiple documents apply, this is the order (privacy policy and this TOS agreement hold the same binding power):",
          {
            type: "list",
            ordered: true,
            items: [
              "Order Form (custom enterprise agreements)",
              "Data Processing Addendum (if executed)",
              "These Terms of Service & Privacy Policy",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "definitions",
    number: "2",
    title: "DEFINITIONS",
    content: [
      {
        type: "table",
        headers: ["Term", "Definition"],
        rows: [
          ["Account", "Your login credentials, organization settings, and user permissions"],
          ["Customer Data", "All data you upload/submit: CRM contacts, deals, documents, content, expenses, communications"],
          ["Services", "The Strive SaaS platform (SAI): CRM, The Office, AI Hub, REID, Content Studio, Expense/Tax, Integrations"],
          ["Strive Tech Property", "Our platform, code, technology, documentation, designs, and trademarks. All intellectual property we retain"],
          ["Subscription Term", "The period you've paid for access (monthly or annual, auto-renewing unless canceled)"],
          ["User", "An individual authorized to access the Services under your Account (employees, contractors, agents)"],
          ["User Role", "Permission level assigned to users: OWNER (full admin), ADMIN (member management), MEMBER (standard user), VIEWER (limited access)"],
        ],
      },
      "For a complete glossary, see Appendix A.",
    ],
  },
  {
    id: "services-overview",
    number: "3",
    title: "SERVICES OVERVIEW",
    content: [
      {
        type: "subsection",
        id: "what-we-provide",
        title: "3.1 What We Provide",
        content: [
          "The Strive platform (SAI) includes, but is not limited to, the following:",
          {
            type: "list",
            items: [
              "CRM – Contact, lead, and deal management with pipelines and activity tracking",
              "The Office – Transaction workflows, document management, party coordination, closing coordination",
              "REID – Market intelligence, property analysis, demographic data, valuations (informational only, not appraisals)",
              "Content Studio – Email and social media campaign creation with AI assistance",
              "Expense/Tax – Business expense tracking, mileage logging, tax documentation",
              "Integrations – Email, calendar, social media, MLS & IDX data, mapping services, payment processing, and more",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "availability",
        title: "3.2 Availability",
        content: [
          "We strive for 24/7 availability, but make no uptime guarantees, considering uptime can be out of our control, and 3rd party service providers may experience outages.",
          {
            type: "bold",
            text: "Planned maintenance",
          },
          "(≥48 hours' notice), emergency maintenance (urgent security fixes), and third-party service failures are not breaches of any commitment.",
        ],
      },
      {
        type: "subsection",
        id: "electronic-signature-compliance",
        title: "3.3 Electronic Signature Compliance",
        content: [
          '"The Office" module handles documents and provides e-signature capabilities via 3rd party services, which follow the E-SIGN Act and are UETA compliant.',
          "Document signing features comply with the Electronic Signatures in Global and National Commerce Act (E-SIGN Act) and Uniform Electronic Transactions Act (UETA). By using electronic signature features, you:",
          {
            type: "list",
            items: [
              "Consent to conduct transactions electronically",
              "Acknowledge electronic signatures are legally binding",
              "Are responsible for ensuring signers consent to electronic signatures",
              "Must provide paper copies if requested by signers",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "subscription-tier",
        title: "3.4 Your Subscription Tier",
        content: [
          "See strivetech.ai/pricing for detailed feature comparison and custom pricing and what is offered for each subscription tier.",
        ],
      },
      {
        type: "subsection",
        id: "beta-features",
        title: "3.5 Beta Features",
        content: [
          'Features labeled "Beta," "Alpha," "Preview," "Labs," or "Experimental" are:',
          {
            type: "list",
            items: [
              'Provided "AS IS" without warranties',
              "Not covered by SLA commitments",
              "May be unstable, incomplete, or discontinued without notice",
              "Not for production use",
            ],
          },
          "By using Beta Features, you acknowledge that you accept these limitations and understand that we're not liable for any issues that may arise.",
        ],
      },
      {
        type: "subsection",
        id: "platform-accessibility",
        title: "3.6 Platform Accessibility",
        content: [
          'If you need any type of accommodation in regards to the SAI platforms\' formatting, layout, or any other accessibility item that\'s not currently offered on the platform, please contact us via email with "Accessibility Accommodation" in the subject line.',
        ],
      },
    ],
  },
  {
    id: "your-account",
    number: "4",
    title: "YOUR ACCOUNT",
    content: [
      {
        type: "subsection",
        id: "account-creation",
        title: "4.1 Account Creation",
        content: [
          "To create an Account, you must provide:",
          {
            type: "list",
            items: [
              "Full name, email, phone number, organization name",
              "Password (minimum 12 characters, strong security recommended)",
              "Real estate license number (recommended for verification)",
              "Acceptance of these Terms and Privacy Policy",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "your-representations",
        title: "4.2 Your Representations",
        content: [
          "By creating an Account, you represent that:",
          {
            type: "list",
            items: [
              "You are 18+ years old with legal capacity to contract",
              "You are a licensed real estate professional or using Services for legitimate business purposes",
              "If creating for an organization, you have authority to bind it",
              "All information you provide is accurate and current",
              "Your use will comply with all applicable laws",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "account-security",
        title: "4.3 Account Security",
        content: [
          { type: "bold", text: "Your Responsibilities:" },
          {
            type: "list",
            items: [
              "Keep your password confidential and unique",
              "Enable multi-factor authentication (MFA) — strongly recommended for OWNER/ADMIN roles",
              "Monitor your Account activity regularly",
              "Immediately notify contact@strivetech.ai if you suspect: Unauthorized access, Compromised credentials, or Suspicious activity",
            ],
          },
          { type: "bold", text: "Our Responsibilities:" },
          {
            type: "list",
            items: [
              "Use industry-standard password hashing (bcrypt or similar)",
              "Offer MFA options (TOTP, SMS, WebAuthn)",
              "Monitor for suspicious login patterns",
              "Notify you of unrecognized logins or security events",
            ],
          },
          {
            type: "bold",
            text: "Liability:",
          },
          "You are responsible for all activities under your Account unless caused by our gross negligence. We are not liable if you fail to keep passwords confidential, enable MFA, or notify us of compromise.",
        ],
      },
      {
        type: "subsection",
        id: "organization-accounts",
        title: "4.4 Organization Accounts",
        content: [
          "If creating a multi-user organization account:",
          {
            type: "list",
            items: [
              'Organization is the "Customer" responsible for all User activity and Fees',
              "OWNER role (typically the Account creator) has full administrative rights and billing access",
              "ADMIN roles can manage users and organization-wide data (but not billing)",
              "MEMBER roles have access to standard features and their own data",
              "VIEWER roles have limited access (document signing/viewing only, no CRM)",
            ],
          },
          "When an employee/agent relationship ends:",
          {
            type: "list",
            items: [
              "The Organization retains ownership of organization-scoped data (billing, settings, templates)",
              "The Organization may retain access to user-scoped data (CRM, deals) if employment agreements specify this",
              "Strive does not arbitrate data ownership disputes between organizations and departing users",
            ],
          },
          {
            type: "bold",
            text: "Recommendation:",
          },
          "Have clear written policies in employment/contractor agreements specifying data ownership and access upon departure.",
        ],
      },
    ],
  },
  {
    id: "fees-billing",
    number: "5",
    title: "FEES & BILLING",
    content: [
      {
        type: "subsection",
        id: "pricing-payment",
        title: "5.1 Pricing & Payment",
        content: [
          {
            type: "list",
            items: [
              "Fees are billed monthly or annually, in advance, based on your chosen tier",
              "Monthly billing: Charged on the same calendar day each month",
              "Annual billing: Charged on subscription anniversary; typically includes 10-20% discount",
              "All fees in USD unless specified in a custom Order Form",
              "Payment methods: Credit card (Visa, Mastercard, Amex, Discover), debit card, ACH (annual only), or invoice (enterprise)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "payment-processing",
        title: "5.2 Payment Processing",
        content: [
          {
            type: "bold",
            text: "Payments are processed by Stripe.",
          },
          "By paying, you:",
          {
            type: "list",
            items: [
              "Authorize charges for subscription fees and overage charges",
              "Agree to Stripe's terms and privacy policy",
              "Represent that you have authority to use the payment method provided",
              "Will maintain a valid payment method on file",
            ],
          },
          {
            type: "bold",
            text: "We use PCI DSS Level 1 standards and never store complete card numbers.",
          },
        ],
      },
      {
        type: "subsection",
        id: "disputed-failed-payments",
        title: "5.3 Disputed or Failed Payments",
        content: [
          "If payment fails or is disputed:",
          {
            type: "list",
            items: [
              "We may suspend your Account after 30 days past due",
              "Outstanding Fees become immediately due",
              "You must update your payment method to restore access",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "price-changes",
        title: "5.4 Price Changes",
        content: [
          {
            type: "bold",
            text: "We may increase prices with 30 days' advance notice via email.",
          },
          "Price increases apply to new subscriptions and renewals only — your current term is locked in. You may cancel before renewal to avoid increased pricing.",
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    number: "6",
    title: "ACCEPTABLE USE & REAL ESTATE COMPLIANCE",
    content: [
      {
        type: "subsection",
        id: "permitted-use",
        title: "6.1 Permitted Use",
        content: [
          "Use the Services only for lawful business purposes:",
          {
            type: "list",
            items: [
              "Managing real estate operations, client relationships, and transactions",
              "Creating marketing content for your business",
              "Analyzing market data and tracking expenses",
              "Complying with applicable laws and professional standards",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "prohibited-activities",
        title: "6.2 Prohibited Activities",
        content: [
          { type: "bold", text: "You may NOT:" },
          {
            type: "table",
            headers: ["Category", "Prohibited"],
            rows: [
              ["Illegal", "Violate any law; RESPA, Fair Housing, state licensing laws; GDPR, CCPA, privacy laws"],
              ["IP Infringement", "Infringe copyrights, trademarks, patents, trade secrets, or upload pirated/unauthorized content"],
              ["Privacy Violations", "Collect personal info without consent; scrape/harvest platform data"],
              ["Fraud", "Fraudulent practices; fake reviews; manipulated valuations"],
              ["Security Threats", "Malware; unauthorized access; DDoS attacks; reverse engineering; security breaches"],
              ["Abuse", "Spam; phishing; harassment; impersonation; excessive resource consumption"],
              ["Fair Housing Act", "Discriminate based on protected classes (race, color, national origin, religion, sex, familial status, disability); create discriminatory marketing content or AI outputs"],
              ["RESPA", "Illegal kickbacks; undisclosed referral fees; unlawful compensation"],
              ["MLS Violations", "Download entire MLS databases; redistribute MLS data; use MLS data for non-real-estate purposes; violate MLS terms"],
              ["Licensing", "Practice real estate without proper licensing; violate state regulations"],
              ["Client Data", "Use client lists for unauthorized purposes; contact unauthorized clients; violate fiduciary duties"],
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "enforcement",
        title: "6.3 Enforcement",
        content: [
          "We may:",
          {
            type: "list",
            items: [
              "Investigate suspected violations",
              "Remove violating content or restrict features",
              "Suspend or terminate your Account immediately for serious violations (malware, fraud, security breaches)",
              "Pursue legal action and seek indemnification for damages caused",
            ],
          },
          {
            type: "bold",
            text: "Violations result in termination for cause — no refunds for prepaid fees.",
          },
          {
            type: "bold",
            text: "Appeal:",
          },
          "Email contact@strivetech.ai with a detailed explanation within 10 business days. We will review and respond.",
        ],
      },
      {
        type: "subsection",
        id: "real-estate-specific-compliance",
        title: "6.4 Real Estate-Specific Compliance",
        content: [
          { type: "bold", text: "Fair Housing Act:" },
          {
            type: "list",
            items: [
              "Do not discriminate based on protected classes in transactions, marketing, or property steering",
              "Review all AI-generated marketing content for Fair Housing compliance before publishing",
              "We design AI features for Fair Housing compliance, but you are ultimately responsible for your use",
            ],
          },
          { type: "bold", text: "RESPA Compliance:" },
          {
            type: "list",
            items: [
              "Maintain transaction records for 7 years",
              "Disclose all business relationships per RESPA",
              "Avoid illegal kickbacks and undisclosed compensation",
              "The Services provides compliance tracking; you are responsible for compliance",
            ],
          },
          { type: "bold", text: "State Licensing:" },
          {
            type: "list",
            items: [
              "You represent that you hold valid real estate licenses in states where you operate",
              "Your license is in good standing (not suspended or revoked)",
              "You will comply with state real estate commission regulations",
            ],
          },
          { type: "bold", text: "MLS Data:" },
          {
            type: "list",
            items: [
              "Comply with your MLS board's terms of service",
              "Do not download entire MLS databases or redistribute to non-members",
              "Provide required MLS attribution",
              "Use MLS data only for real estate purposes",
            ],
          },
          {
            type: "bold",
            text: "Reporting:",
          },
          "Email contact@strivetech.ai to report violations. For Fair Housing concerns, email contact@strivetech.ai.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "7",
    title: "INTELLECTUAL PROPERTY",
    content: [
      {
        type: "subsection",
        id: "strive-property",
        title: "7.1 Strive Property (What We Own)",
        content: [
          "Strive retains all rights, title, and interest in:",
          {
            type: "list",
            items: [
              "Our software, platform code, algorithms, APIs",
              "User interfaces, designs, documentation",
              'Trademarks: "Strive," "The Office," "REID," "AI Hub," "Content Studio"',
              "Aggregated, anonymized usage data and analytics",
            ],
          },
          {
            type: "bold",
            text: "We grant you a limited, non-exclusive license to use the Services during your subscription only. This license terminates immediately upon subscription termination.",
          },
        ],
      },
      {
        type: "subsection",
        id: "customer-data",
        title: "7.2 Customer Data (What You Own)",
        content: [
          { type: "bold", text: "You retain all ownership rights to Customer Data:" },
          {
            type: "list",
            items: [
              "CRM contacts, deals, notes, relationships",
              "Uploaded documents (contracts, photos, receipts)",
              "Content you create in Content Studio",
              "Expense records and financial information",
            ],
          },
          { type: "bold", text: "You grant Strive a worldwide, non-exclusive, royalty-free license to:" },
          {
            type: "list",
            items: [
              "Host, store, and transmit your data",
              "Create backups and archives",
              "Process data to provide Services features",
              "Generate anonymized, aggregated analytics",
            ],
          },
          { type: "bold", text: "We will not:" },
          {
            type: "list",
            items: [
              "Sell or rent your Customer Data",
              "Use it for our own marketing (unless you consent to case studies)",
              "Share it with third parties (except sub-processors bound by confidentiality)",
            ],
          },
          {
            type: "bold",
            text: "Upon termination:",
          },
          "Your license to Strive terminates. We delete Customer Data after 30 days, except for backups (up to 90 days) and data required by law (RESPA 7-year retention, tax records).",
        ],
      },
      {
        type: "subsection",
        id: "ai-generated-content",
        title: "7.3 AI-Generated Content",
        content: [
          "Content generated by our AI features (drafts, valuations, lead scores, market analysis) is subject to evolving legal standards.",
          { type: "bold", text: "Your Rights:" },
          {
            type: "list",
            items: [
              "You can use any AI outputs generated for your Account",
              "You may use, modify, and publish AI-generated content",
            ],
          },
          { type: "bold", text: "Critical Disclaimers:" },
          {
            type: "list",
            items: [
              "Uncertain copyright status: AI-generated content may not be copyrightable under current U.S. law",
              "Training data risk: AI models are trained on large datasets; AI outputs may unintentionally resemble or infringe third-party copyrights",
              "You are responsible for reviewing AI outputs before publication and ensuring they don't infringe",
            ],
          },
          { type: "bold", text: "Your Obligations:" },
          {
            type: "list",
            items: [
              "Review and edit all AI-generated content (marketing, valuations, descriptions) before using",
              "Verify factual accuracy — AI can make mistakes",
              "Ensure AI-generated marketing content complies with the Fair Housing Act",
              "Do not rely on AI outputs for legal, financial, tax, investment, or appraisal advice",
            ],
          },
          "See Section 8.4 for AI-Specific Disclaimers.",
        ],
      },
      {
        type: "subsection",
        id: "feedback-license",
        title: "7.4 Feedback License",
        content: [
          "Any feedback, suggestions, or enhancement requests you provide to us become our property. We may use feedback without compensation or attribution. Feedback is voluntary — if you want to retain rights to ideas, propose a separate written agreement.",
        ],
      },
      {
        type: "subsection",
        id: "trademark-usage",
        title: "7.5 Trademark Usage",
        content: [
          { type: "bold", text: "You may NOT:" },
          {
            type: "list",
            items: [
              "Use Strive trademarks without written consent",
              "Register domain names or social media handles with Strive marks",
              "Modify or create derivatives of Strive logos",
            ],
          },
          { type: "bold", text: "You MAY:" },
          {
            type: "list",
            items: [
              'Accurately state you use Strive Services ("We use Strive for CRM")',
              "Display Strive badges we provide in your integration list",
              "Reference Strive truthfully in comparative advertising",
            ],
          },
          {
            type: "bold",
            text: "Customer Reference Program:",
          },
          "We may display your company name and logo as a customer reference unless you opt out (email contact@strivetech.ai).",
        ],
      },
      {
        type: "subsection",
        id: "dmca-copyright-compliance",
        title: "7.6 DMCA Copyright Compliance",
        content: [
          "If you believe Customer Data infringes your copyright, submit a DMCA takedown notice to contact@strivetech.ai including:",
          {
            type: "list",
            ordered: true,
            items: [
              "Description of the copyrighted work",
              "Description and location of the infringing material (URL, account, file name)",
              "Your contact information",
              "Statement under penalty of perjury that the information is accurate and you have authority to act",
            ],
          },
          "Upon receipt, we will investigate, remove the material if valid, and notify the uploader. Repeat infringers' Accounts will be terminated per DMCA requirements.",
        ],
      },
    ],
  },
  {
    id: "warranties-disclaimers",
    number: "8",
    title: "WARRANTIES & DISCLAIMERS",
    content: [
      {
        type: "subsection",
        id: "limited-warranty",
        title: "8.1 Limited Warranty",
        content: [
          {
            type: "bold",
            text: "Strive Tech warrants that the Services will perform substantially in accordance with our Documentation under normal use during your Subscription Term.",
          },
          { type: "bold", text: "If the Services don't meet this warranty:" },
          {
            type: "list",
            ordered: true,
            items: [
              "Notify us in writing at contact@strivetech.ai",
              "We will use commercially reasonable efforts to fix the issue within 30 days",
              "If we can't fix it within 30 days, you may terminate and receive a pro-rata refund of prepaid fees",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "warranty-exclusions",
        title: "8.2 Warranty Exclusions",
        content: [
          "The limited warranty does NOT apply to:",
          {
            type: "list",
            items: [
              "Issues caused by your actions (misuse, unauthorized modifications, unsupported configurations)",
              "Third-party issues (internet, devices, MLS systems, email providers)",
              "Force majeure events",
              "FREE tier or Beta Features",
              "Issues caused by your failure to follow Documentation",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "disclaimer-of-warranties",
        title: "8.3 Disclaimer of All Other Warranties",
        content: [
          {
            type: "bold",
            text: 'EXCEPT FOR THE LIMITED WARRANTY ABOVE, THE SERVICES ARE PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.',
          },
          "We specifically disclaim:",
          {
            type: "list",
            items: [
              "Merchantability — the Services are not warranted to be suitable for sale or any particular use",
              "Fitness for Purpose — the Services may not meet your specific business needs",
              "Non-infringement — the Services may infringe third-party rights (see Section 10.1 for IP indemnification)",
              "Uninterrupted/error-free operation — bugs, downtime, and security risks are inherent to software",
            ],
          },
          "We do not warrant that:",
          {
            type: "list",
            items: [
              "Defects will be corrected",
              "Third-party integrations will function properly",
              "AI outputs will be accurate or error-free",
              "The Services will meet your requirements",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "ai-specific-disclaimers",
        title: "8.4 AI-Specific Disclaimers",
        content: [
          {
            type: "bold",
            text: "AI FEATURES ARE TOOLS, NOT PROFESSIONAL SERVICES",
          },
          { type: "bold", text: "NOT Legal Advice:" },
          {
            type: "list",
            items: [
              "AI-generated legal content, contract suggestions, or compliance guidance are informational only",
              "Consult a licensed attorney for legal matters, contract reviews, Fair Housing/RESPA compliance",
            ],
          },
          { type: "bold", text: "NOT Financial Advice:" },
          {
            type: "list",
            items: [
              "AI property valuations, market forecasts, investment analysis, or financial recommendations are informational only",
              "Consult a qualified financial advisor, CPA, or investment professional for financial decisions",
            ],
          },
          { type: "bold", text: "NOT Appraisals:" },
          {
            type: "list",
            items: [
              "AI property valuations are estimates for informational purposes only",
              "Licensed appraisals are required for mortgage lending and legal purposes",
            ],
          },
          { type: "bold", text: "NOT Professional Consulting:" },
          {
            type: "list",
            items: [
              "AI insights do not replace your professional expertise, market knowledge, or fiduciary duties",
              "Exercise independent professional judgment in all client interactions",
            ],
          },
          { type: "bold", text: "AI Outputs May Contain Errors:" },
          {
            type: "list",
            items: [
              "Hallucinations – AI may generate plausible-sounding but incorrect information",
              "Bias – AI models may exhibit biases present in training data",
              "Outdated information – AI knowledge has a cutoff date; recent events may not be reflected",
              "Misinterpretations – AI may misunderstand context or nuance",
            ],
          },
          { type: "bold", text: "YOU MUST:" },
          {
            type: "list",
            items: [
              "Review all AI-generated content (marketing, valuations, descriptions, analyses) before using",
              "Verify information against authoritative sources (MLS, public records, professional appraisals)",
              "Edit and customize AI outputs to strengthen accuracy and ownership",
              "Ensure all marketing content complies with Fair Housing Act",
              "Exercise professional judgment; don't rely solely on AI recommendations",
            ],
          },
          {
            type: "bold",
            text: "Failure to review AI outputs is your responsibility, not ours.",
          },
        ],
      },
      {
        type: "subsection",
        id: "third-party-services",
        title: "8.5 Third-Party Services",
        content: [
          "The Services integrate with third-party providers (Supabase, Stripe, OpenAI, Vercel, MLS systems, email providers). Please refer to the privacy policy for the full list of 3rd party service providers.",
          { type: "bold", text: "We do not control and are not responsible for:" },
          {
            type: "list",
            items: [
              "Availability, functionality, or reliability of third-party services",
              "Changes to third-party APIs, terms, or pricing",
              "Data practices or security of third-party providers",
              "Outages, bugs, or failures in third-party systems",
            ],
          },
          {
            type: "bold",
            text: 'Third-party services are provided "AS IS" under their own terms, warranties, and limitations. We make no warranties for third-party services.',
          },
        ],
      },
    ],
  },
  {
    id: "liability-limitations",
    number: "9",
    title: "LIABILITY LIMITATIONS",
    content: [
      {
        type: "bold",
        text: "CRITICAL: Read this carefully. These limitations fundamentally affect your legal rights.",
      },
      {
        type: "subsection",
        id: "liability-cap",
        title: "9.1 Liability Cap",
        content: [
          {
            type: "bold",
            text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, STRIVE'S TOTAL LIABILITY FOR ALL CLAIMS COMBINED SHALL NOT EXCEED THE GREATER OF:",
          },
          "(A) Fees paid to Strive in the 12 months preceding the claim, OR",
          "(B) $1,000 USD (minimum)",
          { type: "bold", text: "Examples:" },
          {
            type: "list",
            items: [
              "Monthly subscriber ($100/month): Cap = $1,200",
              "Annual ELITE subscriber ($499/month = $5,988/year): Cap = $5,988",
              "FREE tier (no payment): Cap = $1,000",
              "CUSTOM subscriber ($5,000/month): Cap = $60,000",
            ],
          },
          {
            type: "bold",
            text: "This cap applies to ALL claims combined, not per claim.",
          },
        ],
      },
      {
        type: "subsection",
        id: "no-consequential-damages",
        title: "9.2 No Liability for Consequential Damages",
        content: [
          {
            type: "bold",
            text: "STRIVE IS NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING:",
          },
          {
            type: "list",
            items: [
              "Lost profits, lost revenue, or lost business opportunities (lost commissions, lost deals)",
              "Loss of data (deleted or corrupted Customer Data)",
              "Loss of goodwill or reputation (damage from service issues or breaches)",
              "Cost of substitute services (migrating to another CRM)",
              "Business interruption (inability to conduct business during downtime)",
            ],
          },
          {
            type: "bold",
            text: "EVEN IF STRIVE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
          },
        ],
      },
      {
        type: "subsection",
        id: "exceptions-to-limitations",
        title: "9.3 Exceptions to Limitations",
        content: [
          "Sections 9.1 and 9.2 do NOT apply to:",
          {
            type: "list",
            ordered: true,
            items: [
              "Death or personal injury from Strive's gross negligence or willful misconduct",
              "Fraud or intentional misconduct by Strive",
              "IP Infringement claims — Strive's indemnification obligation (Section 10.1) is not capped",
              "Customer's Acceptable Use violations — we can seek full damages",
              "Customer's indemnification obligations (Section 10.4) — not subject to liability cap",
              "Liabilities that cannot be limited by law (e.g., GDPR damages, consumer protection laws)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "real-estate-transaction-disclaimers",
        title: "9.4 Real Estate Transaction Disclaimers",
        content: [
          { type: "bold", text: "WE ARE NOT RESPONSIBLE FOR:" },
          {
            type: "list",
            items: [
              "Whether deals close or fall through",
              "Client satisfaction or complaints",
              "Commission payments or disputes",
              "Legal compliance of your transactions (you are responsible)",
              "Professional errors or omissions in your practice",
            ],
          },
          { type: "bold", text: "WE ARE NOT LIABLE FOR:" },
          {
            type: "list",
            items: [
              "Losses from missed deadlines due to service issues",
              "Errors in AI-generated valuations or market analysis",
              "Discriminatory content (you must review AI outputs)",
              "MLS rule violations resulting from your use",
              "Client data breaches if you failed to follow security practices (Section 4.3)",
            ],
          },
          {
            type: "bold",
            text: "You are the licensed professional. We provide tools; you provide professional services and assume liability for your use.",
          },
        ],
      },
      {
        type: "subsection",
        id: "basis-of-bargain",
        title: "9.5 Basis of the Bargain",
        content: [
          {
            type: "bold",
            text: "These limitations reflect an agreed allocation of risk and are fundamental to this agreement. The Services would not be provided at current pricing without these limitations.",
          },
          "By using the Services, you acknowledge that:",
          {
            type: "list",
            items: [
              "Software services inherently carry risks of bugs, outages, and errors",
              "The pricing reflects this allocation of risk",
              "These limitations are reasonable for B2B SaaS services",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "indemnification",
    number: "10",
    title: "INDEMNIFICATION",
    content: [
      {
        type: "subsection",
        id: "strive-indemnifies-you",
        title: "10.1 Strive Indemnifies You (IP Infringement)",
        content: [
          {
            type: "bold",
            text: "Strive will defend, indemnify, and hold you harmless from third-party claims that the Services infringe or misappropriate a third party's intellectual property rights (patents, copyrights, trademarks, trade secrets).",
          },
          { type: "bold", text: "Conditions:" },
          {
            type: "list",
            items: [
              "You promptly notify us (contact@strivetech.ai)",
              "We have sole control of the defense and settlement",
              "You cooperate reasonably at our expense",
            ],
          },
          { type: "bold", text: "If infringement occurs, we will, at our option:" },
          {
            type: "list",
            ordered: true,
            items: [
              "Obtain a license so you can continue using the Services (at our expense)",
              "Modify the Services to make them non-infringing with equivalent functionality",
              "Replace the Services with non-infringing alternatives",
              "Terminate and refund prepaid fees on a pro-rata basis if options 1-3 aren't feasible",
            ],
          },
          {
            type: "bold",
            text: "This Section 10.1 is your exclusive remedy for IP infringement by the Services.",
          },
          { type: "bold", text: "Exceptions:" },
          "We have no obligation if infringement results from:",
          {
            type: "list",
            items: [
              "Your modifications to the Services",
              "Combining Services with non-Strive products",
              "Your use of outdated versions after we provide non-infringing alternatives",
              "Your breach of these Terms or Documentation",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "you-indemnify-strive",
        title: "10.2 You Indemnify Strive",
        content: [
          {
            type: "bold",
            text: "You will defend, indemnify, and hold us harmless from third-party claims arising from:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Customer Data – claims that your data infringes third-party rights, violates privacy, defames, or is illegal",
              "Acceptable Use violations – illegal activity, security breaches, abuse, spam, fraud, discrimination",
              "Breach of representations – false Account information, lack of authority",
              "Real estate violations – Fair Housing violations, RESPA violations, licensing violations, MLS violations",
              "AI-generated content – infringement, defamation, or misleading advertising from AI outputs you published without review",
              "Your professional use – claims from your clients, employees, or users arising from your use of the Services",
              "Employment disputes – claims from employees/contractors about Account access or data ownership",
            ],
          },
          { type: "bold", text: "Conditions:" },
          {
            type: "list",
            items: [
              "We promptly notify you of the claim",
              "You have sole control of defense and settlement",
              "We cooperate reasonably at your expense",
              "You don't settle in a way that admits our liability",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "indemnification-procedures",
        title: "10.3 Indemnification Procedures",
        content: [
          "For any indemnifiable claim:",
          {
            type: "table",
            headers: ["Step", "Action"],
            rows: [
              ["1", "Prompt Notice – Notify the indemnifying party in writing with description, parties, alleged damages, copies of complaints"],
              ["2", "Control of Defense – The indemnifying party assumes sole control; selects counsel; determines strategy and settlement"],
              ["3", "Cooperation – The indemnified party provides reasonable cooperation, documents, access, and personnel"],
              ["4", "No Independent Action – Don't settle independently, admit liability, or prejudice the defense"],
              ["5", "Settlement Consent – The indemnifying party cannot settle in a way that admits the indemnified party's liability or imposes obligations, without written consent"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "term-renewal-termination",
    number: "11",
    title: "TERM, RENEWAL & TERMINATION",
    content: [
      {
        type: "subsection",
        id: "subscription-term",
        title: "11.1 Your Subscription Term",
        content: [
          "Your subscription starts on the Effective Date (when you create your Account or execute an Order Form) and continues for:",
          {
            type: "list",
            items: [
              "Monthly: One (1) month, auto-renewing each month",
              "Annual: One (1) year (12 months), auto-renewing annually",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "automatic-renewal",
        title: "11.2 Automatic Renewal",
        content: [
          "Unless you cancel before the renewal date, your subscription automatically renews.",
          {
            type: "bold",
            text: "30 days before renewal, we email you with the renewal date, fees, and cancellation instructions.",
          },
          { type: "bold", text: "To cancel:" },
          {
            type: "list",
            ordered: true,
            items: [
              "Log in to Account Settings → Billing → Cancel Subscription, OR",
              'Email contact@strivetech.ai with "Cancel Subscription"',
            ],
          },
          {
            type: "bold",
            text: "Cancellation takes effect at the end of your current billing period. You retain access until then.",
          },
        ],
      },
      {
        type: "subsection",
        id: "termination-by-you",
        title: "11.3 Termination by You (For Convenience)",
        content: [
          "You may terminate anytime for any reason:",
          {
            type: "list",
            items: [
              "Effect: Subscription ends at the end of your current billing period",
              "Refunds: No refund for unused time in the current period (except paid Fees for deficient Services if warranty is breached per Section 8.1)",
              "Data: You have 30 days from termination to export your Customer Data (see Section 11.5)",
            ],
          },
          { type: "bold", text: "Termination by You (For Strive's Breach/Cause)" },
          "You may terminate immediately if:",
          {
            type: "list",
            items: [
              "Strive materially breaches these Terms",
              "We fail to cure within 30 days of your written notice",
            ],
          },
          {
            type: "bold",
            text: "Upon termination for cause: Strive refunds prepaid fees on a pro-rata basis for unused time.",
          },
        ],
      },
      {
        type: "subsection",
        id: "termination-by-strive",
        title: "11.4 Termination by Strive",
        content: [
          { type: "bold", text: "For Cause (Immediate Termination):" },
          "We may immediately terminate your Account if you:",
          {
            type: "list",
            items: [
              "Violate the Acceptable Use Policy (Section 6)",
              "Fail to pay after 30 days past due",
              "Pose a security risk",
              "Violate law or regulatory requirements",
            ],
          },
          { type: "bold", text: "Effect:" },
          {
            type: "list",
            items: [
              "Your Account is immediately disabled",
              "You forfeit prepaid Fees (termination for cause = no refund)",
              "You have 30 days to export Customer Data",
              "Outstanding Fees become immediately due",
            ],
          },
          { type: "bold", text: "For Convenience (60-day Notice):" },
          "We may terminate your subscription for any reason with 60 days' advance email notice.",
          { type: "bold", text: "Effect:" },
          {
            type: "list",
            items: [
              "Your subscription continues for 60 days",
              "You retain full access during the notice period",
              "Refund of prepaid Fees on a pro-rata basis for time after the notice period",
            ],
          },
          { type: "bold", text: "Service Discontinuation (90-day Notice):" },
          "If we discontinue the Services entirely:",
          {
            type: "list",
            items: [
              "90 days' advance notice via email and in-app notification",
              "Refund of prepaid Fees on a pro-rata basis",
              "Assisted data export support",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "effects-of-termination",
        title: "11.5 Effects of Termination",
        content: [
          "Upon termination (regardless of cause):",
          {
            type: "table",
            headers: ["Item", "What Happens"],
            rows: [
              ["Access", "Immediately disabled (or at end of notice period for at-will terminations)"],
              ["Payment", "Outstanding Fees become immediately due"],
              ["Data Export", "You have 30 days to export Customer Data (see below)"],
              ["Licenses", "All licenses terminate; you must stop using the Services"],
              ["Integrations", "Third-party connections are disconnected"],
              ["Auto-Renewal", "Automatically canceled; no future charges"],
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "data-export-portability",
        title: "11.6 Data Export & Portability",
        content: [
          {
            type: "bold",
            text: "Data Clarification:",
          },
          '"Operational" account data: deletable or exportable within 30 days post-termination (self-service tools), subject to exceptions.',
          '"Regulatory" and audit records (real estate, tax, security logs): retained for specified periods (e.g., 7 years) and expressly carved out from early deletion.',
          { type: "bold", text: "During Your 30-day Grace Period:" },
          "You can export Customer Data via:",
          {
            type: "list",
            ordered: true,
            items: [
              "Self-Service – Account Settings → Privacy → Export Data (JSON, CSV, PDF, ZIP formats)",
              "API – Use our API to programmatically retrieve Customer Data (API key remains active during grace period)",
              "Assisted Export (ELITE & Enterprise) – Email contact@strivetech.ai for help extracting and migrating data",
            ],
          },
          { type: "bold", text: "After 30 Days:" },
          {
            type: "list",
            items: [
              "Customer Data is permanently deleted per our data retention policies",
              "Exceptions: Data required by law (RESPA 7-year retention, tax records) or legal holds",
              "Backups may retain data for up to 90 additional days, then permanently deleted",
              "You cannot recover data after the grace period expires",
            ],
          },
          {
            type: "bold",
            text: "Recommendation: Export data immediately upon cancellation notice.",
          },
        ],
      },
      {
        type: "subsection",
        id: "survival",
        title: "11.7 Survival",
        content: [
          "These sections survive termination and continue binding:",
          {
            type: "list",
            items: [
              "Section 5: Outstanding payment obligations",
              "Section 7: Intellectual property rights and restrictions",
              "Section 8: Warranty disclaimers (apply to pre-termination Services)",
              "Section 9: Liability limitations and caps",
              "Section 10: Indemnification obligations",
              "Section 12: Confidentiality (3-year survival)",
              "Section 16-17: Dispute resolution, governing law, venue",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "confidentiality",
    number: "12",
    title: "CONFIDENTIALITY",
    content: [
      {
        type: "subsection",
        id: "whats-confidential",
        title: "12.1 What's Confidential",
        content: [
          '"Confidential Information" means non-public information disclosed by one party to the other that is:',
          {
            type: "list",
            items: [
              'Marked "Confidential," "Proprietary," "Restricted," or similar, OR',
              "A reasonable person would understand to be confidential given the nature and context",
            ],
          },
          {
            type: "bold",
            text: "Examples for Strive:",
          },
          "Source code, algorithms, pricing, product roadmap, security practices, trade secrets",
          {
            type: "bold",
            text: "Examples for You:",
          },
          "Customer Data, business strategies, financial information, client lists, commission structures",
        ],
      },
      {
        type: "subsection",
        id: "whats-not-confidential",
        title: "12.2 What's NOT Confidential",
        content: [
          "Confidential Information excludes:",
          {
            type: "list",
            items: [
              "Information already publicly available",
              "Information known to Recipient before disclosure (documented in writing)",
              "Information independently developed without using Discloser's Confidential Information",
              "Information disclosed by a third party without confidentiality obligations",
              "Information disclosed with Discloser's written consent",
              "Information legally compelled to be disclosed (subject to Section 12.4)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "your-obligations",
        title: "12.3 Your Obligations",
        content: [
          "Recipient agrees to:",
          {
            type: "list",
            ordered: true,
            items: [
              "Limited Use – Use Confidential Information only for performing these Terms",
              "Protection – Protect with the same care used for your own confidential information (no less than reasonable care)",
              "Restricted Disclosure – Limit disclosure to employees, contractors, and professional advisors (attorneys, accountants) who are bound by confidentiality duties",
              "No Reverse Engineering – Don't reverse engineer, decompile, or derive source code; don't use to create competing products",
              "Return or Destruction – Upon termination or request, return or destroy Confidential Information; provide written destruction certification if requested (exception: one archival copy for legal compliance)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "compelled-disclosure",
        title: "12.4 Compelled Disclosure",
        content: [
          "If legally compelled to disclose Confidential Information (subpoena, court order, regulatory request):",
          {
            type: "list",
            ordered: true,
            items: [
              "Prompt Notice – Notify the Discloser as soon as legally permissible",
              "Cooperation – Cooperate with Discloser's efforts to seek a protective order (at Discloser's expense)",
              "Limited Disclosure – Disclose only the minimum information required",
              "Request Confidentiality – Request confidential treatment of disclosed information where possible",
            ],
          },
          {
            type: "bold",
            text: "Compelled disclosure in compliance with this section does NOT constitute a breach.",
          },
        ],
      },
      {
        type: "subsection",
        id: "remedies-duration",
        title: "12.5 Remedies & Duration",
        content: [
          "Breach may result in:",
          {
            type: "list",
            items: [
              "Injunctive relief (court orders to stop disclosure and prevent use)",
              "Damages (actual losses caused by breach, including attorney fees if prevailing party)",
              "Disgorgement of profits from unauthorized use",
            ],
          },
          { type: "bold", text: "Duration of Obligations:" },
          {
            type: "list",
            items: [
              "General Confidential Information: 3 years from disclosure date",
              "Trade Secrets: Indefinitely (as long as meeting trade secret definition)",
            ],
          },
          "After expiration, recipient is released from confidentiality obligations.",
        ],
      },
    ],
  },
  {
    id: "data-protection-privacy",
    number: "13",
    title: "DATA PROTECTION & PRIVACY",
    content: [
      {
        type: "subsection",
        id: "privacy-policy",
        title: "13.1 Privacy Policy",
        content: [
          "Our Privacy Policy (strivetech.ai/legal/privacy-policy) governs our collection, use, and disclosure of personal information. The Privacy Policy is incorporated into these Terms by reference.",
          "By using the Services, you consent to the privacy practices described in the Privacy Policy. Review it carefully to understand:",
          {
            type: "list",
            items: [
              "What data we collect",
              "How we use data",
              "Who we share data with",
              "Your privacy rights",
              "International data transfers",
              "Data retention periods",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "data-protection-roles",
        title: "13.2 Data Protection Roles",
        content: [
          { type: "bold", text: "Strive as Data Controller:" },
          {
            type: "list",
            items: [
              "Account information, billing data, platform usage analytics, marketing preferences",
              "Your Rights: Exercise privacy rights directly with Strive via contact@strivetech.ai or Account Settings → Privacy",
            ],
          },
          { type: "bold", text: "Strive as Data Processor:" },
          {
            type: "list",
            items: [
              "Customer Data (CRM contacts, deals, documents, content, expense records)",
              "Customer is the Data Controller",
              "To exercise privacy rights regarding your data, contact your organization (agent, broker, brokerage)",
            ],
          },
          { type: "bold", text: "Our Processor Obligations:" },
          {
            type: "list",
            items: [
              "Process data only per your instructions and these Terms",
              "Assist with data subject rights requests (access, deletion, correction, portability)",
              "Implement appropriate security measures",
              "Notify you promptly of data breaches",
              "Delete Customer Data upon termination (Section 11.5)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "gdpr-compliance",
        title: "13.3 GDPR Compliance",
        content: [
          'If you require GDPR compliance, request a Data Processing Addendum (DPA) by emailing contact@strivetech.ai with "DPA Request."',
          { type: "bold", text: "DPA includes:" },
          {
            type: "list",
            items: [
              "Standard Contractual Clauses (SCCs) for international data transfers",
              "Sub-processor list and change notification procedures",
              "Data subject rights assistance",
              "Security measures and breach notification procedures",
              "Audit rights and compliance certifications",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "your-responsibilities-data-controller",
        title: "13.4 Your Responsibilities as Data Controller",
        content: [
          "For Customer Data you collect and store:",
          {
            type: "list",
            ordered: true,
            items: [
              "Legal Basis & Consents – Obtain necessary consents from contacts/clients before collecting their data; ensure you have a legal basis (GDPR: consent, contract, legitimate interest, legal obligation)",
              "Compliance – Comply with GDPR, CCPA, state privacy laws for data you collect",
              "Data Subject Rights – Respond to DSARs (access, deletion, correction, portability, opt-out) using our data export tools",
              "Sensitive Data Disclosure – Notify us if you store special category data (race, religion, biometric, health, etc.); you must have explicit consent or legal basis",
              "Data Accuracy – Ensure Customer Data is accurate, current, and complete",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "data-security",
        title: "13.5 Data Security",
        content: [
          { type: "bold", text: "Our Security Measures:" },
          {
            type: "list",
            items: [
              "Encryption at rest (AES-256) and in transit (TLS 1.3)",
              "Multi-factor authentication (MFA)",
              "Role-based access control (RBAC)",
              "Data isolation (multi-tenant architecture)",
              "Regular security audits and penetration testing",
              "Incident response plan with 72-hour breach notification",
            ],
          },
          "See Privacy Policy Section 11 for complete details.",
          { type: "bold", text: "Your Security Responsibilities:" },
          {
            type: "list",
            items: [
              "Use strong passwords; enable MFA",
              "Configure access controls appropriately (assign correct User Roles)",
              "Monitor audit logs (OWNER/ADMIN roles)",
              "Report suspected incidents immediately (contact@strivetech.ai)",
              "Train your Users on security best practices",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "data-location-international-transfers",
        title: "13.6 Data Location & International Transfers",
        content: [
          {
            type: "bold",
            text: "Primary Storage:",
          },
          "United States (AWS via Supabase, Vercel hosting)",
          {
            type: "bold",
            text: "EU Option (future-only option):",
          },
          "European Union data residency available for CUSTOM and ELITE tiers (EU region: eu-west-1, Ireland)",
          {
            type: "bold",
            text: "Cross-Border Transfers:",
          },
          "Some data transfers occur due to DDoS protection, payment processing, AI services, and email delivery.",
          { type: "bold", text: "Transfer Mechanisms:" },
          {
            type: "list",
            items: [
              "Standard Contractual Clauses (SCCs)",
              "EU-US Data Privacy Framework (DPF) for Stripe",
              "See Privacy Policy Section 8 for complete details",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "service-levels-support",
    number: "14",
    title: "SERVICE LEVELS & SUPPORT",
    content: [
      {
        type: "subsection",
        id: "service-level-agreements",
        title: "14.1 Service Level Agreements (SLAs)",
        content: [
          {
            type: "bold",
            text: "Uptime Definition:",
          },
          "The Services are operational and accessible to authorized users when core features (CRM, The Office, AI Hub, Content Studio), login, authentication, and APIs function properly.",
          { type: "bold", text: "Downtime Excludes:" },
          {
            type: "list",
            items: [
              "Scheduled maintenance (Minimum 24 hours notice)",
              "Emergency maintenance (urgent security fixes, critical bugs, system failures)",
              "Third-party service failures (Supabase, Vercel, Stripe, OpenAI, etc.)",
              "Force majeure events (natural disasters, war, pandemics, etc.)",
              "Customer-caused issues (internet, firewall, ISP, device incompatibility)",
              "Cyberattacks not caused by Strive's negligence",
              "Beta Features",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "service-credits",
        title: "14.2 Service Credits",
        content: [
          {
            type: "bold",
            text: "If we fail to meet the uptime commitment, you may request Service Credits (not cash refunds):",
          },
          'To Claim: Email contact@strivetech.ai with subject "SLA Credit Request – [Month/Year]" including account info, dates/times of downtime, and impact description.',
        ],
      },
      {
        type: "subsection",
        id: "support-tiers",
        title: "14.3 Support Tiers",
        content: [
          {
            type: "table",
            headers: ["Feature", "FREE", "CUSTOM", "ELITE"],
            rows: [
              ["Channels", "Email + phone", "Email + phone", "Email + phone"],
              ["Response Targets", "No guarantee (best efforts)", "Critical: 1h, Urgent: 4h, Normal: 24h", "Critical: 1h, Urgent: 4h, Normal: 24h"],
              ["Hours", "N/A", "9 AM–5 PM ET, Mon–Fri", "9 AM–5 PM ET, Mon–Fri + emergency escalation"],
              ["Account Manager", "Currently N/A", "Currently N/A", "Currently N/A"],
              ["Dedicated Support", "Currently N/A", "Currently N/A", "Currently N/A"],
            ],
          },
          {
            type: "bold",
            text: "What Support Covers:",
          },
          "How to use features, troubleshooting bugs, configuration, billing questions, and Account management",
          {
            type: "bold",
            text: "What Support Does NOT Cover:",
          },
          "Custom development, third-party software, advanced training (available as paid add-ons), legal/tax advice, infrastructure issues",
        ],
      },
    ],
  },
  {
    id: "changes-services-pricing",
    number: "15",
    title: "CHANGES TO SERVICES & PRICING",
    content: [
      {
        type: "subsection",
        id: "service-changes",
        title: "15.1 Service Changes",
        content: [
          { type: "bold", text: "Feature Enhancements & New Features:" },
          "Continuous improvements; no advance notice required",
          { type: "bold", text: "Feature Removal or Changes:" },
          {
            type: "list",
            items: [
              "30 days' advance notice via email and in-app notification",
              "Reasonable efforts to minimize disruption",
              "Alternative features or workarounds provided where feasible",
            ],
          },
          { type: "bold", text: "Bug Fixes & Security Updates:" },
          "May be made immediately without notice to address security vulnerabilities, critical bugs, or legal requirements",
          { type: "bold", text: "Discontinuation of Features:" },
          "If we discontinue significant features, eligible subscribers may terminate and receive pro-rata refunds",
        ],
      },
      {
        type: "subsection",
        id: "pricing-changes",
        title: "15.2 Pricing Changes",
        content: [
          {
            type: "bold",
            text: "We may change subscription prices anytime with 30 days' advance notice via email.",
          },
          {
            type: "bold",
            text: "Price increases apply only to new subscriptions and renewals — your current term is locked in.",
          },
          {
            type: "bold",
            text: "Example:",
          },
          "Your annual ELITE subscription ($10,788) renews January 1 at new pricing ($12,000). Notice of the increase is sent November 1 (60 days before). You may cancel before January 1 to avoid the increase.",
          { type: "bold", text: "Your Options Upon Price Increase:" },
          {
            type: "list",
            ordered: true,
            items: [
              "Accept – Auto-renewal proceeds at new rate (no action needed)",
              "Cancel – Cancel before renewal date to avoid new pricing",
              "Downgrade – Switch to lower-cost tier if available",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dispute-resolution",
    number: "16",
    title: "DISPUTE RESOLUTION",
    content: [
      {
        type: "subsection",
        id: "informal-resolution",
        title: "16.1 Informal Resolution (First Step)",
        content: [
          "Before formal dispute resolution, try to resolve the issue through direct negotiation:",
          {
            type: "list",
            ordered: true,
            items: [
              "Notice of Dispute – Email contact@strivetech.ai with description, desired resolution, facts, evidence, and contact info",
              "Negotiation – Both parties make good-faith efforts to resolve within 30 days",
              "Escalation – If unresolved, either party may proceed to arbitration (Section 16.2)",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "binding-arbitration",
        title: "16.2 Binding Arbitration",
        content: [
          {
            type: "bold",
            text: "If informal resolution fails, disputes will be resolved by binding arbitration under American Arbitration Association (AAA) Commercial Arbitration Rules (current version), not court litigation.",
          },
          { type: "bold", text: "Arbitration Details:" },
          {
            type: "list",
            items: [
              "Arbitrator: Single arbitrator (retired judge or attorney with 10+ years' commercial law experience), selected per AAA rules",
              "Location: New Castle County, Delaware, OR your county of residence (your choice)",
              "Hearing: By videoconference by default (Zoom, Teams), or in-person if requested",
              "Costs: Split equally (filing fees, arbitrator fees); each party pays its own attorney fees unless law requires fee-shifting",
              "Decision: Binding and final on both parties; arbitrator must issue written, reasoned award",
              "Rules: AAA Commercial Arbitration Rules (or AAA Consumer Rules if you're determined to be a consumer)",
            ],
          },
          { type: "bold", text: "Exceptions to Arbitration:" },
          "Either party may seek injunctive relief in court (without arbitration) for:",
          {
            type: "list",
            items: [
              "IP infringement or trade secret misappropriation",
              "Confidentiality breaches (Section 12)",
              "Data breaches or security incidents",
            ],
          },
          "These claims may be brought in court per Section 16.4 (Venue).",
        ],
      },
      {
        type: "subsection",
        id: "class-action-waiver",
        title: "16.3 Class Action Waiver",
        content: [
          {
            type: "bold",
            text: "YOU AND STRIVE AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY.",
          },
          "You waive the right to:",
          {
            type: "list",
            items: [
              "Bring or participate in class actions",
              "Bring or participate in class arbitrations",
              "Bring claims on behalf of other users or the general public",
              "Consolidate claims with other claimants",
            ],
          },
          {
            type: "bold",
            text: "Each claim is arbitrated separately.",
          },
          {
            type: "bold",
            text: "If the class action waiver is found unenforceable, the arbitration agreement is void, and all disputes will be resolved in court per Section 16.4.",
          },
          {
            type: "bold",
            text: "Opt-Out Right (30 Days):",
          },
          'If you don\'t wish to arbitrate, email contact@strivetech.ai with "Arbitration Opt-Out" within 30 days of accepting these Terms. If you opt out, disputes will be resolved in court per Section 16.4, and the class action waiver doesn\'t apply.',
        ],
      },
      {
        type: "subsection",
        id: "governing-law-venue",
        title: "16.4 Governing Law & Venue (If Litigation)",
        content: [
          {
            type: "bold",
            text: "Governing Law:",
          },
          "These Terms are governed by Delaware law, without regard to conflict of law principles.",
          {
            type: "bold",
            text: "Venue:",
          },
          "If arbitration doesn't apply, disputes will be resolved in Delaware state or federal courts (New Castle County, Delaware).",
          {
            type: "bold",
            text: "Jury Trial Waiver:",
          },
          "Both parties waive the right to a jury trial. Disputes are decided by a judge.",
          {
            type: "bold",
            text: "Exception for GDPR (future-only option):",
          },
          "If you're in the EU/UK, you retain the right to complain to your local supervisory authority (data protection authority) and pursue GDPR violations in local courts without restriction.",
        ],
      },
    ],
  },
  {
    id: "general-provisions",
    number: "17",
    title: "GENERAL PROVISIONS",
    content: [
      {
        type: "subsection",
        id: "entire-agreement",
        title: "17.1 Entire Agreement",
        content: [
          "These Terms, together with our Privacy Policy, any Order Form, and any executed Data Processing Addendum, constitute the entire agreement between you and Strive and supersede all prior agreements regarding the Services.",
          {
            type: "bold",
            text: "You acknowledge you have NOT relied on any representations or promises not expressly stated in these Terms.",
          },
          {
            type: "bold",
            text: "Purchase orders are for your accounting only and do NOT modify these Terms.",
          },
        ],
      },
      {
        type: "subsection",
        id: "amendments",
        title: "17.2 Amendments",
        content: [
          {
            type: "bold",
            text: "Customer-proposed amendments (in purchase orders, separate agreements, etc.) are void unless:",
          },
          {
            type: "list",
            items: [
              "Expressly accepted by Strive in a signed writing (email from authorized Strive representative acceptable), OR",
              "Signed by a Strive officer with authority to bind the company",
            ],
          },
          {
            type: "bold",
            text: "Email from general support addresses does NOT constitute acceptance.",
          },
        ],
      },
      {
        type: "subsection",
        id: "document-hierarchy-general",
        title: "17.3 Document Hierarchy",
        content: [
          "In case of conflicts, this is the order (privacy policy and this TOS agreement hold the same binding power):",
          {
            type: "list",
            ordered: true,
            items: [
              "Order Form (if executed for custom/enterprise agreements)",
              "Data Processing Addendum (if executed)",
              "These Terms of Service & Privacy Policy",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "no-waiver",
        title: "17.4 No Waiver",
        content: [
          "Our failure to enforce any provision is NOT a waiver of that right. Waivers must be in writing, signed by the party granting the waiver. A waiver in one instance doesn't waive the same right in future instances.",
        ],
      },
      {
        type: "subsection",
        id: "severability",
        title: "17.5 Severability",
        content: [
          "If any provision is found invalid or unenforceable:",
          {
            type: "list",
            items: [
              "All other provisions remain in full force",
              "The invalid provision will be reformed to the minimum extent necessary to make it valid",
              "If reformation is impossible, the provision will be deleted, and the rest continues",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "force-majeure",
        title: "17.6 Force Majeure",
        content: [
          "Neither party is liable for failure to perform obligations (except payment) caused by events beyond reasonable control, including:",
          {
            type: "list",
            items: [
              "Natural disasters (earthquakes, floods, hurricanes)",
              "War, terrorism, civil unrest",
              "Government actions (embargoes, emergency orders)",
              "Pandemics and public health emergencies",
              "Infrastructure failures (internet backbone, power outages) not caused by party's failure",
              "Cyberattacks not caused by party's negligence",
            ],
          },
          {
            type: "bold",
            text: "Conditions:",
          },
          "Affected party must promptly notify the other, use reasonable efforts to mitigate, and resume performance.",
          {
            type: "bold",
            text: "Payment obligations are NOT excused by force majeure.",
          },
          {
            type: "bold",
            text: "If force majeure prevents performance for >60 consecutive days, either party may terminate the affected subscription and receive a pro-rata refund of prepaid fees.",
          },
        ],
      },
      {
        type: "subsection",
        id: "notices",
        title: "17.7 Notices",
        content: [
          "To provide notice:",
          {
            type: "list",
            items: [
              "To Strive: contact@strivetech.ai",
              "To You: Email to the address on file in your Account",
            ],
          },
          "Notices are effective when sent.",
        ],
      },
      {
        type: "subsection",
        id: "compliance-regulations",
        title: "17.8 Compliance & Regulations",
        content: [
          {
            type: "list",
            items: [
              "You represent that your use complies with all applicable laws",
              "You are responsible for complying with professional licensing requirements, Fair Housing Act, RESPA, state regulations, MLS rules, and all other applicable laws",
              "Strive reserves the right to cooperate with law enforcement and legal authorities",
            ],
          },
        ],
      },
      {
        type: "subsection",
        id: "amendment-to-terms",
        title: "17.9 Amendment to These Terms",
        content: [
          "We may modify these Terms to reflect:",
          {
            type: "list",
            items: [
              "Changes in law or regulatory requirements",
              "New features or Services",
              "Changes in business practices",
              "Clarifications or corrections",
            ],
          },
          {
            type: "bold",
            text: "Material changes (substantially affecting your rights) require 30 days' advance notice via email and in-app notifications.",
          },
          {
            type: "bold",
            text: "Continued use after the effective date constitutes acceptance of modified Terms.",
          },
        ],
      },
    ],
  },
];

export const appendices = [
  "Appendix A: Glossary of Terms – Alphabetical definitions",
  "Appendix B: RBAC Permission Matrix – Detailed role-based access control",
  "Appendix C: API Rate Limits – By subscription tier",
  "Appendix D: Supported Integrations – Status, data shared, liability",
  "Appendix E: Fair Housing Compliance Checklist – Key requirements",
  "Appendix F: RESPA Compliance Summary – Documentation and audit obligations",
  "Appendix G: SaiBot AI Tools Directory – Current tool list (link to Help Docs)",
  "Appendix H: State-Specific Provisions – Tennessee, Virginia, California, Colorado, Texas",
  "Appendix I: Subscription Tier Comparison – Detailed features and limits",
];

export const contactInfo = {
  legalPrivacy: "contact@strivetech.ai",
  securityAbuse: "contact@strivetech.ai",
  supportBilling: "contact@strivetech.ai",
  mailingAddress: {
    company: "Strive Tech LLC.",
    attention: "Legal Department",
    address: "700 Arbor Trace Circle, Nashville, TN 37207",
  },
};

export const copyrightNotice = "© 2026 STRIVE TECH LLC. All rights reserved.";
