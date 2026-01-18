import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Card, Button, PriceDisplay } from '../common';
import { shelfComponents, getComponentsByType } from '../../data/components';
import type { ShelfComponent, ShelfComponentType, DesignTheme, Locale } from '../../types';

interface ComponentSelectorProps {
  selectedType: ShelfComponentType | null;
  onSelectType: (type: ShelfComponentType | null) => void;
  onAddComponent: (component: ShelfComponent) => void;
  theme: DesignTheme;
}

const componentTypes: ShelfComponentType[] = [
  'upright',
  'shelf',
  'bracket',
  'base',
  'backpanel',
  'drawer',
  'door',
];

export default function ComponentSelector({
  selectedType,
  onSelectType,
  onAddComponent,
  theme,
}: ComponentSelectorProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const filteredComponents = selectedType
    ? getComponentsByType(selectedType)
    : shelfComponents;

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
    <div className="space-y-6">
      {/* Type filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectType(null)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedType === null ? styles.pillActive : styles.pill}
          `}
        >
          {t('products.allProducts')}
        </button>
        {componentTypes.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedType === type ? styles.pillActive : styles.pill}
            `}
          >
            {t(`builder.componentTypes.${type}`)}
          </button>
        ))}
      </div>

      {/* Component grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComponents.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover className="h-full flex flex-col">
              {/* Component image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl opacity-30">
                  {component.type === 'upright' && '|'}
                  {component.type === 'shelf' && '—'}
                  {component.type === 'bracket' && 'L'}
                  {component.type === 'base' && '▁'}
                  {component.type === 'backpanel' && '▢'}
                  {component.type === 'drawer' && '☐'}
                  {component.type === 'door' && '▯'}
                </span>
              </div>

              <div className="flex-1">
                <h4 className="font-medium">
                  {locale === 'no' ? component.nameNo : component.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {component.dimensions.height} × {component.dimensions.width} × {component.dimensions.depth} cm
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {t(`builder.woodTypes.${component.woodType}`)} · {t(`builder.finishes.${component.finish}`)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <PriceDisplay price={component.price} size="md" />
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onAddComponent(component)}
                  leftIcon={<Plus size={16} />}
                >
                  {t('common.addToCart')}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
