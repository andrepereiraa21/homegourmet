import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, bulk, bulkUrl } = body;

    // Importação em massa
    if (bulk) {
      return await handleBulkImport(bulkUrl);
    }

    // Importação individual
    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    // Fazer requisição para a URL da receita
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Não foi possível acessar a receita' },
        { status: 500 }
      );
    }

    const html = await response.text();

    // Extrair dados da receita usando regex e parsing básico
    const recipeData = await extractRecipeData(html);

    return NextResponse.json({
      success: true,
      recipe: recipeData
    });
  } catch (error: any) {
    console.error('Erro ao importar receita:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao importar receita' },
      { status: 500 }
    );
  }
}

async function handleBulkImport(customUrl?: string) {
  try {
    // Usar URL customizada ou padrão
    const targetUrl = customUrl || 'https://www.pingodoce.pt/receitas/pesquisa/?cp=2';
    
    // Buscar página de listagem de receitas
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Não foi possível acessar a página de receitas' },
        { status: 500 }
      );
    }

    const html = await response.text();

    // Extrair URLs de receitas da página de listagem
    const recipeUrls = extractRecipeUrls(html);

    if (recipeUrls.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma receita encontrada na página' },
        { status: 404 }
      );
    }

    // Limitar a 10 receitas para não sobrecarregar
    const limitedUrls = recipeUrls.slice(0, 10);

    // Buscar detalhes de cada receita
    const recipes = [];
    for (const recipeUrl of limitedUrls) {
      try {
        const recipeResponse = await fetch(recipeUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        if (recipeResponse.ok) {
          const recipeHtml = await recipeResponse.text();
          const recipeData = await extractRecipeData(recipeHtml);
          recipes.push(recipeData);
        }
      } catch (err) {
        console.error(`Erro ao buscar receita ${recipeUrl}:`, err);
        // Continuar com as próximas receitas
      }
    }

    if (recipes.length === 0) {
      return NextResponse.json(
        { error: 'Não foi possível extrair dados das receitas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      recipes: recipes
    });
  } catch (error: any) {
    console.error('Erro na importação em massa:', error);
    return NextResponse.json(
      { error: error.message || 'Erro na importação em massa' },
      { status: 500 }
    );
  }
}

function extractRecipeUrls(html: string): string[] {
  const urls: string[] = [];
  
  // Tentar diferentes padrões de URLs de receitas
  const patterns = [
    /href="(https:\/\/www\.pingodoce\.pt\/receitas\/[^"]+)"/gi,
    /href="(\/receitas\/[^"]+)"/gi
  ];

  for (const pattern of patterns) {
    const matches = html.matchAll(pattern);
    for (const match of matches) {
      let url = match[1];
      
      // Se for URL relativa, adicionar domínio
      if (url.startsWith('/')) {
        url = `https://www.pingodoce.pt${url}`;
      }
      
      // Evitar duplicatas e URLs de pesquisa
      if (!url.includes('/pesquisa/') && !urls.includes(url)) {
        urls.push(url);
      }
    }
  }

  return urls;
}

async function generateRecipeImage(recipeName: string): Promise<string> {
  try {
    // Gerar imagem usando DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Uma foto profissional e apetitosa de ${recipeName}, estilo culinário, iluminação natural, alta qualidade, foco no prato principal`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error('Erro ao gerar imagem com OpenAI:', error);
    return ''; // Retorna string vazia se falhar
  }
}

function parseIngredient(ingredientText: string) {
  // Tentar extrair quantidade, unidade e nome do ingrediente
  // Exemplos: "200g de farinha", "2 ovos", "1 colher de sopa de açúcar"
  
  const patterns = [
    // Padrão: "200g de farinha" ou "200 g de farinha"
    /^(\d+(?:[.,]\d+)?)\s*([a-zA-Zç]+)\s+(?:de\s+)?(.+)$/i,
    // Padrão: "2 ovos" ou "3 cenouras"
    /^(\d+(?:[.,]\d+)?)\s+(.+)$/i,
    // Padrão: "1 colher de sopa de açúcar"
    /^(\d+(?:[.,]\d+)?)\s+(colheres?|xícaras?|copos?)\s+(?:de\s+)?([^d]+?)(?:\s+de\s+)?(.+)$/i,
  ];

  for (const pattern of patterns) {
    const match = ingredientText.match(pattern);
    if (match) {
      if (match.length === 4 && match[3].match(/sopa|chá|café/i)) {
        // Caso especial: "1 colher de sopa de açúcar"
        return {
          name: match[4].trim(),
          quantity: parseFloat(match[1].replace(',', '.')),
          unit: `${match[2]} de ${match[3]}`.trim()
        };
      } else if (match.length === 4) {
        // Caso: "200g de farinha"
        return {
          name: match[3].trim(),
          quantity: parseFloat(match[1].replace(',', '.')),
          unit: match[2].trim()
        };
      } else if (match.length === 3) {
        // Caso: "2 ovos"
        return {
          name: match[2].trim(),
          quantity: parseFloat(match[1].replace(',', '.')),
          unit: 'unidade(s)'
        };
      }
    }
  }

  // Se não conseguiu parsear, retornar formato padrão
  return {
    name: ingredientText.trim(),
    quantity: 1,
    unit: 'q.b.'
  };
}

async function extractRecipeData(html: string) {
  // Extrair título
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const name = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Receita sem nome';

  // Extrair descrição
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Gerar imagem com OpenAI baseada no nome da receita
  const image_url = await generateRecipeImage(name);

  // Extrair tempo de preparação
  const prepTimeMatch = html.match(/Tempo de preparação[:\s]*(\d+)\s*min/i);
  const prep_time = prepTimeMatch ? parseInt(prepTimeMatch[1]) : 30;

  // Extrair tempo de cozedura
  const cookTimeMatch = html.match(/Tempo de cozedura[:\s]*(\d+)\s*min/i);
  const cook_time = cookTimeMatch ? parseInt(cookTimeMatch[1]) : 30;

  // Extrair doses
  const servingsMatch = html.match(/(\d+)\s*doses?/i);
  const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;

  // Extrair dificuldade
  let difficulty = 'Média';
  if (html.match(/Fácil/i)) difficulty = 'Fácil';
  if (html.match(/Difícil/i)) difficulty = 'Difícil';

  // Extrair ingredientes
  const ingredientsRaw: string[] = [];
  const ingredientsSection = html.match(/<ul[^>]*class="[^"]*ingredients[^"]*"[^>]*>(.*?)<\/ul>/is);
  if (ingredientsSection) {
    const ingredientMatches = ingredientsSection[1].matchAll(/<li[^>]*>(.*?)<\/li>/gi);
    for (const match of ingredientMatches) {
      const ingredient = match[1].replace(/<[^>]*>/g, '').trim();
      if (ingredient) ingredientsRaw.push(ingredient);
    }
  }

  // Se não encontrou ingredientes com a primeira abordagem, tentar outra
  if (ingredientsRaw.length === 0) {
    const allLiMatches = html.matchAll(/<li[^>]*>(.*?)<\/li>/gi);
    let inIngredientsSection = false;
    
    for (const match of allLiMatches) {
      const content = match[1].replace(/<[^>]*>/g, '').trim();
      
      // Detectar se estamos na seção de ingredientes
      if (content.match(/ingredientes/i)) {
        inIngredientsSection = true;
        continue;
      }
      
      // Detectar se saímos da seção de ingredientes
      if (content.match(/preparação|confecção|modo de preparo/i)) {
        inIngredientsSection = false;
        continue;
      }
      
      // Se estamos na seção e o conteúdo parece um ingrediente
      if (inIngredientsSection && content.length > 3 && content.length < 200) {
        ingredientsRaw.push(content);
      }
    }
  }

  // Converter ingredientes para formato estruturado
  const ingredients = ingredientsRaw.map(ing => parseIngredient(ing));

  // Extrair instruções
  const instructions: string[] = [];
  const instructionsSection = html.match(/<ol[^>]*class="[^"]*instructions[^"]*"[^>]*>(.*?)<\/ol>/is);
  if (instructionsSection) {
    const instructionMatches = instructionsSection[1].matchAll(/<li[^>]*>(.*?)<\/li>/gi);
    for (const match of instructionMatches) {
      const instruction = match[1].replace(/<[^>]*>/g, '').trim();
      if (instruction) instructions.push(instruction);
    }
  }

  // Se não encontrou instruções, tentar extrair de parágrafos numerados
  if (instructions.length === 0) {
    const numberedSteps = html.matchAll(/(?:^|\n)\s*(\d+)[.)\s]+([^\n]+)/gm);
    for (const match of numberedSteps) {
      const instruction = match[2].trim();
      if (instruction.length > 10) {
        instructions.push(instruction);
      }
    }
  }

  // Extrair categoria
  let category = 'Geral';
  const categoryMatch = html.match(/categoria[:\s]*([^<\n]+)/i);
  if (categoryMatch) {
    category = categoryMatch[1].trim();
  } else if (html.match(/carne/i)) {
    category = 'Carnes';
  } else if (html.match(/peixe|marisco/i)) {
    category = 'Peixes e Mariscos';
  } else if (html.match(/sobremesa|doce/i)) {
    category = 'Sobremesas';
  } else if (html.match(/sopa/i)) {
    category = 'Sopas';
  }

  return {
    name,
    description,
    category,
    difficulty,
    prep_time,
    cook_time,
    servings,
    image_url,
    ingredients, // Agora é array de objetos { name, quantity, unit }
    instructions, // Array de strings
    tags: ['Importado'],
    is_premium: false
  };
}
