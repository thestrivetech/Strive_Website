import { Project } from '../types';

export const computerVisionAnalytics: Project = {
  id: 2,
  title: "Computer Vision Analytics",
  category: "AI Model",
  type: "demo",
  technologies: ["TensorFlow", "OpenCV", "Python", "FastAPI"],
  shortDescription: "Real-time image and video analysis for quality control, object detection, and automated inspection systems.",
  fullDescription: "A comprehensive computer vision platform that processes visual data in real-time, providing accurate object detection, quality assessment, and anomaly detection. Perfect for manufacturing, security, and retail applications.",
  imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/computer-vision",
  githubUrl: "https://github.com/strive-ai/cv-analytics",
  features: ["Real-time processing", "Multi-object detection", "Quality scoring", "Anomaly detection"],
  metrics: { "Accuracy": "97.8%", "Processing Speed": "30fps", "Detection Rate": "99.1%" },
  sources: [
    {
      title: "YOLO: Real-Time Object Detection",
      url: "https://pjreddie.com/darknet/yolo/",
      description: "Foundation algorithm for real-time object detection"
    },
    {
      title: "Computer Vision in Manufacturing - McKinsey",
      url: "https://www.mckinsey.com/industries/manufacturing/our-insights/artificial-intelligence-in-manufacturing",
      description: "Industry applications and ROI analysis"
    },
    {
      title: "OpenCV Computer Vision Library Documentation",
      url: "https://docs.opencv.org/",
      description: "Technical implementation reference"
    }
  ],
  relatedSolutions: ["computer-vision", "manufacturing-solutions", "ai-automation"]
};