import { Request, Response, NextFunction } from 'express';
import { Response as ApiResponse } from '../types/auth.types';

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  
  const response: ApiResponse = {
    message,
    code: statusCode,
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack
  };
  
  res.status(statusCode).json(response);
}; 