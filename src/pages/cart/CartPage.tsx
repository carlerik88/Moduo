import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { Button, Card, PriceDisplay, QuantitySelector } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import type { DesignTheme, Locale } from '../../types';

interface CartPageProps {
  theme: DesignTheme;
}

export default function CartPage({ theme }: CartPageProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const basePath = `/${theme}`;

  return (
    <PageWrapper theme={theme}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('cart.title')}</h1>

        {cart.items.length === 0 ? (
          <Card className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('cart.empty')}</h2>
            <p className="text-gray-500 mb-6">{t('cart.emptyMessage')}</p>
            <Link to={`${basePath}/builder`}>
              <Button variant="primary">{t('cart.startShopping')}</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Cart items */}
            <div className="space-y-4">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Item image/icon */}
                      <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0">
                        {item.type === 'configuration' ? (
                          <span className="text-2xl opacity-30">|||</span>
                        ) : (
                          <span className="text-2xl opacity-30">
                            {item.component?.type === 'shelf' ? '—' : '|'}
                          </span>
                        )}
                      </div>

                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">
                          {item.type === 'configuration'
                            ? item.configuration?.name || t('cart.configuration')
                            : locale === 'no'
                            ? item.component?.nameNo
                            : item.component?.name}
                        </h3>
                        {item.type === 'configuration' && item.configuration && (
                          <p className="text-sm text-gray-500 mt-1">
                            {item.configuration.components.length} {t('builder.components')} ·{' '}
                            {item.configuration.totalDimensions.height} ×{' '}
                            {item.configuration.totalDimensions.width} ×{' '}
                            {item.configuration.totalDimensions.depth} cm
                          </p>
                        )}
                        {item.type === 'component' && item.component && (
                          <p className="text-sm text-gray-500 mt-1">
                            {t(`builder.woodTypes.${item.component.woodType}`)} ·{' '}
                            {t(`builder.finishes.${item.component.finish}`)}
                          </p>
                        )}
                      </div>

                      {/* Quantity and price */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <QuantitySelector
                          quantity={item.quantity}
                          onChange={(qty) => updateQuantity(item.id, qty)}
                          size="sm"
                        />
                        <div className="text-right min-w-[100px]">
                          <PriceDisplay price={item.price * item.quantity} size="md" />
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label={t('cart.remove')}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Cart summary */}
            <Card className="bg-gray-50">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <PriceDisplay price={cart.totalPrice} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="text-gray-500">{t('cart.shippingCalculated')}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="text-lg font-semibold">{t('cart.total')}</span>
                  <PriceDisplay price={cart.totalPrice} size="lg" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to={`${basePath}/checkout`}>
                  <Button fullWidth variant="primary" size="lg">
                    {t('cart.checkout')}
                  </Button>
                </Link>
                <Link to={`${basePath}/builder`}>
                  <Button fullWidth variant="ghost" leftIcon={<ArrowLeft size={18} />}>
                    {t('cart.continueShopping')}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
