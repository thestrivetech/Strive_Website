import { Quiz } from './types';

export const naturalLanguageProcessing: Quiz = {
  id: 4,
  title: "Natural Language Processing",
  description: "Master NLP techniques, language models, and text processing methods.",
  topic: "NLP",
  difficulty: "advanced",
  timeLimit: 25,
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "What is tokenization in NLP?",
      options: [
        "Converting text to lowercase",
        "Breaking text into individual words or subwords",
        "Removing punctuation",
        "Translating between languages"
      ],
      correctAnswer: 1,
      explanation: "Tokenization is the process of breaking down text into smaller units (tokens) such as words, subwords, or characters that can be processed by NLP models.",
      difficulty: "advanced"
    },
    {
      id: 2,
      question: "What does TF-IDF stand for?",
      options: [
        "Text Frequency - Inverse Document Frequency",
        "Term Frequency - Inverse Document Frequency",
        "Token Frequency - Index Document Frequency",
        "Text Feature - Inverse Data Frequency"
      ],
      correctAnswer: 1,
      explanation: "TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical statistic used to reflect how important a word is to a document in a collection of documents.",
      difficulty: "advanced"
    },
    {
      id: 3,
      question: "Which technique is used to handle out-of-vocabulary words in modern NLP?",
      options: [
        "Word embeddings",
        "Byte Pair Encoding (BPE)",
        "Stemming",
        "Part-of-speech tagging"
      ],
      correctAnswer: 1,
      explanation: "Byte Pair Encoding (BPE) is a subword tokenization method that helps handle out-of-vocabulary words by breaking them into smaller, more frequent subword units.",
      difficulty: "advanced"
    },
    {
      id: 4,
      question: "What is the attention mechanism in NLP?",
      options: [
        "A way to focus on relevant parts of input when generating output",
        "A method to speed up training",
        "A technique to reduce model size",
        "A way to handle multiple languages"
      ],
      correctAnswer: 0,
      explanation: "Attention mechanisms allow models to dynamically focus on different parts of the input sequence when generating each part of the output, improving performance on long sequences.",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "What is named entity recognition (NER)?",
      options: [
        "Identifying the language of a text",
        "Extracting and classifying named entities like people, places, organizations",
        "Determining text sentiment",
        "Summarizing long documents"
      ],
      correctAnswer: 1,
      explanation: "Named Entity Recognition (NER) is the task of identifying and classifying named entities in text into predefined categories such as person names, locations, organizations, etc.",
      difficulty: "advanced"
    }
  ]
};