'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Crown, Plus, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

interface DayMeals {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

interface WeekPlan {
  [key: string]: DayMeals;
}

const DAYS = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];

const MEAL_TYPES = {
  breakfast: 'Pequeno-almoço',
  lunch: 'Almoço',
  snack: 'Lanche',
  dinner: 'Jantar'
};

const MEAL_COLORS = {
  breakfast: { bg: 'bg-[#FFF4E5]', border: 'border-[#F5CBA7]', text: 'text-[#E67E22]' },
  lunch: { bg: 'bg-[#E6FAF0]', border: 'border-[#A3E4D7]', text: 'text-[#27AE60]' },
  snack: { bg: 'bg-[#F3E5F5]', border: 'border-[#CE93D8]', text: 'text-[#9C27B0]' },
  dinner: { bg: 'bg-[#E5F2FF]', border: 'border-[#A7C7E7]', text: 'text-[#3498DB]' }
};

export default function WeeklyPlanPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>({});
  const [editingMeal, setEditingMeal] = useState<{day: string, type: keyof DayMeals} | null>(null);
  const [mealInput, setMealInput] = useState('');

  useEffect(() => {
    // Check premium status
    const premiumStatus = localStorage.getItem('isPremium');
    setIsPremium(premiumStatus === 'true');

    // Load weekly plan
    const storedPlan = localStorage.getItem('weeklyPlan');
    if (storedPlan) {
      setWeekPlan(JSON.parse(storedPlan));
    } else {
      // Initialize empty plan
      const emptyPlan: WeekPlan = {};
      DAYS.forEach(day => {
        emptyPlan[day] = { breakfast: '', lunch: '', snack: '', dinner: '' };
      });
      setWeekPlan(emptyPlan);
    }

    // Listen for premium status changes
    const handlePremiumChange = () => {
      const status = localStorage.getItem('isPremium');
      setIsPremium(status === 'true');
    };

    window.addEventListener('premiumStatusChanged', handlePremiumChange);
    return () => window.removeEventListener('premiumStatusChanged', handlePremiumChange);
  }, []);

  const savePlan = (newPlan: WeekPlan) => {
    setWeekPlan(newPlan);
    localStorage.setItem('weeklyPlan', JSON.stringify(newPlan));
  };

  const updateMeal = (day: string, mealType: keyof DayMeals, value: string) => {
    const newPlan = {
      ...weekPlan,
      [day]: {
        ...weekPlan[day],
        [mealType]: value
      }
    };
    savePlan(newPlan);
  };

  const generateAIMeal = (day: string, mealType: keyof DayMeals) => {
    const suggestions = {
      breakfast: [
        'Pão integral com queijo e café',
        'Iogurte natural com granola e frutas',
        'Ovos mexidos com torradas',
        'Panquecas com mel e frutas',
        'Aveia com banana e canela',
        'Croissant com sumo de laranja'
      ],
      lunch: [
        'Arroz, feijão, frango grelhado e salada',
        'Massa com molho de tomate e almôndegas',
        'Peixe assado com legumes',
        'Risoto de cogumelos',
        'Bacalhau com batatas',
        'Lasanha de carne'
      ],
      snack: [
        'Frutas frescas',
        'Iogurte com mel',
        'Barra de cereais',
        'Mix de castanhas',
        'Smoothie de frutas',
        'Torrada com abacate'
      ],
      dinner: [
        'Sopa de legumes com pão',
        'Salada Caesar com frango',
        'Omelete com salada',
        'Salmão grelhado com arroz',
        'Wrap de frango com vegetais',
        'Pizza caseira'
      ]
    };

    const randomMeal = suggestions[mealType][Math.floor(Math.random() * suggestions[mealType].length)];
    updateMeal(day, mealType, randomMeal);
  };

  const generateAllMealsForDay = (day: string) => {
    const suggestions = {
      breakfast: [
        'Pão integral com queijo e café',
        'Iogurte natural com granola e frutas',
        'Ovos mexidos com torradas',
        'Panquecas com mel e frutas',
        'Aveia com banana e canela',
        'Croissant com sumo de laranja'
      ],
      lunch: [
        'Arroz, feijão, frango grelhado e salada',
        'Massa com molho de tomate e almôndegas',
        'Peixe assado com legumes',
        'Risoto de cogumelos',
        'Bacalhau com batatas',
        'Lasanha de carne'
      ],
      snack: [
        'Frutas frescas',
        'Iogurte com mel',
        'Barra de cereais',
        'Mix de castanhas',
        'Smoothie de frutas',
        'Torrada com abacate'
      ],
      dinner: [
        'Sopa de legumes com pão',
        'Salada Caesar com frango',
        'Omelete com salada',
        'Salmão grelhado com arroz',
        'Wrap de frango com vegetais',
        'Pizza caseira'
      ]
    };

    const newPlan = {
      ...weekPlan,
      [day]: {
        breakfast: suggestions.breakfast[Math.floor(Math.random() * suggestions.breakfast.length)],
        lunch: suggestions.lunch[Math.floor(Math.random() * suggestions.lunch.length)],
        snack: suggestions.snack[Math.floor(Math.random() * suggestions.snack.length)],
        dinner: suggestions.dinner[Math.floor(Math.random() * suggestions.dinner.length)]
      }
    };
    savePlan(newPlan);
  };

  const clearAllData = () => {
    const emptyPlan: WeekPlan = {};
    DAYS.forEach(day => {
      emptyPlan[day] = { breakfast: '', lunch: '', snack: '', dinner: '' };
    });
    savePlan(emptyPlan);
  };

  const startEditing = (day: string, type: keyof DayMeals) => {
    setEditingMeal({ day, type });
    setMealInput(weekPlan[day]?.[type] || '');
  };

  const saveEditing = () => {
    if (editingMeal) {
      updateMeal(editingMeal.day, editingMeal.type, mealInput);
      setEditingMeal(null);
      setMealInput('');
    }
  };

  const cancelEditing = () => {
    setEditingMeal(null);
    setMealInput('');
  };

  // Se não for premium, mostrar tela de upgrade
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Planejamento Semanal
            </h1>
            <div className="w-10" />
          </div>

          {/* Premium Required Card */}
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl max-w-md w-full text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Recurso Premium
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                O planejamento semanal é exclusivo para membros Premium. Organize suas refeições da semana com elegância.
              </p>
              <Link href="/profile/premium">
                <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-2xl py-6 text-base font-medium shadow-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Ativar Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Planejamento Semanal
          </h1>
          <div className="w-10" />
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {DAYS.map((day) => {
            const dayMeals = weekPlan[day] || { breakfast: '', lunch: '', snack: '', dinner: '' };

            return (
              <div key={day} className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#E67E22]" />
                    <h2 className="text-lg font-bold text-gray-900">{day}</h2>
                  </div>
                  <Button
                    onClick={() => generateAllMealsForDay(day)}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow-md"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Gerar com IA
                  </Button>
                </div>

                {/* Meals */}
                <div className="space-y-3">
                  {(Object.keys(MEAL_TYPES) as Array<keyof DayMeals>).map((mealType) => {
                    const isEditing = editingMeal?.day === day && editingMeal?.type === mealType;
                    const mealValue = dayMeals[mealType];
                    const colors = MEAL_COLORS[mealType];

                    return (
                      <div 
                        key={mealType} 
                        className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <label className={`text-base font-bold ${colors.text} block mb-2`}>
                              {MEAL_TYPES[mealType]}
                            </label>

                            {isEditing ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={mealInput}
                                  onChange={(e) => setMealInput(e.target.value)}
                                  placeholder={`Digite o ${MEAL_TYPES[mealType].toLowerCase()}...`}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={saveEditing}
                                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2 text-sm"
                                  >
                                    Salvar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEditing}
                                    className="flex-1 border-gray-300 hover:bg-gray-100 rounded-lg py-2 text-sm"
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {mealValue ? (
                                  <span className="text-sm text-gray-700">
                                    {mealValue}
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => startEditing(day, mealType)}
                                    className={`w-full flex items-center justify-center gap-2 ${colors.border} border-dotted border-2 rounded-full px-4 py-2 text-sm font-medium ${colors.text} bg-white hover:bg-gray-50 transition-colors`}
                                  >
                                    <Plus className="w-4 h-4" />
                                    Adicionar
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                          {!isEditing && mealValue && (
                            <Button
                              onClick={() => startEditing(day, mealType)}
                              size="sm"
                              variant="ghost"
                              className="ml-3 text-gray-600 hover:text-gray-900 hover:bg-white/70 rounded-lg px-3 py-1.5 flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear All Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={clearAllData}
            variant="outline"
            className="bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300 rounded-2xl px-6 py-3 text-sm font-medium shadow-sm"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Todos os Dados
          </Button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
