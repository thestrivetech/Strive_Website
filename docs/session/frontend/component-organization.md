# Component Organization & Code Splitting - Session 2 Frontend Documentation

## File Size Management

### Maximum File Size Guidelines
```typescript
// ❌ Avoid: Large monolithic components (300+ lines)
function LargeComponent() {
  // 300+ lines of mixed concerns
  // State management, UI logic, business logic all combined
}

// ✅ Good: Split into focused components (< 300 lines each)
function Header() { /* Header-specific logic */ }
function ContentArea() { /* Content-specific logic */ }
function Sidebar() { /* Sidebar-specific logic */ }
function Footer() { /* Footer-specific logic */ }

function MainPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <ContentArea />
      </div>
      <Footer />
    </div>
  );
}
```

### Component Extraction Strategy
```typescript
// Before: Single large component
function BlogPost() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  
  // 50+ lines of data fetching logic
  // 30+ lines of comment handling
  // 40+ lines of UI rendering
  // 200+ lines total
}

// After: Split into focused components
function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto">
      <BlogPostHeader />
      <BlogPostContent />
      <BlogPostComments />
      <BlogPostActions />
    </article>
  );
}

function BlogPostHeader() {
  // 50 lines - post metadata, title, author info
}

function BlogPostContent() {
  // 60 lines - post body, formatting, media
}

function BlogPostComments() {
  // 80 lines - comments list, comment form
}

function BlogPostActions() {
  // 40 lines - like, share, bookmark actions
}
```

## Lazy Loading Patterns

### React.lazy for Route-Level Splitting
```typescript
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load page components
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// App router with lazy loading
function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Component-Level Lazy Loading
```typescript
// Lazy load heavy components that might not be immediately visible
const DataVisualization = lazy(() => import('./DataVisualization'));
const ImageGallery = lazy(() => import('./ImageGallery'));
const VideoPlayer = lazy(() => import('./VideoPlayer'));

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard">
      <nav className="tabs">
        <button 
          onClick={() => setActiveTab('overview')}
          className={activeTab === 'overview' ? 'active' : ''}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('charts')}
          className={activeTab === 'charts' ? 'active' : ''}
        >
          Charts
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={activeTab === 'gallery' ? 'active' : ''}
        >
          Gallery
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'overview' && <OverviewComponent />}
        
        {activeTab === 'charts' && (
          <Suspense fallback={<div>Loading charts...</div>}>
            <DataVisualization />
          </Suspense>
        )}
        
        {activeTab === 'gallery' && (
          <Suspense fallback={<div>Loading gallery...</div>}>
            <ImageGallery />
          </Suspense>
        )}
      </div>
    </div>
  );
}
```

### Conditional Lazy Loading
```typescript
import { lazy, useState, useEffect } from 'react';

// Lazy load based on user interaction or viewport
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function ConditionalLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Load when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById('heavy-component-trigger');
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div>Regular content above...</div>
      
      <div id="heavy-component-trigger" className="min-h-[200px]">
        {shouldLoad ? (
          <Suspense fallback={<div>Loading heavy component...</div>}>
            <HeavyComponent />
          </Suspense>
        ) : (
          <div>Scroll down to load heavy component</div>
        )}
      </div>
    </div>
  );
}
```

## Custom Hook Extraction

### Business Logic Extraction
```typescript
// Extract complex business logic into custom hooks

// ❌ Before: Logic mixed with UI
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // 20+ lines of API logic
  };

  const updateUser = async (userData) => {
    // 15+ lines of update logic
  };

  const deleteUser = async () => {
    // 10+ lines of delete logic
  };

  // 50+ lines of UI rendering
}

// ✅ After: Logic extracted to custom hook
function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getUser(userId);
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUser = useCallback(async (userData) => {
    try {
      const response = await api.updateUser(userId, userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  const deleteUser = useCallback(async () => {
    try {
      await api.deleteUser(userId);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    updateUser,
    deleteUser,
    refetch: fetchUser
  };
}

// Clean UI component
function UserProfile({ userId }) {
  const { user, loading, error, updateUser, deleteUser } = useUserProfile(userId);
  const [editing, setEditing] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;

  return (
    <div className="user-profile">
      <UserAvatar user={user} />
      <UserInfo user={user} editing={editing} onSave={updateUser} />
      <UserActions 
        onEdit={() => setEditing(true)}
        onDelete={deleteUser}
      />
    </div>
  );
}
```

### Form Logic Extraction
```typescript
// Reusable form hook
function useForm(initialValues, validationSchema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(field => {
      const rules = validationSchema[field];
      const value = values[field];

      if (rules.required && (!value || value.toString().trim() === '')) {
        newErrors[field] = `${field} is required`;
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || `${field} is invalid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    const isValid = validate();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}

// Usage in component
function ContactForm() {
  const form = useForm(
    { name: '', email: '', message: '' },
    {
      name: { required: true, minLength: 2 },
      email: { 
        required: true, 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email'
      },
      message: { required: true, minLength: 10 }
    }
  );

  const handleSubmit = async (formData) => {
    await api.submitContact(formData);
    form.reset();
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit(handleSubmit);
    }}>
      <FormField 
        label="Name"
        name="name"
        value={form.values.name}
        error={form.touched.name ? form.errors.name : ''}
        onChange={(value) => form.setValue('name', value)}
        onBlur={() => form.setFieldTouched('name')}
      />
      
      <FormField 
        label="Email"
        name="email"
        type="email"
        value={form.values.email}
        error={form.touched.email ? form.errors.email : ''}
        onChange={(value) => form.setValue('email', value)}
        onBlur={() => form.setFieldTouched('email')}
      />
      
      <TextAreaField 
        label="Message"
        name="message"
        value={form.values.message}
        error={form.touched.message ? form.errors.message : ''}
        onChange={(value) => form.setValue('message', value)}
        onBlur={() => form.setFieldTouched('message')}
      />
      
      <Button 
        type="submit" 
        disabled={!form.isValid || form.isSubmitting}
      >
        {form.isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

## Component Composition Patterns

### Compound Components
```typescript
// Flexible component composition for complex UI patterns
function Card({ children, className }) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

function CardTitle({ children, className }) {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

function CardContent({ children, className }) {
  return (
    <div className={cn("px-6 py-4", className)}>
      {children}
    </div>
  );
}

function CardFooter({ children, className }) {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-200 bg-gray-50", className)}>
      {children}
    </div>
  );
}

// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Usage - Flexible composition
function UserCard({ user }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
        <p className="text-sm text-gray-600">{user.role}</p>
      </Card.Header>
      
      <Card.Content>
        <p>{user.bio}</p>
        <div className="mt-4 flex gap-2">
          <Badge>{user.department}</Badge>
          <Badge variant="outline">{user.location}</Badge>
        </div>
      </Card.Content>
      
      <Card.Footer>
        <div className="flex justify-between">
          <Button variant="outline">Message</Button>
          <Button>View Profile</Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
```

### Render Props Pattern
```typescript
// Flexible data fetching with render props
function DataFetcher({ url, render, fallback }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return fallback || <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return render(data);
}

// Usage with different renderers
function UserList() {
  return (
    <DataFetcher
      url="/api/users"
      render={(users) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    />
  );
}

function UserTable() {
  return (
    <DataFetcher
      url="/api/users"
      render={(users) => (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    />
  );
}
```

## Directory Structure

### Feature-Based Organization
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── common/            # Shared components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── SEOHead.tsx
├── features/              # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── ProfileSettings.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useProfile.ts
│   │   ├── services/
│   │   │   └── authApi.ts
│   │   └── types/
│   │       └── auth.types.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── blog/
│       ├── components/
│       ├── hooks/
│       └── services/
├── hooks/                 # Global custom hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── useIntersectionObserver.ts
├── lib/                   # Utilities and configuration
│   ├── utils.ts
│   ├── api.ts
│   └── constants.ts
├── pages/                 # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   └── DashboardPage.tsx
└── types/                 # Global type definitions
    └── global.types.ts
```

### Component File Structure
```typescript
// Component file structure example
// UserProfile/index.tsx
export { UserProfile } from './UserProfile';

// UserProfile/UserProfile.tsx
import { useState } from 'react';
import { UserAvatar } from './UserAvatar';
import { UserInfo } from './UserInfo';
import { UserActions } from './UserActions';
import { useUserProfile } from './hooks/useUserProfile';
import type { UserProfileProps } from './UserProfile.types';

export function UserProfile({ userId }: UserProfileProps) {
  // Component implementation
}

// UserProfile/UserAvatar.tsx
export function UserAvatar({ user }: { user: User }) {
  // Avatar implementation
}

// UserProfile/UserInfo.tsx
export function UserInfo({ user, editing, onSave }: UserInfoProps) {
  // User info implementation
}

// UserProfile/UserActions.tsx
export function UserActions({ onEdit, onDelete }: UserActionsProps) {
  // Actions implementation
}

// UserProfile/hooks/useUserProfile.ts
export function useUserProfile(userId: string) {
  // Custom hook implementation
}

// UserProfile/UserProfile.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserProfileProps {
  userId: string;
}

export interface UserInfoProps {
  user: User;
  editing: boolean;
  onSave: (userData: Partial<User>) => Promise<void>;
}

export interface UserActionsProps {
  onEdit: () => void;
  onDelete: () => Promise<void>;
}
```

## Performance Optimization

### Component Memoization
```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const UserList = memo(function UserList({ users, onUserClick }) {
  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);

  const handleUserClick = useCallback((userId) => {
    onUserClick(userId);
  }, [onUserClick]);

  return (
    <div className="space-y-2">
      {sortedUsers.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={handleUserClick}
        />
      ))}
    </div>
  );
});

// Memoize individual items
const UserCard = memo(function UserCard({ user, onClick }) {
  return (
    <div 
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      onClick={() => onClick(user.id)}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

### Virtualization for Large Lists
```typescript
import { FixedSizeList as List } from 'react-window';

function VirtualizedUserList({ users }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <UserCard user={users[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={users.length}
      itemSize={100}
      className="border rounded-lg"
    >
      {Row}
    </List>
  );
}
```

## Error Boundaries

### Feature-Level Error Boundaries
```typescript
class FeatureErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Feature error:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Something went wrong in this section
          </h2>
          <p className="text-gray-600 mt-2">
            Please refresh the page or try again later.
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <div>
      <Header />
      
      <FeatureErrorBoundary>
        <Dashboard />
      </FeatureErrorBoundary>
      
      <FeatureErrorBoundary>
        <UserSection />
      </FeatureErrorBoundary>
      
      <Footer />
    </div>
  );
}
```

## Best Practices Summary

1. **File Size Limit**: Keep components under 300 lines
2. **Single Responsibility**: Each component should have one clear purpose
3. **Custom Hooks**: Extract complex logic into reusable hooks
4. **Lazy Loading**: Use React.lazy for route and component-level splitting
5. **Composition**: Prefer composition over prop drilling
6. **Memoization**: Use memo, useMemo, and useCallback judiciously
7. **Error Boundaries**: Implement error boundaries at feature level
8. **Directory Structure**: Organize by features rather than file types
9. **Performance**: Implement virtualization for large lists
10. **Type Safety**: Use TypeScript interfaces for all component props