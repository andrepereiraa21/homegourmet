// Types for the Recipe AI App

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
  detectedAt: Date;
  confidence?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  calories: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  matchPercentage?: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface UserPreferences {
  allergies: string[];
  diet: string[];
  maxPrepTime?: number;
  difficulty?: string[];
  favoriteRecipes: string[];
}

export interface ScanResult {
  ingredients: Ingredient[];
  confidence: number;
  timestamp: Date;
}
