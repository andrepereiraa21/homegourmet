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
    title: 'Bacalhau à Brás',
    description: 'Prato tradicional português com bacalhau desfiado, batata palha e ovos',
    imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523f?w=800&h=600&fit=crop',
    prepTime: 45,
    difficulty: 'medium',
    servings: 4,
    calories: 420,
    ingredients: [
      { name: 'Bacalhau', quantity: 400, unit: 'g' },
      { name: 'Batata palha', quantity: 200, unit: 'g' },
      { name: 'Ovos', quantity: 6, unit: 'unidades' },
      { name: 'Cebola', quantity: 2, unit: 'unidades' },
      { name: 'Alho', quantity: 3, unit: 'dentes' },
      { name: 'Azeite', quantity: 4, unit: 'colheres' },
      { name: 'Azeitonas pretas', quantity: 100, unit: 'g', optional: true }
    ],
    instructions: [
      'Demolhe o bacalhau por 24h, trocando a água 3 vezes',
      'Cozinhe o bacalhau e desfie',
      'Refogue a cebola e o alho no azeite',
      'Adicione o bacalhau desfiado',
      'Junte a batata palha',
      'Adicione os ovos batidos e mexa até ficarem cremosos',
      'Decore com azeitonas pretas e salsa'
    ],
    tags: ['português', 'bacalhau', 'tradicional']
  },
  {
    id: '3',
    title: 'Arroz de Pato',
    description: 'Arroz cremoso com pato desfiado e chouriço, gratinado no forno',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=600&fit=crop',
    prepTime: 90,
    difficulty: 'hard',
    servings: 6,
    calories: 580,
    ingredients: [
      { name: 'Pato', quantity: 1, unit: 'unidade' },
      { name: 'Arroz', quantity: 400, unit: 'g' },
      { name: 'Chouriço', quantity: 200, unit: 'g' },
      { name: 'Cebola', quantity: 2, unit: 'unidades' },
      { name: 'Alho', quantity: 4, unit: 'dentes' },
      { name: 'Vinho do Porto', quantity: 100, unit: 'ml' },
      { name: 'Bacon', quantity: 150, unit: 'g' }
    ],
    instructions: [
      'Cozinhe o pato com cebola, alho e vinho do Porto',
      'Desfie o pato e reserve o caldo',
      'Cozinhe o arroz no caldo do pato',
      'Misture o pato desfiado ao arroz',
      'Coloque em pirex, cubra com chouriço e bacon',
      'Leve ao forno até gratinar'
    ],
    tags: ['português', 'pato', 'festivo']
  },
  {
    id: '4',
    title: 'Caldo Verde',
    description: 'Sopa tradicional portuguesa com couve galega e chouriço',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    prepTime: 35,
    difficulty: 'easy',
    servings: 6,
    calories: 220,
    ingredients: [
      { name: 'Batata', quantity: 6, unit: 'unidades' },
      { name: 'Couve galega', quantity: 300, unit: 'g' },
      { name: 'Chouriço', quantity: 200, unit: 'g' },
      { name: 'Cebola', quantity: 1, unit: 'unidade' },
      { name: 'Alho', quantity: 3, unit: 'dentes' },
      { name: 'Azeite', quantity: 4, unit: 'colheres' }
    ],
    instructions: [
      'Cozinhe as batatas com cebola e alho',
      'Triture até obter um creme',
      'Adicione a couve cortada em juliana fina',
      'Cozinhe por 5 minutos',
      'Adicione rodelas de chouriço',
      'Finalize com um fio de azeite'
    ],
    tags: ['português', 'sopa', 'tradicional']
  },
  {
    id: '5',
    title: 'Francesinha',
    description: 'Sanduíche português coberto com molho especial e queijo derretido',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    prepTime: 40,
    difficulty: 'medium',
    servings: 2,
    calories: 850,
    ingredients: [
      { name: 'Pão de forma', quantity: 8, unit: 'fatias' },
      { name: 'Bife', quantity: 2, unit: 'unidades' },
      { name: 'Linguiça', quantity: 2, unit: 'unidades' },
      { name: 'Presunto', quantity: 4, unit: 'fatias' },
      { name: 'Queijo', quantity: 200, unit: 'g' },
      { name: 'Ovo', quantity: 2, unit: 'unidades' },
      { name: 'Cerveja', quantity: 200, unit: 'ml' },
      { name: 'Tomate', quantity: 2, unit: 'unidades' }
    ],
    instructions: [
      'Grelhe os bifes e as linguiças',
      'Monte sanduíches com pão, bife, linguiça e presunto',
      'Cubra com queijo',
      'Prepare molho com cerveja, tomate e especiarias',
      'Despeje o molho sobre os sanduíches',
      'Leve ao forno até o queijo derreter',
      'Sirva com batatas fritas e ovo estrelado'
    ],
    tags: ['português', 'sanduíche', 'porto']
  },
  {
    id: '6',
    title: 'Polvo à Lagareiro',
    description: 'Polvo assado com batatas a murro e muito azeite',
    imageUrl: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=600&fit=crop',
    prepTime: 60,
    difficulty: 'medium',
    servings: 4,
    calories: 380,
    ingredients: [
      { name: 'Polvo', quantity: 1, unit: 'kg' },
      { name: 'Batata', quantity: 8, unit: 'unidades' },
      { name: 'Alho', quantity: 6, unit: 'dentes' },
      { name: 'Azeite', quantity: 200, unit: 'ml' },
      { name: 'Coentros', quantity: 1, unit: 'maço' }
    ],
    instructions: [
      'Cozinhe o polvo até ficar macio',
      'Cozinhe as batatas com pele',
      'Esmague levemente as batatas',
      'Coloque polvo e batatas em tabuleiro',
      'Regue com muito azeite e alho laminado',
      'Asse em forno bem quente',
      'Finalize com coentros picados'
    ],
    tags: ['português', 'polvo', 'assado']
  },
  {
    id: '7',
    title: 'Pastéis de Nata',
    description: 'Doce conventual português com massa folhada e creme',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&h=600&fit=crop',
    prepTime: 50,
    difficulty: 'hard',
    servings: 12,
    calories: 280,
    ingredients: [
      { name: 'Massa folhada', quantity: 1, unit: 'rolo' },
      { name: 'Leite', quantity: 500, unit: 'ml' },
      { name: 'Açúcar', quantity: 200, unit: 'g' },
      { name: 'Gemas', quantity: 6, unit: 'unidades' },
      { name: 'Farinha', quantity: 30, unit: 'g' },
      { name: 'Canela', quantity: 1, unit: 'pau' }
    ],
    instructions: [
      'Faça uma calda com açúcar e água',
      'Misture leite, gemas e farinha',
      'Junte a calda ao creme',
      'Forre forminhas com massa folhada',
      'Adicione o creme',
      'Asse em forno muito quente (250°C)',
      'Polvilhe com canela e açúcar'
    ],
    tags: ['português', 'doce', 'sobremesa']
  },
  {
    id: '8',
    title: 'Açorda Alentejana',
    description: 'Sopa de pão com alho, coentros e ovo escalfado',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    prepTime: 25,
    difficulty: 'easy',
    servings: 4,
    calories: 320,
    ingredients: [
      { name: 'Pão alentejano', quantity: 400, unit: 'g' },
      { name: 'Alho', quantity: 6, unit: 'dentes' },
      { name: 'Coentros', quantity: 1, unit: 'maço' },
      { name: 'Ovos', quantity: 4, unit: 'unidades' },
      { name: 'Azeite', quantity: 100, unit: 'ml' },
      { name: 'Água', quantity: 1, unit: 'litro' }
    ],
    instructions: [
      'Corte o pão em fatias',
      'Faça uma pasta com alho, sal e coentros',
      'Ferva água com sal',
      'Escalfe os ovos',
      'Coloque o pão em tigelas',
      'Adicione a pasta de alho',
      'Despeje água fervente',
      'Coloque ovo escalfado por cima',
      'Regue com azeite'
    ],
    tags: ['português', 'alentejano', 'sopa']
  },
  {
    id: '9',
    title: 'Arroz de Marisco',
    description: 'Arroz caldoso com diversos mariscos frescos',
    imageUrl: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800&h=600&fit=crop',
    prepTime: 50,
    difficulty: 'medium',
    servings: 6,
    calories: 450,
    ingredients: [
      { name: 'Arroz', quantity: 400, unit: 'g' },
      { name: 'Camarão', quantity: 300, unit: 'g' },
      { name: 'Amêijoas', quantity: 500, unit: 'g' },
      { name: 'Mexilhão', quantity: 500, unit: 'g' },
      { name: 'Tomate', quantity: 3, unit: 'unidades' },
      { name: 'Cebola', quantity: 2, unit: 'unidades' },
      { name: 'Alho', quantity: 4, unit: 'dentes' },
      { name: 'Coentros', quantity: 1, unit: 'maço' }
    ],
    instructions: [
      'Abra os mariscos em água e reserve o caldo',
      'Refogue cebola, alho e tomate',
      'Adicione o arroz e refogue',
      'Junte o caldo dos mariscos',
      'Cozinhe o arroz',
      'Adicione os mariscos',
      'Finalize com coentros picados'
    ],
    tags: ['português', 'marisco', 'arroz']
  },
  {
    id: '10',
    title: 'Bife à Café',
    description: 'Bife com molho de café e natas, acompanhado de batatas fritas',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=600&fit=crop',
    prepTime: 30,
    difficulty: 'easy',
    servings: 2,
    calories: 620,
    ingredients: [
      { name: 'Bife', quantity: 2, unit: 'unidades' },
      { name: 'Café expresso', quantity: 2, unit: 'chávenas' },
      { name: 'Natas', quantity: 200, unit: 'ml' },
      { name: 'Manteiga', quantity: 50, unit: 'g' },
      { name: 'Conhaque', quantity: 50, unit: 'ml' },
      { name: 'Batata', quantity: 4, unit: 'unidades' }
    ],
    instructions: [
      'Tempere os bifes com sal e pimenta',
      'Grelhe os bifes na manteiga',
      'Flambe com conhaque',
      'Adicione o café e as natas',
      'Deixe reduzir até engrossar',
      'Sirva com batatas fritas'
    ],
    tags: ['português', 'carne', 'molho']
  }
];
