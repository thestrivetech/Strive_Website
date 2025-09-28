import { Resource } from '../types';

export const deepseek: Resource = {
  id: 122,
  type: "TECH GUIDE",
  title: "DeepSeek",
  shortDescription: "DeepSeek is a cutting-edge large language model developed by DeepSeek AI, featuring advanced reasoning capabilities through Mixture-of-Experts (MoE) architecture. Built for cost-effective training and efficient inference, it excels at complex problem-solving, coding, mathematical reasoning, and enterprise AI applications.",
  fullDescription: "Build cost-effective AI agents for customer support, technical troubleshooting, and business process automation. Deploy reasoning-heavy applications for financial analysis, legal document review, and regulatory compliance. Create enterprise coding assistants for software development, code review, and automated debugging workflows.",
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "DeepSeek AI reasoning model",
  metadata: "LLM Technology",
  date: "DeepSeek V3",
  author: "Strive AI Team",
  readTime: "18 min",
  tags: ["DeepSeek", "LLM", "Mixture of Experts", "Reasoning", "Open Source"],
  content: {
    keyPoints: [
      "Utilizes Mixture-of-Experts architecture with 671B total parameters, activating only 37B per token for maximum efficiency",
      "Features transparent reasoning process through chain-of-thought methodology with visible thinking steps",
      "Supports up to 128K token context window for processing extensive documents and complex tasks",
      "Trained with reinforcement learning for superior reasoning capabilities without heavy reliance on supervised fine-tuning",
      "Offers commercial-friendly open licensing with model weights available for customization and deployment"
    ],
    insights: [
      "Achieves 95% lower inference costs per token compared to traditional dense models of similar capability",
      "Outperforms GPT-4 on key benchmarks including HumanEval (73.78%) and GSM8K (84.1%) for coding and mathematical reasoning",
      "Reduces training requirements to just 2.8 million GPU-hours through innovative architectural optimizations"
    ],
    actionItems: [
      "Deploy DeepSeek models via API or download open weights for custom fine-tuning and local deployment",
      "Leverage the reasoning model (DeepSeek-R1) for complex analytical tasks requiring multi-step problem solving",
      "Integrate with existing workflows using the transparent reasoning capabilities for explainable AI applications"
    ]
  }
};