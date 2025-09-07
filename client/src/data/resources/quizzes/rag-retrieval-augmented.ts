import { Quiz } from './types';

export const ragRetrievalAugmented: Quiz = {
  id: 2,
  title: "RAG: Retrieval-Augmented Generation",
  description: "Explore RAG architecture, implementation strategies, and real-world applications.",
  topic: "RAG",
  difficulty: "intermediate",
  timeLimit: 20,
  passingScore: 75,
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of Retrieval-Augmented Generation (RAG)?",
      options: [
        "To make language models faster",
        "To combine retrieval of relevant information with text generation",
        "To reduce model size",
        "To eliminate the need for training data"
      ],
      correctAnswer: 1,
      explanation: "RAG enhances language models by retrieving relevant external information and incorporating it into the generation process, improving accuracy and factual consistency.",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "Which component is NOT typically part of a RAG system?",
      options: [
        "Vector database",
        "Embedding model",
        "Image classifier",
        "Language model"
      ],
      correctAnswer: 2,
      explanation: "RAG systems typically include vector databases for storage, embedding models for encoding, and language models for generation. Image classifiers are not standard RAG components.",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "What is the role of embeddings in RAG systems?",
      options: [
        "To compress the data",
        "To convert text into numerical vectors for similarity search",
        "To translate languages",
        "To generate responses"
      ],
      correctAnswer: 1,
      explanation: "Embeddings convert text into high-dimensional vectors that capture semantic meaning, enabling efficient similarity search for relevant document retrieval.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "Which challenge is commonly addressed by RAG systems?",
      options: [
        "Slow inference speed",
        "Hallucination in language models",
        "High computational costs",
        "Limited vocabulary size"
      ],
      correctAnswer: 1,
      explanation: "RAG helps reduce hallucination by grounding language model responses in retrieved factual information from external knowledge sources.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is chunking in the context of RAG systems?",
      options: [
        "Dividing large documents into smaller, manageable pieces",
        "Combining multiple responses",
        "Reducing model parameters",
        "Optimizing database queries"
      ],
      correctAnswer: 0,
      explanation: "Chunking involves breaking down large documents into smaller segments that can be efficiently stored, indexed, and retrieved in RAG systems.",
      difficulty: "intermediate"
    }
  ]
};