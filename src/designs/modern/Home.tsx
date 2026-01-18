import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Layers, Zap, Star, Play } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { Button, Card } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import type { Locale } from '../../types';

export default function ModernHome() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const basePath = '/modern';

  return (
    <PageWrapper theme="modern">
      {/* Hero Section - Clean and minimal */}
      <section className="relative min-h-[85vh] flex items-center bg-modern-grey overflow-hidden">
        {/* Gradient blob decorations */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-modern-slate/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-modern-beech/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-modern-slate/10 text-modern-slate px-4 py-1.5 rounded-full mb-6"
              >
                <Box size={16} />
                <span className="text-sm font-medium">
                  {locale === 'no' ? '3D Konfigurator' : '3D Configurator'}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-modern-dark leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`${basePath}/builder`}>
                  <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                    {t('hero.cta')}
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" leftIcon={<Play size={18} />}>
                  {locale === 'no' ? 'Se demo' : 'Watch demo'}
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
                {[
                  { value: '5000+', label: locale === 'no' ? 'Fornøyde kunder' : 'Happy customers' },
                  { value: '15', label: locale === 'no' ? 'Komponenter' : 'Components' },
                  { value: '5 år', label: locale === 'no' ? 'Garanti' : 'Warranty' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-modern-slate">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3D Preview mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* 3D Canvas placeholder with perspective */}
                <div
                  className="aspect-square bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center"
                  style={{
                    perspective: '1000px',
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      transform: 'rotateY(-15deg) rotateX(10deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Isometric shelf representation */}
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <defs>
                        <linearGradient id="shelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E8C79A" />
                          <stop offset="100%" stopColor="#D4B080" />
                        </linearGradient>
                        <linearGradient id="uprightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5B7C99" />
                          <stop offset="100%" stopColor="#7A98B3" />
                        </linearGradient>
                      </defs>

                      {/* Back panel */}
                      <rect x="80" y="40" width="240" height="300" fill="#F5F5F7" stroke="#E5E5E7" strokeWidth="2" rx="4" />

                      {/* Left upright */}
                      <rect x="70" y="40" width="20" height="310" fill="url(#uprightGrad)" rx="2" />
                      {/* Right upright */}
                      <rect x="310" y="40" width="20" height="310" fill="url(#uprightGrad)" rx="2" />

                      {/* Shelves with 3D effect */}
                      {[70, 150, 230].map((y, i) => (
                        <g key={i}>
                          <rect x="90" y={y} width="220" height="15" fill="url(#shelfGrad)" rx="2" />
                          <rect x="90" y={y + 15} width="220" height="3" fill="#C4A070" rx="1" />
                        </g>
                      ))}

                      {/* Base */}
                      <rect x="70" y="330" width="260" height="20" fill="url(#shelfGrad)" rx="3" />
                      <rect x="70" y="350" width="260" height="4" fill="#C4A070" rx="1" />

                      {/* Decorative items */}
                      <circle cx="140" cy="125" r="18" fill="#5B7C99" opacity="0.6" />
                      <rect x="200" y="107" width="50" height="38" fill="#5B7C99" opacity="0.4" rx="3" />
                      <rect x="280" y="115" width="25" height="30" fill="#E8C79A" opacity="0.8" rx="2" />

                      <rect x="120" y="190" width="60" height="35" fill="#1D1D1F" opacity="0.2" rx="2" />
                      <circle cx="250" cy="210" r="22" fill="#E8C79A" opacity="0.6" />
                    </svg>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
                >
                  <Layers className="text-modern-slate" size={20} />
                  <span className="text-sm font-medium">Modular</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
                >
                  <Zap className="text-modern-accent" size={20} />
                  <span className="text-sm font-medium">Real-time 3D</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'no' ? 'Bygg din perfekte hylle' : 'Build your perfect shelf'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'no'
                ? 'Bruk vår interaktive 3D-konfigurator for å designe hyllesystemet ditt'
                : 'Use our interactive 3D configurator to design your shelf system'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: locale === 'no' ? '3D Forhåndsvisning' : '3D Preview',
                desc: locale === 'no'
                  ? 'Se hyllen din i sanntid 3D mens du bygger'
                  : 'See your shelf in real-time 3D as you build',
              },
              {
                icon: Layers,
                title: locale === 'no' ? 'Modulær Design' : 'Modular Design',
                desc: locale === 'no'
                  ? 'Kombiner komponenter etter dine behov'
                  : 'Combine components to match your needs',
              },
              {
                icon: Zap,
                title: locale === 'no' ? 'Instant Prising' : 'Instant Pricing',
                desc: locale === 'no'
                  ? 'Se totalprisen oppdateres automatisk'
                  : 'Watch the total price update automatically',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center group">
                  <div className="w-16 h-16 bg-modern-slate/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-modern-slate/20 transition-colors">
                    <feature.icon className="text-modern-slate" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-modern-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('products.title')}</h2>
              <p className="text-gray-600">{t('products.subtitle')}</p>
            </div>
            <Link to={`${basePath}/products`} className="mt-4 md:mt-0">
              <Button variant="ghost" rightIcon={<ArrowRight size={18} />}>
                {t('common.viewAll')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['upright', 'shelf', 'drawer', 'door'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`${basePath}/products`}>
                  <Card hover padding="none" className="overflow-hidden group">
                    <div className="aspect-square bg-gradient-to-br from-modern-beech/30 to-modern-slate/10 flex items-center justify-center group-hover:from-modern-beech/40 group-hover:to-modern-slate/20 transition-all">
                      <span className="text-6xl text-modern-dark/20 group-hover:scale-110 transition-transform">
                        {type === 'upright' && '|'}
                        {type === 'shelf' && '—'}
                        {type === 'drawer' && '☐'}
                        {type === 'door' && '▯'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{t(`builder.componentTypes.${type}`)}</h3>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-modern-grey border-none">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? 'text-modern-accent fill-modern-accent' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">
                    "{locale === 'no' ? testimonial.textNo : testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-modern-slate/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-modern-slate">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-modern-slate to-modern-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'no' ? 'Klar til å begynne?' : 'Ready to start?'}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {locale === 'no'
                ? 'Bruk vår gratis 3D-konfigurator og design ditt drømmehyllesystem'
                : 'Use our free 3D configurator and design your dream shelf system'}
            </p>
            <Link to={`${basePath}/builder`}>
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={20} />}>
                {t('hero.cta')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
