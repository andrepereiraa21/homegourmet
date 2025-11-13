'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, BellOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

interface NotificationSettings {
  newRecipes: boolean;
  ingredientExpiry: boolean;
  shoppingReminders: boolean;
  weeklyDigest: boolean;
  promotions: boolean;
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    newRecipes: true,
    ingredientExpiry: true,
    shoppingReminders: false,
    weeklyDigest: true,
    promotions: false,
  });

  useEffect(() => {
    // Load settings from localStorage
    const stored = localStorage.getItem('notificationSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const toggleSetting = (key: keyof NotificationSettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const notificationOptions = [
    {
      key: 'newRecipes' as keyof NotificationSettings,
      title: 'Novas Receitas',
      description: 'Receba notificações quando novas receitas forem adicionadas',
      icon: '🍳',
    },
    {
      key: 'ingredientExpiry' as keyof NotificationSettings,
      title: 'Validade de Ingredientes',
      description: 'Alertas quando ingredientes estiverem próximos do vencimento',
      icon: '⏰',
    },
    {
      key: 'shoppingReminders' as keyof NotificationSettings,
      title: 'Lembretes de Compras',
      description: 'Notificações sobre sua lista de compras',
      icon: '🛒',
    },
    {
      key: 'weeklyDigest' as keyof NotificationSettings,
      title: 'Resumo Semanal',
      description: 'Receba um resumo das suas atividades toda semana',
      icon: '📊',
    },
    {
      key: 'promotions' as keyof NotificationSettings,
      title: 'Promoções e Novidades',
      description: 'Fique por dentro de ofertas e recursos novos',
      icon: '🎁',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20 pb-20">
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
            Notificações
          </h1>
          <div className="w-10" />
        </div>

        {/* Info Card */}
        <div className="mb-8 bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-4">
            <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Configurar Notificações
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Escolha quais notificações você deseja receber. Suas preferências são salvas automaticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.key}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleSetting(option.key)}
                className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="text-4xl">{option.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
                <div
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                    settings[option.key]
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                      settings[option.key] ? 'left-7' : 'left-1'
                    }`}
                  >
                    {settings[option.key] && (
                      <Check className="w-4 h-4 text-emerald-600 absolute top-1 left-1" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button
            onClick={() => {
              const allEnabled = {
                newRecipes: true,
                ingredientExpiry: true,
                shoppingReminders: true,
                weeklyDigest: true,
                promotions: true,
              };
              setSettings(allEnabled);
              localStorage.setItem('notificationSettings', JSON.stringify(allEnabled));
            }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl py-6"
          >
            <Bell className="w-5 h-5 mr-2" />
            Ativar Todas
          </Button>
          <Button
            onClick={() => {
              const allDisabled = {
                newRecipes: false,
                ingredientExpiry: false,
                shoppingReminders: false,
                weeklyDigest: false,
                promotions: false,
              };
              setSettings(allDisabled);
              localStorage.setItem('notificationSettings', JSON.stringify(allDisabled));
            }}
            variant="outline"
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl py-6"
          >
            <BellOff className="w-5 h-5 mr-2" />
            Desativar Todas
          </Button>
        </div>

        {/* Save Info */}
        <div className="mt-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center">
            ✓ Configurações salvas automaticamente
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
