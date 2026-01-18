import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button, Input } from '../common';
import type { DesignTheme } from '../../types';

interface FooterProps {
  theme: DesignTheme;
}

export default function Footer({ theme }: FooterProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const basePath = `/${theme}`;

  const themeStyles: Record<DesignTheme, { bg: string; text: string; muted: string; border: string }> = {
    scandinavian: {
      bg: 'bg-scandi-charcoal',
      text: 'text-scandi-offwhite',
      muted: 'text-scandi-offwhite/70',
      border: 'border-scandi-offwhite/10',
    },
    craftsman: {
      bg: 'bg-craft-walnut',
      text: 'text-craft-linen',
      muted: 'text-craft-linen/70',
      border: 'border-craft-linen/10',
    },
    modern: {
      bg: 'bg-modern-dark',
      text: 'text-modern-grey',
      muted: 'text-modern-grey/70',
      border: 'border-modern-grey/10',
    },
  };

  const styles = themeStyles[theme];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={`${styles.bg} ${styles.text}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Moduo</h3>
            <p className={`${styles.muted} mb-4`}>{t('footer.aboutText')}</p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.muted} hover:opacity-100 transition-opacity`}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.muted} hover:opacity-100 transition-opacity`}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to={basePath} className={`${styles.muted} hover:opacity-100 transition-opacity`}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/builder`} className={`${styles.muted} hover:opacity-100 transition-opacity`}>
                  {t('nav.builder')}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/products`} className={`${styles.muted} hover:opacity-100 transition-opacity`}>
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/faq`} className={`${styles.muted} hover:opacity-100 transition-opacity`}>
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contact.title')}</h4>
            <ul className="space-y-3">
              <li className={`flex items-center gap-3 ${styles.muted}`}>
                <MapPin size={18} className="shrink-0" />
                <span>Verkstedveien 12, 0158 Oslo</span>
              </li>
              <li>
                <a
                  href="mailto:kontakt@moduo.no"
                  className={`flex items-center gap-3 ${styles.muted} hover:opacity-100 transition-opacity`}
                >
                  <Mail size={18} className="shrink-0" />
                  <span>kontakt@moduo.no</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4722123456"
                  className={`flex items-center gap-3 ${styles.muted} hover:opacity-100 transition-opacity`}
                >
                  <Phone size={18} className="shrink-0" />
                  <span>+47 22 12 34 56</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.newsletter.title')}</h4>
            <p className={`${styles.muted} mb-4`}>{t('footer.newsletter.description')}</p>
            {subscribed ? (
              <p className="text-green-400 text-sm">{t('common.success')}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  className="flex-1 text-gray-900"
                />
                <Button type="submit" size="md">
                  {t('footer.newsletter.subscribe')}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-8 border-t ${styles.border} flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={styles.muted}>{t('footer.copyright')}</p>
          <div className={`flex gap-6 text-sm ${styles.muted}`}>
            <Link to={`${basePath}/privacy`} className="hover:opacity-100 transition-opacity">
              {t('footer.privacy')}
            </Link>
            <Link to={`${basePath}/terms`} className="hover:opacity-100 transition-opacity">
              {t('footer.terms')}
            </Link>
            <Link to={`${basePath}/cookies`} className="hover:opacity-100 transition-opacity">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
