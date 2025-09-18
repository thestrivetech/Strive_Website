import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Timer,
  X,
  Target,
  DollarSign,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Edit
} from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'AI Model Training Pipeline',
    description: 'Developing advanced machine learning models for customer analytics',
    status: 'In Progress',
    priority: 'High',
    progress: 75,
    dueDate: '2025-01-20',
    startDate: '2024-12-01',
    budget: 125000,
    spent: 87500,
    client: 'TechCorp Solutions',
    projectManager: 'Sarah Chen',
    estimatedHours: 480,
    loggedHours: 360,
    riskLevel: 'Low',
    tags: ['Machine Learning', 'Analytics', 'Python'],
    team: [
      { id: 1, name: 'Sarah Chen', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
      { id: 2, name: 'Michael Park', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
      { id: 3, name: 'Emily Zhang', role: 'ML Engineer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
    ],
    tasks: {
      total: 24,
      completed: 18,
      inProgress: 4,
      pending: 2
    },
    recentActivity: [
      { action: 'Model training completed', date: '2025-01-12', user: 'Michael Park' },
      { action: 'Data preprocessing optimized', date: '2025-01-10', user: 'Emily Zhang' }
    ]
  },
  {
    id: 2,
    name: 'Customer Analytics Dashboard',
    description: 'Real-time dashboard for customer insights and behavioral analytics',
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    dueDate: '2025-01-15',
    startDate: '2024-11-15',
    budget: 85000,
    spent: 82000,
    client: 'RetailMax Inc',
    projectManager: 'David Wilson',
    estimatedHours: 320,
    loggedHours: 318,
    riskLevel: 'None',
    tags: ['Dashboard', 'Analytics', 'React'],
    team: [
      { id: 4, name: 'David Wilson', role: 'Frontend Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { id: 5, name: 'Lisa Rodriguez', role: 'UX Designer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' },
    ],
    tasks: {
      total: 18,
      completed: 18,
      inProgress: 0,
      pending: 0
    },
    recentActivity: [
      { action: 'Project delivered to client', date: '2025-01-15', user: 'David Wilson' },
      { action: 'Final testing completed', date: '2025-01-14', user: 'Lisa Rodriguez' }
    ]
  },
  {
    id: 3,
    name: 'Process Automation System',
    description: 'Automating repetitive business processes using AI workflows',
    status: 'In Progress',
    priority: 'High',
    progress: 45,
    dueDate: '2025-01-25',
    startDate: '2024-12-10',
    budget: 95000,
    spent: 42750,
    client: 'Manufacturing Plus',
    projectManager: 'James Kim',
    estimatedHours: 380,
    loggedHours: 171,
    riskLevel: 'Medium',
    tags: ['Automation', 'AI', 'Workflow'],
    team: [
      { id: 6, name: 'James Kim', role: 'Backend Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
      { id: 7, name: 'Anna Thompson', role: 'AI Specialist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
      { id: 8, name: 'Chris Martinez', role: 'DevOps Engineer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face' },
    ],
    tasks: {
      total: 32,
      completed: 14,
      inProgress: 12,
      pending: 6
    },
    recentActivity: [
      { action: 'Workflow engine implemented', date: '2025-01-11', user: 'Anna Thompson' },
      { action: 'API integration completed', date: '2025-01-09', user: 'James Kim' }
    ]
  },
  {
    id: 4,
    name: 'Security Compliance Audit',
    description: 'Comprehensive security assessment and compliance implementation',
    status: 'Pending',
    priority: 'Low',
    progress: 15,
    dueDate: '2025-02-01',
    startDate: '2025-01-05',
    budget: 65000,
    spent: 9750,
    client: 'SecureBank Corp',
    projectManager: 'Robert Lee',
    estimatedHours: 260,
    loggedHours: 39,
    riskLevel: 'High',
    tags: ['Security', 'Compliance', 'Audit'],
    team: [
      { id: 9, name: 'Robert Lee', role: 'Security Lead', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face' },
      { id: 10, name: 'Sandra Kim', role: 'Compliance Officer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
    ],
    tasks: {
      total: 15,
      completed: 2,
      inProgress: 3,
      pending: 10
    },
    recentActivity: [
      { action: 'Security assessment started', date: '2025-01-08', user: 'Robert Lee' },
      { action: 'Compliance checklist created', date: '2025-01-06', user: 'Sandra Kim' }
    ]
  }
];

const milestones = [
  { id: 1, project: 'AI Model Training Pipeline', title: 'Model Architecture Complete', date: '2025-01-18', status: 'upcoming' },
  { id: 2, project: 'Process Automation System', title: 'Phase 1 Testing', date: '2025-01-22', status: 'upcoming' },
  { id: 3, project: 'Customer Analytics Dashboard', title: 'Production Deployment', date: '2025-01-12', status: 'completed' },
];

export function ProjectTracker() {
  const [view, setView] = useState<'grid' | 'timeline' | 'gantt'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const getProjectHealth = (project: typeof projects[0]) => {
    const today = new Date();
    const dueDate = new Date(project.dueDate);
    const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (project.status === 'Completed') {
      return { status: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle2 };
    }
    
    if (project.riskLevel === 'High' || daysDiff < 3) {
      return { status: 'At Risk', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    }
    
    if (project.riskLevel === 'Medium' || daysDiff < 7) {
      return { status: 'Needs Attention', color: 'bg-yellow-100 text-yellow-800', icon: Timer };
    }
    
    return { status: 'On Track', color: 'bg-green-100 text-green-800', icon: Target };
  };

  // Get all unique team members for filter
  const allTeamMembers = Array.from(
    new Set(projects.flatMap(p => p.team.map(t => t.name)))
  );

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesAssignee = filterAssignee === 'all' || 
      project.team.some(member => member.name === filterAssignee);

    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Tracker</h2>
          <p className="text-slate-600">Manage and track all your AI solution projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, clients, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex rounded-lg border border-slate-300 p-1">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={view === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('timeline')}
            >
              Timeline
            </Button>
            <Button
              variant={view === 'gantt' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('gantt')}
            >
              Gantt
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="flex-1 relative">
          <Button
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="mb-2"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Team Member</label>
                <select 
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Team Members</option>
                  {allTeamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{projects.length}</div>
            <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
              <span className="flex items-center">
                <Circle className="h-3 w-3 fill-green-500 text-green-500 mr-1" />
                {projects.filter(p => p.status === 'Completed').length} Complete
              </span>
              <span className="flex items-center">
                <Timer className="h-3 w-3 text-blue-500 mr-1" />
                {projects.filter(p => p.status === 'In Progress').length} Active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 mt-2">
              ${projects.reduce((sum, p) => sum + p.spent, 0).toLocaleString()} spent
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {new Set(projects.flatMap(p => p.team.map(t => t.id))).size}
            </div>
            <div className="text-sm text-slate-600 mt-2">Across all projects</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
            </div>
            <Progress 
              value={projects.reduce((sum, p) => sum + p.progress, 0) / projects.length} 
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Content based on view */}
      {view === 'gantt' ? (
        <Card>
          <CardHeader>
            <CardTitle>Gantt Chart View</CardTitle>
            <CardDescription>Project timeline and dependencies visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Gantt Chart Coming Soon</h3>
                <p className="text-slate-600 mb-4">Advanced timeline visualization with dependencies and critical path analysis</p>
                <div className="space-y-2 text-sm text-slate-500">
                  <p>• Visual project timelines</p>
                  <p>• Task dependencies</p>
                  <p>• Resource allocation</p>
                  <p>• Critical path highlighting</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const health = getProjectHealth(project);
            const HealthIcon = health.icon;
            
            return (
              <Card 
                key={project.id} 
                className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-orange-500"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg font-semibold text-slate-900">{project.name}</CardTitle>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${health.color}`}>
                          <HealthIcon className="h-3 w-3 mr-1" />
                          {health.status}
                        </span>
                      </div>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500">
                        <span className="bg-slate-100 px-2 py-1 rounded">{project.client}</span>
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-orange-100 text-orange-700 px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.priority === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : project.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {project.priority} Priority
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="h-4 w-4 mr-2" />
                      {project.team.length} members
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">
                      ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{project.tasks.completed}</div>
                      <div className="text-slate-500">Done</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{project.tasks.inProgress}</div>
                      <div className="text-slate-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-600">{project.tasks.pending}</div>
                      <div className="text-slate-500">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{project.tasks.total}</div>
                      <div className="text-slate-500">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      {/* Project Detail Sidebar */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50" 
            onClick={() => setSelectedProject(null)}
          />
          <div className="w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{selectedProject.name}</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Project Overview */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Project Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Client</span>
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Project Manager</span>
                      <span className="font-medium">{selectedProject.projectManager}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Start Date</span>
                      <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Due Date</span>
                      <span className="font-medium">{new Date(selectedProject.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Budget</span>
                      <span className="font-medium">${selectedProject.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Spent</span>
                      <span className="font-medium">${selectedProject.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Estimated Hours</span>
                      <span className="font-medium">{selectedProject.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Logged Hours</span>
                      <span className="font-medium">{selectedProject.loggedHours}h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress & Health */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Progress & Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-600">Overall Progress</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedProject.riskLevel === 'Low' ? 'bg-green-500' :
                        selectedProject.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm text-slate-600">Risk Level: {selectedProject.riskLevel}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedProject.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : selectedProject.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Team Members</h3>
                <div className="space-y-3">
                  {selectedProject.team.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Breakdown */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Task Breakdown</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedProject.tasks.completed}</div>
                    <div className="text-sm text-slate-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedProject.tasks.inProgress}</div>
                    <div className="text-sm text-slate-600">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{selectedProject.tasks.pending}</div>
                    <div className="text-sm text-slate-600">Pending</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-600">{selectedProject.tasks.total}</div>
                    <div className="text-sm text-slate-600">Total</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {selectedProject.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Project Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-slate-200">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Project
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
          <CardDescription>Important project milestones and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <div className="font-medium text-slate-900">{milestone.title}</div>
                    <div className="text-sm text-slate-600">{milestone.project}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  {new Date(milestone.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}