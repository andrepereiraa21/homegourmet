'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Package, BookOpen, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', icon: Home, label: t('home') },
    { href: '/scan', icon: Camera, label: t('scan') },
    { href: '/inventory', icon: Package, label: t('inventory') },
    { href: '/recipes', icon: BookOpen, label: t('recipes') },
    { href: '/shopping-list', icon: ShoppingCart, label: t('shopping') },
    { href: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-6 h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all duration-300 ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
