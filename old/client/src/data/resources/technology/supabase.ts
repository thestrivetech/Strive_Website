import { Resource } from '../types';

export const supabase: Resource = {
  id: 137,
  type: "TECH GUIDE",
  title: "Supabase",
  shortDescription: "SupaBase is an open-source Firebase alternative, delivering scalable Postgres databases, realtime APIs, authentication, and storage for modern apps and AI projects—no backend expertise needed.",
  fullDescription: "AI app backends (user auth, data, storage) in minutes. Realtime analytics dashboards and collaborative platforms. Serverless data ingestion and virtual agent management.",
  imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Supabase backend platform",
  metadata: "Backend Platform",
  date: "Supabase 2024",
  author: "Strive AI Team",
  readTime: "14 min",
  tags: ["Supabase", "Backend-as-a-Service", "PostgreSQL", "Real-time", "Open Source"],
  content: {
    keyPoints: [
      "Instant Postgres database with RESTful and realtime GraphQL APIs",
      "Built-in authentication, user management, and fine-grained security",
      "Edge Functions for fast serverless backend logic",
      "Scalable object/file storage integrated into unified platform",
      "Easy local development, cloud deploy, and CLI tooling"
    ],
    insights: [
      "Used by tens of thousands of startups for MVP to scale",
      "Accelerates AI and analytics products with serverless simplicity",
      "Powers scalable, FOSS-first platforms with low operational overhead"
    ],
    actionItems: [
      "Set up SupaBase with frontend SDK for instant backend features",
      "Combine with RLS (row-level security) for granular access policies",
      "Leverage Edge Functions to run AI/ML inference pipelines or custom APIs"
    ]
  }
};