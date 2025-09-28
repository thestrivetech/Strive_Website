import { Resource } from '../types';

export const automotiveConnectedServices: Resource = {
  id: 51,
  type: "CASE STUDY",
  title: "GM's $1.1B AI-Driven Connected Services Success",
  shortDescription: "General Motors achieved 2,240% first-year ROI through strategic AI implementation, establishing the industry benchmark for automotive AI monetization.",
  fullDescription: "This detailed case study analyzes General Motors' transformation of their connected vehicle business through strategic AI implementation that generated $1.1 billion in annual recurring revenue. Operating in a rapidly evolving automotive landscape, GM established market leadership while competitors struggle with software monetization. Their AI-powered audience selection engine creates recurring revenue streams essential for funding EV transition and autonomous vehicle development. The 18-month proven deployment methodology includes Microsoft Azure partnership, BCG consulting expertise, and achieves 70% connected service attach rates vs industry average of 45%.",
  imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Modern connected vehicles with AI technology and digital interfaces",
  metadata: "Automotive",
  date: "Market Leader",
  author: "Automotive AI Strategy Team",
  readTime: "15 min",
  tags: ["Automotive", "Connected Services", "AI Monetization", "Revenue Growth", "Azure"],
  content: {
    keyPoints: [
      "2,240% first-year ROI ($1.1B revenue vs $47M investment)",
      "70% connected service attach rate vs industry average of 45%",
      "94.2% accuracy in customer segment prediction",
      "$312M voice commerce GMV in first 6 months",
      "6M+ OnStar subscribers providing continuous feedback loop"
    ],
    insights: [
      "Partnership with Microsoft Azure minimizes implementation risks",
      "Voice commerce creates new revenue streams beyond traditional automotive",
      "Real-time customer data processing enables personalized experiences",
      "18-month deployment methodology ensures successful transformation"
    ],
    actionItems: [
      "Evaluate current connected vehicle capabilities and data utilization",
      "Assess partnership opportunities with cloud AI platforms",
      "Develop voice commerce and personalization strategies",
      "Create phased implementation plan with clear success metrics"
    ]
  },
  sources: [
    {
      title: "GM Investor Relations Q4 2024 Earnings Report",
      url: "https://investor.gm.com/",
      description: "Official financial performance and strategic initiative updates"
    },
    {
      title: "Microsoft Azure Automotive AI Case Studies",
      url: "https://azure.microsoft.com/en-us/industries/automotive/",
      description: "Technical implementation details and partnership benefits"
    },
    {
      title: "Automotive AI Market Analysis - McKinsey Global Institute",
      url: "https://www.mckinsey.com/industries/automotive-and-assembly",
      description: "Industry trends and competitive positioning analysis"
    }
  ],
  relatedSolutions: ["ai-automation", "cloud-solutions", "data-analytics"]
};