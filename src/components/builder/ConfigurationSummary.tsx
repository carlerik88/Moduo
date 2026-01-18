import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import { Button, PriceDisplay, QuantitySelector } from '../common';
import { formatWeight } from '../../utils/calculations';
import type { ShelfConfiguration, Locale, DesignTheme } from '../../types';

interface ConfigurationSummaryProps {
  configuration: ShelfConfiguration | null;
  onUpdateQuantity: (componentId: string, quantity: number) => void;
  onRemoveComponent: (componentId: string) => void;
  onAddToCart: () => void;
  onSave: () => void;
  onClear: () => void;
  theme: DesignTheme;
}

export default function ConfigurationSummary({
  configuration,
  onUpdateQuantity,
  onRemoveComponent,
  onAddToCart,
  onSave,
  onClear,
  theme,
}: ConfigurationSummaryProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const themeStyles: Record<DesignTheme, { accent: string; bg: string }> = {
    scandinavian: { accent: 'bg-scandi-forest', bg: 'bg-scandi-cream' },
    craftsman: { accent: 'bg-craft-blue', bg: 'bg-craft-cream' },
    modern: { accent: 'bg-modern-slate', bg: 'bg-white' },
  };

  const styles = themeStyles[theme];

  if (!configuration || configuration.components.length === 0) {
    return (
      <div className={`${styles.bg} rounded-xl p-6 text-center`}>
        <p className="text-gray-500">{t('builder.noComponents')}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.bg} rounded-xl p-6 space-y-6`}>
      {/* Dimensions summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">{t('builder.height')}</p>
          <p className="text-lg font-semibold">{configuration.totalDimensions.height} cm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('builder.width')}</p>
          <p className="text-lg font-semibold">{configuration.totalDimensions.width} cm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t('builder.depth')}</p>
          <p className="text-lg font-semibold">{configuration.totalDimensions.depth} cm</p>
        </div>
      </div>

      {/* Component list */}
      <div className="space-y-3">
        <h4 className="font-medium">{t('builder.components')}</h4>
        {configuration.components.map((item) => (
          <div
            key={item.componentId}
            className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {locale === 'no' ? item.component.nameNo : item.component.name}
              </p>
              <p className="text-sm text-gray-500">
                {item.component.dimensions.height} × {item.component.dimensions.width} cm
              </p>
            </div>
            <QuantitySelector
              quantity={item.quantity}
              onChange={(qty) => onUpdateQuantity(item.componentId, qty)}
              size="sm"
            />
            <PriceDisplay
              price={item.component.price * item.quantity}
              size="sm"
            />
            <button
              onClick={() => onRemoveComponent(item.componentId)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t('builder.totalWeight')}</span>
          <span>{formatWeight(configuration.totalWeight, locale)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{t('builder.totalPrice')}</span>
          <PriceDisplay price={configuration.totalPrice} size="lg" />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          fullWidth
          variant="primary"
          onClick={onAddToCart}
        >
          {t('builder.addToCart')}
        </Button>
        <div className="flex gap-3">
          <Button
            fullWidth
            variant="outline"
            onClick={onSave}
          >
            {t('builder.saveConfig')}
          </Button>
          <Button
            fullWidth
            variant="ghost"
            onClick={onClear}
          >
            {t('builder.clearAll')}
          </Button>
        </div>
      </div>
    </div>
  );
}
