import { Resource } from '../types';

export const financialFraudDetection: Resource = {
  id: 10,
  type: "CASE STUDY",
  title: "Financial Services: Fraud Detection Excellence",
  shortDescription: "Major bank reduced fraud losses by 40% and improved detection speed by 10x with ML models.",
  fullDescription: "Global Finance Corp, a leading financial institution, transformed their fraud detection capabilities using advanced machine learning models. The implementation included real-time transaction monitoring, behavioral analytics, and anomaly detection systems processing millions of transactions daily. Results included 99.7% fraud detection accuracy, 40% reduction in fraud losses, 10x faster threat identification, and 50% decrease in false positives. The case study details their journey from legacy rule-based systems to AI-powered fraud prevention, including challenges overcome and lessons learned.",
  imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Financial technology and fraud detection systems",
  metadata: "Finance",
  date: "Success Story",
  author: "Michael Chen",
  readTime: "8 min",
  tags: ["Finance", "Fraud Detection", "Machine Learning", "Risk Management"],
  content: {
    keyPoints: [
      "Real-time fraud detection across multiple channels",
      "Behavioral analytics identify suspicious patterns instantly",
      "ML models adapt to new fraud techniques automatically",
      "Integration with existing banking systems seamless",
      "Customer experience improved with fewer false declines"
    ],
    insights: [
      "Combining multiple ML models improves accuracy by 35%",
      "Real-time processing essential for fraud prevention",
      "Continuous model retraining critical for effectiveness"
    ],
    actionItems: [
      "Audit current fraud detection capabilities",
      "Implement real-time transaction monitoring",
      "Develop ML model ensemble for better accuracy",
      "Create automated model retraining pipelines"
    ]
  }
};
