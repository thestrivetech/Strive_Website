import { Quiz } from './types';

export const mlFundamentals: Quiz = {
  id: 1,
  title: "Machine Learning Fundamentals",
  description: "Test your understanding of core machine learning concepts, algorithms, and applications.",
  topic: "Machine Learning",
  difficulty: "intermediate",
  timeLimit: 15,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "What is the primary difference between supervised and unsupervised learning?",
      options: [
        "Supervised learning is faster than unsupervised learning",
        "Supervised learning uses labeled data, unsupervised learning finds patterns in unlabeled data",
        "Supervised learning requires more computational power",
        "Supervised learning only works with numerical data"
      ],
      correctAnswer: 1,
      explanation: "Supervised learning uses labeled training data to learn mappings from inputs to outputs, while unsupervised learning finds hidden patterns in data without labels.",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "Which algorithm is commonly used for classification tasks?",
      options: [
        "Linear Regression",
        "K-Means",
        "Random Forest",
        "PCA"
      ],
      correctAnswer: 2,
      explanation: "Random Forest is a popular ensemble method used for both classification and regression tasks, known for its accuracy and ability to handle overfitting.",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "What does 'overfitting' mean in machine learning?",
      options: [
        "The model is too simple for the data",
        "The model performs well on training data but poorly on new data",
        "The model takes too long to train",
        "The model uses too much memory"
      ],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in poor generalization to new, unseen data.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "What is cross-validation used for?",
      options: [
        "To increase model complexity",
        "To reduce training time",
        "To evaluate model performance and prevent overfitting",
        "To clean the dataset"
      ],
      correctAnswer: 2,
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