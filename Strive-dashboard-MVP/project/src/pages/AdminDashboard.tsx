import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  UserPlus,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  UserX,
  RotateCcw,
  Server,
  Database,
  Wifi,
  Shield,
  Bell,
  Palette,
  Zap,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 58000 },
  { month: 'May', revenue: 65000 },
  { month: 'Jun', revenue: 70000 },
];

const userActivityData = [
  { day: 'Mon', users: 1200 },
  { day: 'Tue', users: 1400 },
  { day: 'Wed', users: 1100 },
  { day: 'Thu', users: 1600 },
  { day: 'Fri', users: 1800 },
  { day: 'Sat', users: 1300 },
  { day: 'Sun', users: 1000 },
];

const allUsers = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    email: 'sarah.j@company.com', 
    role: 'Manager', 
    status: 'Active', 
    lastLogin: '2025-01-12',
    joinDate: '2024-10-15',
    projectsCount: 12,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    email: 'michael.c@company.com', 
    role: 'Developer', 
    status: 'Active', 
    lastLogin: '2025-01-12',
    joinDate: '2024-09-20',
    projectsCount: 8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 3, 
    name: 'Emily Davis', 
    email: 'emily.d@company.com', 
    role: 'Designer', 
    status: 'Suspended', 
    lastLogin: '2025-01-05',
    joinDate: '2024-11-03',
    projectsCount: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 4, 
    name: 'James Wilson', 
    email: 'james.w@company.com', 
    role: 'Analyst', 
    status: 'Active', 
    lastLogin: '2025-01-11',
    joinDate: '2024-08-12',
    projectsCount: 15,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 5, 
    name: 'Lisa Rodriguez', 
    email: 'lisa.r@company.com', 
    role: 'PM', 
    status: 'Active', 
    lastLogin: '2025-01-12',
    joinDate: '2024-07-18',
    projectsCount: 22,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 6, 
    name: 'Robert Kim', 
    email: 'robert.k@company.com', 
    role: 'Developer', 
    status: 'Pending', 
    lastLogin: 'Never',
    joinDate: '2025-01-10',
    projectsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 7, 
    name: 'Anna Thompson', 
    email: 'anna.t@company.com', 
    role: 'AI Specialist', 
    status: 'Active', 
    lastLogin: '2025-01-12',
    joinDate: '2024-06-25',
    projectsCount: 18,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' 
  },
  { 
    id: 8, 
    name: 'Chris Martinez', 
    email: 'chris.m@company.com', 
    role: 'DevOps', 
    status: 'Active', 
    lastLogin: '2025-01-11',
    joinDate: '2024-05-14',
    projectsCount: 9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face' 
  },
];

const systemHealthMetrics = [
  {
    name: 'Server Load',
    value: 42,
    status: 'good',
    icon: Server,
    trend: 'down',
    change: '-3%'
  },
  {
    name: 'Database Connections',
    value: 156,
    max: 200,
    status: 'warning',
    icon: Database,
    trend: 'up',
    change: '+12%'
  },
  {
    name: 'API Latency',
    value: 187,
    unit: 'ms',
    status: 'good',
    icon: Wifi,
    trend: 'down',
    change: '-15ms'
  },
  {
    name: 'Security Score',
    value: 94,
    unit: '%',
    status: 'excellent',
    icon: Shield,
    trend: 'up',
    change: '+2%'
  },
];

const adminActivityLog = [
  {
    id: 1,
    action: 'Updated user role',
    details: 'Changed Emily Davis role from Designer to Senior Designer',
    timestamp: '2025-01-12 14:30',
    admin: 'Admin User',
    type: 'user',
    icon: User
  },
  {
    id: 2,
    action: 'System settings changed',
    details: 'Updated API rate limiting to 1000 requests/hour',
    timestamp: '2025-01-12 13:15',
    admin: 'Admin User',
    type: 'system',
    icon: Settings
  },
  {
    id: 3,
    action: 'New integration added',
    details: 'Configured Slack integration for project notifications',
    timestamp: '2025-01-12 11:45',
    admin: 'Admin User',
    type: 'integration',
    icon: Zap
  },
  {
    id: 4,
    action: 'User account suspended',
    details: 'Temporarily suspended Michael Chen account pending review',
    timestamp: '2025-01-12 10:20',
    admin: 'Admin User',
    type: 'security',
    icon: AlertCircle
  },
  {
    id: 5,
    action: 'Database backup completed',
    details: 'Automated daily backup completed successfully',
    timestamp: '2025-01-12 03:00',
    admin: 'System',
    type: 'system',
    icon: CheckCircle
  },
];

export function AdminDashboard() {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userSortBy, setUserSortBy] = useState<'name' | 'role' | 'lastLogin' | 'status'>('name');
  const [userSortOrder, setUserSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'settings'>('overview');
  const usersPerPage = 5;

  // Filter and sort users
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
  ).sort((a, b) => {
    let aValue = a[userSortBy];
    let bValue = b[userSortBy];
    
    // Handle date sorting for lastLogin
    if (userSortBy === 'lastLogin') {
      aValue = aValue === 'Never' ? '1900-01-01' : aValue;
      bValue = bValue === 'Never' ? '1900-01-01' : bValue;
    }
    
    if (aValue < bValue) return userSortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return userSortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSort = (column: typeof userSortBy) => {
    if (userSortBy === column) {
      setUserSortOrder(userSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setUserSortBy(column);
      setUserSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'overview'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            System Overview
          </button>
          <button
            onClick={() => setSelectedTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'users'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setSelectedTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'settings'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Global Settings
          </button>
        </nav>
      </div>

      {selectedTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
                <Users className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{allUsers.length}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$70,580</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Projects</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">147</div>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -2.1% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">System Health</CardTitle>
                <Activity className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.2%</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +0.3% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time System Health</CardTitle>
              <CardDescription>Live monitoring of critical system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemHealthMetrics.map((metric) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={metric.name} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className={`h-5 w-5 ${
                          metric.status === 'excellent' ? 'text-green-600' :
                          metric.status === 'good' ? 'text-blue-600' :
                          metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                          metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {metric.status}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-slate-900">
                        {metric.value}{metric.unit}
                        {metric.max && <span className="text-sm text-slate-500">/{metric.max}</span>}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{metric.name}</div>
                      {metric.max && (
                        <Progress value={(metric.value / metric.max) * 100} className="mt-2" />
                      )}
                      <div className={`flex items-center text-xs mt-2 ${
                        metric.trend === 'up' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {metric.trend === 'up' ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {metric.change}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Line type="monotone" dataKey="users" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Admin Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Admin Activity</CardTitle>
              <CardDescription>Chronological log of administrative actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminActivityLog.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'system' ? 'bg-green-100' :
                        activity.type === 'integration' ? 'bg-purple-100' :
                        'bg-red-100'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          activity.type === 'user' ? 'text-blue-600' :
                          activity.type === 'system' ? 'text-green-600' :
                          activity.type === 'integration' ? 'text-purple-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-slate-900">{activity.action}</h4>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.timestamp}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
                        <div className="flex items-center mt-2 text-xs text-slate-500">
                          <span>By: {activity.admin}</span>
                          <span className={`ml-2 px-2 py-1 rounded-full ${
                            activity.type === 'user' ? 'bg-blue-100 text-blue-700' :
                            activity.type === 'system' ? 'bg-green-100 text-green-700' :
                            activity.type === 'integration' ? 'bg-purple-100 text-purple-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {selectedTab === 'users' && (
        <>
          {/* Enhanced User Management */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Comprehensive user administration and account management</CardDescription>
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* User Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or role..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>Sort by:</span>
                  <button
                    onClick={() => handleSort('name')}
                    className={`px-3 py-1 rounded ${userSortBy === 'name' ? 'bg-orange-100 text-orange-700' : 'hover:bg-slate-100'}`}
                  >
                    Name {userSortBy === 'name' && (userSortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSort('role')}
                    className={`px-3 py-1 rounded ${userSortBy === 'role' ? 'bg-orange-100 text-orange-700' : 'hover:bg-slate-100'}`}
                  >
                    Role {userSortBy === 'role' && (userSortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSort('lastLogin')}
                    className={`px-3 py-1 rounded ${userSortBy === 'lastLogin' ? 'bg-orange-100 text-orange-700' : 'hover:bg-slate-100'}`}
                  >
                    Last Login {userSortBy === 'lastLogin' && (userSortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSort('status')}
                    className={`px-3 py-1 rounded ${userSortBy === 'status' ? 'bg-orange-100 text-orange-700' : 'hover:bg-slate-100'}`}
                  >
                    Status {userSortBy === 'status' && (userSortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>

              {/* Enhanced User Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Account Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Projects</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-slate-900">{user.name}</div>
                              <div className="text-sm text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-slate-900">
                            {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            Joined {new Date(user.joinDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : user.status === 'Suspended'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-slate-900">{user.projectsCount}</div>
                          <div className="text-xs text-slate-500">active projects</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" title="View Details">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit User">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Reset Password">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-slate-600">
                  Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className="w-8 h-8 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {selectedTab === 'settings' && (
        <>
          {/* Global Settings Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Theme Preferences
                </CardTitle>
                <CardDescription>Customize the application appearance and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Color Scheme</label>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">Light Mode</Button>
                    <Button size="sm">Dark Mode</Button>
                    <Button variant="outline" size="sm">Auto</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Primary Color</label>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded border-2 border-orange-600 cursor-pointer"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded border cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded border cursor-pointer"></div>
                    <div className="w-8 h-8 bg-green-500 rounded border cursor-pointer"></div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Logo Upload</label>
                  <Button variant="outline" size="sm">Upload New Logo</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system-wide notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">Email Notifications</div>
                    <div className="text-sm text-slate-500">Send email alerts for important events</div>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">Slack Integration</div>
                    <div className="text-sm text-slate-500">Post notifications to Slack channels</div>
                  </div>
                  <Button size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">SMS Alerts</div>
                    <div className="text-sm text-slate-500">Critical system alerts via SMS</div>
                  </div>
                  <Button variant="outline" size="sm">Disabled</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Integration Management
                </CardTitle>
                <CardDescription>Manage third-party integrations and API connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">S</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Slack</div>
                      <div className="text-sm text-slate-500">Team communication</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">G</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Google Workspace</div>
                      <div className="text-sm text-slate-500">Email and calendar sync</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">A</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">AWS Services</div>
                      <div className="text-sm text-slate-500">Cloud infrastructure</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Connected</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
                <CardDescription>Core system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Session Timeout</label>
                  <select className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>8 hours</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Default Language</label>
                  <select className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Data Retention</label>
                  <select className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>5 years</option>
                    <option>Indefinite</option>
                  </select>
                </div>
                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}