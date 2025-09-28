import { Resource } from '../types';

export const atlassian: Resource = {
  id: 120,
  type: "TECH GUIDE",
  title: "Atlassian",
  shortDescription: "Atlassian is an industry-leading suite of tools empowering modern, collaborative software development and agile project management. Essential for AI product engineering, Atlassian products streamline collaboration, automate workflows, and accelerate delivery cycles across teams.",
  fullDescription: "Centralize project management for distributed AI teams. Automatically track model training and deployment with Jira tickets linked to CI/CD. Collaborate on research and documentation within Confluence, tied to code changes in Bitbucket.",
  imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Atlassian collaboration tools interface",
  metadata: "Collaboration Platform",
  date: "Atlassian 2024",
  author: "Strive AI Team",
  readTime: "16 min",
  tags: ["Atlassian", "Jira", "Confluence", "Project Management", "Collaboration"],
  content: {
    keyPoints: [
      "Enables seamless collaboration with Jira, Confluence, and Bitbucket",
      "Automates issue tracking, release management, and documentation",
      "Integrates with leading DevOps and CI/CD tools",
      "Fine-grained permissions and enterprise-grade security",
      "Scalable from startups to global enterprises"
    ],
    insights: [
      "Companies using Jira see 20%+ faster sprint completion rates",
      "Atlassian's open APIs support hundreds of integrations, driving workflow efficiency",
      "Market share leader for team collaboration tools in tech"
    ],
    actionItems: [
      "Start by integrating Atlassian tools into your existing software delivery workflow",
      "Leverage templates and automation for agile sprints and documentation",
      "Expand usage with plugins and integrations to maximize collaboration and reporting"
    ]
  }
};