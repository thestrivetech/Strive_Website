import { Quiz } from './types';

export const mlFundamentals: Quiz = {
  id: 1,
  title: "Machine Learning Fundamentals",
  description: "Test your understanding of core machine learning concepts, algorithms, and applications.",
  topic: "Machine Learning",
  difficulty: "beginner",
  timeLimit: 15,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "What is the primary difference between supervised and unsupervised learning?",
      options: [
        "Supervised learning uses labeled data, unsupervised learning finds patterns in unlabeled data",
        "Supervised learning is faster than unsupervised learning",
        "Supervised learning uses more data than unsupervised learning",
        "There is no difference between them"
      ],
      correctAnswer: 0,
      explanation: "Supervised learning uses labeled training data to learn mappings from inputs to outputs, while unsupervised learning finds hidden patterns in data without labels.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "Which algorithm is commonly used for classification tasks?",
      options: [
        "Linear Regression",
        "Random Forest",
        "K-means Clustering",
        "Principal Component Analysis"
      ],
      correctAnswer: 1,
      explanation: "Random Forest is a popular ensemble method used for both classification and regression tasks, known for its accuracy and ability to handle overfitting.",
      difficulty: "beginner"
    },
    {
      id: 3,
      question: "What does 'overfitting' mean in machine learning?",
      options: [
        "The model is too simple",
        "The model performs well on training data but poorly on new data",
        "The model trains too quickly",
        "The model uses too little data"
      ],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in poor generalization to new, unseen data.",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "What is cross-validation used for?",
      options: [
        "To increase training speed",
        "To evaluate model performance and prevent overfitting",
        "To clean the data",
        "To visualize results"
      ],
      correctAnswer: 1,
      explanation: "Cross-validation is a technique to assess how well a model will generalize to independent data by partitioning data and testing on different subsets.",
      difficulty: "intermediate"
    },
    {
      id: 5,
      question: "Which metric is most appropriate for evaluating a highly imbalanced binary classification problem?",
      options: [
        "Accuracy",
        "F1-Score",
        "Mean Squared Error",
        "R-squared"
      ],
      correctAnswer: 1,
      explanation: "F1-Score balances precision and recall, making it ideal for imbalanced datasets where accuracy can be misleading.",
      difficulty: "intermediate"
    }
  ]
};