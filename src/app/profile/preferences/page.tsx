'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

interface Preferences {
  dietary: string[];
  allergies: string[];
  cuisines: string[];
}

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<Preferences>({
    dietary: [],
    allergies: [],
    cuisines: []
  });

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetariano', emoji: '🥗' },
    { id: 'vegan', label: 'Vegano', emoji: '🌱' },
    { id: 'gluten-free', label: 'Sem Glúten', emoji: '🌾' },
    { id: 'dairy-free', label: 'Sem Lactose', emoji: '🥛' },
    { id: 'low-carb', label: 'Low Carb', emoji: '🥩' },
    { id: 'keto', label: 'Keto', emoji: '🥑' },
    { id: 'paleo', label: 'Paleo', emoji: '🍖' },
    { id: 'pescatarian', label: 'Pescetariano', emoji: '🐟' },
  ];

  const allergyOptions = [
    { id: 'nuts', label: 'Nozes', emoji: '🥜' },
    { id: 'shellfish', label: 'Frutos do Mar', emoji: '🦐' },
    { id: 'eggs', label: 'Ovos', emoji: '🥚' },
    { id: 'soy', label: 'Soja', emoji: '🫘' },
    { id: 'fish', label: 'Peixe', emoji: '🐟' },
    { id: 'wheat', label: 'Trigo', emoji: '🌾' },
  ];

  const cuisineOptions = [
    { id: 'italian', label: 'Italiana', emoji: '🍝' },
    { id: 'japanese', label: 'Japonesa', emoji: '🍱' },
    { id: 'mexican', label: 'Mexicana', emoji: '🌮' },
    { id: 'chinese', label: 'Chinesa', emoji: '🥡' },
    { id: 'brazilian', label: 'Brasileira', emoji: '🇧🇷' },
    { id: 'indian', label: 'Indiana', emoji: '🍛' },
    { id: 'french', label: 'Francesa', emoji: '🥐' },
    { id: 'thai', label: 'Tailandesa', emoji: '🍜' },
  ];

  useEffect(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const togglePreference = (category: keyof Preferences, id: string) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        [category]: prev[category].includes(id)
          ? prev[category].filter(item => item !== id)
          : [...prev[category], id]
      };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
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
            Preferências
          </h1>
          <div className="w-10" />
        </div>

        {/* Dietary Preferences */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Restrições Alimentares
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => togglePreference('dietary', option.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  preferences.dietary.includes(option.id)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600'
                } backdrop-blur-xl`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                {preferences.dietary.includes(option.id) && (
                  <div className="mt-2">
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Alergias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allergyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => togglePreference('allergies', option.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  preferences.allergies.includes(option.id)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600'
                } backdrop-blur-xl`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                {preferences.allergies.includes(option.id) && (
                  <div className="mt-2">
                    <Check className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Cozinhas Favoritas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cuisineOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => togglePreference('cuisines', option.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  preferences.cuisines.includes(option.id)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600'
                } backdrop-blur-xl`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                {preferences.cuisines.includes(option.id) && (
                  <div className="mt-2">
                    <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Save Info */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center">
            ✓ Suas preferências são salvas automaticamente
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
