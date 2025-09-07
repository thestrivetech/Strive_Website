import { Resource } from '../types';

export const manufacturingSmartFactory: Resource = {
  id: 11,
  type: "CASE STUDY",
  title: "Manufacturing: Smart Factory Revolution",
  shortDescription: "Manufacturing giant achieved 60% reduction in downtime through predictive maintenance and AI quality control.",
  fullDescription: "TechManufacturing Inc. transformed their production facilities into smart factories using IoT sensors, computer vision, and predictive analytics. The comprehensive implementation included predictive maintenance preventing equipment failures, automated quality control with visual inspection, and supply chain optimization. Results show 60% reduction in unplanned downtime, 85% improvement in quality metrics, 25% cost savings, and 50% faster production cycles. This case study reveals their systematic approach to digital transformation and the technologies that enabled their success.",
  imageUrl: "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Smart manufacturing and Industry 4.0 technology",
  metadata: "Manufacturing",
  date: "Success Story",
  author: "James Rodriguez",
  readTime: "9 min",
  tags: ["Manufacturing", "Predictive Maintenance", "Quality Control", "IoT"],
  content: {
    keyPoints: [
      "IoT sensors monitor equipment health 24/7",
      "Computer vision detects defects with 97% accuracy",
      "Predictive models forecast maintenance needs 30 days ahead",
      "Supply chain visibility improved end-to-end",
      "Worker safety incidents reduced by 75%"
    ],
    insights: [
      "IoT data quality crucial for predictive maintenance success",
      "Computer vision ROI realized within 6 months",
      "Cross-functional teams accelerate smart factory adoption"
    ],
    actionItems: [
      "Deploy IoT sensors on critical equipment first",
      "Implement computer vision for quality inspection",
      "Build predictive maintenance models incrementally",
      "Train workforce on new technologies continuously"
    ]
  }
};
