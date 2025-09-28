import { Quiz } from './types';

export const aiEthicsApplications: Quiz = {
  id: 6,
  title: "AI Ethics & Real-World Applications",
  description: "Understand AI ethics, bias, fairness, and practical business applications.",
  topic: "AI Ethics",
  difficulty: "advanced",
  timeLimit: 25,
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "What is algorithmic bias?",
      options: [
        "Random errors in AI predictions",
        "Systematic and unfair discrimination in algorithmic decision-making",
        "Bias caused only by human programmers",
        "Hardware-related computation errors"
      ],
      correctAnswer: 1,
      explanation: "Algorithmic bias refers to systematic and unfair discrimination that can occur in algorithmic decision-making, often reflecting biases present in training data or design choices.",
      difficulty: "advanced"
    },
    {
      id: 2,
      question: "Which principle is fundamental to responsible AI development?",
      options: [
        "Maximizing accuracy at any cost",
        "Transparency and explainability",
        "Minimizing computational resources",
        "Automating all human decisions"
      ],
      correctAnswer: 1,
      explanation: "Transparency and explainability are crucial for responsible AI, allowing stakeholders to understand how AI systems make decisions and ensuring accountability.",
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "What is the 'right to explanation' in AI ethics?",
      options: [
        "The right to access AI source code",
        "The right to know how AI systems make decisions that affect individuals",
        "The right to opt out of AI systems",
        "The right to appeal AI decisions"
      ],
      correctAnswer: 1,
      explanation: "The right to explanation refers to individuals' right to understand how automated decision-making systems that affect them work and reach their conclusions.",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "Which business application of AI has shown the highest ROI in recent studies?",
      options: [
        "Customer service chatbots",
        "Predictive maintenance and supply chain optimization",
        "Social media content moderation",
        "Automated hiring systems"
      ],
      correctAnswer: 1,
      explanation: "Predictive maintenance and supply chain optimization have consistently shown high ROI by reducing downtime, optimizing inventory, and improving operational efficiency.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is federated learning?",
      options: [
        "Learning from multiple datasets simultaneously",
        "A decentralized approach where models are trained across multiple devices without centralizing data",
        "Training models on cloud platforms",
        "Using multiple AI algorithms together"
      ],
      correctAnswer: 1,
      explanation: "Federated learning enables training AI models across decentralized devices without sharing raw data, preserving privacy while enabling collaborative learning.",
      difficulty: "advanced"
    }
  ]
};