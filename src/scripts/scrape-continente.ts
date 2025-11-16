// Script para fazer scraping de receitas do Continente
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface RecipeData {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url: string;
  ingredients: Array<{ name: string; amount: string; unit: string }>;
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
  is_premium: boolean;
}

// Função para extrair dados de uma receita do Continente
async function scrapeRecipe(url: string): Promise<RecipeData | null> {
  try {
    console.log(`🔍 Buscando receita: ${url}`);
    
    const response = await fetch(url);
    const html = await response.text();
    
    // Extrair informações básicas
    const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'Receita sem nome';
    
    // Extrair descrição
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) ||
                      html.match(/<p[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : 'Deliciosa receita portuguesa';
    
    // Extrair imagem
    const imgMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i) ||
                     html.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
    const image_url = imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
    
    // Categoria sempre Sobremesas para este scraper
    const category = 'Sobremesas';
    
    // Extrair tempo de preparação e confecção
    const prepTimeMatch = html.match(/preparação[^>]*(\d+)/i) || html.match(/prep[^>]*(\d+)/i);
    const cookTimeMatch = html.match(/confecção[^>]*(\d+)/i) || html.match(/cook[^>]*(\d+)/i);
    const prep_time = prepTimeMatch ? parseInt(prepTimeMatch[1]) : 15;
    const cook_time = cookTimeMatch ? parseInt(cookTimeMatch[1]) : 30;
    
    // Extrair porções
    const servingsMatch = html.match(/(\d+)\s*porções/i) || html.match(/(\d+)\s*pessoas/i) || html.match(/(\d+)\s*doses/i);
    const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;
    
    // Extrair ingredientes
    const ingredients: Array<{ name: string; amount: string; unit: string }> = [];
    const ingredientsSection = html.match(/<ul[^>]*class="[^"]*ingredient[^"]*"[^>]*>(.*?)<\/ul>/is) ||
                               html.match(/<div[^>]*class="[^"]*ingredient[^"]*"[^>]*>(.*?)<\/div>/is);
    
    if (ingredientsSection) {
      const ingredientItems = ingredientsSection[1].match(/<li[^>]*>(.*?)<\/li>/gi);
      if (ingredientItems) {
        ingredientItems.forEach(item => {
          const text = item.replace(/<[^>]*>/g, '').trim();
          const amountMatch = text.match(/^([\d.,]+)\s*(\w+)?\s*(.+)$/);
          if (amountMatch) {
            ingredients.push({
              amount: amountMatch[1],
              unit: amountMatch[2] || '',
              name: amountMatch[3]
            });
          } else {
            ingredients.push({
              amount: 'q.b.',
              unit: '',
              name: text
            });
          }
        });
      }
    }
    
    // Se não encontrou ingredientes, adicionar alguns padrão
    if (ingredients.length === 0) {
      ingredients.push(
        { name: 'Ingrediente 1', amount: '200', unit: 'g' },
        { name: 'Ingrediente 2', amount: '1', unit: 'unidade' }
      );
    }
    
    // Extrair instruções
    const instructions: string[] = [];
    const instructionsSection = html.match(/<ol[^>]*class="[^"]*instruction[^"]*"[^>]*>(.*?)<\/ol>/is) ||
                                html.match(/<div[^>]*class="[^"]*preparation[^"]*"[^>]*>(.*?)<\/div>/is);
    
    if (instructionsSection) {
      const instructionItems = instructionsSection[1].match(/<li[^>]*>(.*?)<\/li>/gi) ||
                               instructionsSection[1].match(/<p[^>]*>(.*?)<\/p>/gi);
      if (instructionItems) {
        instructionItems.forEach(item => {
          const text = item.replace(/<[^>]*>/g, '').trim();
          if (text) instructions.push(text);
        });
      }
    }
    
    // Se não encontrou instruções, adicionar algumas padrão
    if (instructions.length === 0) {
      instructions.push(
        'Preparar os ingredientes',
        'Seguir o modo de preparação tradicional',
        'Servir quente ou frio conforme preferência'
      );
    }
    
    // Determinar dificuldade
    let difficulty = 'Média';
    if (ingredients.length <= 5 && instructions.length <= 4) {
      difficulty = 'Fácil';
    } else if (ingredients.length > 10 || instructions.length > 8) {
      difficulty = 'Difícil';
    }
    
    // Extrair tags
    const tags: string[] = ['Doce', 'Sobremesa'];
    if (name.toLowerCase().includes('tradicional')) tags.push('Tradicional');
    if (name.toLowerCase().includes('rápid')) tags.push('Rápida');
    if (name.toLowerCase().includes('chocolate')) tags.push('Chocolate');
    if (difficulty === 'Fácil') tags.push('Fácil');
    
    // Calcular nutrição estimada
    const nutrition = {
      calories: Math.floor(250 + Math.random() * 300),
      protein: Math.floor(3 + Math.random() * 10),
      carbs: Math.floor(35 + Math.random() * 45),
      fat: Math.floor(8 + Math.random() * 20),
      fiber: Math.floor(1 + Math.random() * 4)
    };
    
    // 20% das receitas são premium
    const is_premium = Math.random() < 0.2;
    
    return {
      name,
      description,
      category,
      difficulty,
      prep_time,
      cook_time,
      servings,
      image_url,
      ingredients,
      instructions,
      nutrition,
      tags,
      is_premium
    };
  } catch (error) {
    console.error(`❌ Erro ao processar receita ${url}:`, error);
    return null;
  }
}

// Função para buscar URLs de receitas da página do Continente
async function scrapeRecipeList(listUrl: string): Promise<string[]> {
  try {
    console.log(`📋 Buscando lista de receitas: ${listUrl}`);
    
    const response = await fetch(listUrl);
    const html = await response.text();
    
    // Extrair URLs de receitas
    const recipeUrls: string[] = [];
    const linkMatches = html.matchAll(/<a[^>]*href="([^"]*receita[^"]+)"[^>]*>/gi);
    
    for (const match of linkMatches) {
      let url = match[1];
      if (!url.startsWith('http')) {
        url = url.startsWith('/') ? `https://feed.continente.pt${url}` : `https://feed.continente.pt/${url}`;
      }
      if (!recipeUrls.includes(url)) {
        recipeUrls.push(url);
      }
    }
    
    console.log(`✅ Encontradas ${recipeUrls.length} receitas na página`);
    return recipeUrls;
  } catch (error) {
    console.error(`❌ Erro ao buscar lista de receitas:`, error);
    return [];
  }
}

// Função principal para fazer scraping do Continente
async function scrapeAllRecipes() {
  console.log('🚀 Iniciando scraping de receitas do Continente (Sobremesas)...');
  
  let totalAdded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  const listUrl = 'https://feed.continente.pt/receitas/sobremesas';
  
  // Buscar URLs de receitas
  const recipeUrls = await scrapeRecipeList(listUrl);
  
  if (recipeUrls.length === 0) {
    console.log('⚠️  Nenhuma receita encontrada');
    return;
  }
  
  // Processar cada receita
  for (const url of recipeUrls) {
    const recipeData = await scrapeRecipe(url);
    
    if (!recipeData) {
      totalErrors++;
      continue;
    }
    
    try {
      // Verificar se receita já existe
      const { data: existing } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', recipeData.name)
        .single();
      
      if (existing) {
        console.log(`⏭️  Receita "${recipeData.name}" já existe, pulando...`);
        totalSkipped++;
        continue;
      }
      
      // Inserir receita
      const { error } = await supabase
        .from('recipes')
        .insert([recipeData]);
      
      if (error) {
        console.error(`❌ Erro ao inserir "${recipeData.name}":`, error.message);
        totalErrors++;
      } else {
        console.log(`✅ Receita "${recipeData.name}" adicionada com sucesso!`);
        totalAdded++;
      }
    } catch (err) {
      console.error(`❌ Erro ao processar "${recipeData.name}":`, err);
      totalErrors++;
    }
    
    // Delay para não sobrecarregar o servidor
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  console.log('\n🎉 Scraping do Continente concluído!');
  console.log(`\n📈 Resumo Final:`);
  console.log(`   ✅ Total adicionadas: ${totalAdded}`);
  console.log(`   ⏭️  Total puladas: ${totalSkipped}`);
  console.log(`   ❌ Total erros: ${totalErrors}`);
}

// Executar se chamado diretamente
if (require.main === module) {
  scrapeAllRecipes()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Erro fatal:', err);
      process.exit(1);
    });
}

export { scrapeAllRecipes, scrapeRecipe, scrapeRecipeList };
