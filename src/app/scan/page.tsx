'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraScanner } from '@/components/custom/camera-scanner';
import { Navigation } from '@/components/custom/navigation';
import { Ingredient } from '@/lib/types';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [scannedIngredients, setScannedIngredients] = useState<Ingredient[]>([]);

  const handleScanComplete = (ingredients: Ingredient[]) => {
    setScannedIngredients(ingredients);
    // Store in localStorage for now (will be Supabase in Module 2)
    localStorage.setItem('scannedIngredients', JSON.stringify(ingredients));
    
    // Redirect to inventory after 1 second
    setTimeout(() => {
      router.push('/inventory');
    }, 1000);
  };

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
            Digitalizar Ingredientes
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Tecnologia de IA Avançada
              </h3>
              <p className="text-white/90 text-sm">
                Reconhecimento automático de ingredientes com precisão superior a 90%
              </p>
            </div>
          </div>
        </div>

        {/* Camera Scanner */}
        <div className="mb-8">
          <CameraScanner onScanComplete={handleScanComplete} />
        </div>

        {/* Success Message */}
        {scannedIngredients.length > 0 && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                Digitalização Concluída!
              </h3>
            </div>
            <p className="text-emerald-600 dark:text-emerald-500 mb-4">
              {scannedIngredients.length} ingredientes adicionados ao seu inventário
            </p>
            <div className="flex flex-wrap gap-2">
              {scannedIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Dicas para Melhor Digitalização
          </h3>
          <ul className="space-y-3">
            {[
              'Identifique ingredientes automaticamente',
              'Posicione os ingredientes claramente visíveis',
              'Evite sobreposição de itens',
              'Mantenha a câmera estável durante a captura'
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
