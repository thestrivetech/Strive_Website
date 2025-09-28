import { Quiz } from './types';

export const aiBasicsFundamentals: Quiz = {
  id: 7,
  title: "AI Basics & Fundamentals",
  description: "Test your understanding of basic AI concepts and everyday applications.",
  topic: "AI Basics",
  difficulty: "beginner",
  timeLimit: 10,
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What does \"AI\" stand for?",
      options: [
        "Automated Intelligence",
        "Artificial Intelligence",
        "Advanced Integration",
        "Algorithmic Innovation"
      ],
      correctAnswer: 1,
      explanation: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines that are programmed to think and learn like humans.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "What is the main goal of artificial intelligence?",
      options: [
        "To replace all human jobs",
        "To create machines that can think and perform tasks like humans",
        "To make computers faster",
        "To reduce electricity consumption"
      ],
      correctAnswer: 1,
      explanation: "The main goal of AI is to create machines that can think, learn, and perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
      difficulty: "beginner"
    },
    {
      id: 3,
      question: "Which of these is an example of AI that you might use daily?",
      options: [
        "A regular calculator",
        "Voice assistants like Siri or Alexa",
        "A digital clock",
        "A standard television"
      ],
      correctAnswer: 1,
      explanation: "Voice assistants like Siri, Alexa, and Google Assistant use AI technologies including natural language processing, speech recognition, and machine learning to understand and respond to user commands.",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "What is the difference between AI and traditional computer programs?",
      options: [
        "AI programs are faster",
        "AI programs can learn and adapt from data, while traditional programs follow fixed instructions",
        "AI programs use less memory",
        "AI programs are always free to use"
      ],
      correctAnswer: 1,
      explanation: "Traditional programs follow pre-written instructions exactly, while AI programs can learn from data, adapt to new situations, and improve their performance over time without being explicitly programmed for every scenario.",
      difficulty: "beginner"
    },
    {
      id: 5,
      question: "Which field is NOT commonly enhanced by AI today?",
      options: [
        "Healthcare diagnosis",
        "Online shopping recommendations",
        "GPS navigation",
        "Manual pencil sharpening"
      ],
      correctAnswer: 3,
      explanation: "Manual pencil sharpening is a simple mechanical task that doesn't benefit from AI enhancement, unlike healthcare diagnosis, shopping recommendations, and GPS navigation which all use AI to improve accuracy and user experience.",
      difficulty: "beginner"
    }
  ]
};