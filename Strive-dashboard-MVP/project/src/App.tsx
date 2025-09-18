import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { ProjectTracker } from './pages/ProjectTracker';
import { CRM } from './pages/CRM';
import { CMS } from './pages/CMS';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-orange-500 text-3xl font-bold mb-4">STRIVE</div>
          <div className="text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/admin">
            {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </Route>
          <Route path="/dashboard">
            <UserDashboard />
          </Route>
          <Route path="/projects">
            <ProjectTracker />
          </Route>
          <Route path="/crm">
            <CRM />
          </Route>
          <Route path="/cms">
            <CMS />
          </Route>
          <Route>
            {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;