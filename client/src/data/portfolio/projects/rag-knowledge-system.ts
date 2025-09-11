import { Project } from '../types';

export const ragKnowledgeSystem: Project = {
  id: 3,
  title: "RAG Knowledge System",
  category: "RAG Solution",
  type: "prototype",
  technologies: ["LangChain", "Vector DB", "FastAPI", "React"],
  shortDescription: "Retrieval-Augmented Generation system that combines your knowledge base with AI for accurate, contextual responses.",
  fullDescription: "An intelligent knowledge management system that ingests documents, creates semantic embeddings, and provides AI-powered search and question-answering capabilities. Ideal for enterprise knowledge bases, customer support, and research applications.",
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/rag-system",
  githubUrl: "https://github.com/strive-ai/rag-knowledge",
  features: ["Document ingestion", "Semantic search", "Context-aware responses", "Multi-format support"],
  metrics: { "Accuracy": "91.7%", "Retrieval Speed": "0.8s", "Document Capacity": "10M+" },
  sources: [
    {
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      url: "https://arxiv.org/abs/2005.11401",
      description: "Original RAG research paper by Facebook AI"
    },
    {
      title: "LangChain Documentation",
      url: "https://python.langchain.com/docs/get_started/introduction",
      description: "Framework for building LLM applications"
    },
    {
      title: "Vector Database Comparison Study",
      url: "https://www.pinecone.io/learn/vector-database-comparison/",
      description: "Performance analysis of vector storage solutions"
    }
  ],
  relatedSolutions: ["ai-automation", "nlp-solutions", "data-analytics"]
};