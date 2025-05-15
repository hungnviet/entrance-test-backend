export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Response<T = any> {
  message: string;
  code: number;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: Account;
} 