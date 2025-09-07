import { Quiz } from './types';

export const aiEthicsApplications: Quiz = {
  id: 6,
  title: "AI Ethics & Real-World Applications",
  description: "Understand AI ethics, bias, fairness, and practical business applications.",
  topic: "AI Ethics",
  difficulty: "intermediate",
  timeLimit: 25,
  passingScore: 75,
  questions: [
    {
      id: 1,
      question: "What is algorithmic bias?",
      options: [
        "When algorithms run slowly",
        "Systematic and unfair discrimination in algorithmic decision-making",
        "When algorithms use too much memory",
        "Random errors in code"
      ],
      correctAnswer: 1,
      explanation: "Algorithmic bias refers to systematic and unfair discrimination that can occur in algorithmic decision-making, often reflecting biases present in training data or design choices.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "Which principle is fundamental to responsible AI development?",
      options: [
        "Maximizing profit",
        "Transparency and explainability",
        "Fastest deployment",
        "Minimum regulation"
      ],
      correctAnswer: 1,
      explanation: "Transparency and explainability are crucial for responsible AI, allowing stakeholders to understand how AI systems make decisions and ensuring accountability.",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "What is the 'right to explanation' in AI ethics?",
      options: [
        "The right to know how AI systems make decisions that affect individuals",
        "The right to appeal AI decisions",
        "The right to opt out of AI systems",
        "The right to access AI source code"
      ],
      correctAnswer: 0,
      explanation: "The right to explanation refers to individuals' right to understand how automated decision-making systems that affect them work and reach their conclusions.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "Which business application of AI has shown the highest ROI in recent studies?",
      options: [
        "Social media management",
        "Predictive maintenance and supply chain optimization",
        "Gaming applications",
        "Personal assistants"
      ],
      correctAnswer: 1,
      explanation: "Predictive maintenance and supply chain optimization have consistently shown high ROI by reducing downtime, optimizing inventory, and improving operational efficiency.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is federated learning?",
      options: [
        "Learning from federal databases",
        "A decentralized approach where models are trained across multiple devices without centralizing data",
        "Learning federal regulations",
        "Government-controlled AI training"
      ],
      correctAnswer: 1,
      explanation: "Federated learning enables training AI models across decentralized devices without sharing raw data, preserving privacy while enabling collaborative learning.",
      difficulty: "advanced"
    }
  ]
};