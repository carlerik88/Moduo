import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Smartphone, FileText, ArrowLeft, Package } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { Button, Card, Input, PriceDisplay } from '../../components/common';
import { PageWrapper } from '../../components/layout';
import { generateOrderNumber, getEstimatedDeliveryDate } from '../../utils/calculations';
import type { DesignTheme, PaymentMethod, Locale } from '../../types';

interface CheckoutPageProps {
  theme: DesignTheme;
}

const checkoutSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  street: z.string().min(5),
  postalCode: z.string().regex(/^\d{4}$/, 'Must be 4 digits'),
  city: z.string().min(2),
  acceptTerms: z.boolean().refine((val) => val === true),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage({ theme }: CheckoutPageProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const { cart, clearCart } = useCartStore();
  const basePath = `/${theme}`;

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [_shippingData, setShippingData] = useState<CheckoutFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const steps: CheckoutStep[] = ['shipping', 'payment', 'confirmation'];
  const currentStepIndex = steps.indexOf(step);

  const onShippingSubmit = (data: CheckoutFormData) => {
    setShippingData(data);
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderNumber(generateOrderNumber());
    setStep('confirmation');
    clearCart();
  };

  if (cart.items.length === 0 && step !== 'confirmation') {
    return (
      <PageWrapper theme={theme}>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-4">{t('cart.empty')}</h2>
          <Link to={`${basePath}/builder`}>
            <Button variant="primary">{t('cart.startShopping')}</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper theme={theme}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    index < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : index === currentStepIndex
                      ? 'bg-scandi-forest text-white'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index < currentStepIndex ? <Check size={20} /> : index + 1}
              </div>
              <span className="ml-2 hidden sm:inline">{t(`checkout.steps.${s}`)}</span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <h2 className="text-xl font-semibold mb-6">{t('checkout.shipping.title')}</h2>
                <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('checkout.shipping.firstName')}
                      {...register('firstName')}
                      error={errors.firstName?.message}
                      required
                    />
                    <Input
                      label={t('checkout.shipping.lastName')}
                      {...register('lastName')}
                      error={errors.lastName?.message}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('checkout.shipping.email')}
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                      required
                    />
                    <Input
                      label={t('checkout.shipping.phone')}
                      type="tel"
                      {...register('phone')}
                      error={errors.phone?.message}
                      required
                    />
                  </div>
                  <Input
                    label={t('checkout.shipping.street')}
                    {...register('street')}
                    error={errors.street?.message}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('checkout.shipping.postalCode')}
                      {...register('postalCode')}
                      error={errors.postalCode?.message}
                      required
                    />
                    <Input
                      label={t('checkout.shipping.city')}
                      {...register('city')}
                      error={errors.city?.message}
                      required
                    />
                  </div>

                  <label className="flex items-center gap-2 mt-4">
                    <input type="checkbox" {...register('acceptTerms')} className="rounded" />
                    <span className="text-sm">{t('checkout.review.terms')}</span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-sm">{t('errors.required')}</p>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Link to={`${basePath}/cart`}>
                      <Button variant="ghost" leftIcon={<ArrowLeft size={18} />}>
                        {t('common.back')}
                      </Button>
                    </Link>
                    <Button type="submit" variant="primary" className="flex-1">
                      {t('common.next')}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <h2 className="text-xl font-semibold mb-6">{t('checkout.payment.title')}</h2>

                  <div className="space-y-4">
                    {/* Payment method selection */}
                    <div className="space-y-3">
                      {[
                        { method: 'card' as PaymentMethod, icon: CreditCard, label: t('checkout.payment.card') },
                        { method: 'vipps' as PaymentMethod, icon: Smartphone, label: t('checkout.payment.vipps') },
                        { method: 'invoice' as PaymentMethod, icon: FileText, label: t('checkout.payment.invoice') },
                      ].map(({ method, icon: Icon, label }) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`
                            w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-colors
                            ${
                              paymentMethod === method
                                ? 'border-scandi-forest bg-scandi-forest/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <Icon size={24} />
                          <span className="font-medium">{label}</span>
                          {paymentMethod === method && (
                            <Check size={20} className="ml-auto text-scandi-forest" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Card details (mock) */}
                    {paymentMethod === 'card' && (
                      <div className="pt-4 space-y-4">
                        <Input label={t('checkout.payment.cardNumber')} placeholder="4242 4242 4242 4242" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label={t('checkout.payment.expiry')} placeholder="MM/YY" />
                          <Input label={t('checkout.payment.cvc')} placeholder="123" />
                        </div>
                        <Input label={t('checkout.payment.nameOnCard')} />
                      </div>
                    )}

                    {paymentMethod === 'vipps' && (
                      <div className="pt-4 p-4 bg-orange-50 rounded-lg text-center">
                        <p className="text-sm text-orange-700">
                          {locale === 'no'
                            ? 'Du vil bli videresendt til Vipps for å fullføre betalingen'
                            : 'You will be redirected to Vipps to complete payment'}
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'invoice' && (
                      <div className="pt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          {locale === 'no'
                            ? 'Faktura sendes til din e-post. Betalingsfrist: 14 dager.'
                            : 'Invoice will be sent to your email. Due in 14 days.'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button variant="ghost" onClick={() => setStep('shipping')} leftIcon={<ArrowLeft size={18} />}>
                      {t('common.back')}
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={handlePayment}
                      isLoading={isProcessing}
                    >
                      {t('checkout.review.placeOrder')}
                    </Button>
                  </div>
                </Card>

                {/* Order summary */}
                <Card className="bg-gray-50 h-fit">
                  <h3 className="font-semibold mb-4">{t('checkout.review.orderSummary')}</h3>
                  <div className="space-y-3 text-sm">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.type === 'configuration'
                            ? item.configuration?.name
                            : locale === 'no'
                            ? item.component?.nameNo
                            : item.component?.name}{' '}
                          × {item.quantity}
                        </span>
                        <PriceDisplay price={item.price * item.quantity} size="sm" />
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('cart.subtotal')}</span>
                      <PriceDisplay price={cart.totalPrice} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('cart.shipping')}</span>
                      <span>{cart.totalPrice >= 5000 ? t('shipping.freeOver', { amount: 5000 }) : '299 kr'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2">
                      <span>{t('cart.total')}</span>
                      <PriceDisplay price={cart.grandTotal || cart.totalPrice + (cart.totalPrice >= 5000 ? 0 : 299)} size="lg" />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t('checkout.confirmation.title')}</h2>
                <p className="text-gray-600 mb-6">{t('checkout.confirmation.emailSent')}</p>

                <div className="inline-block bg-gray-100 rounded-lg px-6 py-4 mb-6">
                  <p className="text-sm text-gray-500">{t('checkout.confirmation.orderNumber')}</p>
                  <p className="text-xl font-mono font-bold">{orderNumber}</p>
                </div>

                <p className="text-gray-600 mb-8">
                  {t('checkout.confirmation.estimatedDelivery')}:{' '}
                  <strong>{getEstimatedDeliveryDate(5)}</strong>
                </p>

                <Link to={basePath}>
                  <Button variant="primary" size="lg">
                    {t('nav.home')}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
