'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Edit2, TrendingUp, Flame, Activity, X, Save, Crown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { Ingredient } from '@/lib/types';
import { mockIngredients } from '@/lib/mock-data';
import Image from 'next/image';

// Mapeamento de ingredientes para imagens reais do Unsplash
const getIngredientImage = (name: string): string => {
  const ingredientMap: { [key: string]: string } = {
    // Vegetais
    'tomate': 'https://images.unsplash.com/photo-1546470427-227e9e3a9e0c?w=400&h=400&fit=crop',
    'tomates': 'https://images.unsplash.com/photo-1546470427-227e9e3a9e0c?w=400&h=400&fit=crop',
    'cebola': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    'cebolas': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    'alho': 'https://images.unsplash.com/photo-1588540917959-9ab0d9da0b26?w=400&h=400&fit=crop',
    'alhos': 'https://images.unsplash.com/photo-1588540917959-9ab0d9da0b26?w=400&h=400&fit=crop',
    'cenoura': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    'cenouras': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    'batata': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    'batatas': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    'pimentão': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    'pimentões': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    'brócolis': 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
    'brocolis': 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
    'alface': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop',
    'couve': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop',
    'espinafre': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    
    // Frutas
    'maçã': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    'maçãs': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    'bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    'laranja': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop',
    'laranjas': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop',
    'limão': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop',
    'limões': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop',
    'morango': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
    'morangos': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
    'uva': 'https://images.unsplash.com/photo-1599819177818-6f7c2c7e6d0e?w=400&h=400&fit=crop',
    'uvas': 'https://images.unsplash.com/photo-1599819177818-6f7c2c7e6d0e?w=400&h=400&fit=crop',
    
    // Proteínas
    'frango': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop',
    'carne': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop',
    'peixe': 'https://images.unsplash.com/photo-1559737558-2f5a35f4523f?w=400&h=400&fit=crop',
    'ovo': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    'ovos': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    'queijo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    'leite': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
    'iogurte': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    
    // Grãos e Massas
    'arroz': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    'feijão': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop',
    'feijao': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop',
    'macarrão': 'https://images.unsplash.com/photo-1551462147-37d3f9c6c4e6?w=400&h=400&fit=crop',
    'macarrao': 'https://images.unsplash.com/photo-1551462147-37d3f9c6c4e6?w=400&h=400&fit=crop',
    'pão': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    'pao': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    
    // Temperos e Ervas
    'manjericão': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop',
    'manjericao': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop',
    'salsa': 'https://images.unsplash.com/photo-1629978445618-5c7c8c2e0b3f?w=400&h=400&fit=crop',
    'coentro': 'https://images.unsplash.com/photo-1629978445618-5c7c8c2e0b3f?w=400&h=400&fit=crop',
    'orégano': 'https://images.unsplash.com/photo-1629978445618-5c7c8c2e0b3f?w=400&h=400&fit=crop',
    'oregano': 'https://images.unsplash.com/photo-1629978445618-5c7c8c2e0b3f?w=400&h=400&fit=crop',
  };

  // Normaliza o nome (lowercase e remove acentos para busca)
  const normalizedName = name.toLowerCase().trim();
  
  // Busca exata
  if (ingredientMap[normalizedName]) {
    return ingredientMap[normalizedName];
  }
  
  // Busca parcial (se o nome contém alguma palavra-chave)
  for (const [key, value] of Object.entries(ingredientMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }
  
  // Imagem padrão genérica de ingredientes
  return 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&h=400&fit=crop';
};

export default function InventoryPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // Estado para verificar se é premium
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: 1,
    unit: 'unidade'
  });

  useEffect(() => {
    // Load from localStorage (will be Supabase in Module 2)
    const stored = localStorage.getItem('scannedIngredients');
    if (stored) {
      setIngredients(JSON.parse(stored));
    } else {
      // Use mock data for demo
      setIngredients(mockIngredients);
    }
    
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremium');
    setIsPremium(premiumStatus === 'true');
  }, []);

  const totalCalories = ingredients.reduce((sum, ing) => sum + ing.calories * ing.quantity, 0);
  const totalProtein = ingredients.reduce((sum, ing) => sum + ing.protein * ing.quantity, 0);
  const totalCarbs = ingredients.reduce((sum, ing) => sum + ing.carbs * ing.quantity, 0);
  const totalFat = ingredients.reduce((sum, ing) => sum + ing.fat * ing.quantity, 0);

  const removeIngredient = (id: string) => {
    const updated = ingredients.filter(ing => ing.id !== id);
    setIngredients(updated);
    localStorage.setItem('scannedIngredients', JSON.stringify(updated));
  };

  const openEditModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setEditQuantity(ingredient.quantity);
  };

  const closeEditModal = () => {
    setSelectedIngredient(null);
    setEditQuantity(0);
  };

  const saveQuantity = () => {
    if (selectedIngredient && editQuantity > 0) {
      const updated = ingredients.map(ing =>
        ing.id === selectedIngredient.id
          ? { ...ing, quantity: editQuantity }
          : ing
      );
      setIngredients(updated);
      localStorage.setItem('scannedIngredients', JSON.stringify(updated));
      closeEditModal();
    }
  };

  const addManualIngredient = () => {
    if (newIngredient.name.trim()) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        quantity: newIngredient.quantity,
        unit: newIngredient.unit,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        detectedAt: new Date(),
        confidence: 1
      };

      const updated = [...ingredients, ingredient];
      setIngredients(updated);
      localStorage.setItem('scannedIngredients', JSON.stringify(updated));
      
      // Reset form
      setNewIngredient({
        name: '',
        quantity: 1,
        unit: 'unidade'
      });
      setShowAddModal(false);
    }
  };

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
            Meu Inventário
          </h1>
          <Link href="/scan">
            <Button
              size="icon"
              title="Digitalizar ingredientes com a câmera"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        {/* Nutrition Summary - Premium Only */}
        {isPremium ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-6 h-6 text-white" />
                <span className="text-white/90 text-sm font-medium">Calorias</span>
              </div>
              <p className="text-3xl font-bold text-white">{totalCalories.toFixed(0)}</p>
              <p className="text-white/80 text-xs mt-1">kcal totais</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6 text-white" />
                <span className="text-white/90 text-sm font-medium">Proteína</span>
              </div>
              <p className="text-3xl font-bold text-white">{totalProtein.toFixed(1)}</p>
              <p className="text-white/80 text-xs mt-1">gramas</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-white/90 text-sm font-medium">Carboidratos</span>
              </div>
              <p className="text-3xl font-bold text-white">{totalCarbs.toFixed(1)}</p>
              <p className="text-white/80 text-xs mt-1">gramas</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6 text-white" />
                <span className="text-white/90 text-sm font-medium">Gorduras</span>
              </div>
              <p className="text-3xl font-bold text-white">{totalFat.toFixed(1)}</p>
              <p className="text-white/80 text-xs mt-1">gramas</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Informações Nutricionais Premium
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Desbloqueie informações detalhadas sobre calorias e macronutrientes dos seus ingredientes
                </p>
                <Link href="/premium">
                  <Button className="bg-white hover:bg-gray-100 text-amber-600 rounded-xl font-semibold">
                    <Crown className="w-4 h-4 mr-2" />
                    Ativar Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Ingredientes ({ingredients.length})
            </h2>
            <Link href="/recipes">
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg"
              >
                Ver Receitas
              </Button>
            </Link>
          </div>

          {ingredients.length === 0 ? (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Nenhum ingrediente ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Comece digitalizando seus ingredientes com a câmera ou adicione manualmente
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/scan">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl">
                    Digitalizar Agora
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => setShowAddModal(true)}
                  className="rounded-xl"
                >
                  Adicionar Manualmente
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image
                          src={getIngredientImage(ingredient.name)}
                          alt={ingredient.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 truncate">
                          {ingredient.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ingredient.quantity} {ingredient.unit}
                        </p>
                        {ingredient.confidence && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                                style={{ width: `${ingredient.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {(ingredient.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Nutrition Info - Premium Only */}
                    {isPremium ? (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                          <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Calorias</p>
                          <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
                            {(ingredient.calories * ingredient.quantity).toFixed(0)}
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Proteína</p>
                          <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                            {(ingredient.protein * ingredient.quantity).toFixed(1)}g
                          </p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Carboidratos</p>
                          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                            {(ingredient.carbs * ingredient.quantity).toFixed(1)}g
                          </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Gorduras</p>
                          <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                            {(ingredient.fat * ingredient.quantity).toFixed(1)}g
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                          <Lock className="w-4 h-4" />
                          <p className="text-xs font-medium">Informações nutricionais disponíveis no Premium</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => openEditModal(ingredient)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Adicionar Manualmente - Abaixo da lista */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-6 h-6 mr-3" />
                  Adicionar Ingrediente Manualmente
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Editar Quantidade
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeEditModal}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={getIngredientImage(selectedIngredient.name)}
                    alt={selectedIngredient.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedIngredient.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Unidade: {selectedIngredient.unit}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-semibold"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600"
                onClick={closeEditModal}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg"
                onClick={saveQuantity}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Ingredient Modal - Simplificado */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Adicionar Ingrediente
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Ingrediente *
                </label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  placeholder="Ex: Tomate, Cebola, Frango..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantidade *
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({...newIngredient, quantity: parseFloat(e.target.value) || 1})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unidade *
                  </label>
                  <select
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="unidade">unidade</option>
                    <option value="g">gramas</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="L">litros</option>
                    <option value="xícara">xícara</option>
                    <option value="colher">colher</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={addManualIngredient}
                disabled={!newIngredient.name.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
}
