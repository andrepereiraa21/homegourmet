'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
}

export default function ShoppingCartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('un');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Verificar se é premium
    const premiumStatus = localStorage.getItem('isPremium');
    if (premiumStatus !== 'true') {
      router.push('/profile/premium');
      return;
    }
    setIsPremium(true);

    // Carregar itens do carrinho
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [router]);

  useEffect(() => {
    if (isPremium) {
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isPremium]);

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: CartItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: parseFloat(newItemQuantity) || 1,
      unit: newItemUnit,
      checked: false,
    };

    setCartItems([...cartItems, newItem]);
    setNewItemName('');
    setNewItemQuantity('1');
    setNewItemUnit('un');
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleCheck = (id: string) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0.5, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearChecked = () => {
    setCartItems(cartItems.filter(item => !item.checked));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  if (!isPremium) {
    return null;
  }

  const checkedCount = cartItems.filter(item => item.checked).length;
  const totalCount = cartItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20 pb-36 sm:pb-44">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-8 px-4 shadow-2xl">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
                <p className="text-amber-100 text-sm">Funcionalidade Premium</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{totalCount}</div>
              <div className="text-xs text-amber-100">itens</div>
            </div>
          </div>
          
          {totalCount > 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm font-medium">
                {checkedCount} de {totalCount} marcados
              </span>
              <div className="flex gap-2">
                {checkedCount > 0 && (
                  <Button
                    onClick={clearChecked}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Limpar Marcados
                  </Button>
                )}
                <Button
                  onClick={clearAll}
                  size="sm"
                  variant="destructive"
                  className="bg-red-500/90 hover:bg-red-600"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpar Tudo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border-2 border-amber-200 dark:border-amber-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600" />
            Adicionar Item
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              placeholder="Nome do item"
              className="col-span-1 sm:col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
            <input
              type="number"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              placeholder="Qtd"
              step="0.5"
              min="0.5"
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
            <select
              value={newItemUnit}
              onChange={(e) => setNewItemUnit(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            >
              <option value="un">un</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="cx">cx</option>
              <option value="pct">pct</option>
            </select>
          </div>
          <Button
            onClick={addItem}
            className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-6 rounded-xl font-semibold shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Carrinho Vazio
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Adicione itens à sua lista de compras
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl border-2 ${
                  item.checked
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                      item.checked
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-300 dark:border-gray-600 hover:border-amber-500'
                    }`}
                  >
                    {item.checked && <Check className="w-5 h-5 text-white" />}
                  </button>

                  {/* Item Info */}
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${
                        item.checked
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} {item.unit}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateQuantity(item.id, -0.5)}
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() => updateQuantity(item.id, 0.5)}
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Delete Button */}
                  <Button
                    onClick={() => removeItem(item.id)}
                    size="sm"
                    variant="destructive"
                    className="w-10 h-10 p-0 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
