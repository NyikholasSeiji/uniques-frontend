import api from "./api";
import type { Product, ProductInput, QuestionnaireRequest } from "../types/product";

export const getProducts = async (skinCondition?: string): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products", {
    params: skinCondition ? { skinCondition } : undefined,
  });
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/products/categories");
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const getRecommendations = async (data: QuestionnaireRequest): Promise<Product[]> => {
  const response = await api.post<Product[]>("/products/recommendations", data);
  return response.data;
};

export const createProduct = async (data: ProductInput): Promise<Product> => {
  const response = await api.post<Product>("/products", data);
  return response.data;
};

export const updateProduct = async (id: string, data: ProductInput): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
