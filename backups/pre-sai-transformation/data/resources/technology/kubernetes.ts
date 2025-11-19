import { Resource } from '../types';

export const kubernetes: Resource = {
  id: 129,
  type: "TECH GUIDE",
  title: "Kubernetes",
  shortDescription: "Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It's the gold standard for running reliable, scalable AI/ML, microservices, and enterprise workloads in production.",
  fullDescription: "Seamlessly scale AI model training, inference, and batch jobs. Run highly available web, API, and microservice backends across clouds. Centralize DevOps, ML, and analytics pipelines.",
  imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Kubernetes container orchestration",
  metadata: "Container Platform",
  date: "Kubernetes v1.29",
  author: "Strive AI Team",
  readTime: "18 min",
  tags: ["Kubernetes", "Container Orchestration", "DevOps", "Cloud Native", "Microservices"],
  content: {
    keyPoints: [
      "Automated container orchestration, healing, and scaling",
      "Cloud-agnostic, works with AWS, Azure, GCP, and on-prem/data center",
      "Role-based access control and built-in monitoring/logging",
      "Native support for distributed ML, batch jobs, and GPU workloads",
      "Huge open-source ecosystem with Helm charts, operators, and CRDs"
    ],
    insights: [
      "Used by the cloud-native 500 for mission-critical production clusters",
      "Drives a 50%+ increase in resource utilization and efficiency by decoupling apps from hardware",
      "Essential for ML Ops and continuous deployment/automation at scale"
    ],
    actionItems: [
      "Modernize workloads by containerizing and deploying via Kubernetes clusters",
      "Leverage managed Kubernetes (GKE, EKS, AKS) for rapid onboarding",
      "Integrate Helm for easy application management and scaling in production"
    ]
  }
};