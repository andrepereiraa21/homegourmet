// Script para popular o banco de dados com receitas de sobremesas
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const sobremesas = [
  {
    name: 'Arroz Doce',
    description: 'Sobremesa tradicional portuguesa cremosa com canela e limão',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 10,
    cook_time: 30,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
    ingredients: [
      { name: 'Arroz', amount: '200', unit: 'g' },
      { name: 'Leite', amount: '1', unit: 'L' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Canela em pau', amount: '1', unit: 'unidade' },
      { name: 'Casca de limão', amount: '1', unit: 'unidade' },
      { name: 'Gemas de ovo', amount: '4', unit: 'unidades' }
    ],
    instructions: [
      'Cozer o arroz em água com a casca de limão e canela em pau',
      'Adicionar o leite aos poucos e deixar cozinhar',
      'Juntar o açúcar e as gemas batidas',
      'Mexer até engrossar',
      'Servir em taças e polvilhar com canela'
    ],
    nutrition: { calories: 280, protein: 6, carbs: 52, fat: 5, fiber: 0 },
    tags: ['Tradicional', 'Portuguesa', 'Cremosa', 'Canela'],
    is_premium: false
  },
  {
    name: 'Leite Creme',
    description: 'Creme suave coberto com açúcar caramelizado',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 15,
    cook_time: 20,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    ingredients: [
      { name: 'Leite', amount: '1', unit: 'L' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Gemas', amount: '8', unit: 'unidades' },
      { name: 'Farinha Maizena', amount: '50', unit: 'g' },
      { name: 'Casca de limão', amount: '1', unit: 'unidade' }
    ],
    instructions: [
      'Ferver o leite com a casca de limão',
      'Bater as gemas com açúcar e maizena',
      'Juntar o leite quente às gemas',
      'Levar ao lume até engrossar',
      'Colocar em taças e deixar arrefecer',
      'Polvilhar com açúcar e queimar com maçarico'
    ],
    nutrition: { calories: 320, protein: 7, carbs: 48, fat: 11, fiber: 0 },
    tags: ['Tradicional', 'Caramelizado', 'Cremoso', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Pudim Flan',
    description: 'Pudim cremoso com caramelo',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 15,
    cook_time: 45,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
    ingredients: [
      { name: 'Ovos', amount: '6', unit: 'unidades' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Leite', amount: '500', unit: 'ml' },
      { name: 'Açúcar para caramelo', amount: '150', unit: 'g' }
    ],
    instructions: [
      'Fazer o caramelo com açúcar e colocar na forma',
      'Bater os ovos com leite condensado e leite',
      'Coar e colocar na forma caramelizada',
      'Cozer em banho-maria no forno a 180°C por 45 minutos',
      'Deixar arrefecer e desenformar'
    ],
    nutrition: { calories: 290, protein: 9, carbs: 42, fat: 9, fiber: 0 },
    tags: ['Cremoso', 'Caramelo', 'Tradicional', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Bolo de Bolacha',
    description: 'Bolo frio com camadas de bolacha e creme de café',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 30,
    cook_time: 0,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ingredients: [
      { name: 'Bolachas Maria', amount: '2', unit: 'pacotes' },
      { name: 'Café forte', amount: '300', unit: 'ml' },
      { name: 'Manteiga', amount: '200', unit: 'g' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Ovos', amount: '3', unit: 'unidades' }
    ],
    instructions: [
      'Fazer um creme com manteiga, açúcar e ovos',
      'Molhar as bolachas no café',
      'Alternar camadas de bolacha e creme',
      'Terminar com creme e polvilhar chocolate',
      'Refrigerar por 4 horas antes de servir'
    ],
    nutrition: { calories: 380, protein: 5, carbs: 45, fat: 20, fiber: 1 },
    tags: ['Sem forno', 'Café', 'Fácil', 'Popular'],
    is_premium: false
  },
  {
    name: 'Tarte de Nata',
    description: 'Tarte cremosa com massa folhada',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 25,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800',
    ingredients: [
      { name: 'Massa folhada', amount: '1', unit: 'rolo' },
      { name: 'Leite', amount: '500', unit: 'ml' },
      { name: 'Natas', amount: '200', unit: 'ml' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Gemas', amount: '6', unit: 'unidades' },
      { name: 'Farinha', amount: '30', unit: 'g' }
    ],
    instructions: [
      'Ferver leite com natas, açúcar e canela',
      'Bater gemas com farinha',
      'Juntar ao leite e cozinhar até engrossar',
      'Forrar forminhas com massa folhada',
      'Rechear com creme',
      'Cozer a 220°C por 20-25 minutos'
    ],
    nutrition: { calories: 310, protein: 5, carbs: 38, fat: 15, fiber: 0 },
    tags: ['Tradicional', 'Cremosa', 'Portuguesa', 'Icónica'],
    is_premium: false
  },
  {
    name: 'Mousse de Limão',
    description: 'Mousse refrescante e cremosa de limão',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 0,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    ingredients: [
      { name: 'Sumo de limão', amount: '150', unit: 'ml' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Natas', amount: '200', unit: 'ml' },
      { name: 'Gelatina', amount: '1', unit: 'folha' },
      { name: 'Raspa de limão', amount: '1', unit: 'limão' }
    ],
    instructions: [
      'Hidratar a gelatina em água fria',
      'Bater leite condensado com sumo de limão',
      'Derreter gelatina e juntar à mistura',
      'Bater as natas e incorporar delicadamente',
      'Colocar em taças e refrigerar por 3 horas'
    ],
    nutrition: { calories: 260, protein: 4, carbs: 35, fat: 12, fiber: 0 },
    tags: ['Refrescante', 'Cítrico', 'Leve', 'Sem forno'],
    is_premium: false
  },
  {
    name: 'Baba de Camelo',
    description: 'Sobremesa cremosa com leite condensado e ovos',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 15,
    cook_time: 10,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    ingredients: [
      { name: 'Leite condensado', amount: '2', unit: 'latas' },
      { name: 'Ovos', amount: '6', unit: 'unidades' },
      { name: 'Açúcar', amount: '100', unit: 'g' },
      { name: 'Água', amount: '50', unit: 'ml' }
    ],
    instructions: [
      'Fazer caramelo com açúcar e água',
      'Bater os ovos e juntar ao leite condensado',
      'Colocar o caramelo no fundo das taças',
      'Adicionar o creme por cima',
      'Refrigerar por 4 horas'
    ],
    nutrition: { calories: 310, protein: 8, carbs: 48, fat: 9, fiber: 0 },
    tags: ['Cremosa', 'Doce', 'Fácil', 'Tradicional'],
    is_premium: false
  },
  {
    name: 'Toucinho do Céu',
    description: 'Doce conventual rico em amêndoa e ovos',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 40,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
    ingredients: [
      { name: 'Amêndoa moída', amount: '250', unit: 'g' },
      { name: 'Açúcar', amount: '300', unit: 'g' },
      { name: 'Gemas', amount: '12', unit: 'unidades' },
      { name: 'Água', amount: '100', unit: 'ml' },
      { name: 'Manteiga', amount: '50', unit: 'g' }
    ],
    instructions: [
      'Fazer calda com açúcar e água',
      'Juntar a amêndoa à calda',
      'Adicionar as gemas batidas',
      'Colocar numa forma untada',
      'Cozer a 180°C por 40 minutos'
    ],
    nutrition: { calories: 420, protein: 9, carbs: 52, fat: 20, fiber: 3 },
    tags: ['Conventual', 'Amêndoa', 'Tradicional', 'Rico'],
    is_premium: true
  },
  {
    name: 'Serradura',
    description: 'Sobremesa fria com camadas de bolacha e natas',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 0,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800',
    ingredients: [
      { name: 'Natas', amount: '500', unit: 'ml' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Bolachas Maria', amount: '1', unit: 'pacote' }
    ],
    instructions: [
      'Bater as natas até ficarem firmes',
      'Juntar o leite condensado',
      'Triturar as bolachas',
      'Alternar camadas de creme e bolacha triturada',
      'Refrigerar por 4 horas'
    ],
    nutrition: { calories: 340, protein: 4, carbs: 38, fat: 19, fiber: 1 },
    tags: ['Sem forno', 'Fácil', 'Cremosa', 'Rápida'],
    is_premium: false
  },
  {
    name: 'Aletria',
    description: 'Doce tradicional de Natal com aletria e ovos',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 10,
    cook_time: 20,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800',
    ingredients: [
      { name: 'Aletria', amount: '250', unit: 'g' },
      { name: 'Leite', amount: '1', unit: 'L' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Gemas', amount: '4', unit: 'unidades' },
      { name: 'Canela', amount: '1', unit: 'pau' },
      { name: 'Casca de limão', amount: '1', unit: 'unidade' }
    ],
    instructions: [
      'Cozer a aletria no leite com canela e limão',
      'Adicionar o açúcar',
      'Juntar as gemas batidas',
      'Mexer até engrossar',
      'Servir polvilhada com canela'
    ],
    nutrition: { calories: 270, protein: 7, carbs: 48, fat: 5, fiber: 1 },
    tags: ['Natal', 'Tradicional', 'Portuguesa', 'Canela'],
    is_premium: false
  },
  {
    name: 'Pão de Ló',
    description: 'Bolo fofo e húmido tradicional português',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 15,
    cook_time: 30,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
    ingredients: [
      { name: 'Ovos', amount: '6', unit: 'unidades' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Farinha', amount: '150', unit: 'g' }
    ],
    instructions: [
      'Bater os ovos com açúcar até triplicar o volume',
      'Incorporar a farinha peneirada delicadamente',
      'Colocar em forma forrada com papel',
      'Cozer a 180°C por 30 minutos',
      'Não abrir o forno durante a cozedura'
    ],
    nutrition: { calories: 250, protein: 6, carbs: 42, fat: 6, fiber: 1 },
    tags: ['Tradicional', 'Fofo', 'Simples', 'Versátil'],
    is_premium: false
  },
  {
    name: 'Rabanadas',
    description: 'Fatias de pão doce fritas e passadas em calda',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 15,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800',
    ingredients: [
      { name: 'Pão de forma', amount: '8', unit: 'fatias' },
      { name: 'Leite', amount: '500', unit: 'ml' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Canela', amount: '2', unit: 'colheres de chá' }
    ],
    instructions: [
      'Embeber o pão no leite',
      'Passar pelos ovos batidos',
      'Fritar em óleo quente',
      'Escorrer e passar por açúcar com canela'
    ],
    nutrition: { calories: 320, protein: 7, carbs: 45, fat: 12, fiber: 2 },
    tags: ['Natal', 'Tradicional', 'Frita', 'Canela'],
    is_premium: false
  },
  {
    name: 'Bolo de Chocolate com Cobertura',
    description: 'Bolo húmido de chocolate com ganache',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 35,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ingredients: [
      { name: 'Farinha', amount: '200', unit: 'g' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Cacau em pó', amount: '50', unit: 'g' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Óleo', amount: '100', unit: 'ml' },
      { name: 'Leite', amount: '200', unit: 'ml' },
      { name: 'Fermento', amount: '1', unit: 'colher de sopa' },
      { name: 'Chocolate para cobertura', amount: '200', unit: 'g' },
      { name: 'Natas', amount: '200', unit: 'ml' }
    ],
    instructions: [
      'Bater ovos com açúcar',
      'Juntar óleo e leite',
      'Adicionar farinha, cacau e fermento',
      'Cozer a 180°C por 35 minutos',
      'Fazer ganache com chocolate e natas',
      'Cobrir o bolo frio'
    ],
    nutrition: { calories: 380, protein: 6, carbs: 48, fat: 18, fiber: 2 },
    tags: ['Chocolate', 'Húmido', 'Festivo', 'Popular'],
    is_premium: false
  },
  {
    name: 'Tarte de Maçã',
    description: 'Tarte clássica com maçãs e canela',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 25,
    cook_time: 40,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800',
    ingredients: [
      { name: 'Massa quebrada', amount: '1', unit: 'rolo' },
      { name: 'Maçãs', amount: '6', unit: 'unidades' },
      { name: 'Açúcar', amount: '100', unit: 'g' },
      { name: 'Canela', amount: '1', unit: 'colher de chá' },
      { name: 'Sumo de limão', amount: '1', unit: 'colher de sopa' },
      { name: 'Manteiga', amount: '30', unit: 'g' }
    ],
    instructions: [
      'Forrar forma com massa quebrada',
      'Descascar e laminar as maçãs',
      'Misturar com açúcar, canela e limão',
      'Colocar sobre a massa',
      'Adicionar pedaços de manteiga por cima',
      'Cozer a 180°C por 40 minutos'
    ],
    nutrition: { calories: 280, protein: 3, carbs: 42, fat: 11, fiber: 3 },
    tags: ['Maçã', 'Canela', 'Clássica', 'Reconfortante'],
    is_premium: false
  },
  {
    name: 'Mousse de Maracujá',
    description: 'Mousse tropical refrescante',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 0,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    ingredients: [
      { name: 'Polpa de maracujá', amount: '200', unit: 'ml' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Natas', amount: '200', unit: 'ml' },
      { name: 'Gelatina', amount: '1', unit: 'folha' }
    ],
    instructions: [
      'Hidratar gelatina em água fria',
      'Bater polpa de maracujá com leite condensado',
      'Derreter gelatina e juntar',
      'Bater natas e incorporar',
      'Refrigerar por 3 horas'
    ],
    nutrition: { calories: 270, protein: 4, carbs: 36, fat: 12, fiber: 2 },
    tags: ['Tropical', 'Refrescante', 'Leve', 'Sem forno'],
    is_premium: false
  },
  {
    name: 'Bolo de Cenoura com Cobertura de Chocolate',
    description: 'Bolo fofo de cenoura com ganache',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 40,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
    ingredients: [
      { name: 'Cenouras', amount: '3', unit: 'unidades' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Óleo', amount: '150', unit: 'ml' },
      { name: 'Farinha', amount: '250', unit: 'g' },
      { name: 'Fermento', amount: '1', unit: 'colher de sopa' },
      { name: 'Chocolate', amount: '200', unit: 'g' },
      { name: 'Natas', amount: '200', unit: 'ml' }
    ],
    instructions: [
      'Bater cenouras, ovos, açúcar e óleo no liquidificador',
      'Juntar farinha e fermento',
      'Cozer a 180°C por 40 minutos',
      'Fazer cobertura com chocolate e natas',
      'Cobrir o bolo frio'
    ],
    nutrition: { calories: 350, protein: 5, carbs: 45, fat: 17, fiber: 2 },
    tags: ['Cenoura', 'Chocolate', 'Popular', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Tigelada',
    description: 'Doce conventual cremoso assado',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 15,
    cook_time: 30,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    ingredients: [
      { name: 'Leite', amount: '500', unit: 'ml' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Ovos', amount: '4', unit: 'unidades' },
      { name: 'Farinha', amount: '50', unit: 'g' },
      { name: 'Canela', amount: 'q.b.', unit: '' }
    ],
    instructions: [
      'Bater todos os ingredientes',
      'Colocar em tigelas individuais',
      'Polvilhar com canela',
      'Cozer a 180°C por 30 minutos'
    ],
    nutrition: { calories: 240, protein: 7, carbs: 38, fat: 6, fiber: 0 },
    tags: ['Conventual', 'Cremosa', 'Tradicional', 'Simples'],
    is_premium: false
  },
  {
    name: 'Bolo Rei',
    description: 'Bolo tradicional de Natal com frutas cristalizadas',
    category: 'Sobremesas',
    difficulty: 'Difícil',
    prep_time: 30,
    cook_time: 35,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcbd?w=800',
    ingredients: [
      { name: 'Farinha', amount: '500', unit: 'g' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Ovos', amount: '4', unit: 'unidades' },
      { name: 'Manteiga', amount: '150', unit: 'g' },
      { name: 'Leite', amount: '150', unit: 'ml' },
      { name: 'Fermento de padeiro', amount: '25', unit: 'g' },
      { name: 'Frutas cristalizadas', amount: '200', unit: 'g' },
      { name: 'Frutos secos', amount: '100', unit: 'g' },
      { name: 'Vinho do Porto', amount: '50', unit: 'ml' }
    ],
    instructions: [
      'Fazer massa com farinha, fermento, leite morno e açúcar',
      'Deixar levedar 1 hora',
      'Adicionar ovos, manteiga, frutas e frutos secos',
      'Formar coroa e deixar levedar mais 30 minutos',
      'Cozer a 180°C por 35 minutos',
      'Pincelar com vinho do Porto e decorar'
    ],
    nutrition: { calories: 420, protein: 7, carbs: 58, fat: 18, fiber: 2 },
    tags: ['Natal', 'Tradicional', 'Festivo', 'Frutas'],
    is_premium: true
  },
  {
    name: 'Pastéis de Feijão',
    description: 'Docinhos tradicionais de feijão branco',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 30,
    cook_time: 20,
    servings: 20,
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
    ingredients: [
      { name: 'Feijão branco cozido', amount: '250', unit: 'g' },
      { name: 'Açúcar', amount: '250', unit: 'g' },
      { name: 'Gemas', amount: '4', unit: 'unidades' },
      { name: 'Amêndoa moída', amount: '50', unit: 'g' },
      { name: 'Canela', amount: '1', unit: 'colher de chá' }
    ],
    instructions: [
      'Triturar o feijão cozido',
      'Juntar açúcar e levar ao lume',
      'Cozinhar até secar',
      'Adicionar gemas, amêndoa e canela',
      'Formar bolinhas e passar por açúcar',
      'Cozer a 180°C por 20 minutos'
    ],
    nutrition: { calories: 180, protein: 4, carbs: 32, fat: 4, fiber: 3 },
    tags: ['Tradicional', 'Feijão', 'Doce', 'Conventual'],
    is_premium: false
  },
  {
    name: 'Bolo de Iogurte',
    description: 'Bolo simples e fofo com iogurte',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 10,
    cook_time: 35,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
    ingredients: [
      { name: 'Iogurte natural', amount: '1', unit: 'unidade' },
      { name: 'Açúcar', amount: '2', unit: 'medidas de iogurte' },
      { name: 'Farinha', amount: '3', unit: 'medidas de iogurte' },
      { name: 'Óleo', amount: '1', unit: 'medida de iogurte' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Fermento', amount: '1', unit: 'colher de sopa' }
    ],
    instructions: [
      'Bater ovos com açúcar',
      'Juntar iogurte e óleo',
      'Adicionar farinha e fermento',
      'Colocar em forma untada',
      'Cozer a 180°C por 35 minutos'
    ],
    nutrition: { calories: 280, protein: 6, carbs: 42, fat: 10, fiber: 1 },
    tags: ['Simples', 'Fofo', 'Rápido', 'Versátil'],
    is_premium: false
  },
  {
    name: 'Salame de Chocolate',
    description: 'Doce frio com bolachas e chocolate',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 20,
    cook_time: 0,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800',
    ingredients: [
      { name: 'Chocolate negro', amount: '200', unit: 'g' },
      { name: 'Manteiga', amount: '100', unit: 'g' },
      { name: 'Açúcar', amount: '100', unit: 'g' },
      { name: 'Ovos', amount: '2', unit: 'unidades' },
      { name: 'Bolachas Maria', amount: '200', unit: 'g' },
      { name: 'Nozes', amount: '50', unit: 'g' }
    ],
    instructions: [
      'Derreter chocolate com manteiga',
      'Juntar açúcar e ovos batidos',
      'Adicionar bolachas partidas e nozes',
      'Formar um rolo em papel de alumínio',
      'Refrigerar por 4 horas',
      'Cortar em rodelas'
    ],
    nutrition: { calories: 360, protein: 5, carbs: 38, fat: 21, fiber: 2 },
    tags: ['Sem forno', 'Chocolate', 'Fácil', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Bolo de Ananás Invertido',
    description: 'Bolo caramelizado com ananás',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 40,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
    ingredients: [
      { name: 'Ananás em rodelas', amount: '1', unit: 'lata' },
      { name: 'Açúcar mascavado', amount: '100', unit: 'g' },
      { name: 'Manteiga', amount: '50', unit: 'g' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Farinha', amount: '200', unit: 'g' },
      { name: 'Fermento', amount: '1', unit: 'colher de chá' }
    ],
    instructions: [
      'Caramelizar fundo da forma com açúcar mascavado e manteiga',
      'Dispor rodelas de ananás',
      'Fazer massa batendo ovos com açúcar',
      'Juntar farinha e fermento',
      'Colocar sobre o ananás',
      'Cozer a 180°C por 40 minutos',
      'Desenformar ainda quente'
    ],
    nutrition: { calories: 310, protein: 5, carbs: 52, fat: 9, fiber: 1 },
    tags: ['Ananás', 'Caramelizado', 'Tropical', 'Vistoso'],
    is_premium: false
  },
  {
    name: 'Natas do Céu',
    description: 'Sobremesa cremosa com bolachas e natas',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 25,
    cook_time: 0,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
    ingredients: [
      { name: 'Natas', amount: '500', unit: 'ml' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Bolachas Maria', amount: '2', unit: 'pacotes' },
      { name: 'Café', amount: '200', unit: 'ml' }
    ],
    instructions: [
      'Bater as natas até ficarem firmes',
      'Juntar leite condensado',
      'Molhar bolachas no café',
      'Alternar camadas de bolacha e creme',
      'Terminar com creme',
      'Refrigerar por 4 horas'
    ],
    nutrition: { calories: 350, protein: 5, carbs: 40, fat: 19, fiber: 1 },
    tags: ['Cremosa', 'Café', 'Sem forno', 'Popular'],
    is_premium: false
  },
  {
    name: 'Queijadas de Sintra',
    description: 'Queijadas tradicionais com queijo fresco',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 25,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
    ingredients: [
      { name: 'Queijo fresco', amount: '250', unit: 'g' },
      { name: 'Açúcar', amount: '200', unit: 'g' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Farinha', amount: '50', unit: 'g' },
      { name: 'Canela', amount: '1', unit: 'colher de chá' },
      { name: 'Massa folhada', amount: '1', unit: 'rolo' }
    ],
    instructions: [
      'Bater queijo com açúcar',
      'Juntar ovos, farinha e canela',
      'Forrar forminhas com massa folhada',
      'Rechear com o creme',
      'Cozer a 200°C por 25 minutos'
    ],
    nutrition: { calories: 260, protein: 7, carbs: 35, fat: 10, fiber: 0 },
    tags: ['Tradicional', 'Sintra', 'Queijo', 'Portuguesa'],
    is_premium: false
  },
  {
    name: 'Bolo de Mel da Madeira',
    description: 'Bolo tradicional madeirense com mel e especiarias',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 30,
    cook_time: 60,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcbd?w=800',
    ingredients: [
      { name: 'Mel de cana', amount: '200', unit: 'g' },
      { name: 'Açúcar mascavado', amount: '150', unit: 'g' },
      { name: 'Farinha', amount: '400', unit: 'g' },
      { name: 'Ovos', amount: '4', unit: 'unidades' },
      { name: 'Manteiga', amount: '100', unit: 'g' },
      { name: 'Leite', amount: '100', unit: 'ml' },
      { name: 'Especiarias', amount: '2', unit: 'colheres de chá' },
      { name: 'Fermento', amount: '1', unit: 'colher de sopa' },
      { name: 'Frutos secos', amount: '100', unit: 'g' }
    ],
    instructions: [
      'Aquecer mel com açúcar e manteiga',
      'Juntar ovos batidos',
      'Adicionar farinha, especiarias e fermento',
      'Juntar leite e frutos secos',
      'Colocar em forma forrada',
      'Cozer a 160°C por 60 minutos'
    ],
    nutrition: { calories: 380, protein: 6, carbs: 58, fat: 14, fiber: 2 },
    tags: ['Madeira', 'Mel', 'Especiarias', 'Tradicional'],
    is_premium: true
  },
  {
    name: 'Ovos Moles de Aveiro',
    description: 'Doce conventual típico de Aveiro',
    category: 'Sobremesas',
    difficulty: 'Difícil',
    prep_time: 30,
    cook_time: 20,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    ingredients: [
      { name: 'Gemas', amount: '12', unit: 'unidades' },
      { name: 'Açúcar', amount: '300', unit: 'g' },
      { name: 'Água', amount: '150', unit: 'ml' }
    ],
    instructions: [
      'Fazer calda em ponto de pérola com açúcar e água',
      'Bater as gemas',
      'Juntar a calda quente às gemas aos poucos',
      'Levar ao lume mexendo sempre até engrossar',
      'Colocar em hóstias ou barriletes'
    ],
    nutrition: { calories: 320, protein: 6, carbs: 52, fat: 10, fiber: 0 },
    tags: ['Conventual', 'Aveiro', 'Tradicional', 'Gemas'],
    is_premium: true
  },
  {
    name: 'Bolo de Chocolate e Noz',
    description: 'Bolo rico com chocolate e nozes',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 35,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ingredients: [
      { name: 'Chocolate negro', amount: '200', unit: 'g' },
      { name: 'Manteiga', amount: '150', unit: 'g' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Ovos', amount: '4', unit: 'unidades' },
      { name: 'Farinha', amount: '100', unit: 'g' },
      { name: 'Nozes picadas', amount: '100', unit: 'g' },
      { name: 'Fermento', amount: '1', unit: 'colher de chá' }
    ],
    instructions: [
      'Derreter chocolate com manteiga',
      'Bater ovos com açúcar',
      'Juntar chocolate derretido',
      'Adicionar farinha, fermento e nozes',
      'Cozer a 180°C por 35 minutos'
    ],
    nutrition: { calories: 410, protein: 7, carbs: 42, fat: 24, fiber: 3 },
    tags: ['Chocolate', 'Nozes', 'Rico', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Tarte de Limão Merengada',
    description: 'Tarte cítrica com merengue tostado',
    category: 'Sobremesas',
    difficulty: 'Difícil',
    prep_time: 30,
    cook_time: 25,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
    ingredients: [
      { name: 'Massa quebrada', amount: '1', unit: 'rolo' },
      { name: 'Sumo de limão', amount: '150', unit: 'ml' },
      { name: 'Raspa de limão', amount: '2', unit: 'limões' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Gemas', amount: '4', unit: 'unidades' },
      { name: 'Claras', amount: '4', unit: 'unidades' },
      { name: 'Açúcar', amount: '150', unit: 'g' }
    ],
    instructions: [
      'Cozer a massa quebrada em branco',
      'Fazer creme com sumo, raspa, leite condensado e gemas',
      'Colocar sobre a massa',
      'Bater claras em castelo com açúcar',
      'Cobrir com merengue',
      'Gratinar até dourar'
    ],
    nutrition: { calories: 340, protein: 6, carbs: 48, fat: 14, fiber: 1 },
    tags: ['Limão', 'Merengue', 'Cítrica', 'Elegante'],
    is_premium: true
  },
  {
    name: 'Bolo de Chocolate com Mousse',
    description: 'Bolo de chocolate com camada de mousse',
    category: 'Sobremesas',
    difficulty: 'Difícil',
    prep_time: 40,
    cook_time: 30,
    servings: 12,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ingredients: [
      { name: 'Farinha', amount: '150', unit: 'g' },
      { name: 'Cacau', amount: '50', unit: 'g' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Óleo', amount: '80', unit: 'ml' },
      { name: 'Fermento', amount: '1', unit: 'colher de chá' },
      { name: 'Chocolate para mousse', amount: '300', unit: 'g' },
      { name: 'Natas', amount: '400', unit: 'ml' }
    ],
    instructions: [
      'Fazer bolo misturando ingredientes secos e líquidos',
      'Cozer a 180°C por 30 minutos',
      'Derreter chocolate e deixar arrefecer',
      'Bater natas e incorporar ao chocolate',
      'Cortar bolo ao meio e rechear com mousse',
      'Cobrir com restante mousse',
      'Refrigerar 4 horas'
    ],
    nutrition: { calories: 450, protein: 6, carbs: 48, fat: 26, fiber: 3 },
    tags: ['Chocolate', 'Mousse', 'Sofisticado', 'Festivo'],
    is_premium: true
  },
  {
    name: 'Arroz de Leite com Doce de Ovos',
    description: 'Arroz doce com camada de doce de ovos',
    category: 'Sobremesas',
    difficulty: 'Média',
    prep_time: 20,
    cook_time: 35,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
    ingredients: [
      { name: 'Arroz', amount: '200', unit: 'g' },
      { name: 'Leite', amount: '1', unit: 'L' },
      { name: 'Açúcar', amount: '150', unit: 'g' },
      { name: 'Gemas', amount: '8', unit: 'unidades' },
      { name: 'Canela', amount: '1', unit: 'pau' },
      { name: 'Casca de limão', amount: '1', unit: 'unidade' }
    ],
    instructions: [
      'Fazer arroz doce tradicional',
      'Fazer doce de ovos com gemas e açúcar',
      'Colocar arroz doce em taças',
      'Cobrir com doce de ovos',
      'Polvilhar com canela'
    ],
    nutrition: { calories: 340, protein: 8, carbs: 56, fat: 9, fiber: 0 },
    tags: ['Tradicional', 'Cremoso', 'Ovos', 'Festivo'],
    is_premium: false
  },
  {
    name: 'Semifrio de Bolacha',
    description: 'Semifrio cremoso com bolachas',
    category: 'Sobremesas',
    difficulty: 'Fácil',
    prep_time: 25,
    cook_time: 0,
    servings: 10,
    image_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800',
    ingredients: [
      { name: 'Natas', amount: '500', unit: 'ml' },
      { name: 'Leite condensado', amount: '1', unit: 'lata' },
      { name: 'Bolachas Maria', amount: '2', unit: 'pacotes' },
      { name: 'Café', amount: '200', unit: 'ml' },
      { name: 'Chocolate ralado', amount: '50', unit: 'g' }
    ],
    instructions: [
      'Bater natas até ficarem firmes',
      'Juntar leite condensado',
      'Molhar bolachas no café',
      'Alternar camadas em forma de bolo inglês',
      'Terminar com creme e chocolate',
      'Congelar por 4 horas'
    ],
    nutrition: { calories: 360, protein: 5, carbs: 42, fat: 19, fiber: 1 },
    tags: ['Gelado', 'Café', 'Sem forno', 'Festivo'],
    is_premium: false
  }
];

async function populateRecipes() {
  console.log('🍰 Iniciando população de receitas de sobremesas...');

  for (const receita of sobremesas) {
    try {
      // Verificar se receita já existe
      const { data: existing } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', receita.name)
        .single();

      if (existing) {
        console.log(`⏭️  Receita "${receita.name}" já existe, pulando...`);
        continue;
      }

      // Inserir receita
      const { error } = await supabase
        .from('recipes')
        .insert([receita]);

      if (error) {
        console.error(`❌ Erro ao inserir "${receita.name}":`, error.message);
      } else {
        console.log(`✅ Receita "${receita.name}" adicionada com sucesso!`);
      }
    } catch (err) {
      console.error(`❌ Erro ao processar "${receita.name}":`, err);
    }
  }

  console.log('🎉 População de receitas concluída!');
}

// Executar se chamado diretamente
if (require.main === module) {
  populateRecipes()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Erro fatal:', err);
      process.exit(1);
    });
}

export { populateRecipes, sobremesas };
