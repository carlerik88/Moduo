import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { Button, Card, Input } from '../components/common';
import { PageWrapper } from '../components/layout';
import type { DesignTheme } from '../types';

interface ContactPageProps {
  theme: DesignTheme;
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage({ theme }: ContactPageProps) {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  const themeStyles: Record<DesignTheme, { accent: string; iconBg: string }> = {
    scandinavian: { accent: 'text-scandi-forest', iconBg: 'bg-scandi-forest/10' },
    craftsman: { accent: 'text-craft-blue', iconBg: 'bg-craft-blue/10' },
    modern: { accent: 'text-modern-slate', iconBg: 'bg-modern-slate/10' },
  };

  const styles = themeStyles[theme];

  return (
    <PageWrapper theme={theme}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${styles.iconBg}`}>
                    <MapPin className={styles.accent} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.info.address')}</h3>
                    <p className="text-gray-600">
                      Verkstedveien 12<br />
                      0158 Oslo<br />
                      Norge
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${styles.iconBg}`}>
                    <Mail className={styles.accent} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.info.email')}</h3>
                    <a
                      href="mailto:kontakt@moduo.no"
                      className="text-gray-600 hover:underline"
                    >
                      kontakt@moduo.no
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${styles.iconBg}`}>
                    <Phone className={styles.accent} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.info.phone')}</h3>
                    <a
                      href="tel:+4722123456"
                      className="text-gray-600 hover:underline"
                    >
                      +47 22 12 34 56
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${styles.iconBg}`}>
                    <Clock className={styles.accent} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.info.hours')}</h3>
                    <p className="text-gray-600">
                      Man - Fre: 09:00 - 17:00<br />
                      Lør: 10:00 - 15:00<br />
                      Søn: Stengt
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <MapPin size={48} className="text-gray-300" />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('common.success')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('common.success')}
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  {t('contact.form.send')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('contact.form.name')}
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />
                  <Input
                    label={t('contact.form.email')}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('contact.form.phone')}
                    type="tel"
                    {...register('phone')}
                  />
                  <Input
                    label={t('contact.form.subject')}
                    {...register('subject')}
                    error={errors.subject?.message}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    {t('contact.form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className={`
                      w-full px-3 py-2 rounded-lg border bg-white
                      focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-scandi-forest focus:border-scandi-forest
                      transition-colors duration-200
                      ${errors.message ? 'border-red-500' : 'border-gray-300'}
                    `}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send size={18} />}
                >
                  {t('contact.form.send')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
