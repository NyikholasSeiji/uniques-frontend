export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  skinConditions?: string[];
  ingredients?: string[];
  price: number;
}

export type ProductInput = Omit<Product, "id">;

export interface QuestionnaireRequest {
  skinType?: string;
  concerns: string[];
  categories?: string[];
  maxPrice?: number;
  avoidIngredients?: string[];
}
