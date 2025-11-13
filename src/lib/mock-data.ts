// Mock data for demonstration
import { Ingredient, Recipe } from './types';

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomate',
    quantity: 3,
    unit: 'unidades',
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fat: 0.2,
    imageUrl: 'https://images.unsplash.com/photo-1546470427-227e9e6a4b8b?w=400&h=400&fit=crop',
    detectedAt: new Date(),
    confidence: 0.95
  },
  {
    id: '2',
    name: 'Cebola',
    quantity: 2,
    unit: 'unidades',
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fat: 0.1,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    detectedAt: new Date(),
    confidence: 0.92
  },
  {
    id: '3',
    name: 'Alho',
    quantity: 5,
    unit: 'dentes',
    calories: 4,
    protein: 0.2,
    carbs: 1,
    fat: 0,
    imageUrl: 'https://images.unsplash.com/photo-1588347818036-8fc8d1d6b7b7?w=400&h=400&fit=crop',
    detectedAt: new Date(),
    confidence: 0.88
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Molho de Tomate Caseiro',
    description: 'Um molho de tomate fresco e aromático, perfeito para massas',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video1.mp4',
    prepTime: 30,
    difficulty: 'easy',
    servings: 4,
    calories: 120,
    matchPercentage: 100,
    ingredients: [
      { name: 'Tomate', quantity: 6, unit: 'unidades' },
      { name: 'Cebola', quantity: 1, unit: 'unidade' },
      { name: 'Alho', quantity: 3, unit: 'dentes' },
      { name: 'Azeite', quantity: 2, unit: 'colheres' },
      { name: 'Manjericão', quantity: 1, unit: 'maço', optional: true }
    ],
    instructions: [
      'Lave e corte os tomates em cubos',
      'Pique a cebola e o alho finamente',
      'Aqueça o azeite em uma panela',
      'Refogue a cebola e o alho até dourar',
      'Adicione os tomates e cozinhe por 20 minutos',
      'Tempere com sal, pimenta e manjericão'
    ],
    tags: ['vegetariano', 'italiano', 'molho']
  },
  {
    id: '2',
    title: 'Sopa de Cebola Francesa',
    description: 'Sopa clássica francesa com cebolas caramelizadas',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    prepTime: 45,
    difficulty: 'medium',
    servings: 4,
    calories: 280,
    matchPercentage: 85,
    ingredients: [
      { name: 'Cebola', quantity: 4, unit: 'unidades' },
      { name: 'Alho', quantity: 2, unit: 'dentes' },
      { name: 'Caldo de carne', quantity: 1, unit: 'litro' },
      { name: 'Queijo gruyère', quantity: 200, unit: 'gramas' },
      { name: 'Pão', quantity: 4, unit: 'fatias' }
    ],
    instructions: [
      'Corte as cebolas em fatias finas',
      'Caramelize as cebolas em fogo baixo por 30 minutos',
      'Adicione o alho e refogue por 2 minutos',
      'Adicione o caldo e cozinhe por 15 minutos',
      'Sirva com pão torrado e queijo gratinado'
    ],
    tags: ['francesa', 'sopa', 'comfort food']
  },
  {
    id: '3',
    title: 'Bruschetta de Tomate',
    description: 'Entrada italiana clássica com tomates frescos',
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&h=600&fit=crop',
    prepTime: 15,
    difficulty: 'easy',
    servings: 6,
    calories: 150,
    matchPercentage: 90,
    ingredients: [
      { name: 'Tomate', quantity: 4, unit: 'unidades' },
      { name: 'Alho', quantity: 2, unit: 'dentes' },
      { name: 'Pão italiano', quantity: 1, unit: 'unidade' },
      { name: 'Azeite', quantity: 3, unit: 'colheres' },
      { name: 'Manjericão', quantity: 1, unit: 'maço' }
    ],
    instructions: [
      'Corte os tomates em cubos pequenos',
      'Misture com alho picado, azeite e manjericão',
      'Tempere com sal e pimenta',
      'Toste fatias de pão',
      'Coloque a mistura de tomate sobre o pão'
    ],
    tags: ['italiana', 'entrada', 'vegetariano']
  }
];
