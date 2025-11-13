'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, X, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ingredient } from '@/lib/types';

interface CameraScannerProps {
  onScanComplete: (ingredients: Ingredient[]) => void;
}

export function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setPermissionError(null);
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError('Seu navegador não suporta acesso à câmera. Tente usar Chrome, Firefox ou Safari.');
        return;
      }

      // Request camera permission with proper constraints
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      
      setStream(mediaStream);
      setIsScanning(true);
      
      // Simulate AI detection after 2 seconds
      setTimeout(() => {
        setDetectedItems(['Tomate', 'Cebola', 'Alho']);
      }, 2000);
    } catch (error: any) {
      // Handle specific permission errors
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionError('Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do navegador.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setPermissionError('Nenhuma câmera encontrada no dispositivo.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setPermissionError('A câmera está sendo usada por outro aplicativo. Feche outros apps e tente novamente.');
      } else if (error.name === 'OverconstrainedError') {
        setPermissionError('Não foi possível acessar a câmera com as configurações solicitadas.');
      } else if (error.name === 'SecurityError') {
        setPermissionError('Acesso à câmera bloqueado por questões de segurança. Certifique-se de estar usando HTTPS.');
      } else {
        setPermissionError('Erro ao acessar a câmera. Verifique as permissões do navegador.');
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setDetectedItems([]);
  }, [stream]);

  const confirmScan = useCallback(() => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockIngredients: Ingredient[] = [
        {
          id: '1',
          name: 'Tomate',
          quantity: 3,
          unit: 'unidades',
          calories: 22,
          protein: 1.1,
          carbs: 4.8,
          fat: 0.2,
          imageUrl: 'https://images.unsplash.com/photo-1546470427-227e9e6a4b8b?w=400&h=400&fit=crop',
          detectedAt: new Date(),
          confidence: 0.95
        },
        {
          id: '2',
          name: 'Cebola',
          quantity: 2,
          unit: 'unidades',
          calories: 40,
          protein: 1.1,
          carbs: 9.3,
          fat: 0.1,
          imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
          detectedAt: new Date(),
          confidence: 0.92
        },
        {
          id: '3',
          name: 'Alho',
          quantity: 5,
          unit: 'dentes',
          calories: 4,
          protein: 0.2,
          carbs: 1,
          fat: 0,
          imageUrl: 'https://images.unsplash.com/photo-1588347818036-8fc8d1d6b7b7?w=400&h=400&fit=crop',
          detectedAt: new Date(),
          confidence: 0.88
        }
      ];
      
      stopCamera();
      setIsProcessing(false);
      onScanComplete(mockIngredients);
    }, 1500);
  }, [stopCamera, onScanComplete]);

  const retryPermission = useCallback(() => {
    setPermissionError(null);
    startCamera();
  }, [startCamera]);

  // Show permission error
  if (permissionError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-3xl p-8">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">
          Erro de Permissão
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
          {permissionError}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={retryPermission}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Tentar Novamente
          </Button>
        </div>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
            <strong>Dica:</strong> Clique no ícone de cadeado/câmera na barra de endereço do navegador e permita o acesso à câmera.
          </p>
        </div>
      </div>
    );
  }

  if (!isScanning) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-3xl p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <Camera className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Digitalizar Ingredientes
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
          Aponte a câmera para os seus ingredientes e a IA irá identificá-los automaticamente
        </p>
        <Button
          onClick={startCamera}
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <Camera className="w-6 h-6 mr-2" />
          Iniciar Digitalização
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[600px] bg-black rounded-3xl overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Overlay with detected items */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">Digitalizando...</span>
          </div>
          <Button
            onClick={stopCamera}
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-xl hover:bg-white/30 text-white rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Detected items */}
        {detectedItems.length > 0 && (
          <div className="absolute bottom-32 left-0 right-0 px-6">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Ingredientes Detectados
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {detectedItems.map((item, index) => (
                  <div
                    key={`detected-${index}-${item}`}
                    className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={confirmScan}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Confirmar Ingredientes
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
