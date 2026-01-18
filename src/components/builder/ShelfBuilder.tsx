import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBuilderStore } from '../../stores/builderStore';
import { useCartStore } from '../../stores/cartStore';
import ComponentSelector from './ComponentSelector';
import ConfigurationPreview2D from './ConfigurationPreview2D';
import ConfigurationSummary from './ConfigurationSummary';
import type { DesignTheme, ShelfComponent } from '../../types';

interface ShelfBuilderProps {
  theme: DesignTheme;
}

export default function ShelfBuilder({ theme }: ShelfBuilderProps) {
  const { t } = useTranslation();

  const {
    configuration,
    selectedComponentType,
    createNewConfiguration,
    addComponent,
    removeComponent,
    updateComponentQuantity,
    setSelectedComponentType,
    saveConfiguration,
    clearConfiguration,
  } = useBuilderStore();

  const { addConfigurationToCart } = useCartStore();

  // Initialize configuration if not exists
  useEffect(() => {
    if (!configuration) {
      createNewConfiguration(t('builder.title'));
    }
  }, [configuration, createNewConfiguration, t]);

  const handleAddComponent = (component: ShelfComponent) => {
    addComponent(component, 1);
  };

  const handleAddToCart = () => {
    if (configuration && configuration.components.length > 0) {
      addConfigurationToCart(configuration);
      clearConfiguration();
      createNewConfiguration(t('builder.title'));
    }
  };

  const handleSave = () => {
    saveConfiguration();
  };

  const handleClear = () => {
    clearConfiguration();
    createNewConfiguration(t('builder.title'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('builder.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('builder.subtitle')}</p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview and Summary - Left/Top */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('builder.preview')}</h3>
            <ConfigurationPreview2D configuration={configuration} theme={theme} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('builder.summary')}</h3>
            <ConfigurationSummary
              configuration={configuration}
              onUpdateQuantity={updateComponentQuantity}
              onRemoveComponent={removeComponent}
              onAddToCart={handleAddToCart}
              onSave={handleSave}
              onClear={handleClear}
              theme={theme}
            />
          </div>
        </div>

        {/* Component Selector - Right/Bottom */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('builder.selectType')}</h3>
          <ComponentSelector
            selectedType={selectedComponentType}
            onSelectType={setSelectedComponentType}
            onAddComponent={handleAddComponent}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
