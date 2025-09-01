import { Request, Response, NextFunction } from 'express';
import { supabase } from './supabase';
import jwt from 'jsonwebtoken';

// JWT secret - in production this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

// Middleware to verify JWT token
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Verify with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }

    // Add user info to request
    req.user = {
      id: user.id,
      email: user.email || '',
      username: decoded.username || ''
    };

    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

// Generate JWT token for authenticated user
export const generateToken = (user: { id: string; email: string; username: string }) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify user session
export const verifySession = async (token: string) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};