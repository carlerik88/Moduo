import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Ruler, Hammer, TreePine, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { Button, Card } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import type { Locale } from '../../types';

export default function CraftsmanHome() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const basePath = '/craftsman';

  return (
    <PageWrapper theme="craftsman">
      {/* Hero Section - Blueprint style */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 bg-craft-linen">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(#4A6FA5 1px, transparent 1px),
                linear-gradient(90deg, #4A6FA5 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Workshop badge */}
              <div className="inline-flex items-center gap-2 bg-craft-walnut/10 text-craft-walnut px-4 py-2 rounded-full mb-6">
                <Hammer size={18} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  {locale === 'no' ? 'Håndlaget i Norge' : 'Handcrafted in Norway'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-craft-walnut leading-tight mb-6 uppercase tracking-wider">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-craft-walnut/70 mb-8 max-w-lg">
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

            {/* Blueprint illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Paper texture */}
                <div className="aspect-square bg-white rounded-lg shadow-lg p-8 border-4 border-craft-blue/20">
                  {/* Technical drawing */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Grid lines */}
                    {Array.from({ length: 21 }).map((_, i) => (
                      <g key={i}>
                        <line
                          x1="0"
                          y1={i * 20}
                          x2="400"
                          y2={i * 20}
                          stroke="#4A6FA5"
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                        <line
                          x1={i * 20}
                          y1="0"
                          x2={i * 20}
                          y2="400"
                          stroke="#4A6FA5"
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                      </g>
                    ))}

                    {/* Dimension lines */}
                    <line x1="60" y1="30" x2="60" y2="360" stroke="#5D4037" strokeWidth="1" strokeDasharray="4,2" />
                    <line x1="340" y1="30" x2="340" y2="360" stroke="#5D4037" strokeWidth="1" strokeDasharray="4,2" />
                    <line x1="50" y1="40" x2="350" y2="40" stroke="#5D4037" strokeWidth="1" strokeDasharray="4,2" />

                    {/* Shelf structure - darker lines */}
                    <rect x="60" y="40" width="15" height="320" fill="none" stroke="#5D4037" strokeWidth="2" />
                    <rect x="325" y="40" width="15" height="320" fill="none" stroke="#5D4037" strokeWidth="2" />
                    <rect x="75" y="60" width="250" height="10" fill="none" stroke="#5D4037" strokeWidth="2" />
                    <rect x="75" y="150" width="250" height="10" fill="none" stroke="#5D4037" strokeWidth="2" />
                    <rect x="75" y="240" width="250" height="10" fill="none" stroke="#5D4037" strokeWidth="2" />
                    <rect x="75" y="330" width="250" height="20" fill="none" stroke="#5D4037" strokeWidth="2" />

                    {/* Dimension annotations */}
                    <text x="200" y="25" textAnchor="middle" fill="#4A6FA5" fontSize="12" fontFamily="monospace">
                      280mm
                    </text>
                    <text x="45" y="200" textAnchor="middle" fill="#4A6FA5" fontSize="12" fontFamily="monospace" transform="rotate(-90, 45, 200)">
                      320mm
                    </text>

                    {/* Scale indicator */}
                    <rect x="300" y="375" width="60" height="8" fill="none" stroke="#5D4037" strokeWidth="1" />
                    <text x="330" y="390" textAnchor="middle" fill="#5D4037" fontSize="10" fontFamily="monospace">
                      1:10
                    </text>
                  </svg>
                </div>

                {/* Ruler decoration */}
                <div className="absolute -right-4 top-1/4 w-8 h-48 bg-craft-walnut/10 rounded flex items-center justify-center">
                  <Ruler className="text-craft-walnut/50" size={24} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-craft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TreePine, title: t('about.sustainability.title'), desc: t('about.sustainability.description') },
              { icon: Hammer, title: t('about.craftsman.title'), desc: t('about.craftsman.description') },
              { icon: Ruler, title: t('about.quality.title'), desc: t('about.quality.description') },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-dashed border-craft-walnut/20">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-craft-blue/10 rounded flex items-center justify-center shrink-0">
                      <feature.icon className="text-craft-blue" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 uppercase tracking-wide">{feature.title}</h3>
                      <p className="text-craft-walnut/70">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop showcase */}
      <section className="py-20 bg-craft-walnut text-craft-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wider">
                {t('about.craftsman.title')}
              </h2>
              <p className="text-craft-linen/80 mb-6 text-lg">
                {t('about.craftsman.description')}
              </p>
              <Link to={`${basePath}/builder`}>
                <Button variant="secondary" rightIcon={<ArrowRight size={18} />}>
                  {t('hero.cta')}
                </Button>
              </Link>
            </div>
            <div className="aspect-video bg-craft-linen/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Hammer size={64} className="mx-auto opacity-30 mb-4" />
                <p className="text-craft-linen/50">Workshop Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-20 bg-craft-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{t('products.title')}</h2>
            <p className="text-craft-walnut/70">{t('products.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['upright', 'shelf', 'bracket', 'drawer'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`${basePath}/products`}>
                  <Card hover className="text-center border-2 border-craft-walnut/10">
                    <div className="aspect-square bg-white rounded flex items-center justify-center mb-4 border border-dashed border-craft-walnut/20">
                      <span className="text-5xl text-craft-walnut/30">
                        {type === 'upright' && '|'}
                        {type === 'shelf' && '—'}
                        {type === 'bracket' && 'L'}
                        {type === 'drawer' && '☐'}
                      </span>
                    </div>
                    <h3 className="font-semibold uppercase tracking-wide text-sm">
                      {t(`builder.componentTypes.${type}`)}
                    </h3>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-craft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{t('testimonials.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-l-4 border-craft-blue">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-craft-rust fill-craft-rust' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-craft-walnut/80 mb-4 italic">
                    "{locale === 'no' ? testimonial.textNo : testimonial.text}"
                  </blockquote>
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-craft-walnut/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-craft-walnut">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-craft-walnut/60">{testimonial.location}</p>
                    </div>
                  </footer>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-craft-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{t('hero.title')}</h2>
          <p className="text-white/80 mb-8">{t('hero.subtitle')}</p>
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
