import { Request, Response, NextFunction } from 'express';
import { SignupRequest, SigninRequest } from '../types/auth.types';
import { AppError } from './errorHandler';

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body as SignupRequest;
  
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }
  
  if (name.length < 2) {
    throw new AppError('Name must be at least 2 characters long', 400);
  }
  
  if (!validateEmail(email)) {
    throw new AppError('Invalid email format', 400);
  }
  
  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters long', 400);
  }
  
  next();
};

export const validateSignin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as SigninRequest;
  
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }
  
  if (!validateEmail(email)) {
    throw new AppError('Invalid email format', 400);
  }
  
  next();
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
