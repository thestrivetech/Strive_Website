import { Quiz } from './types';

export const introductionToMachineLearning: Quiz = {
  id: 11,
  title: "Introduction to Machine Learning",
  description: "Learn the basics of machine learning with simple explanations and everyday examples.",
  topic: "Machine Learning Intro",
  difficulty: "beginner",
  timeLimit: 12,
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What is machine learning in simple terms?",
      options: [
        "Programming computers to be faster",
        "Teaching computers to learn from data and make predictions",
        "Building physical robots",
        "Creating video games"
      ],
      correctAnswer: 1,
      explanation: "Machine learning is a way of teaching computers to automatically learn patterns from data and make predictions or decisions without being explicitly programmed for every specific task.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "Which of these is a common example of machine learning in everyday life?",
      options: [
        "Using a calculator for math",
        "Netflix suggesting movies you might like",
        "Turning on a light switch",
        "Sending a text message"
      ],
      correctAnswer: 1,
      explanation: "Netflix uses machine learning algorithms to analyze your viewing history and preferences to suggest movies and shows you might enjoy, making personalized recommendations.",
      difficulty: "beginner"
    },
    {
      id: 3,
      question: "What do machine learning models need to learn from?",
      options: [
        "Electricity",
        "Data",
        "Internet connection",
        "Graphics cards"
      ],
      correctAnswer: 1,
      explanation: "Machine learning models learn from data - examples, patterns, and information that help them understand how to make predictions or decisions for new situations.",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "If you wanted to teach a computer to recognize cats in photos, what would you need?",
      options: [
        "A lot of photos labeled as \"cat\" or \"not cat\"",
        "A real cat",
        "Cat food",
        "A veterinarian"
      ],
      correctAnswer: 0,
      explanation: "To train a computer to recognize cats, you would need many example photos that are labeled, so the computer can learn the visual patterns that distinguish cats from other objects.",
      difficulty: "beginner"
    },
    {
      id: 5,
      question: "What makes machine learning different from regular computer programming?",
      options: [
        "Machine learning is always more expensive",
        "Machine learning programs can improve their performance as they see more data",
        "Machine learning only works on smartphones",
        "Machine learning requires special keyboards"
      ],
      correctAnswer: 1,
      explanation: "Unlike traditional programming where rules are explicitly coded, machine learning systems can automatically improve and adapt their performance as they are exposed to more data and examples.",
      difficulty: "beginner"
    }
  ]
};