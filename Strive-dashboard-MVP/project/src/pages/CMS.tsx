import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, User, Tag, FileText, Image, Video, MoreHorizontal, Globe, Drama as Draft, CheckCircle, X, Save, Upload, Link, Bold, Italic, Underline, List, AlignLeft, Code, Hash, ExternalLink, Clock, AlertCircle, Send, ArrowRight, Copy, Settings, Zap, Upload as UploadIcon, FolderOpen } from 'lucide-react';

const contentItems = [
  {
    id: 1,
    title: 'Advanced AI Solutions for Modern Business',
    type: 'Article',
    status: 'Published',
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    publishDate: '2025-01-10',
    lastModified: '2025-01-12',
    views: 2847,
    category: 'AI Solutions',
    tags: ['AI', 'Machine Learning', 'Business'],
    featured: true,
    excerpt: 'Explore how artificial intelligence is transforming business operations across industries with our comprehensive AI solutions.',
    content: `# Advanced AI Solutions for Modern Business

Artificial intelligence is revolutionizing the way businesses operate, providing unprecedented opportunities for growth, efficiency, and innovation. In this comprehensive guide, we explore the transformative power of AI across various industries.

## Key Benefits of AI Implementation

- **Increased Efficiency**: Automate repetitive tasks and streamline workflows
- **Data-Driven Insights**: Extract meaningful patterns from large datasets
- **Enhanced Customer Experience**: Personalize interactions at scale
- **Cost Reduction**: Optimize operations and reduce manual labor costs

## Industry Applications

AI solutions are being deployed across multiple sectors:

### Healthcare
Medical diagnosis, drug discovery, and patient care optimization.

### Finance
Fraud detection, risk assessment, and algorithmic trading.

### Manufacturing
Predictive maintenance, quality control, and supply chain optimization.

Ready to transform your business with AI? Contact our experts today.`,
    seoTitle: 'AI Solutions for Business Transformation | STRIVE AI',
    metaDescription: 'Discover how STRIVE AI solutions can transform your business operations. Expert AI implementation for healthcare, finance, and manufacturing industries.',
    keywords: ['AI solutions', 'business transformation', 'machine learning', 'artificial intelligence', 'automation'],
    urlSlug: 'ai-solutions-modern-business'
  },
  {
    id: 2,
    title: 'Process Automation Case Study: Manufacturing',
    type: 'Case Study',
    status: 'Published',
    author: 'Michael Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    publishDate: '2025-01-08',
    lastModified: '2025-01-09',
    views: 1653,
    category: 'Case Studies',
    tags: ['Automation', 'Manufacturing', 'ROI'],
    featured: false,
    excerpt: 'A detailed case study showing 40% efficiency improvement through our process automation solution.',
    content: `# Process Automation Case Study: Manufacturing Excellence

This case study examines how GlobalTech Manufacturing achieved a remarkable 40% efficiency improvement through strategic process automation implementation.

## Challenge
GlobalTech faced significant operational challenges:
- Manual quality control processes
- Inconsistent production schedules  
- High error rates in inventory management
- Excessive downtime due to reactive maintenance

## Solution
Our team implemented a comprehensive automation strategy:

1. **Automated Quality Control**: AI-powered visual inspection systems
2. **Smart Scheduling**: Machine learning algorithms for production optimization
3. **Inventory Management**: Real-time tracking and automated reordering
4. **Predictive Maintenance**: IoT sensors and predictive analytics

## Results
After 6 months of implementation:
- **40% increase** in overall efficiency
- **65% reduction** in quality defects
- **30% decrease** in operational costs
- **50% reduction** in unplanned downtime

## Conclusion
Process automation delivered measurable results that exceeded expectations, positioning GlobalTech as an industry leader.`,
    seoTitle: 'Manufacturing Automation Case Study - 40% Efficiency Gain',
    metaDescription: 'Learn how process automation helped GlobalTech Manufacturing achieve 40% efficiency improvement and significant cost savings.',
    keywords: ['process automation', 'manufacturing efficiency', 'case study', 'ROI', 'automation benefits'],
    urlSlug: 'manufacturing-automation-case-study'
  },
  {
    id: 3,
    title: 'Getting Started with STRIVE Platform',
    type: 'Tutorial',
    status: 'Draft',
    author: 'Emily Davis',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    publishDate: null,
    lastModified: '2025-01-11',
    views: 0,
    category: 'Tutorials',
    tags: ['Getting Started', 'Platform', 'Guide'],
    featured: false,
    excerpt: 'Step-by-step guide to help new users get the most out of the STRIVE platform.',
    content: `# Getting Started with STRIVE Platform

Welcome to STRIVE! This comprehensive guide will help you navigate our platform and maximize your productivity from day one.

## Initial Setup

### 1. Account Configuration
- Complete your profile setup
- Configure notification preferences  
- Set up two-factor authentication

### 2. Project Creation
- Create your first project
- Invite team members
- Set project permissions

## Core Features

### Dashboard Overview
The dashboard provides a centralized view of:
- Active projects and their status
- Upcoming deadlines and milestones
- Team activity and notifications
- Performance metrics and analytics

### Project Management Tools
- **Task Management**: Create, assign, and track tasks
- **Timeline View**: Visualize project schedules
- **Resource Allocation**: Manage team assignments
- **Progress Tracking**: Monitor project advancement

## Advanced Features

### AI-Powered Insights
Leverage our AI capabilities for:
- Automated task prioritization
- Resource optimization suggestions
- Risk assessment and mitigation
- Performance predictions

### Integration Capabilities
Connect with popular tools:
- Slack for team communication
- Google Workspace for document management
- Jira for issue tracking
- GitHub for code management

## Best Practices

1. **Regular Updates**: Keep project status current
2. **Clear Communication**: Use comments and notifications effectively  
3. **Documentation**: Maintain comprehensive project documentation
4. **Performance Monitoring**: Review analytics regularly

## Getting Help

Need assistance? Our support team is here to help:
- Live chat support (24/7)
- Comprehensive knowledge base
- Video tutorials and webinars
- Community forums

Ready to dive in? Start by creating your first project!`,
    seoTitle: 'STRIVE Platform Tutorial - Complete Getting Started Guide',
    metaDescription: 'Learn how to use the STRIVE platform effectively with our comprehensive getting started guide. Step-by-step tutorials and best practices.',
    keywords: ['STRIVE platform', 'getting started guide', 'tutorial', 'project management', 'platform setup'],
    urlSlug: 'getting-started-strive-platform'
  },
  {
    id: 4,
    title: 'Q4 2024 AI Industry Report',
    type: 'Report',
    status: 'Scheduled',
    author: 'David Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    publishDate: '2025-01-15',
    lastModified: '2025-01-10',
    views: 0,
    category: 'Research',
    tags: ['Report', 'Industry', 'Analytics'],
    featured: true,
    excerpt: 'Comprehensive analysis of AI adoption trends and market insights for Q4 2024.',
    content: `# Q4 2024 AI Industry Report

## Executive Summary

The fourth quarter of 2024 marked a pivotal period for artificial intelligence adoption across industries. This comprehensive report analyzes key trends, market dynamics, and strategic insights that shaped the AI landscape.

## Key Findings

### Market Growth
- Global AI market reached $184.6 billion in Q4 2024
- 28% year-over-year growth in enterprise AI adoption
- 45% increase in AI infrastructure investments

### Industry Adoption Rates
1. **Financial Services**: 78% adoption rate (+12% from Q3)
2. **Healthcare**: 65% adoption rate (+18% from Q3)  
3. **Manufacturing**: 58% adoption rate (+22% from Q3)
4. **Retail**: 52% adoption rate (+15% from Q3)

### Emerging Trends

#### Generative AI Integration
Organizations are increasingly integrating generative AI into workflows:
- Content creation and marketing automation
- Code generation and software development
- Customer service and support automation
- Data analysis and report generation

#### Edge AI Deployment
Growing emphasis on edge computing for AI:
- Reduced latency requirements
- Enhanced privacy and security
- Cost optimization strategies
- Real-time decision making capabilities

## Regional Analysis

### North America
- Market leader with 42% global market share
- Strong venture capital funding ($23.4B in Q4)
- Regulatory framework development accelerating

### Europe
- 28% market share with focus on ethical AI
- GDPR compliance driving privacy-first solutions
- Strong government support for AI research

### Asia-Pacific
- Fastest growing region at 35% YoY growth
- Manufacturing and automotive sectors leading adoption
- Significant investments in AI education and workforce development

## Technology Spotlight

### Large Language Models (LLMs)
- 67% of enterprises evaluating or implementing LLMs
- Custom model fine-tuning becoming standard practice
- Focus on domain-specific applications

### Computer Vision
- Manufacturing quality control leading use case
- Healthcare diagnostics showing strong growth
- Autonomous systems gaining traction

### Natural Language Processing
- Customer service automation widespread
- Document processing and analysis growing
- Multi-language support expanding globally

## Challenges and Barriers

### Technical Challenges
1. **Data Quality**: 58% cite poor data quality as primary barrier
2. **Integration Complexity**: Legacy system compatibility issues
3. **Scalability**: Infrastructure limitations for large-scale deployment

### Business Challenges
1. **ROI Measurement**: Difficulty quantifying AI business value
2. **Skills Gap**: Shortage of qualified AI professionals
3. **Change Management**: Organizational resistance to AI adoption

## Future Outlook

### 2025 Predictions
- AI market expected to reach $230 billion
- Multimodal AI systems will become mainstream
- Increased focus on sustainable and responsible AI
- Regulatory frameworks will mature globally

### Strategic Recommendations

For businesses considering AI adoption:
1. **Start Small**: Begin with pilot projects and proof of concepts
2. **Invest in Data**: Prioritize data quality and governance
3. **Build Capabilities**: Develop internal AI expertise
4. **Plan for Scale**: Design solutions with scalability in mind
5. **Consider Ethics**: Implement responsible AI practices from the start

## Conclusion

Q4 2024 demonstrated that AI has moved beyond experimental phases into practical business applications. Organizations that embrace AI strategically while addressing implementation challenges will be best positioned for success in 2025 and beyond.

The rapid pace of innovation continues to accelerate, making it essential for business leaders to stay informed about AI trends and opportunities relevant to their industries.

---

*This report was compiled using data from industry surveys, market research, and analysis of over 500 enterprise AI implementations across multiple sectors.*`,
    seoTitle: 'Q4 2024 AI Industry Report - Market Trends and Analysis',
    metaDescription: 'Comprehensive Q4 2024 AI industry report covering market trends, adoption rates, and strategic insights for business leaders.',
    keywords: ['AI industry report', 'market analysis', 'AI trends 2024', 'artificial intelligence adoption', 'business intelligence'],
    urlSlug: 'q4-2024-ai-industry-report'
  },
];

const mediaItems = [
  {
    id: 1,
    name: 'ai-solutions-hero.jpg',
    type: 'Image',
    size: '2.4 MB',
    uploadDate: '2025-01-12',
    usedIn: 3,
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
    altText: 'Modern AI solutions dashboard interface showing analytics and data visualization',
    caption: 'STRIVE AI Solutions - Advanced Business Intelligence Dashboard',
    dimensions: '1920x1080',
    keywords: ['AI solutions', 'dashboard', 'analytics', 'business intelligence']
  },
  {
    id: 2,
    name: 'product-demo-video.mp4',
    type: 'Video',
    size: '45.7 MB',
    uploadDate: '2025-01-10',
    usedIn: 1,
    url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
    altText: 'Product demonstration video showing STRIVE platform features',
    caption: 'Complete STRIVE Platform Walkthrough - All Features Explained',
    dimensions: '1920x1080',
    keywords: ['product demo', 'platform tutorial', 'features overview', 'user guide']
  },
  {
    id: 3,
    name: 'team-collaboration.png',
    type: 'Image',
    size: '1.8 MB',
    uploadDate: '2025-01-09',
    usedIn: 2,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop',
    altText: 'Professional team collaborating on project using digital tools and technology',
    caption: 'Effective Team Collaboration in the Digital Age',
    dimensions: '1600x900',
    keywords: ['team collaboration', 'digital workspace', 'remote work', 'productivity']
  },
  {
    id: 4,
    name: 'automation-workflow.gif',
    type: 'Image',
    size: '3.2 MB',
    uploadDate: '2025-01-08',
    usedIn: 1,
    url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop',
    altText: 'Animated workflow diagram showing process automation steps',
    caption: 'Automated Business Process Flow - From Input to Output',
    dimensions: '800x600',
    keywords: ['process automation', 'workflow', 'business process', 'efficiency']
  },
  {
    id: 5,
    name: 'data-visualization.png',
    type: 'Image',
    size: '1.9 MB',
    uploadDate: '2025-01-07',
    usedIn: 4,
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    altText: 'Interactive data visualization charts and graphs on computer screen',
    caption: 'Advanced Data Analytics and Business Intelligence Visualization',
    dimensions: '1920x1200',
    keywords: ['data visualization', 'analytics', 'charts', 'business intelligence', 'metrics']
  },
];

const categories = [
  { name: 'AI Solutions', count: 15, color: 'bg-blue-100 text-blue-800' },
  { name: 'Case Studies', count: 8, color: 'bg-green-100 text-green-800' },
  { name: 'Tutorials', count: 12, color: 'bg-purple-100 text-purple-800' },
  { name: 'Research', count: 6, color: 'bg-orange-100 text-orange-800' },
  { name: 'News', count: 10, color: 'bg-red-100 text-red-800' },
];

const workflowStates = [
  { name: 'Draft', color: 'bg-slate-100 text-slate-800', icon: Draft },
  { name: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { name: 'Published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { name: 'Archived', color: 'bg-gray-100 text-gray-800', icon: FolderOpen }
];

export function CMS() {
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'categories'>('content');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState<typeof contentItems[0] | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showMediaEditor, setShowMediaEditor] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [mediaSearchTerm, setMediaSearchTerm] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('all');

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(mediaSearchTerm.toLowerCase()) ||
      (item.altText?.toLowerCase().includes(mediaSearchTerm.toLowerCase())) ||
      (item.keywords?.some(keyword => keyword.toLowerCase().includes(mediaSearchTerm.toLowerCase())));
    const matchesType = mediaTypeFilter === 'all' || item.type.toLowerCase() === mediaTypeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const openContentEditor = (content: typeof contentItems[0]) => {
    setSelectedContent(content);
    setEditorContent(content.content || '');
    setEditMode(true);
  };

  const openMediaEditor = (media: typeof mediaItems[0]) => {
    setSelectedMedia(media);
    setShowMediaEditor(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file upload logic here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering for preview
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-slate-900 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-slate-900 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-slate-900 mb-2">$1</h3>')
      .replace(/^\* (.*$)/gm, '<li class="text-slate-700">$1</li>')
      .replace(/^\- (.*$)/gm, '<li class="text-slate-700">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="text-slate-700 mb-4">')
      .replace(/^(?!<[h|l])/gm, '<p class="text-slate-700 mb-4">')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Content Management System</h2>
          <p className="text-slate-600">Create, manage, and publish content across all channels</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{contentItems.length}</div>
            <div className="text-xs text-green-600 mt-1">+3 this week</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Published</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {contentItems.filter(item => item.status === 'Published').length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Live content</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Draft</CardTitle>
            <Draft className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {contentItems.filter(item => item.status === 'Draft').length}
            </div>
            <div className="text-xs text-slate-500 mt-1">In progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {contentItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 mt-1">+12% this month</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search content, categories, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'media'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Content Items</CardTitle>
                <CardDescription>Manage all your content from one place</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContent.map((item) => (
                    <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            {item.featured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{item.excerpt}</p>
                          
                          {/* Publishing Workflow States */}
                          <div className="flex items-center space-x-3 mb-3">
                            {workflowStates.map((state, index) => {
                              const StateIcon = state.icon;
                              const isActive = state.name === item.status;
                              const isPast = workflowStates.findIndex(s => s.name === item.status) > index;
                              
                              return (
                                <div key={state.name} className="flex items-center space-x-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isActive ? state.color : isPast ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                                  }`}>
                                    <StateIcon className="h-4 w-4" />
                                  </div>
                                  <span className={`text-xs font-medium ${
                                    isActive ? 'text-slate-900' : 'text-slate-500'
                                  }`}>
                                    {state.name}
                                  </span>
                                  {index < workflowStates.length - 1 && (
                                    <ArrowRight className="h-3 w-3 text-slate-400" />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {item.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'Not scheduled'}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.views} views
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              categories.find(cat => cat.name === item.category)?.color || 'bg-slate-100 text-slate-800'
                            }`}>
                              {item.category}
                            </span>
                            {item.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Published' 
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'Draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status === 'Published' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {item.status === 'Draft' && <Draft className="h-3 w-3 mr-1" />}
                            {item.status === 'Scheduled' && <Calendar className="h-3 w-3 mr-1" />}
                            {item.status}
                          </span>
                          <Button variant="ghost" size="icon" onClick={() => openContentEditor(item)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openContentEditor(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  New Article
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Tag className="h-4 w-4 mr-2" />
                  Manage Tags
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Manage images, videos, and other media assets</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Media Library Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search media files..."
                  value={mediaSearchTerm}
                  onChange={(e) => setMediaSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select 
                value={mediaTypeFilter}
                onChange={(e) => setMediaTypeFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
              <Button>
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>

            {/* Drag and Drop Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
                isDragOver 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-slate-300 bg-slate-50 hover:border-slate-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-orange-500' : 'text-slate-400'}`} />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {isDragOver ? 'Drop files here' : 'Drag and drop files to upload'}
              </h3>
              <p className="text-slate-600 mb-4">or click to browse files</p>
              <Button variant="outline">
                Select Files
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMedia.map((media) => (
                <div key={media.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    {media.type === 'Image' ? (
                      <img src={media.url} alt={media.altText || media.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Video className="h-8 w-8 text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500">Video</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-slate-900 truncate">{media.name}</h4>
                    <div className="text-xs text-slate-500 mt-1">
                      <div>{media.size} • {media.type}</div>
                      <div>Used in {media.usedIn} items</div>
                      <div>Uploaded {new Date(media.uploadDate).toLocaleDateString()}</div>
                      {media.dimensions && <div>{media.dimensions}</div>}
                      {media.altText && (
                        <p className="text-xs text-slate-600 mt-2 truncate" title={media.altText}>
                          Alt: {media.altText}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end space-x-1 mt-3">
                      <Button size="sm" variant="outline" onClick={() => openMediaEditor(media)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openMediaEditor(media)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <Card>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
            <CardDescription>Organize your content with categories and tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.name} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{category.name}</h3>
                      <p className="text-sm text-slate-600">{category.count} items</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                      {category.count}
                    </span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Editor Modal */}
      {editMode && selectedContent && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50" 
            onClick={() => setEditMode(false)}
          />
          <div className="w-full max-w-6xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {previewMode ? 'Content Preview' : 'Edit Content'}
              </h2>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? <Edit className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditMode(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {!previewMode ? (
                <>
                  {/* Basic Content Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Title</label>
                      <input
                        type="text"
                        defaultValue={selectedContent.title}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
                      <select className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>{selectedContent.category}</option>
                        {categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Excerpt</label>
                    <textarea
                      defaultValue={selectedContent.excerpt}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>

                  {/* SEO Metadata Fields */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Hash className="h-5 w-5 mr-2" />
                        SEO Metadata
                      </CardTitle>
                      <CardDescription>Optimize your content for search engines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">SEO Title</label>
                        <input
                          type="text"
                          defaultValue={selectedContent.seoTitle}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="SEO optimized title (max 60 characters)"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {selectedContent.seoTitle?.length || 0}/60 characters
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Meta Description</label>
                        <textarea
                          defaultValue={selectedContent.metaDescription}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={3}
                          placeholder="Brief description for search results (max 160 characters)"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {selectedContent.metaDescription?.length || 0}/160 characters
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">URL Slug</label>
                        <div className="flex items-center">
                          <span className="text-slate-500 text-sm mr-2">strive.com/blog/</span>
                          <input
                            type="text"
                            defaultValue={selectedContent.urlSlug}
                            className="flex-1 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Keywords</label>
                        <input
                          type="text"
                          defaultValue={selectedContent.keywords?.join(', ')}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rich Text Editor */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Edit className="h-5 w-5 mr-2" />
                        Content Editor
                      </CardTitle>
                      <CardDescription>Write and format your content using Markdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Editor Toolbar */}
                      <div className="flex items-center space-x-2 p-2 border border-slate-300 rounded-t-lg bg-slate-50">
                        <Button size="sm" variant="ghost" title="Bold">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Italic">
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Underline">
                          <Underline className="h-4 w-4" />
                        </Button>
                        <div className="h-4 w-px bg-slate-300" />
                        <Button size="sm" variant="ghost" title="Bulleted List">
                          <List className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Align Left">
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <div className="h-4 w-px bg-slate-300" />
                        <Button size="sm" variant="ghost" title="Insert Link">
                          <Link className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Insert Image">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Insert Code">
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Content Textarea */}
                      <textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        className="w-full p-4 border-l border-r border-b border-slate-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                        rows={20}
                        placeholder="Start writing your content using Markdown..."
                      />
                      
                      {/* Quick Markdown Guide */}
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                        <strong>Quick Markdown Guide:</strong> 
                        # Heading 1, ## Heading 2, **bold**, *italic*, [link](url), ![image](url), - list item
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Content Preview */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Live Preview
                    </CardTitle>
                    <CardDescription>How your content will appear on the published site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-sm border border-slate-200 rounded-lg">
                      <div 
                        className="prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(editorContent) }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Media Editor Modal */}
      {showMediaEditor && selectedMedia && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50" 
            onClick={() => setShowMediaEditor(false)}
          />
          <div className="w-full max-w-4xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Media Details</h2>
              <div className="flex items-center space-x-3">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowMediaEditor(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Media Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 flex items-center justify-center rounded-lg overflow-hidden">
                    {selectedMedia.type === 'Image' ? (
                      <img src={selectedMedia.url} alt={selectedMedia.altText || selectedMedia.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Video className="h-16 w-16 text-slate-400 mb-4" />
                        <span className="text-slate-600">{selectedMedia.name}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Media Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Media Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">File Name</label>
                      <input
                        type="text"
                        defaultValue={selectedMedia.name}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">File Size</label>
                      <input
                        type="text"
                        value={selectedMedia.size}
                        disabled
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Alt Text</label>
                    <input
                      type="text"
                      defaultValue={selectedMedia.altText}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Describe the image for screen readers and SEO"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Caption</label>
                    <textarea
                      defaultValue={selectedMedia.caption}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={2}
                      placeholder="Optional caption to display with the image"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Keywords</label>
                    <input
                      type="text"
                      defaultValue={selectedMedia.keywords?.join(', ')}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Dimensions</label>
                      <input
                        type="text"
                        value={selectedMedia.dimensions || 'Unknown'}
                        disabled
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Upload Date</label>
                      <input
                        type="text"
                        value={new Date(selectedMedia.uploadDate).toLocaleDateString()}
                        disabled
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Usage Count</label>
                      <input
                        type="text"
                        value={`${selectedMedia.usedIn} items`}
                        disabled
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* URL and Embedding */}
              <Card>
                <CardHeader>
                  <CardTitle>URL & Embedding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Media URL</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={selectedMedia.url}
                        readOnly
                        className="flex-1 p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
                      />
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}