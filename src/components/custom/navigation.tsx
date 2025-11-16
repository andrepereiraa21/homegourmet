'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Package, BookOpen, User, ShoppingCart, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Verificar status premium do localStorage
    const checkPremiumStatus = () => {
      const premiumStatus = localStorage.getItem('isPremium');
      setIsPremium(premiumStatus === 'true');
    };

    checkPremiumStatus();

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      checkPremiumStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event para mudanças no mesmo tab
    window.addEventListener('premiumStatusChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('premiumStatusChanged', handleStorageChange);
    };
  }, []);

  const navItems = [
    { href: '/', icon: Home, label: t('home') },
    { href: '/scan', icon: Camera, label: t('scan') },
    { href: '/inventory', icon: Package, label: t('inventory') },
    { href: '/recipes', icon: BookOpen, label: t('recipes') },
    ...(isPremium ? [
      { href: '/weekly-plan', icon: Calendar, label: 'Planejamento', isPremiumMenu: true },
      { href: '/shopping-cart', icon: ShoppingCart, label: 'Carrinho', isPremiumMenu: true }
    ] : []),
    { href: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className={`grid ${isPremium ? 'grid-cols-7' : 'grid-cols-5'} h-16 sm:h-20`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all duration-300 relative ${
                  item.isPremiumMenu
                    ? isActive
                      ? 'text-purple-600 dark:text-purple-400 scale-105'
                      : 'text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300'
                    : isActive
                    ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {item.isPremiumMenu && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
