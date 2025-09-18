import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  FolderKanban,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  Plus,
  Eye,
  HelpCircle,
  Target,
  Users,
  FileText,
  ArrowRight,
  CalendarDays,
  Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

const projectStatusData = [
  { name: 'Completed', value: 35, color: '#10b981' },
  { name: 'In Progress', value: 45, color: '#f59e0b' },
  { name: 'Pending', value: 20, color: '#ef4444' },
];

const weeklyProgressData = [
  { day: 'Mon', tasks: 8 },
  { day: 'Tue', tasks: 12 },
  { day: 'Wed', tasks: 6 },
  { day: 'Thu', tasks: 15 },
  { day: 'Fri', tasks: 10 },
  { day: 'Sat', tasks: 4 },
  { day: 'Sun', tasks: 2 },
];

const recentProjects = [
  { 
    id: 1, 
    name: 'AI Model Training Pipeline', 
    status: 'In Progress', 
    progress: 75, 
    dueDate: '2025-01-20', 
    team: 4,
    tasksCompleted: 18,
    totalTasks: 24,
    daysRemaining: 8,
    priority: 'High'
  },
  { 
    id: 2, 
    name: 'Customer Analytics Dashboard', 
    status: 'Completed', 
    progress: 100, 
    dueDate: '2025-01-15', 
    team: 6,
    tasksCompleted: 32,
    totalTasks: 32,
    daysRemaining: 0,
    priority: 'Medium'
  },
  { 
    id: 3, 
    name: 'Process Automation System', 
    status: 'In Progress', 
    progress: 45, 
    dueDate: '2025-01-25', 
    team: 3,
    tasksCompleted: 14,
    totalTasks: 31,
    daysRemaining: 13,
    priority: 'High'
  },
  { 
    id: 4, 
    name: 'Security Compliance Audit', 
    status: 'Pending', 
    progress: 15, 
    dueDate: '2025-02-01', 
    team: 2,
    tasksCompleted: 3,
    totalTasks: 20,
    daysRemaining: 20,
    priority: 'Low'
  },
];

const recentActivities = [
  { id: 1, action: 'Completed task', item: 'Data model validation', time: '2 hours ago', type: 'success' },
  { id: 2, action: 'New comment on', item: 'AI Training Pipeline', time: '4 hours ago', type: 'info' },
  { id: 3, action: 'Updated milestone', item: 'Customer Dashboard', time: '6 hours ago', type: 'update' },
  { id: 4, action: 'Meeting scheduled', item: 'Weekly team sync', time: '1 day ago', type: 'calendar' },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: 'AI Model Training Pipeline - Phase 2',
    type: 'Project Milestone',
    date: '2025-01-20',
    time: '5:00 PM',
    priority: 'High',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Client Presentation - TechCorp',
    type: 'Meeting',
    date: '2025-01-18',
    time: '2:30 PM',
    priority: 'High',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Weekly Team Standup',
    type: 'Meeting',
    date: '2025-01-17',
    time: '9:00 AM',
    priority: 'Medium',
    status: 'today'
  },
  {
    id: 4,
    title: 'Process Automation Demo',
    type: 'Demo',
    date: '2025-01-22',
    time: '3:00 PM',
    priority: 'Medium',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Monthly Report Submission',
    type: 'Deliverable',
    date: '2025-01-31',
    time: '11:59 PM',
    priority: 'Medium',
    status: 'upcoming'
  }
];

const quickActions = [
  { 
    id: 1, 
    title: 'Create New Task', 
    description: 'Add a new task to any project',
    icon: Plus, 
    color: 'bg-blue-500 hover:bg-blue-600',
    route: '/projects'
  },
  { 
    id: 2, 
    title: 'View All Projects', 
    description: 'Browse your project portfolio',
    icon: Eye, 
    color: 'bg-green-500 hover:bg-green-600',
    route: '/projects'
  },
  { 
    id: 3, 
    title: 'Contact Support', 
    description: 'Get help from our team',
    icon: HelpCircle, 
    color: 'bg-purple-500 hover:bg-purple-600',
    route: '/support'
  },
  { 
    id: 4, 
    title: 'Update Profile', 
    description: 'Manage your account settings',
    icon: Target, 
    color: 'bg-orange-500 hover:bg-orange-600',
    route: '/profile'
  }
];

export function UserDashboard() {
  const userName = 'John';
  const tasksDueToday = 3;
  const unreadNotifications = 8;
  const upcomingMeetings = 2;

  return (
    <div className="space-y-6">
      {/* Enhanced Personalized Welcome Widget */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Welcome back, {userName}!</h2>
            <div className="space-y-2 text-orange-100">
              <p className="text-lg">Here's what needs your attention today:</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{tasksDueToday} tasks due today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>{unreadNotifications} unread notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{upcomingMeetings} meetings scheduled</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="text-right">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-orange-200">Weekly Goal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              className={`${action.color} text-white border-none hover:scale-105 transition-all duration-200 h-auto p-4 flex flex-col items-start space-y-2`}
            >
              <div className="flex items-center space-x-2 w-full">
                <IconComponent className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <p className="text-xs text-slate-500 mt-1">3 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">47</div>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">156</div>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Team Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">23</div>
            <p className="text-xs text-slate-500 mt-1">Unread</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines/Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-orange-600" />
            Upcoming Deadlines & Events
          </CardTitle>
          <CardDescription>Important dates and milestones coming up</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.slice(0, 5).map((deadline) => {
              const isToday = deadline.status === 'today';
              const isHighPriority = deadline.priority === 'High';
              
              return (
                <div key={deadline.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                  isToday ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'
                } hover:shadow-sm transition-shadow`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isHighPriority ? 'bg-red-500' : 
                      deadline.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-slate-900">{deadline.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          deadline.type === 'Meeting' ? 'bg-blue-100 text-blue-700' :
                          deadline.type === 'Project Milestone' ? 'bg-purple-100 text-purple-700' :
                          deadline.type === 'Demo' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {deadline.type}
                        </span>
                        <span>{new Date(deadline.date).toLocaleDateString()} at {deadline.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isToday && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                        Today
                      </span>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Overview of all your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Task Progress</CardTitle>
            <CardDescription>Tasks completed each day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgressData}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="#f9731620"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Project Portfolio</CardTitle>
              <CardDescription>Detailed view of your active projects</CardDescription>
            </div>
            <Button size="sm" variant="outline">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="space-y-3 p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900">{project.name}</h4>
                      <div className="flex items-center space-x-3 mt-2">
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
                          {project.priority}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Enhanced Progress Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{project.tasksCompleted}/{project.totalTasks}</div>
                      <div className="text-xs text-slate-500">Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-semibold ${project.daysRemaining <= 3 ? 'text-red-600' : project.daysRemaining <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {project.daysRemaining}
                      </div>
                      <div className="text-xs text-slate-500">Days Left</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{project.team}</div>
                      <div className="text-xs text-slate-500">Team Size</div>
                    </div>
                  </div>
                  
                  {/* Due Date */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>Team</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'info' ? 'bg-blue-100' :
                    activity.type === 'update' ? 'bg-orange-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'info' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'update' && <TrendingUp className="h-4 w-4 text-orange-600" />}
                    {activity.type === 'calendar' && <Calendar className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">
                      {activity.action} <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}