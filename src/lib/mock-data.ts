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
  },
  // SOBREMESAS
  {
    id: '11',
    title: 'Mousse de Chocolate',
    description: 'Sobremesa cremosa e aerada de chocolate negro',
    imageUrl: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=800&h=600&fit=crop',
    prepTime: 20,
    difficulty: 'easy',
    servings: 6,
    calories: 320,
    ingredients: [
      { name: 'Chocolate negro', quantity: 200, unit: 'g' },
      { name: 'Ovos', quantity: 4, unit: 'unidades' },
      { name: 'Açúcar', quantity: 80, unit: 'g' },
      { name: 'Natas', quantity: 200, unit: 'ml' },
      { name: 'Manteiga', quantity: 30, unit: 'g' }
    ],
    instructions: [
      'Derreta o chocolate com a manteiga em banho-maria',
      'Separe as claras das gemas',
      'Bata as claras em castelo com metade do açúcar',
      'Bata as gemas com o restante açúcar até ficarem cremosas',
      'Misture as gemas ao chocolate derretido',
      'Bata as natas até ficarem firmes',
      'Incorpore delicadamente as claras e as natas ao chocolate',
      'Leve ao frigorífico por 3 horas'
    ],
    tags: ['sobremesa', 'chocolate', 'doce']
  },
  {
    id: '12',
    title: 'Tiramisu',
    description: 'Sobremesa italiana com café, mascarpone e cacau',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    prepTime: 30,
    difficulty: 'medium',
    servings: 8,
    calories: 380,
    ingredients: [
      { name: 'Mascarpone', quantity: 500, unit: 'g' },
      { name: 'Ovos', quantity: 4, unit: 'unidades' },
      { name: 'Açúcar', quantity: 100, unit: 'g' },
      { name: 'Café expresso', quantity: 300, unit: 'ml' },
      { name: 'Bolachas champanhe', quantity: 300, unit: 'g' },
      { name: 'Cacau em pó', quantity: 50, unit: 'g' },
      { name: 'Marsala', quantity: 50, unit: 'ml', optional: true }
    ],
    instructions: [
      'Separe as claras das gemas',
      'Bata as gemas com açúcar até ficarem cremosas',
      'Adicione o mascarpone e misture bem',
      'Bata as claras em castelo e incorpore ao creme',
      'Prepare café forte e deixe arrefecer',
      'Molhe as bolachas no café rapidamente',
      'Monte camadas alternadas de bolachas e creme',
      'Polvilhe com cacau e leve ao frigorífico por 4 horas'
    ],
    tags: ['sobremesa', 'italiano', 'café']
  },
  {
    id: '13',
    title: 'Pudim Flan',
    description: 'Pudim cremoso com caramelo',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=600&fit=crop',
    prepTime: 60,
    difficulty: 'medium',
    servings: 8,
    calories: 280,
    ingredients: [
      { name: 'Leite', quantity: 1, unit: 'litro' },
      { name: 'Ovos', quantity: 6, unit: 'unidades' },
      { name: 'Açúcar', quantity: 250, unit: 'g' },
      { name: 'Baunilha', quantity: 1, unit: 'vagem' }
    ],
    instructions: [
      'Faça caramelo com 150g de açúcar e cubra a forma',
      'Aqueça o leite com a baunilha',
      'Bata os ovos com o restante açúcar',
      'Adicione o leite morno aos ovos',
      'Coe e despeje na forma caramelizada',
      'Cozinhe em banho-maria no forno a 180°C por 50 minutos',
      'Deixe arrefecer e desenforme'
    ],
    tags: ['sobremesa', 'pudim', 'caramelo']
  },
  {
    id: '14',
    title: 'Bolo de Chocolate',
    description: 'Bolo húmido e intenso de chocolate',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    prepTime: 50,
    difficulty: 'easy',
    servings: 10,
    calories: 420,
    ingredients: [
      { name: 'Chocolate negro', quantity: 200, unit: 'g' },
      { name: 'Manteiga', quantity: 200, unit: 'g' },
      { name: 'Açúcar', quantity: 200, unit: 'g' },
      { name: 'Ovos', quantity: 4, unit: 'unidades' },
      { name: 'Farinha', quantity: 150, unit: 'g' },
      { name: 'Fermento', quantity: 1, unit: 'colher de chá' },
      { name: 'Cacau em pó', quantity: 50, unit: 'g' }
    ],
    instructions: [
      'Derreta o chocolate com a manteiga',
      'Bata os ovos com o açúcar',
      'Adicione o chocolate derretido',
      'Junte a farinha, cacau e fermento peneirados',
      'Despeje numa forma untada',
      'Asse a 180°C por 35-40 minutos',
      'Deixe arrefecer antes de desenformar'
    ],
    tags: ['sobremesa', 'bolo', 'chocolate']
  },
  {
    id: '15',
    title: 'Cheesecake de Frutos Vermelhos',
    description: 'Tarte cremosa de queijo com cobertura de frutos vermelhos',
    imageUrl: 'https://images.unsplash.com/photo-1533134242820-b4f7a6e5e3b1?w=800&h=600&fit=crop',
    prepTime: 45,
    difficulty: 'medium',
    servings: 10,
    calories: 380,
    ingredients: [
      { name: 'Queijo creme', quantity: 600, unit: 'g' },
      { name: 'Açúcar', quantity: 150, unit: 'g' },
      { name: 'Ovos', quantity: 3, unit: 'unidades' },
      { name: 'Natas', quantity: 200, unit: 'ml' },
      { name: 'Bolachas maria', quantity: 200, unit: 'g' },
      { name: 'Manteiga', quantity: 100, unit: 'g' },
      { name: 'Frutos vermelhos', quantity: 300, unit: 'g' }
    ],
    instructions: [
      'Triture as bolachas e misture com manteiga derretida',
      'Forre o fundo da forma e leve ao frigorífico',
      'Bata o queijo creme com açúcar',
      'Adicione os ovos um a um',
      'Junte as natas e misture',
      'Despeje sobre a base de bolachas',
      'Asse a 160°C por 50 minutos',
      'Deixe arrefecer e cubra com frutos vermelhos'
    ],
    tags: ['sobremesa', 'cheesecake', 'frutos']
  },
  {
    id: '16',
    title: 'Arroz Doce',
    description: 'Sobremesa tradicional portuguesa cremosa com canela',
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=600&fit=crop',
    prepTime: 40,
    difficulty: 'easy',
    servings: 6,
    calories: 280,
    ingredients: [
      { name: 'Arroz', quantity: 200, unit: 'g' },
      { name: 'Leite', quantity: 1, unit: 'litro' },
      { name: 'Açúcar', quantity: 150, unit: 'g' },
      { name: 'Gemas', quantity: 4, unit: 'unidades' },
      { name: 'Casca de limão', quantity: 1, unit: 'unidade' },
      { name: 'Canela', quantity: 2, unit: 'paus' }
    ],
    instructions: [
      'Cozinhe o arroz em água com casca de limão e canela',
      'Adicione o leite aos poucos',
      'Junte o açúcar e cozinhe até engrossar',
      'Retire do lume e adicione as gemas batidas',
      'Mexa bem e distribua em taças',
      'Polvilhe com canela em pó',
      'Sirva frio'
    ],
    tags: ['sobremesa', 'português', 'arroz']
  },
  {
    id: '17',
    title: 'Tarte de Maçã',
    description: 'Tarte clássica com maçãs caramelizadas e canela',
    imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&h=600&fit=crop',
    prepTime: 60,
    difficulty: 'medium',
    servings: 8,
    calories: 320,
    ingredients: [
      { name: 'Massa quebrada', quantity: 1, unit: 'rolo' },
      { name: 'Maçãs', quantity: 6, unit: 'unidades' },
      { name: 'Açúcar', quantity: 100, unit: 'g' },
      { name: 'Manteiga', quantity: 50, unit: 'g' },
      { name: 'Canela', quantity: 1, unit: 'colher de chá' },
      { name: 'Sumo de limão', quantity: 2, unit: 'colheres' }
    ],
    instructions: [
      'Forre uma forma com a massa quebrada',
      'Descasque e corte as maçãs em fatias',
      'Salteie as maçãs com manteiga, açúcar e canela',
      'Adicione o sumo de limão',
      'Disponha as maçãs sobre a massa',
      'Asse a 180°C por 40 minutos',
      'Sirva morno com gelado de baunilha'
    ],
    tags: ['sobremesa', 'tarte', 'maçã']
  },
  {
    id: '18',
    title: 'Panna Cotta',
    description: 'Sobremesa italiana cremosa com cobertura de frutos',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop',
    prepTime: 25,
    difficulty: 'easy',
    servings: 6,
    calories: 280,
    ingredients: [
      { name: 'Natas', quantity: 500, unit: 'ml' },
      { name: 'Açúcar', quantity: 80, unit: 'g' },
      { name: 'Gelatina', quantity: 3, unit: 'folhas' },
      { name: 'Baunilha', quantity: 1, unit: 'vagem' },
      { name: 'Frutos vermelhos', quantity: 200, unit: 'g' }
    ],
    instructions: [
      'Hidrate a gelatina em água fria',
      'Aqueça as natas com açúcar e baunilha',
      'Retire do lume e adicione a gelatina escorrida',
      'Mexa até dissolver completamente',
      'Distribua por taças',
      'Leve ao frigorífico por 4 horas',
      'Sirva com frutos vermelhos'
    ],
    tags: ['sobremesa', 'italiano', 'cremoso']
  },
  {
    id: '19',
    title: 'Brownies',
    description: 'Quadrados de chocolate densos e intensos',
    imageUrl: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&h=600&fit=crop',
    prepTime: 35,
    difficulty: 'easy',
    servings: 12,
    calories: 380,
    ingredients: [
      { name: 'Chocolate negro', quantity: 200, unit: 'g' },
      { name: 'Manteiga', quantity: 150, unit: 'g' },
      { name: 'Açúcar', quantity: 200, unit: 'g' },
      { name: 'Ovos', quantity: 3, unit: 'unidades' },
      { name: 'Farinha', quantity: 100, unit: 'g' },
      { name: 'Cacau em pó', quantity: 30, unit: 'g' },
      { name: 'Nozes', quantity: 100, unit: 'g', optional: true }
    ],
    instructions: [
      'Derreta o chocolate com a manteiga',
      'Bata os ovos com o açúcar',
      'Adicione o chocolate derretido',
      'Junte a farinha e cacau peneirados',
      'Adicione as nozes picadas',
      'Despeje numa forma forrada',
      'Asse a 180°C por 25 minutos',
      'Corte em quadrados após arrefecer'
    ],
    tags: ['sobremesa', 'chocolate', 'americano']
  },
  {
    id: '20',
    title: 'Leite Creme',
    description: 'Creme tradicional português queimado com açúcar',
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&h=600&fit=crop',
    prepTime: 35,
    difficulty: 'medium',
    servings: 6,
    calories: 320,
    ingredients: [
      { name: 'Leite', quantity: 750, unit: 'ml' },
      { name: 'Gemas', quantity: 8, unit: 'unidades' },
      { name: 'Açúcar', quantity: 150, unit: 'g' },
      { name: 'Farinha Maizena', quantity: 40, unit: 'g' },
      { name: 'Casca de limão', quantity: 1, unit: 'unidade' },
      { name: 'Açúcar para queimar', quantity: 100, unit: 'g' }
    ],
    instructions: [
      'Aqueça o leite com a casca de limão',
      'Bata as gemas com açúcar e maizena',
      'Adicione o leite quente aos poucos',
      'Leve ao lume mexendo sempre até engrossar',
      'Distribua por taças',
      'Deixe arrefecer',
      'Polvilhe com açúcar e queime com maçarico',
      'Sirva frio'
    ],
    tags: ['sobremesa', 'português', 'creme']
  },
  {
    id: '21',
    title: 'Tarte de Limão',
    description: 'Tarte refrescante com creme de limão e merengue',
    imageUrl: 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=800&h=600&fit=crop',
    prepTime: 50,
    difficulty: 'medium',
    servings: 8,
    calories: 340,
    ingredients: [
      { name: 'Massa quebrada', quantity: 1, unit: 'rolo' },
      { name: 'Limões', quantity: 4, unit: 'unidades' },
      { name: 'Açúcar', quantity: 200, unit: 'g' },
      { name: 'Ovos', quantity: 4, unit: 'unidades' },
      { name: 'Manteiga', quantity: 100, unit: 'g' },
      { name: 'Natas', quantity: 100, unit: 'ml' }
    ],
    instructions: [
      'Forre uma forma com massa quebrada e asse em branco',
      'Rale a casca e esprema os limões',
      'Bata ovos com açúcar',
      'Adicione sumo e raspa de limão',
      'Cozinhe em banho-maria até engrossar',
      'Adicione manteiga e natas',
      'Despeje sobre a base assada',
      'Leve ao frigorífico por 3 horas'
    ],
    tags: ['sobremesa', 'tarte', 'limão']
  },
  {
    id: '22',
    title: 'Salame de Chocolate',
    description: 'Sobremesa fria com bolachas e chocolate',
    imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&h=600&fit=crop',
    prepTime: 20,
    difficulty: 'easy',
    servings: 8,
    calories: 380,
    ingredients: [
      { name: 'Chocolate negro', quantity: 200, unit: 'g' },
      { name: 'Manteiga', quantity: 150, unit: 'g' },
      { name: 'Açúcar', quantity: 100, unit: 'g' },
      { name: 'Ovos', quantity: 2, unit: 'unidades' },
      { name: 'Bolachas maria', quantity: 200, unit: 'g' },
      { name: 'Nozes', quantity: 100, unit: 'g', optional: true }
    ],
    instructions: [
      'Derreta o chocolate com a manteiga',
      'Adicione o açúcar e os ovos batidos',
      'Parta as bolachas em pedaços',
      'Misture as bolachas e nozes ao chocolate',
      'Coloque sobre papel filme em forma de cilindro',
      'Enrole bem apertado',
      'Leve ao frigorífico por 4 horas',
      'Corte em rodelas para servir'
    ],
    tags: ['sobremesa', 'chocolate', 'frio']
  },
  {
    id: '23',
    title: 'Bolo de Cenoura com Cobertura',
    description: 'Bolo fofo de cenoura com cobertura de chocolate',
    imageUrl: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=600&fit=crop',
    prepTime: 50,
    difficulty: 'easy',
    servings: 10,
    calories: 360,
    ingredients: [
      { name: 'Cenouras', quantity: 3, unit: 'unidades' },
      { name: 'Ovos', quantity: 3, unit: 'unidades' },
      { name: 'Açúcar', quantity: 200, unit: 'g' },
      { name: 'Óleo', quantity: 150, unit: 'ml' },
      { name: 'Farinha', quantity: 250, unit: 'g' },
      { name: 'Fermento', quantity: 1, unit: 'colher de sopa' },
      { name: 'Chocolate em pó', quantity: 100, unit: 'g' },
      { name: 'Manteiga', quantity: 50, unit: 'g' }
    ],
    instructions: [
      'Bata as cenouras, ovos, açúcar e óleo no liquidificador',
      'Adicione a farinha e fermento',
      'Despeje numa forma untada',
      'Asse a 180°C por 40 minutos',
      'Prepare cobertura derretendo chocolate com manteiga',
      'Cubra o bolo ainda morno',
      'Deixe arrefecer antes de servir'
    ],
    tags: ['sobremesa', 'bolo', 'cenoura']
  },
  {
    id: '24',
    title: 'Pavlova',
    description: 'Merengue crocante com natas e frutos frescos',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop',
    prepTime: 90,
    difficulty: 'hard',
    servings: 8,
    calories: 320,
    ingredients: [
      { name: 'Claras', quantity: 4, unit: 'unidades' },
      { name: 'Açúcar', quantity: 250, unit: 'g' },
      { name: 'Vinagre', quantity: 1, unit: 'colher de chá' },
      { name: 'Maizena', quantity: 1, unit: 'colher de chá' },
      { name: 'Natas', quantity: 300, unit: 'ml' },
      { name: 'Frutos vermelhos', quantity: 300, unit: 'g' },
      { name: 'Kiwi', quantity: 2, unit: 'unidades' }
    ],
    instructions: [
      'Bata as claras em castelo',
      'Adicione o açúcar aos poucos',
      'Junte vinagre e maizena',
      'Forme um disco numa assadeira',
      'Asse a 120°C por 90 minutos',
      'Deixe arrefecer no forno desligado',
      'Cubra com natas batidas e frutos',
      'Sirva imediatamente'
    ],
    tags: ['sobremesa', 'merengue', 'frutos']
  },
  {
    id: '25',
    title: 'Serradura',
    description: 'Sobremesa portuguesa com natas e bolacha maria',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
    prepTime: 20,
    difficulty: 'easy',
    servings: 6,
    calories: 380,
    ingredients: [
      { name: 'Natas', quantity: 400, unit: 'ml' },
      { name: 'Leite condensado', quantity: 1, unit: 'lata' },
      { name: 'Bolachas maria', quantity: 200, unit: 'g' }
    ],
    instructions: [
      'Bata as natas até ficarem firmes',
      'Adicione o leite condensado',
      'Triture as bolachas até ficarem em pó',
      'Monte camadas alternadas de creme e bolacha',
      'Termine com uma camada de bolacha',
      'Leve ao frigorífico por 4 horas',
      'Sirva bem frio'
    ],
    tags: ['sobremesa', 'português', 'fácil']
  }
];
