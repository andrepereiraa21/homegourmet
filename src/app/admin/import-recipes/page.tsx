'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle, AlertCircle, Loader2, Download, Link as LinkIcon } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

interface RecipeData {
  name: string;
  description?: string;
  category: string;
  difficulty?: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  image_url?: string;
  ingredients?: string[];
  instructions?: string[];
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[];
  is_premium?: boolean;
}

// Função para gerar UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function ImportRecipesPage() {
  const [loading, setLoading] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);
  const [progress, setProgress] = useState<string>('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [bulkUrl, setBulkUrl] = useState('');

  const handleSingleImport = async () => {
    if (!recipeUrl.trim()) {
      setResult({
        success: false,
        message: '❌ Por favor, insira uma URL válida'
      });
      return;
    }

    setLoadingSingle(true);
    setResult(null);
    setProgress('Analisando receita...');

    try {
      // Chamar API para extrair dados da receita
      const response = await fetch('/api/import-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: recipeUrl }),
      });

      // Verificar se a resposta é JSON válido
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao importar receita');
      }

      setProgress('Salvando receita no banco de dados...');

      const supabase = getSupabase();

      // Inserir receita no banco com ID gerado manualmente
      const recipeToInsert = {
        id: generateUUID(),
        name: data.recipe.name,
        description: data.recipe.description || '',
        category: data.recipe.category,
        difficulty: data.recipe.difficulty || 'Média',
        prep_time: data.recipe.prep_time || 30,
        cook_time: data.recipe.cook_time || 30,
        servings: data.recipe.servings || 4,
        image_url: data.recipe.image_url || '',
        ingredients: data.recipe.ingredients || [],
        instructions: data.recipe.instructions || [],
        nutrition: data.recipe.nutrition || {},
        tags: data.recipe.tags || [],
        is_premium: data.recipe.is_premium || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: insertedData, error } = await supabase
        .from('recipes')
        .insert([recipeToInsert])
        .select();

      if (error) throw error;

      setResult({
        success: true,
        message: `✅ Receita "${data.recipe.name}" importada com sucesso!`,
        count: 1
      });
      setProgress('');
      setRecipeUrl('');
    } catch (error: any) {
      setResult({
        success: false,
        message: `❌ Erro: ${error.message}`
      });
      setProgress('');
    } finally {
      setLoadingSingle(false);
    }
  };

  const handleAutoImport = async () => {
    setLoading(true);
    setResult(null);
    setProgress('Iniciando importação em massa...');

    try {
      // Chamar API para buscar múltiplas receitas
      setProgress('Buscando receitas...');
      
      const response = await fetch('/api/import-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          bulk: true,
          bulkUrl: bulkUrl.trim() || undefined
        }),
      });

      // Verificar se a resposta é JSON válido
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao importar receitas');
      }

      const recipes = data.recipes || [];

      if (recipes.length === 0) {
        throw new Error('Nenhuma receita encontrada. O site pode ter mudado sua estrutura.');
      }

      setProgress(`Importando ${recipes.length} receitas para o banco de dados...`);

      const supabase = getSupabase();

      // Inserir receitas no banco com IDs gerados manualmente
      const recipesToInsert = recipes.map((recipe: RecipeData) => ({
        id: generateUUID(),
        name: recipe.name,
        description: recipe.description || '',
        category: recipe.category,
        difficulty: recipe.difficulty || 'Média',
        prep_time: recipe.prep_time || 30,
        cook_time: recipe.cook_time || 30,
        servings: recipe.servings || 4,
        image_url: recipe.image_url || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        nutrition: recipe.nutrition || {},
        tags: recipe.tags || [],
        is_premium: recipe.is_premium || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { data: insertedData, error } = await supabase
        .from('recipes')
        .insert(recipesToInsert)
        .select();

      if (error) throw error;

      setResult({
        success: true,
        message: `✅ ${insertedData.length} receitas importadas com sucesso!`,
        count: insertedData.length
      });
      setProgress('');
      setBulkUrl('');
    } catch (error: any) {
      setResult({
        success: false,
        message: `❌ Erro: ${error.message}`
      });
      setProgress('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            🍽️ Importar Receitas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Importe receitas específicas por URL ou todas de uma vez
          </p>
        </div>

        {/* Card de importação por URL */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 border-0 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <LinkIcon className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">
              📝 Importar Receita Específica
            </h2>
            <p className="text-blue-50 text-lg mb-6 max-w-2xl mx-auto">
              Cole a URL de uma receita para importá-la com todos os detalhes
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="Cole aqui a URL da receita"
                  value={recipeUrl}
                  onChange={(e) => setRecipeUrl(e.target.value)}
                  className="flex-1 bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg py-6"
                  disabled={loadingSingle}
                />
                <Button
                  onClick={handleSingleImport}
                  disabled={loadingSingle || !recipeUrl.trim()}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {loadingSingle ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>

            {progress && loadingSingle && (
              <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white font-medium">{progress}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Card principal de importação em massa */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">
              📦 Importação em Massa
            </h2>
            <p className="text-emerald-50 text-lg mb-6 max-w-2xl mx-auto">
              Cole um link de página com múltiplas receitas ou deixe em branco para usar a página padrão
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <Input
                type="url"
                placeholder="Cole aqui a URL da página com receitas (opcional)"
                value={bulkUrl}
                onChange={(e) => setBulkUrl(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg py-6 mb-4"
                disabled={loading}
              />
              
              <Button
                onClick={handleAutoImport}
                disabled={loading}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Importando...
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6 mr-3" />
                    Importar Todas as Receitas
                  </>
                )}
              </Button>
            </div>

            {progress && loading && (
              <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white font-medium">{progress}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Resultado */}
        {result && (
          <Card className={`p-6 mb-6 ${
            result.success 
              ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500' 
              : 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500'
          }`}>
            <div className="flex items-start gap-4">
              {result.success ? (
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
              )}
              <div>
                <p className={`text-lg font-semibold mb-1 ${
                  result.success 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {result.message}
                </p>
                {result.success && result.count && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {result.count === 1 
                      ? 'Receita adicionada ao banco de dados' 
                      : `Total de ${result.count} receitas adicionadas`}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Informações */}
        <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Como Funciona
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📝 Importação Individual:</h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Cole a URL completa de uma receita</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>O sistema extrai automaticamente: nome, ingredientes, instruções, tempos, imagens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Receita fica disponível imediatamente no app com todos os detalhes</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📦 Importação em Massa:</h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Cole um link de uma página com múltiplas receitas (ex: página de pesquisa, categoria)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Ou deixe em branco para usar a página padrão</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>A IA analisa o link e importa automaticamente todas as receitas encontradas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Ideal para popular rapidamente o banco de dados</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
