import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Award, Heart, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { Button, Card } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import type { Locale } from '../../types';

export default function ScandinavianHome() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const basePath = '/scandinavian';

  return (
    <PageWrapper theme="scandinavian">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-scandi-cream to-scandi-offwhite" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-scandi-charcoal leading-tight mb-6">
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
                <Link to={`${basePath}/products`}>
                  <Button size="lg" variant="outline">
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="aspect-square bg-gradient-to-br from-scandi-oak/20 to-scandi-forest/10 rounded-3xl flex items-center justify-center">
                {/* SVG Shelf illustration */}
                <svg viewBox="0 0 400 400" className="w-full h-full p-12">
                  {/* Uprights */}
                  <rect x="60" y="40" width="12" height="320" fill="#D4A574" rx="2" />
                  <rect x="328" y="40" width="12" height="320" fill="#D4A574" rx="2" />

                  {/* Shelves */}
                  <rect x="72" y="60" width="256" height="8" fill="#B8956A" rx="1" />
                  <rect x="72" y="140" width="256" height="8" fill="#B8956A" rx="1" />
                  <rect x="72" y="220" width="256" height="8" fill="#B8956A" rx="1" />
                  <rect x="72" y="300" width="256" height="8" fill="#B8956A" rx="1" />
                  <rect x="72" y="344" width="256" height="16" fill="#D4A574" rx="2" />

                  {/* Decorative items */}
                  <circle cx="120" cy="108" r="20" fill="#2C5530" opacity="0.3" />
                  <rect x="180" y="90" width="40" height="48" fill="#2C5530" opacity="0.2" rx="2" />
                  <rect x="260" y="100" width="30" height="38" fill="#D4A574" opacity="0.5" rx="1" />

                  <circle cx="100" cy="180" r="16" fill="#2C5530" opacity="0.2" />
                  <rect x="160" y="168" width="80" height="50" fill="#5D4037" opacity="0.2" rx="2" />
                  <rect x="280" y="178" width="40" height="40" fill="#D4A574" opacity="0.4" rx="2" />

                  <rect x="90" y="250" width="50" height="48" fill="#2C5530" opacity="0.15" rx="2" />
                  <circle cx="200" cy="270" r="24" fill="#D4A574" opacity="0.4" />
                  <rect x="270" y="258" width="48" height="40" fill="#5D4037" opacity="0.2" rx="2" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: t('about.sustainability.title'), desc: t('about.sustainability.description') },
              { icon: Award, title: t('about.quality.title'), desc: t('about.quality.description') },
              { icon: Heart, title: t('about.craftsman.title'), desc: t('about.craftsman.description') },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-scandi-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-scandi-forest" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-scandi-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('products.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('products.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['upright', 'shelf', 'drawer', 'base'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`${basePath}/products`}>
                  <Card hover className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-scandi-oak/20 to-scandi-forest/5 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl opacity-30">
                        {type === 'upright' && '|'}
                        {type === 'shelf' && '—'}
                        {type === 'drawer' && '☐'}
                        {type === 'base' && '▁'}
                      </span>
                    </div>
                    <h3 className="font-semibold">{t(`builder.componentTypes.${type}`)}</h3>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to={`${basePath}/products`}>
              <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
                {t('common.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
            <p className="text-gray-600">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 flex-1 mb-4">
                    "{locale === 'no' ? testimonial.textNo : testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-scandi-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.title')}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
          <Link to={`${basePath}/builder`}>
            <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={20} />}>
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
