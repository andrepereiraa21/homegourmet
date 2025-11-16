'use client';

import Link from 'next/link';
import { ArrowLeft, Crown, Check, Calendar, CreditCard, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { useState, useEffect } from 'react';

export default function PremiumPage() {
  // Simulação de dados do usuário premium
  const [isPremium, setIsPremium] = useState(false);
  const [premiumStartDate] = useState('15 de Janeiro de 2025');
  const [premiumEndDate] = useState('15 de Fevereiro de 2025');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    // Verificar status premium do localStorage ao carregar
    const premiumStatus = localStorage.getItem('isPremium');
    if (premiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  const handlePurchase = (plan: 'monthly' | 'annual') => {
    // Aqui você implementaria a lógica de pagamento
    alert(`Processando compra do plano ${plan === 'monthly' ? 'Mensal' : 'Anual'}...`);
    setIsPremium(true);
    
    // Salvar status premium no localStorage
    localStorage.setItem('isPremium', 'true');
    
    // Disparar evento customizado para atualizar outros componentes
    window.dispatchEvent(new Event('premiumStatusChanged'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-amber-950/20 dark:to-orange-950/20 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Crown className="w-7 h-7 text-amber-500" />
            Premium
          </h1>
          <div className="w-10" />
        </div>

        {/* Status Premium */}
        {isPremium ? (
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Membro Premium</h2>
                  <p className="text-white/90 text-sm">Aproveite todos os benefícios!</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Data de Início</span>
                  </div>
                  <span className="text-white font-bold">{premiumStartDate}</span>
                </div>
                
                <div className="h-px bg-white/20" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Data de Término</span>
                  </div>
                  <span className="text-white font-bold">{premiumEndDate}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-white text-amber-600 hover:bg-white/90 font-semibold shadow-lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Gerir Pagamento
                </Button>
                <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                  Cancelar Subscrição
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Desbloqueie o Premium
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Aceda a funcionalidades exclusivas e leve a sua experiência culinária ao próximo nível
              </p>
            </div>
          </div>
        )}

        {/* Benefícios Premium */}
        {!isPremium && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Benefícios Exclusivos
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Informações Nutricionais Completas
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Acesso total a calorias, macronutrientes e valores nutricionais detalhados
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Planeamento Semanal com IA
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gere automaticamente planos de refeições personalizados com inteligência artificial
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Receitas Premium Exclusivas
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Acesso a receitas especiais e conteúdo exclusivo de chefs profissionais
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Sem Anúncios
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Experiência completamente livre de anúncios e interrupções
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Garantia de 7 Dias
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Não está satisfeito? Reembolsamos 100% do seu dinheiro nos primeiros 7 dias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Planos de Preços */}
        {!isPremium && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-500" />
              Escolha o Seu Plano
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plano Mensal */}
              <div 
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 transition-all cursor-pointer ${
                  selectedPlan === 'monthly' 
                    ? 'border-amber-500 ring-4 ring-amber-500/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Plano Mensal
                  </h4>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-amber-600">€4,99</span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Informações nutricionais completas</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Planeamento semanal com IA</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Receitas premium exclusivas</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Sem anúncios</span>
                  </li>
                </ul>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg shadow-lg"
                  onClick={() => handlePurchase('monthly')}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Ativar Premium Mensal
                </Button>
              </div>

              {/* Plano Anual */}
              <div 
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 transition-all cursor-pointer relative ${
                  selectedPlan === 'annual' 
                    ? 'border-amber-500 ring-4 ring-amber-500/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                }`}
                onClick={() => setSelectedPlan('annual')}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Poupe 17%
                </div>

                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Plano Anual
                  </h4>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-amber-600">€49,99</span>
                    <span className="text-gray-600 dark:text-gray-400">/ano</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Apenas €4,17/mês
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Informações nutricionais completas</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Planeamento semanal com IA</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Receitas premium exclusivas</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Sem anúncios</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-semibold">Economize €9,89 por ano</span>
                  </li>
                </ul>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg shadow-lg"
                  onClick={() => handlePurchase('annual')}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Ativar Premium Anual
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
