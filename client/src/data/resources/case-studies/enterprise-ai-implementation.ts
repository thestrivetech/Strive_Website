import { Resource } from '../types';

export const enterpriseAiImplementation: Resource = {
  id: 3,
  type: "CASE STUDY",
  title: "Enterprise AI Implementation Success",
  shortDescription: "How a Fortune 500 company achieved 40% efficiency gains through strategic AI implementation.",
  fullDescription: "This detailed case study examines how GlobalTech Industries, a Fortune 500 manufacturing company, successfully implemented AI-driven automation across their operations, resulting in unprecedented efficiency gains and cost savings. Over 18 months, they deployed machine learning models for predictive maintenance, AI-powered quality control systems, and intelligent supply chain optimization. The results speak for themselves: 40% reduction in operational costs, 60% improvement in quality metrics, and 50% decrease in unplanned downtime. Learn the strategies, challenges, and solutions that made this transformation possible.",
  imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Corporate business meeting with handshake and partnership",
  metadata: "8 min read",
  date: "Success Story",
  author: "Jennifer Liu",
  readTime: "8 min",
  tags: ["AI Implementation", "Case Study", "Enterprise", "ROI"],
  content: {
    keyPoints: [
      "Phased AI implementation approach reduced risks and costs",
      "Predictive maintenance models prevented $2M in equipment failures",
      "AI-powered quality control improved product consistency by 60%",
      "Supply chain optimization reduced inventory costs by 25%",
      "Employee training programs ensured smooth technology adoption"
    ],
    insights: [
      "Companies starting with pilot programs see 80% higher success rates",
      "AI implementations show positive ROI within 8-12 months on average",
      "Cross-functional teams are crucial for successful AI adoption"
    ],
    actionItems: [
      "Identify high-impact use cases for AI in your organization",
      "Start with a pilot program in one department or process",
      "Invest in employee training and change management",
      "Establish clear success metrics and measurement frameworks"
    ]
  },
  sources: [
    {
      title: "Enterprise AI Adoption Report - MIT Technology Review",
      url: "https://www.technologyreview.com/2023/02/01/1067426/ai-adoption-enterprise-survey-2023/",
      description: "Annual survey on enterprise AI implementation trends"
    },
    {
      title: "AI ROI in Manufacturing - Deloitte",
      url: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/ai-manufacturing-applications.html",
      description: "Analysis of AI return on investment in manufacturing"
    },
    {
      title: "Predictive Maintenance Best Practices - McKinsey",
      url: "https://www.mckinsey.com/capabilities/operations/our-insights/predictive-maintenance-the-next-level-of-asset-management",
      description: "Strategic guide to implementing predictive maintenance"
    }
  ],
  relatedSolutions: ["ai-automation", "manufacturing-solutions", "process-automation"]
};
