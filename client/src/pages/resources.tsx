import { useState } from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar, BrainCircuit, Play, CheckCircle, AlertCircle, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Resource {
  id: number;
  type: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  metadata: string;
  date: string;
  author?: string;
  readTime?: string;
  downloadCount?: string;
  tags: string[];
  content: {
    keyPoints: string[];
    insights: string[];
    actionItems: string[];
  };
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
}

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  // Quiz state
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const filters = [
    { name: "All", icon: null },
    { name: "Blog Posts", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Whitepapers", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Case Studies", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Quizzes", icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
  ];
  
  const featuredResource = {
    type: "FEATURED WHITEPAPER",
    title: "The Future of Business Automation: AI-Driven Transformation",
    description: "Explore how artificial intelligence is revolutionizing business operations and discover strategies to implement AI-driven automation in your organization.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Advanced AI robot technology representing business automation",
    downloads: "2,543"
  };

  const resources: Resource[] = [
    {
      id: 1,
      type: "BLOG POST",
      title: "10 Steps to Successful Digital Transformation",
      shortDescription: "A comprehensive guide to planning and executing digital transformation initiatives that deliver real business value.",
      fullDescription: "Digital transformation is no longer optional for businesses seeking to remain competitive in today's rapidly evolving marketplace. This comprehensive guide outlines a proven 10-step methodology for successfully planning, executing, and measuring digital transformation initiatives. From initial assessment to full implementation, learn how leading organizations have leveraged technology to streamline operations, enhance customer experiences, and drive sustainable growth. Our framework has been tested across industries and company sizes, delivering measurable results including increased efficiency, reduced costs, and improved customer satisfaction.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with digital transformation",
      metadata: "5 min read",
      date: "Jan 15, 2024",
      author: "Sarah Chen",
      readTime: "5 min",
      tags: ["Digital Transformation", "Strategy", "Technology", "Business Growth"],
      content: {
        keyPoints: [
          "Assess current digital maturity and identify gaps",
          "Define clear transformation objectives and success metrics",
          "Create a phased implementation roadmap",
          "Invest in employee training and change management",
          "Establish governance and security protocols"
        ],
        insights: [
          "Companies with structured transformation plans are 2.5x more likely to succeed",
          "Employee engagement during transformation increases success rates by 35%",
          "Phased approaches reduce implementation risks by 60%"
        ],
        actionItems: [
          "Conduct a digital readiness assessment for your organization",
          "Identify 3-5 high-impact areas for initial transformation efforts",
          "Develop a 12-month transformation timeline with key milestones",
          "Create a cross-functional transformation team"
        ]
      }
    },
    {
      id: 2,
      type: "WHITEPAPER",
      title: "Cloud Security Best Practices", 
      shortDescription: "Essential security measures and compliance frameworks for cloud-based business operations.",
      fullDescription: "As organizations increasingly migrate to cloud environments, security remains the top concern for IT leaders and business executives. This comprehensive whitepaper provides a detailed framework for implementing robust cloud security measures that protect sensitive data, ensure regulatory compliance, and maintain business continuity. Drawing from real-world implementations and industry best practices, we cover everything from identity management and access controls to advanced threat detection and incident response protocols. Learn how to build a security-first cloud strategy that enables innovation while minimizing risk.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions cybersecurity and cloud infrastructure",
      metadata: "12 pages",
      date: "Free Download",
      author: "Dr. Michael Rodriguez",
      downloadCount: "1,247",
      tags: ["Cloud Security", "Compliance", "Risk Management", "Cybersecurity"],
      content: {
        keyPoints: [
          "Implement zero-trust architecture principles",
          "Establish comprehensive identity and access management",
          "Deploy automated threat detection and response systems",
          "Ensure compliance with industry regulations (SOC 2, ISO 27001)",
          "Create incident response and disaster recovery plans"
        ],
        insights: [
          "Zero-trust implementations reduce security breaches by 45%",
          "Automated threat detection responds 10x faster than manual processes",
          "Proper IAM reduces unauthorized access incidents by 78%"
        ],
        actionItems: [
          "Audit your current cloud security posture",
          "Implement multi-factor authentication across all systems",
          "Deploy continuous monitoring and logging solutions",
          "Establish regular security training programs for staff"
        ]
      }
    },
    {
      id: 3,
      type: "CASE STUDY",
      title: "Enterprise AI Implementation Success",
      shortDescription: "How a Fortune 500 company achieved 40% efficiency gains through strategic AI implementation.",
      fullDescription: "This detailed case study examines how GlobalTech Industries, a Fortune 500 manufacturing company, successfully implemented AI-driven automation across their operations, resulting in unprecedented efficiency gains and cost savings. Over 18 months, they deployed machine learning models for predictive maintenance, AI-powered quality control systems, and intelligent supply chain optimization. The results speak for themselves: 40% reduction in operational costs, 60% improvement in quality metrics, and 50% decrease in unplanned downtime. Learn the strategies, challenges, and solutions that made this transformation possible.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Corporate business meeting with handshake and partnership", 
      metadata: "8 min read",
      date: "Success Story",
      author: "Jennifer Liu",
      readTime: "8 min",
      tags: ["AI Implementation", "Case Study", "Enterprise", "ROI"],
      content: {
        keyPoints: [
          "Phased AI implementation approach reduced risks and costs",
          "Predictive maintenance models prevented $2M in equipment failures",
          "AI-powered quality control improved product consistency by 60%",
          "Supply chain optimization reduced inventory costs by 25%",
          "Employee training programs ensured smooth technology adoption"
        ],
        insights: [
          "Companies starting with pilot programs see 80% higher success rates",
          "AI implementations show positive ROI within 8-12 months on average",
          "Cross-functional teams are crucial for successful AI adoption"
        ],
        actionItems: [
          "Identify high-impact use cases for AI in your organization",
          "Start with a pilot program in one department or process",
          "Invest in employee training and change management",
          "Establish clear success metrics and measurement frameworks"
        ]
      }
    },
    {
      id: 4,
      type: "BLOG POST",
      title: "Automation ROI: Measuring Success",
      shortDescription: "Key metrics and methodologies for calculating the return on investment of automation initiatives.",
      fullDescription: "Measuring the return on investment (ROI) of automation projects is crucial for demonstrating value and securing future technology investments. This comprehensive guide provides practical frameworks and proven methodologies for quantifying the impact of automation initiatives. We cover both direct financial benefits (cost savings, revenue increases) and indirect value creation (improved employee satisfaction, enhanced customer experience, risk reduction). Learn how to establish baseline metrics, track progress over time, and communicate results effectively to stakeholders at all levels of your organization.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions automation and workflow optimization",
      metadata: "7 min read", 
      date: "Dec 20, 2023",
      author: "David Park",
      readTime: "7 min",
      tags: ["ROI", "Automation", "Metrics", "Business Value"],
      content: {
        keyPoints: [
          "Establish clear baseline metrics before automation implementation",
          "Track both quantitative and qualitative benefits",
          "Include indirect benefits like employee satisfaction and risk reduction",
          "Use standardized calculation methodologies for consistency",
          "Regular monitoring and adjustment ensure continued success"
        ],
        insights: [
          "Organizations tracking ROI see 40% higher automation success rates",
          "Indirect benefits often account for 30-50% of total automation value",
          "Regular measurement cycles improve ROI by 25% over time"
        ],
        actionItems: [
          "Define your automation ROI measurement framework",
          "Identify key performance indicators for each automation project",
          "Implement regular reporting cycles and stakeholder reviews",
          "Create standardized ROI calculation templates"
        ]
      }
    },
    {
      id: 5,
      type: "BLOG POST",
      title: "Building a Culture of Innovation",
      shortDescription: "Strategies for fostering innovation and adaptability in rapidly changing business environments.",
      fullDescription: "Innovation is the lifeblood of successful organizations, but creating a culture that consistently generates breakthrough ideas and adapts to change requires intentional effort and strategic planning. This article explores proven strategies for building and sustaining innovation culture within your organization. From leadership practices and organizational structures to employee empowerment and experimentation frameworks, discover how industry leaders create environments where innovation thrives. Learn practical techniques for overcoming common barriers to innovation and establishing processes that turn creative ideas into business value.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration and innovation",
      metadata: "6 min read",
      date: "Latest Post",
      author: "Emma Thompson",
      readTime: "6 min",
      tags: ["Innovation", "Culture", "Leadership", "Change Management"],
      content: {
        keyPoints: [
          "Leadership commitment is essential for innovation culture success",
          "Create safe spaces for experimentation and calculated failure",
          "Establish cross-functional collaboration and idea sharing",
          "Implement structured innovation processes and evaluation criteria",
          "Reward both successful innovations and valuable learning experiences"
        ],
        insights: [
          "Companies with strong innovation cultures grow 30% faster than competitors",
          "Organizations allowing failure see 50% more breakthrough innovations",
          "Cross-functional teams generate 40% more innovative solutions"
        ],
        actionItems: [
          "Assess your current innovation culture maturity",
          "Create dedicated time and resources for innovation activities",
          "Establish innovation metrics and regular evaluation processes",
          "Launch pilot programs to test new ideas safely"
        ]
      }
    }
  ];

  // Comprehensive AI Knowledge Quizzes
  const quizzes: Quiz[] = [
    {
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
    },
    {
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
    },
    {
      id: 3,
      title: "Neural Networks & Deep Learning",
      description: "Deep dive into neural network architectures, training techniques, and optimization methods.",
      topic: "Neural Networks",
      difficulty: "intermediate",
      timeLimit: 25,
      passingScore: 70,
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
          difficulty: "beginner"
        },
        {
          id: 2,
          question: "What is the vanishing gradient problem?",
          options: [
            "When gradients become too large during training",
            "When gradients become too small to effectively update weights in deep networks",
            "When the learning rate is too high",
            "When there's insufficient training data"
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
          difficulty: "intermediate"
        },
        {
          id: 4,
          question: "What is backpropagation?",
          options: [
            "A forward pass through the network",
            "An algorithm for calculating gradients and updating weights",
            "A type of neural network architecture",
            "A data augmentation technique"
          ],
          correctAnswer: 1,
          explanation: "Backpropagation is the fundamental algorithm for training neural networks, calculating gradients by propagating errors backward through the network to update weights.",
          difficulty: "intermediate"
        },
        {
          id: 5,
          question: "What is the purpose of dropout in neural networks?",
          options: [
            "To reduce training time",
            "To prevent overfitting by randomly disabling neurons during training",
            "To increase model accuracy",
            "To reduce memory usage"
          ],
          correctAnswer: 1,
          explanation: "Dropout is a regularization technique that randomly sets some neurons to zero during training, preventing the network from becoming too dependent on specific features.",
          difficulty: "intermediate"
        }
      ]
    },
    {
      id: 4,
      title: "Natural Language Processing",
      description: "Master NLP techniques, language models, and text processing methods.",
      topic: "NLP",
      difficulty: "intermediate",
      timeLimit: 20,
      passingScore: 75,
      questions: [
        {
          id: 1,
          question: "What is tokenization in NLP?",
          options: [
            "Converting text to numbers",
            "Breaking text into individual words or subwords",
            "Removing stop words",
            "Translating between languages"
          ],
          correctAnswer: 1,
          explanation: "Tokenization is the process of breaking down text into smaller units (tokens) such as words, subwords, or characters that can be processed by NLP models.",
          difficulty: "beginner"
        },
        {
          id: 2,
          question: "What does TF-IDF stand for?",
          options: [
            "Text Frequency - Inverse Document Frequency",
            "Term Frequency - Inverse Document Frequency",
            "Token Frequency - Index Document Frequency",
            "Text Format - Inverse Data Frequency"
          ],
          correctAnswer: 1,
          explanation: "TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical statistic used to reflect how important a word is to a document in a collection of documents.",
          difficulty: "intermediate"
        },
        {
          id: 3,
          question: "Which technique is used to handle out-of-vocabulary words in modern NLP?",
          options: [
            "Word2Vec",
            "Byte Pair Encoding (BPE)",
            "Bag of Words",
            "N-grams"
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
            "A method for preprocessing text",
            "A type of neural network layer",
            "A technique for data augmentation"
          ],
          correctAnswer: 0,
          explanation: "Attention mechanisms allow models to dynamically focus on different parts of the input sequence when generating each part of the output, improving performance on long sequences.",
          difficulty: "advanced"
        },
        {
          id: 5,
          question: "What is named entity recognition (NER)?",
          options: [
            "Identifying the author of a text",
            "Extracting and classifying named entities like people, places, organizations",
            "Recognizing the language of a text",
            "Counting word frequencies"
          ],
          correctAnswer: 1,
          explanation: "Named Entity Recognition (NER) is the task of identifying and classifying named entities in text into predefined categories such as person names, locations, organizations, etc.",
          difficulty: "intermediate"
        }
      ]
    },
    {
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
    },
    {
      id: 6,
      title: "AI Ethics & Real-World Applications",
      description: "Understand AI ethics, bias, fairness, and practical business applications.",
      topic: "AI Ethics",
      difficulty: "intermediate",
      timeLimit: 25,
      passingScore: 75,
      questions: [
        {
          id: 1,
          question: "What is algorithmic bias?",
          options: [
            "When algorithms run slowly",
            "Systematic and unfair discrimination in algorithmic decision-making",
            "When algorithms use too much memory",
            "Random errors in code"
          ],
          correctAnswer: 1,
          explanation: "Algorithmic bias refers to systematic and unfair discrimination that can occur in algorithmic decision-making, often reflecting biases present in training data or design choices.",
          difficulty: "beginner"
        },
        {
          id: 2,
          question: "Which principle is fundamental to responsible AI development?",
          options: [
            "Maximizing profit",
            "Transparency and explainability",
            "Fastest deployment",
            "Minimum regulation"
          ],
          correctAnswer: 1,
          explanation: "Transparency and explainability are crucial for responsible AI, allowing stakeholders to understand how AI systems make decisions and ensuring accountability.",
          difficulty: "intermediate"
        },
        {
          id: 3,
          question: "What is the 'right to explanation' in AI ethics?",
          options: [
            "The right to know how AI systems make decisions that affect individuals",
            "The right to appeal AI decisions",
            "The right to opt out of AI systems",
            "The right to access AI source code"
          ],
          correctAnswer: 0,
          explanation: "The right to explanation refers to individuals' right to understand how automated decision-making systems that affect them work and reach their conclusions.",
          difficulty: "intermediate"
        },
        {
          id: 4,
          question: "Which business application of AI has shown the highest ROI in recent studies?",
          options: [
            "Social media management",
            "Predictive maintenance and supply chain optimization",
            "Gaming applications",
            "Personal assistants"
          ],
          correctAnswer: 1,
          explanation: "Predictive maintenance and supply chain optimization have consistently shown high ROI by reducing downtime, optimizing inventory, and improving operational efficiency.",
          difficulty: "advanced"
        },
        {
          id: 5,
          question: "What is federated learning?",
          options: [
            "Learning from federal databases",
            "A decentralized approach where models are trained across multiple devices without centralizing data",
            "Learning federal regulations",
            "Government-controlled AI training"
          ],
          correctAnswer: 1,
          explanation: "Federated learning enables training AI models across decentralized devices without sharing raw data, preserving privacy while enabling collaborative learning.",
          difficulty: "advanced"
        }
      ]
    }
  ];

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(resource => {
        if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
        if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
        if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
        return true;
      });

  const filteredQuizzes = activeFilter === "Quizzes" ? quizzes : [];

  // Quiz functionality
  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStartTime(Date.now());
    setQuizResult(null);
    setShowQuizResult(false);
    setIsQuizModalOpen(true);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;
    
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === selectedQuiz.questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000 / 60); // minutes
    const passed = score >= selectedQuiz.passingScore;

    const result: QuizResult = {
      score,
      totalQuestions: selectedQuiz.questions.length,
      correctAnswers,
      timeSpent,
      passed
    };

    setQuizResult(result);
    setShowQuizResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setShowQuizResult(false);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setSelectedQuiz(null);
    resetQuiz();
  };

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "BLOG POST": <BookOpen className="h-5 w-5" />,
      "WHITEPAPER": <FileText className="h-5 w-5" />,
      "CASE STUDY": <BarChart3 className="h-5 w-5" />
    };
    return iconMap[type] || <FileText className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      "BLOG POST": "bg-blue-500",
      "WHITEPAPER": "bg-purple-500",
      "CASE STUDY": "bg-green-500"
    };
    return colorMap[type] || "bg-gray-500";
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert("Newsletter signup functionality would be implemented here");
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Gradient Background */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center text-sm text-orange-400 uppercase tracking-wide font-semibold mb-6"
              data-testid="text-knowledge-center-badge"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              KNOWLEDGE CENTER
            </div>
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-hero-title"
            >
              Business <span className="gradient-text">Intelligence</span> Hub
            </h1>
            <p 
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              data-testid="text-hero-subtitle"
            >
              Unlock your potential with expert insights, cutting-edge research, and proven strategies from industry leaders.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-articles">
                50+
              </div>
              <div className="text-slate-300" data-testid="text-stat-articles-label">
                Expert Articles
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-downloads">
                10K+
              </div>
              <div className="text-slate-300" data-testid="text-stat-downloads-label">
                Downloads
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-success">
                95%
              </div>
              <div className="text-slate-300" data-testid="text-stat-success-label">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library Section - White Background */}
      <section className="py-16 bg-[#ffffffeb] shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-800" data-testid="text-library-title">
              Explore Our <span className="gradient-text">Resource Library</span>
            </h2>
            <p className="text-slate-600 text-lg" data-testid="text-library-subtitle">
              Filter and discover the perfect resources for your business journey.
            </p>
          </div>

          {/* Featured Resource */}
          <div className="bg-white rounded-2xl overflow-hidden mb-16 shadow-lg border border-slate-100">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative">
                  <img 
                    src={featuredResource.imageUrl} 
                    alt={featuredResource.imageAlt}
                    className="w-full h-64 md:h-full object-cover"
                    data-testid="img-featured-resource"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                      data-testid="text-trending-badge"
                    >
                      📈 TRENDING
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div 
                  className="text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4 flex items-center"
                  data-testid="text-featured-type"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {featuredResource.type}
                </div>
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-4 text-slate-800"
                  data-testid="text-featured-title"
                >
                  {featuredResource.title}
                </h3>
                <p 
                  className="text-slate-600 mb-6 leading-relaxed"
                  data-testid="text-featured-description"
                >
                  {featuredResource.description}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2"
                    data-testid="button-download-featured"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                  <div className="text-sm text-slate-500 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span data-testid="text-download-count">
                      {featuredResource.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.name}
                variant={activeFilter === filter.name ? "default" : "outline"}
                className={`rounded-full flex items-center ${
                  activeFilter === filter.name 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "bg-white text-slate-600 hover:bg-orange-500 hover:text-white border-slate-200"
                }`}
                onClick={() => setActiveFilter(filter.name)}
                data-testid={`filter-${filter.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {filter.icon}
                {filter.name}
              </Button>
            ))}
          </div>

          {/* AI Knowledge Quizzes Section */}
          {activeFilter === "Quizzes" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-slate-800">
                  AI Knowledge <span className="gradient-text">Quizzes</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Test your AI expertise across different domains and difficulty levels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes.map((quiz) => (
                  <Card 
                    key={quiz.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-blue-900 to-purple-900"
                    onClick={() => startQuiz(quiz)}
                    data-testid={`card-quiz-${quiz.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <div className="text-sm font-medium uppercase tracking-wide">
                            {quiz.topic}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          quiz.difficulty === 'beginner' ? 'bg-green-500' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        } text-white border-0 capitalize`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <Play className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 text-white">
                      <h4 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                        {quiz.title}
                      </h4>
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {quiz.questions.length} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {quiz.timeLimit} min
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {quiz.passingScore}% to pass
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          startQuiz(quiz);
                        }}
                        data-testid={`button-start-quiz-${quiz.id}`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resource Grid */}
          {activeFilter !== "Quizzes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
              <Card 
                key={resource.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-slate-900 to-slate-800"
                onClick={() => setSelectedResource(resource)}
                data-testid={`card-resource-${resource.id}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.imageAlt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-resource-${resource.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeColor(resource.type)} text-white border-0`}>
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-orange-400">
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide text-orange-400">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">
                    {resource.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span data-testid={`text-resource-metadata-${resource.id}`}>
                      {resource.metadata}
                    </span>
                    <span data-testid={`text-resource-date-${resource.id}`}>
                      {resource.date}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    View Details
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            </div>
          )}

          {/* Newsletter Section */}
          <div className="bg-slate-100 rounded-2xl p-8 md:p-12 text-center mt-16">
            <div 
              className="inline-flex items-center text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4"
              data-testid="text-exclusive-badge"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              EXCLUSIVE CONTENT
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-slate-800"
              data-testid="text-newsletter-title"
            >
              Stay Ahead of the <span className="gradient-text">Curve</span>
            </h2>
            <p 
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              data-testid="text-newsletter-description"
            >
              Get premium insights, exclusive resources, and industry trends delivered directly to your inbox. Join 10,000+ business leaders.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border-slate-200 text-slate-800 px-4 py-3 rounded-lg"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 rounded-lg"
                  data-testid="button-newsletter-subscribe"
                >
                  Get Started
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mt-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Free to join
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Weekly insights
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedResource && (
            <>
              <DialogTitle className="sr-only">{selectedResource.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed view of {selectedResource.title} resource including full content, key insights, and actionable recommendations
              </DialogDescription>
              <div className="relative">
                <img 
                  src={selectedResource.imageUrl} 
                  alt={selectedResource.imageAlt}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  onClick={() => setSelectedResource(null)}
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                  variant="secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {getTypeIcon(selectedResource.type)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedResource.title}</h2>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedResource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedResource.readTime || selectedResource.metadata}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedResource.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed">{selectedResource.fullDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Action Items</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.actionItems.map((action: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resource
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Get Consulting
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={isQuizModalOpen} onOpenChange={closeQuizModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedQuiz && !showQuizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
                {selectedQuiz.title}
              </DialogTitle>
              
              <div className="space-y-6">
                {/* Quiz Progress */}
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Badge className={`${
                      selectedQuiz.difficulty === 'beginner' ? 'bg-green-500' :
                      selectedQuiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white capitalize`}>
                      {selectedQuiz.difficulty}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    {selectedQuiz.timeLimit} min limit
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                {selectedQuiz.questions[currentQuestionIndex] && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {selectedQuiz.questions[currentQuestionIndex].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                          className={`w-full text-left justify-start p-4 h-auto ${
                            userAnswers[currentQuestionIndex] === index 
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "bg-white text-slate-700 hover:bg-blue-50 border-slate-200"
                          }`}
                          onClick={() => handleQuizAnswer(index)}
                          data-testid={`button-quiz-option-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              userAnswers[currentQuestionIndex] === index 
                                ? "border-white bg-white" 
                                : "border-slate-300"
                            }`}>
                              {userAnswers[currentQuestionIndex] === index && (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={closeQuizModal}
                        className="flex-1"
                        data-testid="button-quit-quiz"
                      >
                        Quit Quiz
                      </Button>
                      <Button
                        onClick={nextQuestion}
                        disabled={userAnswers[currentQuestionIndex] === undefined}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        data-testid="button-next-question"
                      >
                        {currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Quiz Results */}
          {selectedQuiz && showQuizResult && quizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Quiz Complete!
              </DialogTitle>
              
              <div className="space-y-8">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${
                    quizResult.passed ? "text-green-500" : "text-red-500"
                  }`}>
                    {quizResult.score}%
                  </div>
                  <div className={`text-xl font-semibold ${
                    quizResult.passed ? "text-green-600" : "text-red-600"
                  }`}>
                    {quizResult.passed ? "🎉 Congratulations! You Passed!" : "📚 Keep Learning!"}
                  </div>
                  <p className="text-slate-600">
                    You answered {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correctly
                  </p>
                </div>

                {/* Performance Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {quizResult.score}%
                    </div>
                    <div className="text-sm text-slate-600">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </div>
                    <div className="text-sm text-slate-600">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {quizResult.timeSpent} min
                    </div>
                    <div className="text-sm text-slate-600">Time Spent</div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Question Review</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedQuiz.questions.map((question, index) => {
                      const userAnswer = userAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-2">{question.question}</p>
                              <div className="text-xs space-y-1">
                                <div className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                  Your answer: {question.options[userAnswer]}
                                </div>
                                {!isCorrect && (
                                  <div className="text-green-600">
                                    Correct answer: {question.options[question.correctAnswer]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={closeQuizModal}
                    className="flex-1"
                    data-testid="button-close-results"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      resetQuiz();
                      startQuiz(selectedQuiz);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-retake-quiz"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/contact'}
                    className="flex-1"
                    data-testid="button-get-consulting"
                  >
                    Get AI Consulting
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;