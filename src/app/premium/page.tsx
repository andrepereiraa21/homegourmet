'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Plus, Trash2, ChefHat, Crown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import Image from 'next/image';

interface MealPlan {
  id: string;
  day: string;
  dayNumber: number;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
}

const DAYS_OF_WEEK = [
  { name: 'Segunda', number: 1 },
  { name: 'Terça', number: 2 },
  { name: 'Quarta', number: 3 },
  { name: 'Quinta', number: 4 },
  { name: 'Sexta', number: 5 },
  { name: 'Sábado', number: 6 },
  { name: 'Domingo', number: 0 },
];

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan[]>(
    DAYS_OF_WEEK.map(day => ({
      id: day.number.toString(),
      day: day.name,
      dayNumber: day.number,
      breakfast: null,
      lunch: null,
      dinner: null,
    }))
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [mealName, setMealName] = useState('');

  const openAddModal = (dayId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedDay(dayId);
    setSelectedMeal(mealType);
    setShowAddModal(true);
  };

  const addMeal = () => {
    if (selectedDay && selectedMeal && mealName.trim()) {
      setMealPlan(prev =>
        prev.map(day =>
          day.id === selectedDay
            ? { ...day, [selectedMeal]: mealName }
            : day
        )
      );
      setMealName('');
      setShowAddModal(false);
      setSelectedDay(null);
      setSelectedMeal(null);
    }
  };

  const removeMeal = (dayId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setMealPlan(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, [mealType]: null }
          : day
      )
    );
  };

  const getMealTypeLabel = (type: 'breakfast' | 'lunch' | 'dinner') => {
    const labels = {
      breakfast: 'Pequeno-almoço',
      lunch: 'Almoço',
      dinner: 'Jantar',
    };
    return labels[type];
  };

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20 pb-20">
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
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Premium
              </h1>
            </div>
            <div className="w-10" />
          </div>

          {/* Premium Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    HomeGourmet Premium
                  </h2>
                  <p className="text-white/90 text-lg">
                    Planeie as suas refeições semanais
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Planeamento Semanal</h3>
                    <p className="text-white/80 text-sm">
                      Organize todas as suas refeições da semana num só lugar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Lista de Compras Automática</h3>
                    <p className="text-white/80 text-sm">
                      Gere automaticamente a lista de compras baseada no seu plano
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Receitas Ilimitadas</h3>
                    <p className="text-white/80 text-sm">
                      Acesso a todas as receitas premium e exclusivas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Suporte Prioritário</h3>
                    <p className="text-white/80 text-sm">
                      Atendimento prioritário e suporte dedicado
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  onClick={() => setIsPremium(true)}
                  className="bg-white hover:bg-gray-100 text-amber-600 rounded-2xl px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Ativar Premium - €4.99/mês
                </Button>
                <p className="text-white/90 text-sm">
                  Cancele a qualquer momento • Sem compromisso
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Planeamento Inteligente
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Organize pequeno-almoço, almoço e jantar para cada dia da semana
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Receitas Exclusivas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Acesso a receitas premium criadas por chefs profissionais
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Lista de Compras
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Gere automaticamente a lista com todos os ingredientes necessários
              </p>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20 pb-20">
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
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Planeamento Semanal
            </h1>
          </div>
          <div className="w-10" />
        </div>

        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-4 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Membro Premium</p>
                <p className="text-white/80 text-sm">Planeie as suas refeições semanais</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl"
            >
              Gerir Subscrição
            </Button>
          </div>
        </div>

        {/* Weekly Meal Plan */}
        <div className="space-y-4">
          {mealPlan.map((day) => (
            <div
              key={day.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                {day.day}
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Breakfast */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                      Pequeno-almoço
                    </p>
                    {day.breakfast && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800"
                        onClick={() => removeMeal(day.id, 'breakfast')}
                      >
                        <Trash2 className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                      </Button>
                    )}
                  </div>
                  {day.breakfast ? (
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {day.breakfast}
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg"
                      onClick={() => openAddModal(day.id, 'breakfast')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  )}
                </div>

                {/* Lunch */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      Almoço
                    </p>
                    {day.lunch && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800"
                        onClick={() => removeMeal(day.id, 'lunch')}
                      >
                        <Trash2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </Button>
                    )}
                  </div>
                  {day.lunch ? (
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {day.lunch}
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg"
                      onClick={() => openAddModal(day.id, 'lunch')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  )}
                </div>

                {/* Dinner */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                      Jantar
                    </p>
                    {day.dinner && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                        onClick={() => removeMeal(day.id, 'dinner')}
                      >
                        <Trash2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </Button>
                    )}
                  </div>
                  {day.dinner ? (
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {day.dinner}
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                      onClick={() => openAddModal(day.id, 'dinner')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl py-6 text-lg font-semibold shadow-xl"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Gerar Lista de Compras
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-2xl py-6 text-lg font-semibold border-gray-300 dark:border-gray-600"
          >
            Limpar Plano
          </Button>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Adicionar Refeição
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setShowAddModal(false);
                  setMealName('');
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {selectedMeal && getMealTypeLabel(selectedMeal)}
              </label>
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Ex: Ovos mexidos com torradas"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600"
                onClick={() => {
                  setShowAddModal(false);
                  setMealName('');
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl shadow-lg disabled:opacity-50"
                onClick={addMeal}
                disabled={!mealName.trim()}
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
