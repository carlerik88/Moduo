import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { shelfComponents } from '../../data/components';
import { useCartStore } from '../../stores/cartStore';
import { Card, Button, Select, PriceDisplay } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import type { DesignTheme, ShelfComponentType, Locale } from '../../types';

interface ProductsPageProps {
  theme: DesignTheme;
}

type SortOption = 'price-asc' | 'price-desc' | 'name' | 'newest';

const componentTypes: Array<ShelfComponentType | 'all'> = [
  'all',
  'upright',
  'shelf',
  'bracket',
  'base',
  'backpanel',
  'drawer',
  'door',
];

export default function ProductsPage({ theme }: ProductsPageProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { addComponentToCart } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<ShelfComponentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...shelfComponents];

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.type === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => {
          const nameA = locale === 'no' ? a.nameNo : a.name;
          const nameB = locale === 'no' ? b.nameNo : b.name;
          return nameA.localeCompare(nameB);
        });
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, sortBy, locale]);

  const handleAddToCart = (component: typeof shelfComponents[0]) => {
    addComponentToCart(component, 1);
    setAddedId(component.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const sortOptions = [
    { value: 'name', label: t('products.sortBy.name') },
    { value: 'price-asc', label: t('products.sortBy.price-asc') },
    { value: 'price-desc', label: t('products.sortBy.price-desc') },
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('products.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('products.subtitle')}</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category filter pills */}
          <div className="flex-1 flex flex-wrap gap-2">
            {componentTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedCategory(type)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === type ? styles.pillActive : styles.pill}
                `}
              >
                {type === 'all' ? t('products.allProducts') : t(`builder.componentTypes.${type}`)}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="w-full sm:w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            />
          </div>
        </div>

        {/* Products grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500">{t('products.noResults')}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card hover className="h-full flex flex-col">
                  {/* Product image placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl opacity-20">
                      {product.type === 'upright' && '|'}
                      {product.type === 'shelf' && '—'}
                      {product.type === 'bracket' && 'L'}
                      {product.type === 'base' && '▁'}
                      {product.type === 'backpanel' && '▢'}
                      {product.type === 'drawer' && '☐'}
                      {product.type === 'door' && '▯'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {t(`builder.componentTypes.${product.type}`)}
                    </p>
                    <h3 className="font-semibold mb-1">
                      {locale === 'no' ? product.nameNo : product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth} cm
                    </p>
                    <p className="text-xs text-gray-400">
                      {t(`builder.woodTypes.${product.woodType}`)} · {t(`builder.finishes.${product.finish}`)}
                    </p>
                    {product.maxLoad && (
                      <p className="text-xs text-gray-400 mt-1">
                        Max: {product.maxLoad} kg
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <PriceDisplay price={product.price} size="md" />
                    <Button
                      size="sm"
                      variant={addedId === product.id ? 'secondary' : 'primary'}
                      onClick={() => handleAddToCart(product)}
                      leftIcon={<Plus size={16} />}
                      disabled={addedId === product.id}
                    >
                      {addedId === product.id ? t('products.addedToCart') : t('common.addToCart')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
