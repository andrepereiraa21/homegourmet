'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ChefHat, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import Image from 'next/image';

interface HistoryItem {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeImage: string;
  viewedAt: string;
  prepTime: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const stored = localStorage.getItem('recipeHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      // Mock history data
      const mockHistory: HistoryItem[] = [
        {
          id: '1',
          recipeId: '1',
          recipeTitle: 'Risoto de Cogumelos',
          recipeImage: 'https://images.unsplash.com/photo-1476124369491-c4ca3e0e3e3e?w=400&h=300&fit=crop',
          viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          prepTime: 45
        },
        {
          id: '2',
          recipeId: '2',
          recipeTitle: 'Salada Caesar',
          recipeImage: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
          viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          prepTime: 20
        },
        {
          id: '3',
          recipeId: '3',
          recipeTitle: 'Spaghetti Carbonara',
          recipeImage: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
          viewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          prepTime: 30
        }
      ];
      setHistory(mockHistory);
      localStorage.setItem('recipeHistory', JSON.stringify(mockHistory));
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('recipeHistory');
  };

  const removeItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('recipeHistory', JSON.stringify(updated));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Agora mesmo';
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Histórico
          </h1>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Limpar
            </Button>
          )}
          {history.length === 0 && <div className="w-20" />}
        </div>

        {/* History List */}
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden group"
              >
                <Link href={`/recipes/${item.recipeId}`}>
                  <div className="flex gap-4 p-4">
                    {/* Recipe Image */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.recipeImage}
                        alt={item.recipeTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Recipe Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                        {item.recipeTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.prepTime} min</span>
                        </div>
                        <span>{formatDate(item.viewedAt)}</span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeItem(item.id);
                      }}
                      className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Nenhum histórico ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              As receitas que você visualizar aparecerão aqui
            </p>
            <Link href="/recipes">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl">
                Explorar Receitas
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
