import { Quiz } from './types';

export const ragRetrievalAugmented: Quiz = {
  id: 2,
  title: "RAG: Retrieval-Augmented Generation",
  description: "Explore RAG architecture, implementation strategies, and real-world applications.",
  topic: "RAG",
  difficulty: "advanced",
  timeLimit: 25,
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of Retrieval-Augmented Generation (RAG)?",
      options: [
        "To reduce model size",
        "To combine retrieval of relevant information with text generation",
        "To speed up training",
        "To eliminate the need for large datasets"
      ],
      correctAnswer: 1,
      explanation: "RAG enhances language models by retrieving relevant external information and incorporating it into the generation process, improving accuracy and factual consistency.",
      difficulty: "advanced"
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
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "What is the role of embeddings in RAG systems?",
      options: [
        "To store the original text",
        "To convert text into numerical vectors for similarity search",
        "To generate new text",
        "To compress the database"
      ],
      correctAnswer: 1,
      explanation: "Embeddings convert text into high-dimensional vectors that capture semantic meaning, enabling efficient similarity search for relevant document retrieval.",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "Which challenge is commonly addressed by RAG systems?",
      options: [
        "Slow inference speed",
        "High memory usage",
        "Hallucination in language models",
        "Complex model architectures"
      ],
      correctAnswer: 2,
      explanation: "RAG helps reduce hallucination by grounding language model responses in retrieved factual information from external knowledge sources.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is chunking in the context of RAG systems?",
      options: [
        "Combining multiple documents",
        "Dividing large documents into smaller, manageable pieces",
        "Removing irrelevant information",
        "Compressing document size"
      ],
      correctAnswer: 1,
      explanation: "Chunking involves breaking down large documents into smaller segments that can be efficiently stored, indexed, and retrieved in RAG systems.",
      difficulty: "advanced"
    }
  ]
};