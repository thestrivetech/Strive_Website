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
        "It uses convolutional layers",
        "It relies entirely on attention mechanisms without recurrence",
        "It requires less computational power",
        "It only works with image data"
      ],
      correctAnswer: 1,
      explanation: "Transformers revolutionized NLP by using self-attention mechanisms exclusively, eliminating the need for recurrent or convolutional layers and enabling parallel processing.",
      difficulty: "advanced"
    },
    {
      id: 2,
      question: "What is the primary difference between BERT and GPT?",
      options: [
        "BERT is larger than GPT",
        "BERT is bidirectional, GPT is autoregressive",
        "BERT uses CNN layers, GPT uses RNN layers",
        "BERT is for images, GPT is for text"
      ],
      correctAnswer: 1,
      explanation: "BERT uses bidirectional encoding to understand context from both directions, while GPT uses autoregressive generation, predicting the next token based on previous tokens.",
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "What is transfer learning in the context of large language models?",
      options: [
        "Moving models between different hardware",
        "Using pre-trained models and fine-tuning them for specific tasks",
        "Transferring data between databases",
        "Converting models to different formats"
      ],
      correctAnswer: 1,
      explanation: "Transfer learning involves taking a pre-trained model and adapting it to new tasks through fine-tuning, leveraging learned representations to improve performance with less data.",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "What are diffusion models primarily used for?",
      options: [
        "Text classification",
        "Speech recognition",
        "Image and video generation",
        "Data compression"
      ],
      correctAnswer: 2,
      explanation: "Diffusion models are generative models that excel at creating high-quality images and videos by learning to reverse a noise-adding process.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is the purpose of the encoder-decoder architecture?",
      options: [
        "To reduce model complexity",
        "To map input sequences to output sequences of potentially different lengths",
        "To speed up training",
        "To handle only fixed-length inputs"
      ],
      correctAnswer: 1,
      explanation: "Encoder-decoder architectures are designed for sequence-to-sequence tasks, where the encoder processes input and the decoder generates output of potentially different lengths.",
      difficulty: "advanced"
    }
  ]
};