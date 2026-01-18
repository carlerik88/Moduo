import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { LanguageSwitcher } from '../common';
import type { DesignTheme } from '../../types';

interface HeaderProps {
  theme: DesignTheme;
}

export default function Header({ theme }: HeaderProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCartStore();

  const basePath = `/${theme}`;

  const navLinks = [
    { href: basePath, label: t('nav.home') },
    { href: `${basePath}/builder`, label: t('nav.builder') },
    { href: `${basePath}/products`, label: t('nav.products') },
    { href: `${basePath}/faq`, label: t('nav.faq') },
    { href: `${basePath}/contact`, label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href === basePath) {
      return location.pathname === basePath || location.pathname === `${basePath}/`;
    }
    return location.pathname.startsWith(href);
  };

  const themeStyles: Record<DesignTheme, { bg: string; text: string; accent: string; logo: string }> = {
    scandinavian: {
      bg: 'bg-scandi-offwhite',
      text: 'text-scandi-charcoal',
      accent: 'text-scandi-forest hover:text-scandi-forest-light',
      logo: 'text-scandi-forest',
    },
    craftsman: {
      bg: 'bg-craft-cream',
      text: 'text-craft-walnut',
      accent: 'text-craft-blue hover:text-craft-blue-light',
      logo: 'text-craft-walnut',
    },
    modern: {
      bg: 'bg-modern-grey',
      text: 'text-modern-dark',
      accent: 'text-modern-slate hover:text-modern-slate-light',
      logo: 'text-modern-slate',
    },
  };

  const styles = themeStyles[theme];

  return (
    <header className={`${styles.bg} ${styles.text} sticky top-0 z-40 border-b border-black/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={basePath} className={`text-2xl md:text-3xl font-bold ${styles.logo}`}>
            Moduo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  text-sm font-medium transition-colors
                  ${isActive(link.href) ? styles.accent : 'hover:opacity-70'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language, Cart, Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              to={`${basePath}/cart`}
              className="relative p-2 hover:opacity-70 transition-opacity"
              aria-label={`${t('nav.cart')} (${cart.totalItems})`}
            >
              <ShoppingCart size={24} />
              {cart.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-scandi-forest text-white text-xs rounded-full flex items-center justify-center"
                >
                  {cart.totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-black/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block py-2 px-4 rounded-lg transition-colors
                    ${isActive(link.href) ? 'bg-black/5 font-medium' : 'hover:bg-black/5'}
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
