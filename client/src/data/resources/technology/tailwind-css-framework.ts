import { Resource } from '../types';

export const tailwindCssFramework: Resource = {
  id: 111,
  type: "TECH GUIDE",
  title: "Tailwind CSS Framework",
  shortDescription: "Utility-first CSS framework for rapid UI development with consistent design systems.",
  fullDescription: "Tailwind CSS revolutionizes frontend styling with its utility-first approach, enabling rapid development of beautiful, responsive interfaces. This guide covers core concepts, customization techniques, component extraction patterns, and integration with popular frameworks. Learn to build consistent design systems, implement responsive layouts, create custom themes, and optimize for production with purging and minification strategies.",
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Modern web design with Tailwind CSS",
  metadata: "CSS Framework",
  date: "Tailwind v3.x",
  author: "Strive Design Team",
  readTime: "10 min",
  tags: ["Tailwind CSS", "CSS", "UI Design", "Frontend"],
  content: {
    keyPoints: [
      "Utility-first approach for rapid prototyping and development",
      "Highly customizable design system with configuration files",
      "Responsive design utilities for mobile-first development",
      "Built-in purging for optimized production builds",
      "Extensive plugin ecosystem for extended functionality"
    ],
    insights: [
      "Tailwind CSS reduces custom CSS writing by 80%",
      "Design consistency improves across team members by 90%",
      "Development speed increases by 50% with utility classes"
    ],
    actionItems: [
      "Install and configure Tailwind CSS in your project",
      "Learn core utility classes and responsive modifiers",
      "Create custom component patterns with @apply directive",
      "Set up purging for optimized production builds"
    ]
  }
};