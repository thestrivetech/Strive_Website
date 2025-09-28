import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCheck,
  FileText,
  Menu,
  X,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';

const navigation = [
  { name: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard, adminOnly: true },
  { name: 'User Dashboard', href: '/dashboard', icon: Users, adminOnly: false },
  { name: 'Project Tracker', href: '/projects', icon: FolderKanban, adminOnly: false },
  { name: 'CRM', href: '/crm', icon: UserCheck, adminOnly: false },
  { name: 'CMS', href: '/cms', icon: FileText, adminOnly: false },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-[#1a1b3a] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center">
                <div className="text-orange-500 text-2xl font-bold">STRIVE</div>
              </div>
            </div>
            <nav className="mt-8 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location === item.href
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-[#1a1b3a]">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="text-orange-500 text-2xl font-bold">STRIVE</div>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location === item.href
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-slate-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-slate-900">
                {navigation.find(item => item.href === location)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-slate-900">{user?.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{user?.role}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}