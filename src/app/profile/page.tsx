'use client';

import Link from 'next/link';
import { ArrowLeft, User, Settings, Heart, Clock, ChefHat, Bell, Shield, HelpCircle, Globe, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  // Obter o nome do usuário dos metadados
  const userName = user?.user_metadata?.name || 'Chef em Casa';
  
  // Obter ano de criação da conta
  const accountYear = user?.created_at ? new Date(user.created_at).getFullYear() : 2024;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

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
            Perfil
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{userName}</h2>
              <p className="text-white/90">Membro desde {accountYear}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">12</p>
              <p className="text-white/90 text-sm">Receitas</p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">8</p>
              <p className="text-white/90 text-sm">Favoritas</p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">24</p>
              <p className="text-white/90 text-sm">Ingredientes</p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/premium">
              <div className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    Premium
                    <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full">
                      VIP
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gerir subscrição e benefícios</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/favorites">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Receitas Favoritas</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suas receitas salvas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/history">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Histórico</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receitas recentes</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/preferences">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Preferências</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dietas e restrições</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/language">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Idioma</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alterar idioma do app</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/notifications">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notificações</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Configurar alertas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/privacy">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Privacidade</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dados e segurança</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Link href="/profile/help">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Ajuda</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suporte e FAQ</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2">
            🚀 Módulo 2 em Desenvolvimento
          </h3>
          <p className="text-white/90 text-sm">
            Integração com Supabase, autenticação e sincronização de dados em breve!
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
