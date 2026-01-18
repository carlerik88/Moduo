import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Grid3X3, Box } from 'lucide-react';
import { useBuilderStore } from '../../stores/builderStore';
import { useCartStore } from '../../stores/cartStore';
import { ComponentSelector, ConfigurationSummary, ConfigurationPreview2D } from '../../components/builder';
import ConfigurationPreview3D from '../../components/builder/ConfigurationPreview3D';
import { PageWrapper } from '../../components/layout';
import type { ShelfComponent } from '../../types';

export default function ModernBuilder() {
  const { t } = useTranslation();
  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('3d');

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
    <PageWrapper theme="modern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('builder.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('builder.subtitle')}</p>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview and Summary - Left/Top */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preview mode toggle */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('builder.preview')}</h3>
              <div className="flex bg-modern-grey rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('2d')}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${previewMode === '2d' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                  `}
                >
                  <Grid3X3 size={16} />
                  2D
                </button>
                <button
                  onClick={() => setPreviewMode('3d')}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${previewMode === '3d' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                  `}
                >
                  <Box size={16} />
                  3D
                </button>
              </div>
            </div>

            {/* Preview */}
            <motion.div
              key={previewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {previewMode === '3d' ? (
                <ConfigurationPreview3D configuration={configuration} />
              ) : (
                <ConfigurationPreview2D configuration={configuration} theme="modern" />
              )}
            </motion.div>

            {/* Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('builder.summary')}</h3>
              <ConfigurationSummary
                configuration={configuration}
                onUpdateQuantity={updateComponentQuantity}
                onRemoveComponent={removeComponent}
                onAddToCart={handleAddToCart}
                onSave={handleSave}
                onClear={handleClear}
                theme="modern"
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
              theme="modern"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
