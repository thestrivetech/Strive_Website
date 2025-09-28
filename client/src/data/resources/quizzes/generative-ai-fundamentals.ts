import { Quiz } from './types';

export const generativeAiFundamentals: Quiz = {
  id: 10,
  title: "Generative AI Fundamentals",
  description: "Explore the world of generative AI, large language models, and content creation technologies.",
  topic: "Generative AI",
  difficulty: "intermediate",
  timeLimit: 20,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "What is generative AI?",
      options: [
        "AI that only analyzes existing data",
        "AI that creates new content like text, images, or code",
        "AI that deletes unwanted files",
        "AI that only works with numbers"
      ],
      correctAnswer: 1,
      explanation: "Generative AI refers to artificial intelligence systems that can create new content, including text, images, music, code, and other forms of media, based on patterns learned from training data.",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "What does \"LLM\" stand for in the context of AI?",
      options: [
        "Local Learning Model",
        "Large Language Model",
        "Linear Logic Machine",
        "Limited Logic Method"
      ],
      correctAnswer: 1,
      explanation: "LLM stands for Large Language Model, which refers to AI models trained on vast amounts of text data to understand and generate human-like language.",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "Which of these is an example of a generative AI tool?",
      options: [
        "Calculator app",
        "ChatGPT",
        "Digital clock",
        "File manager"
      ],
      correctAnswer: 1,
      explanation: "ChatGPT is a prominent example of generative AI that can create text responses, write code, compose emails, and generate various forms of written content based on user prompts.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "What is a \"prompt\" in generative AI?",
      options: [
        "A type of computer hardware",
        "The input text or instruction given to an AI to generate a response",
        "An error message",
        "A way to save files"
      ],
      correctAnswer: 1,
      explanation: "A prompt is the input text, question, or instruction that users provide to generative AI systems to guide the creation of specific outputs or responses.",
      difficulty: "intermediate"
    },
    {
      id: 5,
      question: "What is the main difference between generative AI and traditional AI?",
      options: [
        "Generative AI is always free to use",
        "Generative AI creates new content, while traditional AI typically classifies or predicts based on existing data",
        "Generative AI only works offline",
        "Generative AI is only for entertainment"
      ],
      correctAnswer: 1,
      explanation: "The key difference is that generative AI focuses on creating new content, while traditional AI typically performs tasks like classification, prediction, or analysis of existing data without generating new content.",
      difficulty: "intermediate"
    }
  ]
};