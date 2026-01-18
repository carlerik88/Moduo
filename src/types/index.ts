// Design theme types
export type DesignTheme = 'scandinavian' | 'craftsman' | 'modern';

// Shelf component types
export type ShelfComponentType =
  | 'upright'
  | 'shelf'
  | 'bracket'
  | 'base'
  | 'backpanel'
  | 'drawer'
  | 'door';

export type WoodType = 'oak' | 'walnut' | 'beech' | 'pine' | 'birch';

export type ShelfFinish = 'natural' | 'oiled' | 'lacquered' | 'stained';

export interface ShelfComponent {
  id: string;
  type: ShelfComponentType;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  dimensions: {
    width: number;  // in cm
    height: number; // in cm
    depth: number;  // in cm
  };
  weight: number; // in kg
  price: number; // in NOK
  woodType: WoodType;
  finish: ShelfFinish;
  image: string;
  maxLoad?: number; // in kg, for shelves
}

export interface ShelfConfiguration {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  components: ShelfConfigurationItem[];
  totalDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  totalWeight: number;
  totalPrice: number;
}

export interface ShelfConfigurationItem {
  componentId: string;
  component: ShelfComponent;
  quantity: number;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

// Cart types
export interface CartItem {
  id: string;
  type: 'configuration' | 'component';
  configuration?: ShelfConfiguration;
  component?: ShelfComponent;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}

// Order types
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'card' | 'vipps' | 'invoice';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5
  text: string;
  textNo: string;
  date: string;
  image?: string;
  configuration?: string; // Description of what they built
  configurationNo?: string;
}

// Product types (for catalog)
export interface Product {
  id: string;
  sku: string;
  name: string;
  nameNo: string;
  description: string;
  descriptionNo: string;
  category: ShelfComponentType;
  components: ShelfComponent[];
  featured: boolean;
  images: string[];
  tags: string[];
}

// FAQ types
export interface FAQItem {
  id: string;
  question: string;
  questionNo: string;
  answer: string;
  answerNo: string;
  category: string;
}

// Shipping types
export interface ShippingOption {
  id: string;
  name: string;
  nameNo: string;
  carrier: string;
  estimatedDays: { min: number; max: number };
  price: number;
  description: string;
  descriptionNo: string;
}

export interface ShippingEstimate {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  packages: number;
  options: ShippingOption[];
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  shipping: ShippingAddress;
  sameAsBilling: boolean;
  billing?: ShippingAddress;
  paymentMethod: PaymentMethod;
  cardDetails?: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  acceptTerms: boolean;
  newsletter: boolean;
}

// Locale types
export type Locale = 'no' | 'en';

export interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Builder store types
export interface BuilderState {
  configuration: ShelfConfiguration | null;
  selectedComponentType: ShelfComponentType | null;
  previewMode: '2d' | '3d';
  isDirty: boolean;

  // Actions
  createNewConfiguration: () => void;
  loadConfiguration: (config: ShelfConfiguration) => void;
  addComponent: (component: ShelfComponent, quantity?: number) => void;
  removeComponent: (componentId: string) => void;
  updateComponentQuantity: (componentId: string, quantity: number) => void;
  setSelectedComponentType: (type: ShelfComponentType | null) => void;
  setPreviewMode: (mode: '2d' | '3d') => void;
  saveConfiguration: () => void;
  clearConfiguration: () => void;
  calculateTotals: () => void;
}

// Cart store types
export interface CartState {
  cart: Cart;

  // Actions
  addConfigurationToCart: (config: ShelfConfiguration) => void;
  addComponentToCart: (component: ShelfComponent, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateShipping: (postalCode: string) => Promise<ShippingEstimate>;
}

// Theme context types
export interface ThemeContextValue {
  theme: DesignTheme;
  setTheme: (theme: DesignTheme) => void;
}
