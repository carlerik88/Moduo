import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faqItems, getFAQByCategory } from '../data/faq';
import { Accordion, AccordionItem, Card } from '../components/common';
import { PageWrapper } from '../components/layout';
import type { DesignTheme, Locale } from '../types';

interface FaqPageProps {
  theme: DesignTheme;
}

const categories = ['ordering', 'shipping', 'assembly', 'care', 'returns'];

export default function FaqPage({ theme }: FaqPageProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayedFaqs = selectedCategory
    ? getFAQByCategory(selectedCategory)
    : faqItems;

  const themeStyles: Record<DesignTheme, { pill: string; pillActive: string }> = {
    scandinavian: {
      pill: 'bg-scandi-offwhite text-scandi-charcoal hover:bg-scandi-oak/20',
      pillActive: 'bg-scandi-forest text-white',
    },
    craftsman: {
      pill: 'bg-craft-cream text-craft-walnut hover:bg-craft-blue/20',
      pillActive: 'bg-craft-blue text-white',
    },
    modern: {
      pill: 'bg-modern-grey text-modern-dark hover:bg-modern-slate/20',
      pillActive: 'bg-modern-slate text-white',
    },
  };

  const styles = themeStyles[theme];

  return (
    <PageWrapper theme={theme}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('faq.title')}</h1>
          <p className="text-gray-600">{t('faq.subtitle')}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === null ? styles.pillActive : styles.pill}
            `}
          >
            {t('products.allProducts')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === cat ? styles.pillActive : styles.pill}
              `}
            >
              {t(`faq.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <Card>
          <Accordion allowMultiple>
            {displayedFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                title={locale === 'no' ? faq.questionNo : faq.question}
              >
                <p>{locale === 'no' ? faq.answerNo : faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </PageWrapper>
  );
}
