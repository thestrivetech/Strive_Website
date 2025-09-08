import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Custom API request function that supports authorization headers
async function apiRequestWithAuth(
  method: string,
  url: string,
  data?: unknown,
  token?: string
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text() || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res.json();
}

interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Token management
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// User management
export const getStoredUser = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};
export const setStoredUser = (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem(USER_KEY);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken);
  const [user, setUser] = useState<User | null>(getStoredUser);
  const queryClient = useQueryClient();

  // Verify token and get user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = getToken();
      if (!token) return null;
      
      try {
        const response = await apiRequestWithAuth('GET', '/api/auth/me', undefined, token);
        return response.user;
      } catch (error) {
        // Token is invalid, clear it
        removeToken();
        removeStoredUser();
        setTokenState(null);
        setUser(null);
        return null;
      }
    },
    enabled: !!token,
    retry: false,
  });

  // Update user state when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setStoredUser(userData);
    } else if (token) {
      // Token exists but user data failed to load
      setUser(null);
      removeStoredUser();
    }
  }, [userData, token]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await apiRequestWithAuth('POST', '/api/auth/login', { username, password });
      return response;
    },
    onSuccess: (data) => {
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
      setStoredUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async ({ username, email, password, firstName, lastName }: { username: string; email: string; password: string; firstName: string; lastName: string }) => {
      const response = await apiRequestWithAuth('POST', '/api/auth/signup', { username, email, password, firstName, lastName });
      return response;
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (token) {
        try {
          await apiRequestWithAuth('POST', '/api/auth/logout', undefined, token);
        } catch (error) {
          // Even if logout fails on server, clear local storage
          console.error('Logout error:', error);
        }
      }
    },
    onSettled: () => {
      // Always clear local storage
      removeToken();
      removeStoredUser();
      setTokenState(null);
      setUser(null);
      queryClient.clear();
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const signup = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    await signupMutation.mutateAsync({ username, email, password, firstName, lastName });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated,
      isLoading: isLoading || loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || <div className="flex items-center justify-center min-h-screen">Please log in to access this page.</div>;
  }

  return <>{children}</>;
};