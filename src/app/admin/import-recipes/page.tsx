'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, CheckCircle, AlertCircle, Loader2, ExternalLink, Download } from 'lucide-react';
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

export default function ImportRecipesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);
  const [progress, setProgress] = useState<string>('');

  const handleAutoImport = async () => {
    setLoading(true);
    setResult(null);
    setProgress('Iniciando importação...');

    try {
      // Fazer requisição para buscar as receitas do site
      setProgress('Buscando receitas do Pingo Doce...');
      
      const response = await fetch('https://www.pingodoce.pt/receitas/pesquisa/?cp=2');
      const html = await response.text();
      
      // Parse do HTML para extrair receitas
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extrair receitas (ajustar seletores conforme estrutura real do site)
      const recipeElements = doc.querySelectorAll('.recipe-card, .receita-item, [data-recipe]');
      
      setProgress(`Encontradas ${recipeElements.length} receitas. Processando...`);
      
      const recipes: RecipeData[] = [];
      
      recipeElements.forEach((element, index) => {
        try {
          const name = element.querySelector('h2, h3, .recipe-title, .titulo')?.textContent?.trim() || `Receita ${index + 1}`;
          const description = element.querySelector('.description, .descricao, p')?.textContent?.trim() || '';
          const imageUrl = element.querySelector('img')?.getAttribute('src') || '';
          const category = element.querySelector('.category, .categoria')?.textContent?.trim() || 'Geral';
          
          recipes.push({
            name,
            description,
            category,
            difficulty: 'Média',
            prep_time: 30,
            cook_time: 30,
            servings: 4,
            image_url: imageUrl,
            ingredients: [],
            instructions: [],
            tags: ['Pingo Doce'],
            is_premium: false
          });
        } catch (err) {
          console.error(`Erro ao processar receita ${index}:`, err);
        }
      });

      if (recipes.length === 0) {
        throw new Error('Nenhuma receita encontrada. O site pode ter mudado sua estrutura.');
      }

      setProgress(`Importando ${recipes.length} receitas para o banco de dados...`);

      const supabase = getSupabase();

      // Inserir receitas no banco
      const recipesToInsert = recipes.map(recipe => ({
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

      const { data, error } = await supabase
        .from('recipes')
        .insert(recipesToInsert)
        .select();

      if (error) throw error;

      setResult({
        success: true,
        message: `✅ ${data.length} receitas importadas com sucesso do Pingo Doce!`,
        count: data.length
      });
      setProgress('');
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
            Importar Receitas do Pingo Doce
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Importe automaticamente todas as receitas do site oficial
          </p>
        </div>

        {/* Card principal de importação */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">
              Importação Automática
            </h2>
            <p className="text-emerald-50 text-lg mb-6 max-w-2xl mx-auto">
              Clique no botão abaixo para buscar e importar automaticamente todas as receitas disponíveis no site do Pingo Doce
            </p>

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

            {progress && (
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
                    Total de receitas no banco de dados aumentou em {result.count}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Link para o site */}
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🍽️ Ver Receitas no Site Original
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Acesse o site do Pingo Doce para visualizar as receitas originais
              </p>
            </div>
            <a
              href="https://www.pingodoce.pt/receitas/pesquisa/?cp=2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Abrir Site
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </Card>

        {/* Informações */}
        <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Como Funciona
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
              <span>O sistema acessa automaticamente o site do Pingo Doce</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
              <span>Extrai todas as receitas disponíveis na página</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
              <span>Processa e formata os dados (nome, descrição, imagem, categoria)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">4.</span>
              <span>Insere automaticamente no banco de dados Supabase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">5.</span>
              <span>As receitas ficam disponíveis imediatamente no seu app!</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
