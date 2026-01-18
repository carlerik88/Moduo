import { useTranslation } from 'react-i18next';
import type { Locale } from '../../types';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PriceDisplay({
  price,
  originalPrice,
  size = 'md',
  className = '',
}: PriceDisplayProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const formatPrice = (value: number): string => {
    if (locale === 'no') {
      return `${value.toLocaleString('nb-NO')} kr`;
    }
    return `${value.toLocaleString('en-NO')} NOK`;
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-semibold',
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className={`${sizeStyles[size]} ${hasDiscount ? 'text-red-600' : ''}`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
      )}
    </div>
  );
}
