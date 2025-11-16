'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Users, Flame, ChefHat, ShoppingCart, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { Recipe, Ingredient } from '@/lib/types';
import { mockRecipes } from '@/lib/mock-data';
import Image from 'next/image';
import { getSupabase } from '@/lib/supabase';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  addedAt: string;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
    
    // Load user ingredients
    const stored = localStorage.getItem('scannedIngredients');
    if (stored) {
      setIngredients(JSON.parse(stored));
    }
  }, [params.id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const supabase = getSupabase();
      
      // Buscar receita do Supabase primeiro
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Erro ao buscar receita do Supabase:', error);
        // Fallback para mockRecipes
        const foundRecipe = mockRecipes.find(r => r.id === params.id);
        setRecipe(foundRecipe || null);
      } else if (data) {
        console.log('Dados brutos do Supabase:', data);
        
        // Converter dados do Supabase para o formato Recipe
        
        // Processar ingredientes - GARANTIR que sempre seja um array válido
        let processedIngredients: Ingredient[] = [];
        
        if (data.ingredients) {
          // Se ingredients é uma string JSON, fazer parse
          let ingredientsData = data.ingredients;
          if (typeof ingredientsData === 'string') {
            try {
              ingredientsData = JSON.parse(ingredientsData);
            } catch (e) {
              console.error('Erro ao fazer parse de ingredients:', e);
              ingredientsData = [];
            }
          }
          
          // Agora processar o array
          if (Array.isArray(ingredientsData) && ingredientsData.length > 0) {
            processedIngredients = ingredientsData.map((ing: any) => {
              // Se já é um objeto estruturado
              if (typeof ing === 'object' && ing !== null && ing.name) {
                return {
                  name: String(ing.name || ''),
                  quantity: Number(ing.quantity) || 1,
                  unit: String(ing.unit || 'q.b.')
                };
              }
              // Se é uma string, parsear
              else if (typeof ing === 'string') {
                return parseIngredientString(ing);
              }
              // Fallback
              return { name: String(ing), quantity: 1, unit: 'q.b.' };
            });
          }
        }

        console.log('Ingredientes processados:', processedIngredients);

        // Processar instruções - GARANTIR que sempre seja um array válido
        let processedInstructions: string[] = [];
        
        if (data.instructions) {
          // Se instructions é uma string JSON, fazer parse
          let instructionsData = data.instructions;
          if (typeof instructionsData === 'string') {
            try {
              instructionsData = JSON.parse(instructionsData);
            } catch (e) {
              console.error('Erro ao fazer parse de instructions:', e);
              instructionsData = [];
            }
          }
          
          // Agora processar o array
          if (Array.isArray(instructionsData) && instructionsData.length > 0) {
            processedInstructions = instructionsData
              .map((inst: any) => String(inst || '').trim())
              .filter((inst: string) => inst.length > 0);
          }
        }

        console.log('Instruções processadas:', processedInstructions);

        const formattedRecipe: Recipe = {
          id: data.id,
          title: data.name,
          description: data.description || '',
          imageUrl: data.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
          prepTime: data.prep_time || 30,
          cookTime: data.cook_time || 30,
          servings: data.servings || 4,
          difficulty: data.difficulty?.toLowerCase() === 'fácil' ? 'easy' : 
                     data.difficulty?.toLowerCase() === 'difícil' ? 'hard' : 'medium',
          calories: data.nutrition?.calories || 350,
          ingredients: processedIngredients,
          instructions: processedInstructions,
          tags: data.tags || [],
          isPremium: data.is_premium || false
        };
        
        console.log('Receita formatada final:', formattedRecipe);
        setRecipe(formattedRecipe);
      } else {
        // Se não encontrou no Supabase, buscar em mockRecipes
        const foundRecipe = mockRecipes.find(r => r.id === params.id);
        setRecipe(foundRecipe || null);
      }
    } catch (err) {
      console.error('Erro ao carregar receita:', err);
      // Fallback para mockRecipes
      const foundRecipe = mockRecipes.find(r => r.id === params.id);
      setRecipe(foundRecipe || null);
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para parsear ingrediente de string
  const parseIngredientString = (ingredientText: string): Ingredient => {
    const patterns = [
      /^(\d+(?:[.,]\d+)?)\s*([a-zA-Zç]+)\s+(?:de\s+)?(.+)$/i,
      /^(\d+(?:[.,]\d+)?)\s+(.+)$/i,
      /^(\d+(?:[.,]\d+)?)\s+(colheres?|xícaras?|copos?)\s+(?:de\s+)?([^d]+?)(?:\s+de\s+)?(.+)$/i,
    ];

    for (const pattern of patterns) {
      const match = ingredientText.match(pattern);
      if (match) {
        if (match.length === 5 && match[3].match(/sopa|chá|café/i)) {
          return {
            name: match[4].trim(),
            quantity: parseFloat(match[1].replace(',', '.')),
            unit: `${match[2]} de ${match[3]}`.trim()
          };
        } else if (match.length === 4) {
          return {
            name: match[3].trim(),
            quantity: parseFloat(match[1].replace(',', '.')),
            unit: match[2].trim()
          };
        } else if (match.length === 3) {
          return {
            name: match[2].trim(),
            quantity: parseFloat(match[1].replace(',', '.')),
            unit: 'unidade(s)'
          };
        }
      }
    }

    return {
      name: ingredientText.trim(),
      quantity: 1,
      unit: 'q.b.'
    };
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const missingIngredients = recipe?.ingredients.filter(
    recipeIng => !ingredients.some(userIng => 
      userIng.name.toLowerCase() === recipeIng.name.toLowerCase()
    )
  ) || [];

  const addToShoppingList = () => {
    // Load existing shopping list
    const stored = localStorage.getItem('shoppingList');
    const currentList: ShoppingItem[] = stored ? JSON.parse(stored) : [];

    // Add missing ingredients to shopping list
    const newItems: ShoppingItem[] = missingIngredients.map(ing => ({
      id: `${Date.now()}-${Math.random()}`,
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
      checked: false,
      addedAt: new Date().toISOString(),
    }));

    // Filter out duplicates (check if ingredient already exists in list)
    const itemsToAdd = newItems.filter(newItem => 
      !currentList.some(existingItem => 
        existingItem.name.toLowerCase() === newItem.name.toLowerCase()
      )
    );

    if (itemsToAdd.length > 0) {
      const updatedList = [...currentList, ...itemsToAdd];
      localStorage.setItem('shoppingList', JSON.stringify(updatedList));

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando receita...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 p-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Receita não encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A receita que você está procurando não existe ou foi removida.
          </p>
          <Button
            onClick={() => router.push('/recipes')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
          >
            Ver Todas as Receitas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 pb-20">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96">
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        
        {/* Header Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg"
            >
              <Heart className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-lg"
            >
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Recipe Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {recipe.title}
          </h1>
          <p className="text-white/90 text-lg">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recipe.prepTime}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">minutos</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recipe.servings}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">porções</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{recipe.calories}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">kcal</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <ChefHat className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">{recipe.difficulty}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">dificuldade</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500 rounded-2xl p-4 mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                Ingredientes adicionados à lista de compras!
              </p>
            </div>
          </div>
        )}

        {/* Missing Ingredients Alert */}
        {missingIngredients.length > 0 && (
          <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <ShoppingCart className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 mb-2">
                  Ingredientes em Falta
                </h3>
                <p className="text-orange-600 dark:text-orange-500 mb-4">
                  Você precisa de {missingIngredients.length} ingredientes adicionais:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {missingIngredients.map((ing, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {ing.name} ({ing.quantity} {ing.unit})
                      </span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                  onClick={addToShoppingList}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar à Lista de Compras
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ingredientes
          </h2>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => {
                const hasIngredient = ingredients.some(
                  userIng => userIng.name.toLowerCase() === ingredient.name.toLowerCase()
                );
                
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      hasIngredient
                        ? 'bg-emerald-50 dark:bg-emerald-900/20'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          hasIngredient
                            ? 'bg-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        {hasIngredient && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`font-medium ${
                        hasIngredient
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {ingredient.name}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                Nenhum ingrediente disponível para esta receita
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Os ingredientes podem não ter sido importados corretamente
              </p>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Modo de Preparo
          </h2>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    completedSteps.includes(index)
                      ? 'bg-emerald-50 dark:bg-emerald-900/20'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => toggleStep(index)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                      completedSteps.includes(index)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={`flex-1 ${
                    completedSteps.includes(index)
                      ? 'text-emerald-700 dark:text-emerald-400 line-through'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                Nenhuma instrução disponível para esta receita
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                As instruções podem não ter sido importadas corretamente
              </p>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
