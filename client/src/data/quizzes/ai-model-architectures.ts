import { Quiz } from './types';

export const aiModelArchitectures: Quiz = {
  id: 5,
  title: "AI Model Types & Architectures",
  description: "Explore different AI model architectures, from transformers to diffusion models.",
  topic: "Model Types",
  difficulty: "advanced",
  timeLimit: 30,
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "What makes the Transformer architecture unique?",
      options: [
        "It uses only convolutional layers",
        "It relies entirely on attention mechanisms without recurrence",
        "It requires less training data",
        "It works only with images"
      ],
      correctAnswer: 1,
      explanation: "Transformers revolutionized NLP by using self-attention mechanisms exclusively, eliminating the need for recurrent or convolutional layers and enabling parallel processing.",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "What is the primary difference between BERT and GPT?",
      options: [
        "BERT is bidirectional, GPT is autoregressive",
        "BERT is faster than GPT",
        "BERT uses less memory than GPT",
        "BERT works only with images"
      ],
      correctAnswer: 0,
      explanation: "BERT uses bidirectional encoding to understand context from both directions, while GPT uses autoregressive generation, predicting the next token based on previous tokens.",
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "What is transfer learning in the context of large language models?",
      options: [
        "Moving models between computers",
        "Using pre-trained models and fine-tuning them for specific tasks",
        "Translating between languages",
        "Converting models to different formats"
      ],
      correctAnswer: 1,
      explanation: "Transfer learning involves taking a pre-trained model and adapting it to new tasks through fine-tuning, leveraging learned representations to improve performance with less data.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "What are diffusion models primarily used for?",
      options: [
        "Text classification",
        "Image and video generation",
        "Speech recognition",
        "Database optimization"
      ],
      correctAnswer: 1,
      explanation: "Diffusion models are generative models that excel at creating high-quality images and videos by learning to reverse a noise-adding process.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is the purpose of the encoder-decoder architecture?",
      options: [
        "To increase model speed",
        "To map input sequences to output sequences of potentially different lengths",
        "To reduce memory usage",
        "To handle only fixed-length inputs"
      ],
      correctAnswer: 1,
      explanation: "Encoder-decoder architectures are designed for sequence-to-sequence tasks, where the encoder processes input and the decoder generates output of potentially different lengths.",
      difficulty: "advanced"
    }
  ]
};