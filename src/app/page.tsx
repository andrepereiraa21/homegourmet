'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Camera, Package, BookOpen, Sparkles, ChefHat, Clock, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 pb-20">
      {/* Header with Auth Buttons - Only show if user is NOT logged in */}
      {!user && (
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-xl"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full">
                  <ChefHat className="w-full h-full text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-in fade-in slide-in-from-bottom-6">
              HomeGourmet
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8">
              Digitalize seus ingredientes e descubra receitas incríveis com IA
            </p>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-10">
            <Link href="/scan">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-6 h-6 mr-2" />
                Digitalizar Ingredientes
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                Ver Receitas
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Digitalização IA
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identifique ingredientes automaticamente
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Inventário Virtual
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie seus ingredientes com informações nutricionais completas
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Receitas Personalizadas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sugestões inteligentes baseadas nos seus ingredientes e preferências
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '1', icon: Camera, title: 'Digitalize', desc: 'Aponte a câmera para os ingredientes' },
            { step: '2', icon: Sparkles, title: 'IA Identifica', desc: 'Reconhecimento automático' },
            { step: '3', icon: ChefHat, title: 'Receitas', desc: 'Sugestões personalizadas instantâneas' },
            { step: '4', icon: Clock, title: 'Cozinhe', desc: 'Siga as instruções passo a passo' }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-xl relative">
                  <item.icon className="w-8 h-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
