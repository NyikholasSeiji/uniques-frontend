export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  skinConditions?: string[];
  ingredients?: string[];
  price: number;
}

export interface QuestionnaireRequest {
  skinType?: string;
  concerns: string[];
}
