import { Project } from '../types';

export const smartDashboardUiKit: Project = {
  id: 5,
  title: "Smart Dashboard UI Kit",
  category: "Template",
  type: "template",
  technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
  shortDescription: "Modern, responsive dashboard components with AI-powered insights and real-time data visualization.",
  fullDescription: "A comprehensive UI kit featuring modern dashboard components, interactive charts, and AI-powered insights. Includes dark/light themes, responsive layouts, and customizable widgets for any business intelligence application.",
  imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/dashboard-kit",
  githubUrl: "https://github.com/strive-ai/dashboard-kit",
  features: ["50+ Components", "Responsive design", "Dark/light themes", "Real-time updates"],
  metrics: { "Components": "50+", "Themes": "2", "Responsive": "100%", "Performance Score": "95/100" },
  sources: [
    {
      title: "React Dashboard Design Patterns",
      url: "https://react-dashboard-patterns.com/",
      description: "Best practices for dashboard component design"
    },
    {
      title: "Data Visualization Best Practices - Tableau",
      url: "https://www.tableau.com/learn/articles/data-visualization",
      description: "Guidelines for effective data presentation"
    },
    {
      title: "Modern Web Dashboard UX Research",
      url: "https://www.nngroup.com/articles/dashboard-design/",
      description: "User experience research for dashboard interfaces"
    }
  ],
  relatedSolutions: ["data-analytics", "cloud-infrastructure", "ai-automation"]
};