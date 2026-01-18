import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, ShelfComponent, ShelfConfiguration, ShippingEstimate, ShippingOption } from '../types';

interface CartStore {
  cart: Cart;
  addConfigurationToCart: (config: ShelfConfiguration) => void;
  addComponentToCart: (component: ShelfComponent, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateShipping: (postalCode: string) => Promise<ShippingEstimate>;
  setShippingCost: (cost: number) => void;
}

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  shippingCost: 0,
  grandTotal: 0,
};

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'shippingCost' | 'grandTotal'> => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addConfigurationToCart: (config: ShelfConfiguration) => {
        set((state) => {
          const existingIndex = state.cart.items.findIndex(
            (item) => item.type === 'configuration' && item.configuration?.id === config.id
          );

          let newItems: CartItem[];
          if (existingIndex >= 0) {
            newItems = state.cart.items.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: `cart-config-${config.id}-${Date.now()}`,
              type: 'configuration',
              configuration: config,
              quantity: 1,
              price: config.totalPrice,
            };
            newItems = [...state.cart.items, newItem];
          }

          const totals = calculateCartTotals(newItems);
          return {
            cart: {
              ...totals,
              shippingCost: state.cart.shippingCost,
              grandTotal: totals.totalPrice + state.cart.shippingCost,
            },
          };
        });
      },

      addComponentToCart: (component: ShelfComponent, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.items.findIndex(
            (item) => item.type === 'component' && item.component?.id === component.id
          );

          let newItems: CartItem[];
          if (existingIndex >= 0) {
            newItems = state.cart.items.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: `cart-comp-${component.id}-${Date.now()}`,
              type: 'component',
              component,
              quantity,
              price: component.price,
            };
            newItems = [...state.cart.items, newItem];
          }

          const totals = calculateCartTotals(newItems);
          return {
            cart: {
              ...totals,
              shippingCost: state.cart.shippingCost,
              grandTotal: totals.totalPrice + state.cart.shippingCost,
            },
          };
        });
      },

      removeFromCart: (itemId: string) => {
        set((state) => {
          const newItems = state.cart.items.filter((item) => item.id !== itemId);
          const totals = calculateCartTotals(newItems);
          return {
            cart: {
              ...totals,
              shippingCost: state.cart.shippingCost,
              grandTotal: totals.totalPrice + state.cart.shippingCost,
            },
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeFromCart(itemId);
          return;
        }

        set((state) => {
          const newItems = state.cart.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const totals = calculateCartTotals(newItems);
          return {
            cart: {
              ...totals,
              shippingCost: state.cart.shippingCost,
              grandTotal: totals.totalPrice + state.cart.shippingCost,
            },
          };
        });
      },

      clearCart: () => {
        set({ cart: initialCart });
      },

      setShippingCost: (cost: number) => {
        set((state) => ({
          cart: {
            ...state.cart,
            shippingCost: cost,
            grandTotal: state.cart.totalPrice + cost,
          },
        }));
      },

      calculateShipping: async (postalCode: string): Promise<ShippingEstimate> => {
        // Mock shipping calculation based on postal code and cart weight
        const cart = get().cart;

        let totalWeight = 0;
        let maxWidth = 0;
        let maxHeight = 0;
        let maxDepth = 0;

        cart.items.forEach((item) => {
          if (item.type === 'configuration' && item.configuration) {
            totalWeight += item.configuration.totalWeight * item.quantity;
            maxWidth = Math.max(maxWidth, item.configuration.totalDimensions.width);
            maxHeight = Math.max(maxHeight, item.configuration.totalDimensions.height);
            maxDepth = Math.max(maxDepth, item.configuration.totalDimensions.depth);
          } else if (item.type === 'component' && item.component) {
            totalWeight += item.component.weight * item.quantity;
            maxWidth = Math.max(maxWidth, item.component.dimensions.width);
            maxHeight = Math.max(maxHeight, item.component.dimensions.height);
            maxDepth = Math.max(maxDepth, item.component.dimensions.depth);
          }
        });

        // Calculate number of packages (roughly 25kg per package max)
        const packages = Math.ceil(totalWeight / 25);

        // Base shipping costs (mocked)
        const postalNum = parseInt(postalCode, 10);
        let baseRate = 299; // Base rate in NOK

        // Adjust based on postal code (simplified zones)
        if (postalNum >= 0 && postalNum < 1000) {
          baseRate = 199; // Oslo area
        } else if (postalNum >= 1000 && postalNum < 3000) {
          baseRate = 249; // Eastern Norway
        } else if (postalNum >= 4000 && postalNum < 5000) {
          baseRate = 349; // Southern Norway
        } else if (postalNum >= 5000 && postalNum < 6000) {
          baseRate = 399; // Western Norway
        } else if (postalNum >= 7000 && postalNum < 8000) {
          baseRate = 449; // Central Norway
        } else if (postalNum >= 8000 && postalNum < 10000) {
          baseRate = 549; // Northern Norway
        }

        // Adjust for weight
        const weightSurcharge = Math.max(0, (totalWeight - 10) * 5);

        const standardPrice = Math.round(baseRate + weightSurcharge) * packages;
        const expressPrice = Math.round(standardPrice * 1.8);

        const options: ShippingOption[] = [
          {
            id: 'standard',
            name: 'Standard delivery',
            nameNo: 'Standard levering',
            carrier: 'Posten',
            estimatedDays: { min: 3, max: 5 },
            price: standardPrice,
            description: 'Delivered to your door',
            descriptionNo: 'Levert til døren',
          },
          {
            id: 'express',
            name: 'Express delivery',
            nameNo: 'Ekspress levering',
            carrier: 'Posten',
            estimatedDays: { min: 1, max: 2 },
            price: expressPrice,
            description: 'Priority handling, delivered to your door',
            descriptionNo: 'Prioritert håndtering, levert til døren',
          },
        ];

        // Free shipping over 5000 NOK
        if (cart.totalPrice >= 5000) {
          options[0].price = 0;
          options[1].price = Math.round(expressPrice * 0.5);
        }

        return {
          weight: totalWeight,
          dimensions: {
            length: maxWidth,
            width: maxDepth,
            height: maxHeight,
          },
          packages,
          options,
        };
      },
    }),
    {
      name: 'moduo-cart',
    }
  )
);
