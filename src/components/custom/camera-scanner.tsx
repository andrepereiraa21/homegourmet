'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Check, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ingredient } from '@/lib/types';

interface CameraScannerProps {
  onScanComplete: (ingredients: Ingredient[]) => void;
}

export function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      
      setStream(mediaStream);
      setIsScanning(true);
      
      // Wait for next tick to ensure video element is ready
      setTimeout(() => {
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
        }
      }, 100);
      
    } catch (error: any) {
      console.error('Camera error:', error);
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
    setIsAnalyzing(false);
    setDetectedItems([]);
  }, [stream]);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    
    try {
      // Capture frame from video
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to create blob'));
        }, 'image/jpeg', 0.95);
      });
      
      // Send to OpenAI Vision API
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');
      
      const response = await fetch('/api/analyze-ingredients', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const data = await response.json();
      
      if (data.ingredients && data.ingredients.length > 0) {
        setDetectedItems(data.ingredients);
      } else {
        // Fallback if no ingredients detected
        setDetectedItems(['Nenhum ingrediente detectado']);
      }
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to mock data on error
      setDetectedItems(['Erro na detecção - tente novamente']);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const confirmScan = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      // Get nutritional info for detected ingredients
      const response = await fetch('/api/get-ingredient-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: detectedItems }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get ingredient info');
      }
      
      const data = await response.json();
      
      const ingredients: Ingredient[] = data.ingredients.map((item: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        name: item.name,
        quantity: item.quantity || 1,
        unit: item.unit || 'unidades',
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        fat: item.fat || 0,
        imageUrl: item.imageUrl || '',
        detectedAt: new Date(),
        confidence: item.confidence || 0.85
      }));
      
      stopCamera();
      setIsProcessing(false);
      onScanComplete(ingredients);
      
    } catch (error) {
      console.error('Error processing ingredients:', error);
      
      // Fallback to basic data structure
      const ingredients: Ingredient[] = detectedItems.map((name, index) => ({
        id: `${Date.now()}-${index}`,
        name: name,
        quantity: 1,
        unit: 'unidades',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        imageUrl: '',
        detectedAt: new Date(),
        confidence: 0.85
      }));
      
      stopCamera();
      setIsProcessing(false);
      onScanComplete(ingredients);
    }
  }, [detectedItems, stopCamera, onScanComplete]);

  const retryPermission = useCallback(() => {
    setPermissionError(null);
    startCamera();
  }, [startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
    <div className="relative w-full aspect-video min-h-[500px] bg-black rounded-3xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Hidden canvas for capturing frames */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">Câmera Ativa</span>
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

        {/* Center capture button - only show when NOT analyzing and NO detected items */}
        {!isAnalyzing && detectedItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <Button
              onClick={captureAndAnalyze}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Detectar Ingredientes
            </Button>
          </div>
        )}

        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Analisando ingredientes...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A IA está processando a imagem
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detected items - only show after analysis is complete */}
        {!isAnalyzing && detectedItems.length > 0 && (
          <div className="absolute bottom-6 left-0 right-0 px-6 pointer-events-auto">
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
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setDetectedItems([]);
                  }}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 py-6 rounded-xl"
                >
                  Tentar Novamente
                </Button>
                <Button
                  onClick={confirmScan}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Confirmar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
