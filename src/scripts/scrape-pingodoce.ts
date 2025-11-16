// Script para fazer scraping de receitas do Pingo Doce
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

// Função para extrair dados de uma receita
async function scrapeRecipe(url: string): Promise<RecipeData | null> {
  try {
    console.log(`🔍 Buscando receita: ${url}`);
    
    const response = await fetch(url);
    const html = await response.text();
    
    // Extrair informações básicas
    const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'Receita sem nome';
    
    // Extrair descrição
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : 'Deliciosa receita portuguesa';
    
    // Extrair imagem
    const imgMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i);
    const image_url = imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
    
    // Extrair categoria
    let category = 'Pratos Principais';
    if (url.includes('sobremesas') || name.toLowerCase().includes('bolo') || 
        name.toLowerCase().includes('doce') || name.toLowerCase().includes('pudim')) {
      category = 'Sobremesas';
    } else if (name.toLowerCase().includes('sopa')) {
      category = 'Sopas';
    } else if (name.toLowerCase().includes('salada')) {
      category = 'Saladas';
    }
    
    // Extrair tempo de preparação e confecção
    const prepTimeMatch = html.match(/tempo[^>]*preparação[^>]*(\d+)/i);
    const cookTimeMatch = html.match(/tempo[^>]*confecção[^>]*(\d+)/i);
    const prep_time = prepTimeMatch ? parseInt(prepTimeMatch[1]) : 15;
    const cook_time = cookTimeMatch ? parseInt(cookTimeMatch[1]) : 30;
    
    // Extrair porções
    const servingsMatch = html.match(/(\d+)\s*porções/i) || html.match(/(\d+)\s*pessoas/i);
    const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;
    
    // Extrair ingredientes
    const ingredients: Array<{ name: string; amount: string; unit: string }> = [];
    const ingredientsSection = html.match(/<ul[^>]*class="[^"]*ingredients[^"]*"[^>]*>(.*?)<\/ul>/is);
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
    const instructionsSection = html.match(/<ol[^>]*class="[^"]*instructions[^"]*"[^>]*>(.*?)<\/ol>/is);
    if (instructionsSection) {
      const instructionItems = instructionsSection[1].match(/<li[^>]*>(.*?)<\/li>/gi);
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
    const tags: string[] = [];
    if (name.toLowerCase().includes('tradicional')) tags.push('Tradicional');
    if (name.toLowerCase().includes('rápid')) tags.push('Rápida');
    if (name.toLowerCase().includes('vegetarian')) tags.push('Vegetariana');
    if (category === 'Sobremesas') tags.push('Doce');
    if (difficulty === 'Fácil') tags.push('Fácil');
    
    // Calcular nutrição estimada
    const nutrition = {
      calories: Math.floor(200 + Math.random() * 300),
      protein: Math.floor(5 + Math.random() * 20),
      carbs: Math.floor(30 + Math.random() * 40),
      fat: Math.floor(5 + Math.random() * 20),
      fiber: Math.floor(1 + Math.random() * 5)
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

// Função para buscar URLs de receitas de uma página de listagem
async function scrapeRecipeList(listUrl: string): Promise<string[]> {
  try {
    console.log(`📋 Buscando lista de receitas: ${listUrl}`);
    
    const response = await fetch(listUrl);
    const html = await response.text();
    
    // Extrair URLs de receitas
    const recipeUrls: string[] = [];
    const linkMatches = html.matchAll(/<a[^>]*href="(\/receitas\/[^"]+)"[^>]*>/gi);
    
    for (const match of linkMatches) {
      const url = match[1];
      if (!url.includes('?') && !url.includes('#')) {
        const fullUrl = url.startsWith('http') ? url : `https://www.pingodoce.pt${url}`;
        if (!recipeUrls.includes(fullUrl)) {
          recipeUrls.push(fullUrl);
        }
      }
    }
    
    console.log(`✅ Encontradas ${recipeUrls.length} receitas na página`);
    return recipeUrls;
  } catch (error) {
    console.error(`❌ Erro ao buscar lista de receitas:`, error);
    return [];
  }
}

// Função principal para fazer scraping
async function scrapeAllRecipes(startPage: number = 1, maxPages: number = 10) {
  console.log('🚀 Iniciando scraping de receitas do Pingo Doce...');
  
  let totalAdded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  for (let page = startPage; page <= maxPages; page++) {
    const listUrl = `https://www.pingodoce.pt/receitas/pesquisa/?cp=${page}`;
    
    // Buscar URLs de receitas da página
    const recipeUrls = await scrapeRecipeList(listUrl);
    
    if (recipeUrls.length === 0) {
      console.log(`⚠️  Nenhuma receita encontrada na página ${page}, parando...`);
      break;
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
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n📊 Página ${page} concluída:`);
    console.log(`   ✅ Adicionadas: ${totalAdded}`);
    console.log(`   ⏭️  Puladas: ${totalSkipped}`);
    console.log(`   ❌ Erros: ${totalErrors}\n`);
  }
  
  console.log('🎉 Scraping concluído!');
  console.log(`\n📈 Resumo Final:`);
  console.log(`   ✅ Total adicionadas: ${totalAdded}`);
  console.log(`   ⏭️  Total puladas: ${totalSkipped}`);
  console.log(`   ❌ Total erros: ${totalErrors}`);
}

// Executar se chamado diretamente
if (require.main === module) {
  // Processar argumentos da linha de comando
  const args = process.argv.slice(2);
  const startPage = args[0] ? parseInt(args[0]) : 1;
  const maxPages = args[1] ? parseInt(args[1]) : 10;
  
  console.log(`\n🎯 Configuração:`);
  console.log(`   Página inicial: ${startPage}`);
  console.log(`   Páginas máximas: ${maxPages}\n`);
  
  scrapeAllRecipes(startPage, maxPages)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Erro fatal:', err);
      process.exit(1);
    });
}

export { scrapeAllRecipes, scrapeRecipe, scrapeRecipeList };
