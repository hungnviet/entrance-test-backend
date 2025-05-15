import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middlewares/errorHandler';
import { Document } from 'mongoose';

export const register = async (name: string, email: string, password: string) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create and save user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  
  return user;
};

export const login = async (email: string, password: string) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }
  
  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }
  
  // Generate token
  const token = generateToken(user._id.toString());
  
  return { token, user };
};
