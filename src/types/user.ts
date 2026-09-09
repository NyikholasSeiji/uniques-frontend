import type { Product } from "./product";

export interface QuestionnaireData {
  skinType?: string;
  concerns: string[];
  categories?: string[];
  maxPrice?: number;
  avoidIngredients?: string[];
  submittedAt?: string;
}

export interface QuestionnaireResponse {
  questionnaire: QuestionnaireData | null;
  recommendations: Product[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  skinConditions: string[];
  questionnaire?: QuestionnaireData;
}

export interface AuthResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  skinConditions?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name: string;
  skinConditions: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
