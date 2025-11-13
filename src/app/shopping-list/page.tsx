'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Trash2, Check, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import Image from 'next/image';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  addedAt: string;
}

// Mapeamento de ingredientes para imagens (mesmo do inventory)
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

  const normalizedName = name.toLowerCase().trim();
  
  if (ingredientMap[normalizedName]) {
    return ingredientMap[normalizedName];
  }
  
  for (const [key, value] of Object.entries(ingredientMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }
  
  return 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&h=400&fit=crop';
};

export default function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState('unidade');

  useEffect(() => {
    // Load shopping list from localStorage
    const stored = localStorage.getItem('shoppingList');
    if (stored) {
      setShoppingList(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (list: ShoppingItem[]) => {
    localStorage.setItem('shoppingList', JSON.stringify(list));
  };

  const toggleCheck = (id: string) => {
    const updated = shoppingList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingList(updated);
    saveToLocalStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = shoppingList.filter(item => item.id !== id);
    setShoppingList(updated);
    saveToLocalStorage(updated);
  };

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: newItemQuantity,
      unit: newItemUnit,
      checked: false,
      addedAt: new Date().toISOString(),
    };

    const updated = [...shoppingList, newItem];
    setShoppingList(updated);
    saveToLocalStorage(updated);

    // Reset form
    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemUnit('unidade');
    setShowAddModal(false);
  };

  const clearChecked = () => {
    const updated = shoppingList.filter(item => !item.checked);
    setShoppingList(updated);
    saveToLocalStorage(updated);
  };

  const uncheckedItems = shoppingList.filter(item => !item.checked);
  const checkedItems = shoppingList.filter(item => item.checked);

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
            Lista de Compras
          </h1>
          <Button
            size="icon"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm mb-1">Total de itens</p>
              <p className="text-3xl font-bold text-white">{shoppingList.length}</p>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm mb-1">Comprados</p>
              <p className="text-3xl font-bold text-white">{checkedItems.length}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Clear Checked Button */}
        {checkedItems.length > 0 && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={clearChecked}
              className="w-full rounded-xl border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar itens comprados ({checkedItems.length})
            </Button>
          </div>
        )}

        {/* Shopping List */}
        {shoppingList.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Lista vazia
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Adicione ingredientes que você precisa comprar
            </p>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl"
              onClick={() => setShowAddModal(true)}
            >
              Adicionar Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Unchecked Items */}
            {uncheckedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Para Comprar ({uncheckedItems.length})
                </h2>
                <div className="space-y-3">
                  {uncheckedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleCheck(item.id)}
                          className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors flex-shrink-0"
                        >
                          {item.checked && (
                            <Check className="w-4 h-4 text-emerald-500" />
                          )}
                        </button>

                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                          <Image
                            src={getIngredientImage(item.name)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.quantity} {item.unit}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex-shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checked Items */}
            {checkedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 opacity-60">
                  Comprados ({checkedItems.length})
                </h2>
                <div className="space-y-3">
                  {checkedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 opacity-60"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleCheck(item.id)}
                          className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </button>

                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                          <Image
                            src={getIngredientImage(item.name)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate line-through">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.quantity} {item.unit}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex-shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Adicionar Item
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do ingrediente
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ex: Tomate, Cebola, Alho..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unidade
                  </label>
                  <select
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="unidade">unidade</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="pacote">pacote</option>
                    <option value="maço">maço</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg"
                onClick={addItem}
              >
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
