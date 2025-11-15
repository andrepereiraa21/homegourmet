'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ChefHat, Users, Flame, Filter, Search, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/components/custom/navigation';
import { Recipe, Ingredient } from '@/lib/types';
import { mockRecipes } from '@/lib/mock-data';
import Image from 'next/image';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', emoji: '🥗' },
    { id: 'vegan', label: 'Vegano', emoji: '🌱' },
    { id: 'gluten-free', label: 'Sem Glúten', emoji: '🌾' },
    { id: 'dairy-free', label: 'Sem Lactose', emoji: '🥛' },
    { id: 'nut-free', label: 'Sem Nozes', emoji: '🥜' },
    { id: 'low-carb', label: 'Low Carb', emoji: '🥩' },
    { id: 'keto', label: 'Keto', emoji: '🥑' },
    { id: 'paleo', label: 'Paleo', emoji: '🍖' },
  ];

  useEffect(() => {
    // Load ingredients from localStorage
    const stored = localStorage.getItem('scannedIngredients');
    if (stored) {
      setIngredients(JSON.parse(stored));
    }
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    // Use mock recipes
    setRecipes(mockRecipes);
  }, []);

  const toggleFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      
      // Save to localStorage
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      
      // Also save the full recipe data for the favorites page
      if (!prev.includes(recipeId)) {
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
          const storedFavoriteRecipes = localStorage.getItem('favoriteRecipesData');
          const favoriteRecipes = storedFavoriteRecipes ? JSON.parse(storedFavoriteRecipes) : [];
          favoriteRecipes.push(recipe);
          localStorage.setItem('favoriteRecipesData', JSON.stringify(favoriteRecipes));
        }
      } else {
        // Remove from favorites data
        const storedFavoriteRecipes = localStorage.getItem('favoriteRecipesData');
        if (storedFavoriteRecipes) {
          const favoriteRecipes = JSON.parse(storedFavoriteRecipes);
          const updatedFavorites = favoriteRecipes.filter((r: Recipe) => r.id !== recipeId);
          localStorage.setItem('favoriteRecipesData', JSON.stringify(updatedFavorites));
        }
      }
      
      return newFavorites;
    });
  };

  const toggleDietaryFilter = (filterId: string) => {
    setSelectedDietaryFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    // Dietary filters (mock implementation - in real app would check recipe tags)
    const matchesDietary = selectedDietaryFilters.length === 0 || 
      selectedDietaryFilters.some(filter => {
        // Mock logic - in real app, recipes would have dietary tags
        if (filter === 'vegetarian' && recipe.tags.includes('vegetariano')) return true;
        if (filter === 'gluten-free' && !recipe.title.toLowerCase().includes('massa')) return true;
        return false;
      });
    
    return matchesSearch && matchesDifficulty && matchesDietary;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Receitas
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="w-6 h-6" />
            {selectedDietaryFilters.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                {selectedDietaryFilters.length}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Restrições Alimentares
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilterModal(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecione suas restrições alimentares e alergias
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleDietaryFilter(option.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedDietaryFilters.includes(option.id)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.emoji}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDietaryFilters([])}
                  className="flex-1 rounded-xl"
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar receitas por nome, ingrediente ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 text-lg"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'Todas' },
              { value: 'easy', label: 'Fácil' },
              { value: 'medium', label: 'Médio' },
              { value: 'hard', label: 'Difícil' }
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={selectedDifficulty === filter.value ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty(filter.value)}
                className={`rounded-full whitespace-nowrap ${
                  selectedDifficulty === filter.value
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Active Dietary Filters */}
          {selectedDietaryFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedDietaryFilters.map(filterId => {
                const option = dietaryOptions.find(o => o.id === filterId);
                return option ? (
                  <div
                    key={filterId}
                    className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{option.emoji}</span>
                    <span>{option.label}</span>
                    <button
                      onClick={() => toggleDietaryFilter(filterId)}
                      className="hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Ingredients Match Banner - Only show if user has ingredients */}
        {ingredients.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Receitas Personalizadas
                </h3>
                <p className="text-white/90 text-sm">
                  Você tem {ingredients.length} ingredientes no inventário. Explore receitas que pode fazer!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner - Show when no ingredients */}
        {ingredients.length === 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Explore Todas as Receitas
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Navegue por {recipes.length} receitas deliciosas. Adicione ingredientes ao seu inventário para receber sugestões personalizadas!
                </p>
                <Link href="/inventory">
                  <Button
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl"
                  >
                    Adicionar Ingredientes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 group">
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {recipe.matchPercentage && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {recipe.matchPercentage}% Match
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 left-4 backdrop-blur-xl hover:scale-110 rounded-full shadow-lg transition-all ${
                      favorites.includes(recipe.id)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900'
                    }`}
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all ${
                        favorites.includes(recipe.id)
                          ? 'fill-white text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    />
                  </Button>
                </div>

                {/* Recipe Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Recipe Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} porções</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        recipe.difficulty === 'easy'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : recipe.difficulty === 'medium'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {recipe.difficulty === 'easy' ? 'Fácil' : recipe.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </span>
                    <ChefHat className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Nenhuma receita encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
                setSelectedDietaryFilters([]);
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
