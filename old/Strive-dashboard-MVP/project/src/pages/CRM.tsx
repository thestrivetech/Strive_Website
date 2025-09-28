import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  MessageSquare,
  MoreHorizontal,
  Star,
  X,
  MapPin,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  FileText,
  Edit,
  Send,
  ArrowRight,
  Briefcase,
  Target,
  Activity
} from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'Acme Corporation',
    contact: 'John Smith',
    contactTitle: 'VP of Technology',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    website: 'www.acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    status: 'Active',
    value: 125000,
    industry: 'Technology',
    lastContact: '2025-01-10',
    projects: 3,
    satisfaction: 4.8,
    notes: 'Key client interested in expanding AI implementation. Very responsive and technically savvy. Looking to scale their current AI solutions.',
    company: {
      size: '500-1000',
      founded: '2010',
      revenue: '$50M-100M'
    },
    communicationHistory: [
      {
        id: 1,
        type: 'call',
        subject: 'AI Implementation Strategy Discussion',
        date: '2025-01-10',
        time: '2:30 PM',
        duration: '45 minutes',
        notes: 'Discussed scaling AI models and integration timelines. Very positive about next phase.'
      },
      {
        id: 2,
        type: 'email',
        subject: 'Project Timeline Confirmation',
        date: '2025-01-08',
        time: '9:15 AM',
        notes: 'Confirmed project milestones and delivery dates. Requested additional features.'
      },
      {
        id: 3,
        type: 'meeting',
        subject: 'Quarterly Business Review',
        date: '2025-01-05',
        time: '10:00 AM',
        duration: '90 minutes',
        notes: 'Reviewed Q4 performance and discussed 2025 expansion plans.'
      }
    ],
    dealHistory: [
      { id: 1, title: 'AI Analytics Platform', value: 125000, status: 'Closed Won', date: '2024-12-15' },
      { id: 2, title: 'Data Migration Services', value: 45000, status: 'Closed Won', date: '2024-10-20' }
    ]
  },
  {
    id: 2,
    name: 'Global Industries Inc.',
    contact: 'Sarah Johnson',
    contactTitle: 'Chief Operations Officer',
    email: 'sarah.j@global.com',
    phone: '+1 (555) 987-6543',
    address: '456 Industrial Blvd, Detroit, MI 48201',
    website: 'www.globalindustries.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    status: 'Prospect',
    value: 85000,
    industry: 'Manufacturing',
    lastContact: '2025-01-08',
    projects: 1,
    satisfaction: 4.2,
    notes: 'Interested in process automation solutions. Currently evaluating multiple vendors. Decision expected by end of Q1.',
    company: {
      size: '1000-5000',
      founded: '1985',
      revenue: '$100M-500M'
    },
    communicationHistory: [
      {
        id: 1,
        type: 'meeting',
        subject: 'Process Automation Discovery',
        date: '2025-01-08',
        time: '10:00 AM',
        duration: '60 minutes',
        notes: 'Detailed requirements gathering for manufacturing process automation.'
      },
      {
        id: 2,
        type: 'email',
        subject: 'Proposal Follow-up',
        date: '2025-01-03',
        time: '3:45 PM',
        notes: 'Sent detailed proposal for automation system. Awaiting feedback.'
      }
    ],
    dealHistory: []
  },
  {
    id: 3,
    name: 'FinTech Solutions',
    contact: 'Michael Chen',
    contactTitle: 'CTO',
    email: 'michael.chen@fintech.com',
    phone: '+1 (555) 456-7890',
    address: '789 Finance Ave, New York, NY 10001',
    website: 'www.fintech-solutions.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    status: 'Active',
    value: 200000,
    industry: 'Finance',
    lastContact: '2025-01-12',
    projects: 5,
    satisfaction: 4.9,
    notes: 'Long-term partner, excellent relationship. Always open to new opportunities and provides great referrals.',
    company: {
      size: '200-500',
      founded: '2015',
      revenue: '$20M-50M'
    },
    communicationHistory: [
      {
        id: 1,
        type: 'call',
        subject: 'Security Enhancement Planning',
        date: '2025-01-12',
        time: '4:00 PM',
        duration: '30 minutes',
        notes: 'Discussed upcoming security upgrades and compliance requirements.'
      },
      {
        id: 2,
        type: 'meeting',
        subject: 'Monthly Check-in',
        date: '2025-01-10',
        time: '11:00 AM',
        duration: '45 minutes',
        notes: 'Regular relationship maintenance meeting. Very satisfied with services.'
      }
    ],
    dealHistory: [
      { id: 1, title: 'Security Enhancement', value: 200000, status: 'In Progress', date: '2025-01-01' },
      { id: 2, title: 'Compliance Audit', value: 75000, status: 'Closed Won', date: '2024-11-15' },
      { id: 3, title: 'Risk Assessment', value: 50000, status: 'Closed Won', date: '2024-09-10' }
    ]
  },
  {
    id: 4,
    name: 'HealthCare Plus',
    contact: 'Dr. Emily Davis',
    contactTitle: 'Chief Medical Officer',
    email: 'emily.davis@healthcare.com',
    phone: '+1 (555) 321-0987',
    address: '321 Medical Center Dr, Boston, MA 02108',
    website: 'www.healthcareplus.com',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=32&h=32&fit=crop&crop=face',
    status: 'Lead',
    value: 150000,
    industry: 'Healthcare',
    lastContact: '2025-01-05',
    projects: 0,
    satisfaction: 0,
    notes: 'Initial consultation completed, awaiting proposal decision. Very interested but needs board approval for budget.',
    company: {
      size: '1000-5000',
      founded: '1995',
      revenue: '$500M-1B'
    },
    communicationHistory: [
      {
        id: 1,
        type: 'meeting',
        subject: 'Initial Consultation',
        date: '2025-01-05',
        time: '2:00 PM',
        duration: '90 minutes',
        notes: 'Comprehensive needs assessment. Strong interest in patient data analytics.'
      },
      {
        id: 2,
        type: 'email',
        subject: 'Information Request',
        date: '2025-01-02',
        time: '10:30 AM',
        notes: 'Requested company information and case studies for healthcare sector.'
      }
    ],
    dealHistory: []
  },
];

const deals = [
  {
    id: 1,
    client: 'Acme Corporation',
    title: 'AI Analytics Platform',
    value: 125000,
    stage: 'Proposal',
    probability: 75,
    closeDate: '2025-01-25',
    lastActivity: 'Proposal sent',
    owner: 'Sarah Chen',
    nextStep: 'Schedule technical review meeting'
  },
  {
    id: 2,
    client: 'Global Industries Inc.',
    title: 'Process Automation System',
    value: 85000,
    stage: 'Discovery',
    probability: 45,
    closeDate: '2025-02-15',
    lastActivity: 'Requirements gathering call',
    owner: 'Michael Park',
    nextStep: 'Send detailed proposal'
  },
  {
    id: 3,
    client: 'FinTech Solutions',
    title: 'Security Enhancement',
    value: 200000,
    stage: 'Negotiation',
    probability: 90,
    closeDate: '2025-01-20',
    lastActivity: 'Contract review',
    owner: 'Sarah Chen',
    nextStep: 'Finalize contract terms'
  },
  {
    id: 4,
    client: 'HealthCare Plus',
    title: 'Patient Data Analytics',
    value: 150000,
    stage: 'Lead',
    probability: 30,
    closeDate: '2025-03-01',
    lastActivity: 'Initial consultation',
    owner: 'David Wilson',
    nextStep: 'Await board approval decision'
  },
  {
    id: 5,
    client: 'Acme Corporation',
    title: 'ML Training Platform',
    value: 95000,
    stage: 'Qualified',
    probability: 60,
    closeDate: '2025-02-28',
    lastActivity: 'Demo completed',
    owner: 'Sarah Chen',
    nextStep: 'Send customized proposal'
  },
  {
    id: 6,
    client: 'Global Industries Inc.',
    title: 'IoT Integration',
    value: 120000,
    stage: 'Closed Won',
    probability: 100,
    closeDate: '2025-01-15',
    lastActivity: 'Contract signed',
    owner: 'Michael Park',
    nextStep: 'Project kickoff'
  }
];

const pipelineStages = [
  { name: 'Lead', color: 'bg-slate-100 text-slate-800' },
  { name: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { name: 'Discovery', color: 'bg-purple-100 text-purple-800' },
  { name: 'Proposal', color: 'bg-orange-100 text-orange-800' },
  { name: 'Negotiation', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Closed Won', color: 'bg-green-100 text-green-800' },
  { name: 'Closed Lost', color: 'bg-red-100 text-red-800' }
];

const followUpReminders = [
  {
    id: 1,
    client: 'Acme Corporation',
    type: 'Follow-up Call',
    dueDate: '2025-01-15',
    priority: 'High',
    reason: 'Proposal sent 5 days ago - follow up needed',
    deal: 'AI Analytics Platform'
  },
  {
    id: 2,
    client: 'HealthCare Plus',
    type: 'Check Decision Status',
    dueDate: '2025-01-16',
    priority: 'Medium',
    reason: 'Board meeting scheduled - check approval status',
    deal: 'Patient Data Analytics'
  },
  {
    id: 3,
    client: 'Global Industries Inc.',
    type: 'Send Proposal',
    dueDate: '2025-01-14',
    priority: 'High',
    reason: 'Requirements gathering completed - proposal due',
    deal: 'Process Automation System'
  },
  {
    id: 4,
    client: 'FinTech Solutions',
    type: 'Contract Follow-up',
    dueDate: '2025-01-18',
    priority: 'High',
    reason: 'Contract under review for 3 days',
    deal: 'Security Enhancement'
  }
];

const activities = [
  {
    id: 1,
    type: 'call',
    client: 'Acme Corporation',
    description: 'Follow-up call regarding AI platform requirements',
    date: '2025-01-10',
    time: '2:30 PM'
  },
  {
    id: 2,
    type: 'email',
    client: 'FinTech Solutions',
    description: 'Sent project timeline and milestone updates',
    date: '2025-01-10',
    time: '1:15 PM'
  },
  {
    id: 3,
    type: 'meeting',
    client: 'Global Industries Inc.',
    description: 'Discovery session for automation requirements',
    date: '2025-01-08',
    time: '10:00 AM'
  },
];

export function CRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<null | typeof clients[0]>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [showClientProfile, setShowClientProfile] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openClientProfile = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setShowClientProfile(true);
  };

  const dealsByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage.name] = deals.filter(deal => deal.stage === stage.name);
    return acc;
  }, {} as Record<string, typeof deals>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customer Relationship Management</h2>
          <p className="text-slate-600">Manage clients, leads, and business relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex rounded-lg border border-slate-300 p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Client List
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              Pipeline Board
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{clients.length}</div>
            <div className="text-xs text-green-600 mt-1">+12% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 mt-1">+18% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {clients.reduce((sum, client) => sum + client.projects, 0)}
            </div>
            <div className="text-xs text-blue-600 mt-1">3 closing this week</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {(clients.filter(c => c.satisfaction > 0).reduce((sum, c) => sum + c.satisfaction, 0) / clients.filter(c => c.satisfaction > 0).length).toFixed(1)}
            </div>
            <div className="text-xs text-green-600 mt-1">+0.3 from last month</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search clients, contacts, or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clients List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Portfolio</CardTitle>
                <CardDescription>Manage your client relationships and communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClients.map((client) => (
                    <div key={client.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => openClientProfile(client)}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={client.avatar} />
                            <AvatarFallback>{client.contact.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-900">{client.name}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                client.status === 'Active' 
                                  ? 'bg-green-100 text-green-800'
                                  : client.status === 'Prospect'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {client.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">{client.contact} • {client.industry}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {client.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {client.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className="font-semibold text-slate-900">${client.value.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">{client.projects} projects</div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {client.satisfaction > 0 && (
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(client.satisfaction) ? 'fill-orange-400 text-orange-400' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-600">{client.satisfaction}/5.0</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Follow-up Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Follow-up Reminders
                </CardTitle>
                <CardDescription>Automated reminders based on deal stages and contact history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {followUpReminders.map((reminder) => (
                    <div key={reminder.id} className={`p-3 rounded-lg border ${
                      reminder.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span className="font-medium text-slate-900">{reminder.type}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reminder.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reminder.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{reminder.client}</p>
                      <p className="text-xs text-slate-500 mb-2">{reminder.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Due: {new Date(reminder.dueDate).toLocaleDateString()}</span>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Action
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
                <CardDescription>Active deals and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.slice(0, 3).map((deal) => (
                    <div key={deal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{deal.title}</h4>
                          <p className="text-xs text-slate-500">{deal.client}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-900">${deal.value.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">{deal.stage}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Probability</span>
                          <span className="font-medium">{deal.probability}%</span>
                        </div>
                        <Progress value={deal.probability} />
                      </div>
                      <div className="text-xs text-slate-500">
                        Close: {new Date(deal.closeDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest client interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'call' ? 'bg-blue-100' :
                        activity.type === 'email' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'email' && <Mail className="h-4 w-4 text-green-600" />}
                        {activity.type === 'meeting' && <Calendar className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.description}</p>
                        <p className="text-xs text-slate-500">{activity.client}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.date} at {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Kanban Pipeline Board */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Sales Pipeline Board
            </CardTitle>
            <CardDescription>Drag and drop deals between pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {pipelineStages.map((stage) => (
                <div key={stage.name} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                      {dealsByStage[stage.name]?.length || 0}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {dealsByStage[stage.name]?.map((deal) => (
                      <div key={deal.id} className="bg-white p-3 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow cursor-move">
                        <h4 className="font-medium text-slate-900 text-sm mb-1">{deal.title}</h4>
                        <p className="text-xs text-slate-500 mb-2">{deal.client}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-green-600">${deal.value.toLocaleString()}</span>
                          <span className="text-xs text-slate-500">{deal.probability}%</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Close: {new Date(deal.closeDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Owner: {deal.owner}
                        </div>
                      </div>
                    ))}
                    {(!dealsByStage[stage.name] || dealsByStage[stage.name].length === 0) && (
                      <div className="text-center py-8 text-slate-400">
                        <Briefcase className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">No deals in this stage</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Profile Sidebar */}
      {showClientProfile && selectedClient && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50" 
            onClick={() => setShowClientProfile(false)}
          />
          <div className="w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Client Profile</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowClientProfile(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Client Overview */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedClient.avatar} />
                  <AvatarFallback>{selectedClient.contact.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{selectedClient.name}</h3>
                  <p className="text-slate-600">{selectedClient.contact} • {selectedClient.contactTitle}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {selectedClient.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {selectedClient.phone}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedClient.status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : selectedClient.status === 'Prospect'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedClient.status}
                </span>
              </div>

              {/* Company Details */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Industry: {selectedClient.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Size: {selectedClient.company.size} employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Founded: {selectedClient.company.founded}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{selectedClient.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{selectedClient.website}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Revenue: {selectedClient.company.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project History */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Project History</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{selectedClient.projects}</div>
                      <div className="text-sm text-slate-600">Active Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">${selectedClient.value.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Total Value</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{selectedClient.satisfaction.toFixed(1)}</div>
                      <div className="text-sm text-slate-600">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deal History */}
              {selectedClient.dealHistory.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Deal History</h4>
                  <div className="space-y-3">
                    {selectedClient.dealHistory.map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-slate-900">{deal.title}</h5>
                          <p className="text-sm text-slate-500">Closed: {new Date(deal.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">${deal.value.toLocaleString()}</div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            deal.status === 'Closed Won' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {deal.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communication History Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Communication Timeline</h4>
                <div className="space-y-4">
                  {selectedClient.communicationHistory.map((comm) => (
                    <div key={comm.id} className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        comm.type === 'call' ? 'bg-blue-100' :
                        comm.type === 'email' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {comm.type === 'call' && <Phone className="h-5 w-5 text-blue-600" />}
                        {comm.type === 'email' && <Mail className="h-5 w-5 text-green-600" />}
                        {comm.type === 'meeting' && <Calendar className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-slate-900">{comm.subject}</h5>
                          <div className="text-sm text-slate-500">
                            {new Date(comm.date).toLocaleDateString()} • {comm.time}
                          </div>
                        </div>
                        {comm.duration && (
                          <p className="text-sm text-slate-600 mb-2">Duration: {comm.duration}</p>
                        )}
                        <p className="text-sm text-slate-700">{comm.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Client Notes</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700 mb-3">{selectedClient.notes}</p>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Notes
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-slate-200">
                <Button className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Deal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}