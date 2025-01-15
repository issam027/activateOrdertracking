import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { translations, Language } from '@/i18n/translations';
import { registerOrder, processPayment } from '@/services/orderService';
import { validateOrderForm } from '@/utils/validation';
import { LanguageSelector } from './LanguageSelector';
import { RegistrationForm } from './pages/RegistrationForm';
import { SuccessPage } from './pages/SuccessPage';
import { ErrorPage } from './pages/ErrorPage';
import { WelcomePage } from './pages/WelcomePage';
import { PaymentErrorPage } from './pages/PaymentErrorPage';

type Status = 'form' | 'success' | 'error' | 'welcome' | 'payment-error';

const OrderRegistration = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('form');

  const t = translations[language];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const validationErrors = validateOrderForm(phone, orderNumber, t);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        await registerOrder({ phone, orderNumber });
        setStatus('success');
      } catch (error) {
        setStatus('error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => setStatus('form');

  const handleExit = () => {
    setPhone('');
    setOrderNumber('');
    setStatus('form');
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await processPayment({ phone, orderNumber });
      setStatus('welcome');
    } catch (error) {
      setStatus('payment-error');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'welcome':
        return (
          <WelcomePage
            phone={phone}
            orderNumber={orderNumber}
            t={t}
            onExit={handleExit}
          />
        );

      case 'payment-error':
        return (
          <PaymentErrorPage
            phone={phone}
            orderNumber={orderNumber}
            loading={loading}
            t={t}
            onRetry={handlePayment}
            onBack={handleBack}
          />
        );

      case 'success':
        return (
          <SuccessPage
            phone={phone}
            orderNumber={orderNumber}
            loading={loading}
            t={t}
            onPayment={handlePayment}
            onBack={handleBack}
          />
        );

      case 'error':
        return (
          <ErrorPage
            phone={phone}
            orderNumber={orderNumber}
            loading={loading}
            t={t}
            onRetry={handleSubmit}
            onBack={handleBack}
          />
        );

      default:
        return (
          <RegistrationForm
            phone={phone}
            orderNumber={orderNumber}
            errors={errors}
            loading={loading}
            t={t}
            onPhoneChange={setPhone}
            onOrderNumberChange={setOrderNumber}
            onSubmit={handleSubmit}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
          <div dir={t.dir}>{renderContent()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderRegistration;