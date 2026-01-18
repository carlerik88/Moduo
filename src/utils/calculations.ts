import type { ShelfConfigurationItem, CartItem } from '../types';

export const formatPrice = (price: number, locale: 'no' | 'en' = 'no'): string => {
  if (locale === 'no') {
    return `${price.toLocaleString('nb-NO')} kr`;
  }
  return `${price.toLocaleString('en-NO')} NOK`;
};

export const formatDimensions = (
  dimensions: { width: number; height: number; depth: number },
  locale: 'no' | 'en' = 'no'
): string => {
  const unit = locale === 'no' ? 'cm' : 'cm';
  return `${dimensions.height} × ${dimensions.width} × ${dimensions.depth} ${unit}`;
};

export const formatWeight = (weight: number, locale: 'no' | 'en' = 'no'): string => {
  const unit = locale === 'no' ? 'kg' : 'kg';
  return `${weight.toFixed(1)} ${unit}`;
};

export const calculateConfigurationTotals = (
  items: ShelfConfigurationItem[]
): {
  totalWeight: number;
  totalPrice: number;
  totalDimensions: { width: number; height: number; depth: number };
} => {
  let totalWeight = 0;
  let totalPrice = 0;
  let maxWidth = 0;
  let maxHeight = 0;
  let maxDepth = 0;

  items.forEach((item) => {
    totalWeight += item.component.weight * item.quantity;
    totalPrice += item.component.price * item.quantity;

    const { dimensions, type } = item.component;

    if (type === 'upright') {
      maxHeight = Math.max(maxHeight, dimensions.height);
      maxWidth += dimensions.width * item.quantity;
    } else if (type === 'shelf' || type === 'base') {
      maxWidth = Math.max(maxWidth, dimensions.width);
      maxDepth = Math.max(maxDepth, dimensions.depth);
    } else {
      maxWidth = Math.max(maxWidth, dimensions.width);
      maxHeight = Math.max(maxHeight, dimensions.height);
      maxDepth = Math.max(maxDepth, dimensions.depth);
    }
  });

  return {
    totalWeight: Math.round(totalWeight * 100) / 100,
    totalPrice: Math.round(totalPrice),
    totalDimensions: {
      width: maxWidth || 60,
      height: maxHeight || 180,
      depth: maxDepth || 30,
    },
  };
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateTax = (subtotal: number, rate: number = 0.25): number => {
  return Math.round(subtotal * rate);
};

export const calculatePackageCount = (totalWeight: number, maxPerPackage: number = 25): number => {
  return Math.ceil(totalWeight / maxPerPackage);
};

export const estimateShippingCost = (
  weight: number,
  postalCode: string,
  subtotal: number
): number => {
  // Free shipping over 5000 NOK
  if (subtotal >= 5000) return 0;

  const postalNum = parseInt(postalCode, 10);
  let baseRate = 299;

  if (postalNum >= 0 && postalNum < 1000) {
    baseRate = 199;
  } else if (postalNum >= 1000 && postalNum < 3000) {
    baseRate = 249;
  } else if (postalNum >= 4000 && postalNum < 5000) {
    baseRate = 349;
  } else if (postalNum >= 5000 && postalNum < 6000) {
    baseRate = 399;
  } else if (postalNum >= 7000 && postalNum < 8000) {
    baseRate = 449;
  } else if (postalNum >= 8000 && postalNum < 10000) {
    baseRate = 549;
  }

  const weightSurcharge = Math.max(0, (weight - 10) * 5);
  const packages = calculatePackageCount(weight);

  return Math.round((baseRate + weightSurcharge) * packages);
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MOD-${timestamp}-${random}`;
};

export const getEstimatedDeliveryDate = (businessDays: number): string => {
  const date = new Date();
  let daysAdded = 0;

  while (daysAdded < businessDays) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }

  return date.toISOString().split('T')[0];
};
