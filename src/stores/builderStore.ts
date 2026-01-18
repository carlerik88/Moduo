import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShelfComponent, ShelfConfiguration, ShelfConfigurationItem, ShelfComponentType } from '../types';

interface BuilderStore {
  configuration: ShelfConfiguration | null;
  savedConfigurations: ShelfConfiguration[];
  selectedComponentType: ShelfComponentType | null;
  previewMode: '2d' | '3d';
  isDirty: boolean;

  // Actions
  createNewConfiguration: (name?: string) => void;
  loadConfiguration: (config: ShelfConfiguration) => void;
  addComponent: (component: ShelfComponent, quantity?: number) => void;
  removeComponent: (componentId: string) => void;
  updateComponentQuantity: (componentId: string, quantity: number) => void;
  setSelectedComponentType: (type: ShelfComponentType | null) => void;
  setPreviewMode: (mode: '2d' | '3d') => void;
  saveConfiguration: () => void;
  clearConfiguration: () => void;
  deleteSavedConfiguration: (id: string) => void;
  setConfigurationName: (name: string) => void;
}

const generateId = () => `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const calculateTotals = (items: ShelfConfigurationItem[]): {
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

    // Calculate dimensions based on component stacking
    const { dimensions, type } = item.component;

    if (type === 'upright') {
      // Uprights determine max height
      maxHeight = Math.max(maxHeight, dimensions.height);
      // Add width per upright (they sit side by side)
      maxWidth += dimensions.width * item.quantity;
    } else if (type === 'shelf') {
      // Shelves span between uprights
      maxWidth = Math.max(maxWidth, dimensions.width);
      maxDepth = Math.max(maxDepth, dimensions.depth);
    } else if (type === 'base') {
      maxWidth = Math.max(maxWidth, dimensions.width);
      maxDepth = Math.max(maxDepth, dimensions.depth);
    } else {
      // Other components
      maxWidth = Math.max(maxWidth, dimensions.width);
      maxHeight = Math.max(maxHeight, dimensions.height);
      maxDepth = Math.max(maxDepth, dimensions.depth);
    }
  });

  // Ensure minimum dimensions
  maxWidth = maxWidth || 60;
  maxHeight = maxHeight || 180;
  maxDepth = maxDepth || 30;

  return {
    totalWeight: Math.round(totalWeight * 100) / 100,
    totalPrice: Math.round(totalPrice),
    totalDimensions: {
      width: maxWidth,
      height: maxHeight,
      depth: maxDepth,
    },
  };
};

const createEmptyConfiguration = (name: string): ShelfConfiguration => ({
  id: generateId(),
  name,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  components: [],
  totalDimensions: { width: 60, height: 180, depth: 30 },
  totalWeight: 0,
  totalPrice: 0,
});

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      configuration: null,
      savedConfigurations: [],
      selectedComponentType: null,
      previewMode: '2d',
      isDirty: false,

      createNewConfiguration: (name = 'Min hylle') => {
        set({
          configuration: createEmptyConfiguration(name),
          isDirty: false,
        });
      },

      loadConfiguration: (config: ShelfConfiguration) => {
        set({
          configuration: { ...config },
          isDirty: false,
        });
      },

      addComponent: (component: ShelfComponent, quantity = 1) => {
        set((state) => {
          if (!state.configuration) {
            const newConfig = createEmptyConfiguration('Min hylle');
            const newItem: ShelfConfigurationItem = {
              componentId: component.id,
              component,
              quantity,
            };
            const totals = calculateTotals([newItem]);
            return {
              configuration: {
                ...newConfig,
                components: [newItem],
                ...totals,
                updatedAt: new Date().toISOString(),
              },
              isDirty: true,
            };
          }

          const existingIndex = state.configuration.components.findIndex(
            (item) => item.componentId === component.id
          );

          let newComponents: ShelfConfigurationItem[];
          if (existingIndex >= 0) {
            newComponents = state.configuration.components.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: ShelfConfigurationItem = {
              componentId: component.id,
              component,
              quantity,
            };
            newComponents = [...state.configuration.components, newItem];
          }

          const totals = calculateTotals(newComponents);

          return {
            configuration: {
              ...state.configuration,
              components: newComponents,
              ...totals,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      removeComponent: (componentId: string) => {
        set((state) => {
          if (!state.configuration) return state;

          const newComponents = state.configuration.components.filter(
            (item) => item.componentId !== componentId
          );
          const totals = calculateTotals(newComponents);

          return {
            configuration: {
              ...state.configuration,
              components: newComponents,
              ...totals,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      updateComponentQuantity: (componentId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeComponent(componentId);
          return;
        }

        set((state) => {
          if (!state.configuration) return state;

          const newComponents = state.configuration.components.map((item) =>
            item.componentId === componentId ? { ...item, quantity } : item
          );
          const totals = calculateTotals(newComponents);

          return {
            configuration: {
              ...state.configuration,
              components: newComponents,
              ...totals,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },

      setSelectedComponentType: (type: ShelfComponentType | null) => {
        set({ selectedComponentType: type });
      },

      setPreviewMode: (mode: '2d' | '3d') => {
        set({ previewMode: mode });
      },

      saveConfiguration: () => {
        set((state) => {
          if (!state.configuration) return state;

          const existingIndex = state.savedConfigurations.findIndex(
            (config) => config.id === state.configuration!.id
          );

          let newSaved: ShelfConfiguration[];
          if (existingIndex >= 0) {
            newSaved = state.savedConfigurations.map((config, index) =>
              index === existingIndex ? state.configuration! : config
            );
          } else {
            newSaved = [...state.savedConfigurations, state.configuration];
          }

          return {
            savedConfigurations: newSaved,
            isDirty: false,
          };
        });
      },

      clearConfiguration: () => {
        set({
          configuration: null,
          isDirty: false,
        });
      },

      deleteSavedConfiguration: (id: string) => {
        set((state) => ({
          savedConfigurations: state.savedConfigurations.filter(
            (config) => config.id !== id
          ),
        }));
      },

      setConfigurationName: (name: string) => {
        set((state) => {
          if (!state.configuration) return state;
          return {
            configuration: {
              ...state.configuration,
              name,
              updatedAt: new Date().toISOString(),
            },
            isDirty: true,
          };
        });
      },
    }),
    {
      name: 'moduo-builder',
      partialize: (state) => ({
        savedConfigurations: state.savedConfigurations,
      }),
    }
  )
);
