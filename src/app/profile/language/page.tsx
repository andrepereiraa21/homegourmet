'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt');

  const languageOptions = [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('appLanguage');
    if (stored) {
      setSelectedLanguage(stored);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    localStorage.setItem('appLanguage', code);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: code }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 pb-20">
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
            Idioma
          </h1>
          <div className="w-10" />
        </div>

        {/* Info Card */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Alterar Idioma do Aplicativo
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Escolha o idioma de sua preferência. Todo o aplicativo será traduzido automaticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg shadow-blue-200 dark:shadow-blue-900/50'
                  : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600'
              } backdrop-blur-xl`}
            >
              <div className="text-4xl mb-3">{lang.flag}</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {lang.name}
              </div>
              {selectedLanguage === lang.code && (
                <div className="mt-2">
                  <Check className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Save Info */}
        <div className="mt-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-400 text-center">
            ✓ Idioma salvo automaticamente
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
