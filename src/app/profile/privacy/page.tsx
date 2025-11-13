'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

export default function PrivacyPage() {
  const handleExportData = () => {
    const data = {
      ingredients: localStorage.getItem('scannedIngredients'),
      preferences: localStorage.getItem('userPreferences'),
      history: localStorage.getItem('recipeHistory'),
      shoppingList: localStorage.getItem('shoppingList'),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meus-dados-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (confirm('Tem certeza que deseja apagar todos os seus dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      alert('Todos os dados foram apagados com sucesso.');
      window.location.href = '/';
    }
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
            Privacidade
          </h1>
          <div className="w-10" />
        </div>

        {/* Privacy Info Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Seus Dados Estão Seguros
              </h3>
              <p className="text-white/90 text-sm">
                Todos os seus dados são armazenados localmente no seu dispositivo. Nós não coletamos ou compartilhamos suas informações.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Options */}
        <div className="space-y-4">
          {/* Data Storage */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Armazenamento Local
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Seus dados são armazenados apenas no seu navegador. Nenhuma informação é enviada para servidores externos.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Ingredientes digitalizados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Histórico de receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Preferências alimentares</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span>Lista de compras</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Controle de Privacidade
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Você tem controle total sobre seus dados e pode exportá-los ou excluí-los a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Actions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                Gerenciar Dados
              </h3>

              {/* Export Data */}
              <button
                onClick={handleExportData}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors border border-emerald-200 dark:border-emerald-800"
              >
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Exportar Meus Dados
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Baixe uma cópia de todos os seus dados
                  </p>
                </div>
              </button>

              {/* Clear All Data */}
              <button
                onClick={handleClearAllData}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Apagar Todos os Dados
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Remove permanentemente todos os seus dados
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Segurança
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Suas informações estão protegidas e nunca são compartilhadas com terceiros.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Nenhum dado é enviado para servidores externos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Não coletamos informações pessoais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>Você tem controle total sobre seus dados</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
