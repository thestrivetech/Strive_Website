import { Quiz } from './types';

export const neuralNetworksDeepLearning: Quiz = {
  id: 3,
  title: "Neural Networks & Deep Learning",
  description: "Deep dive into neural network architectures, training techniques, and optimization methods.",
  topic: "Neural Networks",
  difficulty: "advanced",
  timeLimit: 30,
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "What is a perceptron?",
      options: [
        "A type of activation function",
        "The simplest form of artificial neural network",
        "A deep learning framework",
        "A data preprocessing technique"
      ],
      correctAnswer: 1,
      explanation: "A perceptron is the fundamental building block of neural networks, consisting of a single neuron that takes inputs, applies weights, and produces an output.",
      difficulty: "advanced"
    },
    {
      id: 2,
      question: "What is the vanishing gradient problem?",
      options: [
        "When the model becomes too complex",
        "When gradients become too small to effectively update weights in deep networks",
        "When the learning rate is too high",
        "When the dataset is too small"
      ],
      correctAnswer: 1,
      explanation: "The vanishing gradient problem occurs when gradients become exponentially smaller as they propagate back through deep networks, making it difficult to train early layers.",
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "Which activation function helps mitigate the vanishing gradient problem?",
      options: [
        "Sigmoid",
        "Tanh",
        "ReLU",
        "Linear"
      ],
      correctAnswer: 2,
      explanation: "ReLU (Rectified Linear Unit) helps address vanishing gradients because it has a constant gradient of 1 for positive inputs, allowing gradients to flow more easily through deep networks.",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "What is backpropagation?",
      options: [
        "A method to initialize weights",
        "An algorithm for calculating gradients and updating weights",
        "A technique to prevent overfitting",
        "A way to preprocess data"
      ],
      correctAnswer: 1,
      explanation: "Backpropagation is the fundamental algorithm for training neural networks, calculating gradients by propagating errors backward through the network to update weights.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is the purpose of dropout in neural networks?",
      options: [
        "To increase training speed",
        "To reduce model complexity",
        "To prevent overfitting by randomly disabling neurons during training",
        "To improve gradient flow"
      ],
      correctAnswer: 2,
      explanation: "Dropout is a regularization technique that randomly sets some neurons to zero during training, preventing the network from becoming too dependent on specific features.",
      difficulty: "advanced"
    }
  ]
};