import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { SignupRequest, SigninRequest, Response as ApiResponse, AuthResponse } from '../types/auth.types';
import { AppError } from '../middlewares/errorHandler';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body as SignupRequest;
    const user = await authService.register(name, email, password);
    
    const response: ApiResponse = {
      message: 'User registered successfully',
      code: 201,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
    
    res.status(201).json(response);
  } catch (error: any) {
    const failResponse: ApiResponse = {
      message: error.message,
      code: 500,
      data: {}
    };
    res.status(201).json(failResponse);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as SigninRequest;
    const { token, user } = await authService.login(email, password);
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    const response: ApiResponse<AuthResponse> = {
      message: 'Login successful',
      code: 200,
      data: {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    };
    
    res.status(200).json(response);
  } catch (error: any) {
    const failResponse: ApiResponse = {
      message: error.message,
      code: 500,
      data: {}
    };
    res.status(201).json(failResponse);
  }
};
