import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { User } from '../models/user.model';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Set user in request
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid token', 401);
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token expired', 401);
    }
    next(error);
  }
}; 