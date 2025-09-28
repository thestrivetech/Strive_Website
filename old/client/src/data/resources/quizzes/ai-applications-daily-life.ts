import { Quiz } from './types';

export const aiApplicationsDailyLife: Quiz = {
  id: 8,
  title: "AI Applications in Daily Life",
  description: "Discover how AI technologies are integrated into your everyday activities and devices.",
  topic: "AI Applications",
  difficulty: "beginner",
  timeLimit: 10,
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "When you ask Siri or Google Assistant a question, what type of AI is being used?",
      options: [
        "Robotic AI",
        "Voice recognition and natural language processing",
        "Gaming AI",
        "Financial AI"
      ],
      correctAnswer: 1,
      explanation: "Voice assistants use a combination of voice recognition (converting speech to text) and natural language processing (understanding the meaning and intent) to respond to user queries.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "How does Amazon know what products to recommend to you?",
      options: [
        "Employees manually choose products for each customer",
        "AI analyzes your browsing and purchase history to suggest similar items",
        "It shows the same products to everyone",
        "It randomly selects products"
      ],
      correctAnswer: 1,
      explanation: "Amazon uses recommendation algorithms that analyze your past purchases, browsing history, and similar customer behaviors to suggest products you might be interested in buying.",
      difficulty: "beginner"
    },
    {
      id: 3,
      question: "What AI technology helps your smartphone camera automatically focus and enhance photos?",
      options: [
        "Internet connection",
        "Computer vision and image processing",
        "GPS",
        "Bluetooth"
      ],
      correctAnswer: 1,
      explanation: "Smartphone cameras use computer vision to detect faces, objects, and scenes, automatically adjusting focus, exposure, and applying filters to enhance photo quality.",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "When you use Google Maps to find the fastest route, what is the AI doing?",
      options: [
        "Showing you random directions",
        "Analyzing real-time traffic data to suggest the best path",
        "Using only old maps from 10 years ago",
        "Asking other drivers for directions"
      ],
      correctAnswer: 1,
      explanation: "Google Maps uses AI to process real-time traffic data from millions of users, historical traffic patterns, and current road conditions to calculate and suggest the fastest route.",
      difficulty: "beginner"
    },
    {
      id: 5,
      question: "Which of these activities does NOT typically use AI?",
      options: [
        "Email spam filtering",
        "Social media news feed sorting",
        "Online language translation",
        "Manual handwriting with a pen"
      ],
      correctAnswer: 3,
      explanation: "Manual handwriting with a pen is a purely human activity that doesn't involve any AI technology, unlike email filtering, social media algorithms, and translation services which all use AI.",
      difficulty: "beginner"
    }
  ]
};