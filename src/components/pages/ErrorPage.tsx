import React from 'react';
import { Button } from '@/components/ui/button';
import { Translation } from '@/i18n/translations';
import { OrderSummary } from '@/components/OrderSummary';

interface ErrorPageProps {
  phone: string;
  orderNumber: string;
  loading: boolean;
  t: Translation;
  onRetry: () => void;
  onBack: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  phone,
  orderNumber,
  loading,
  t,
  onRetry,
  onBack,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-2">
      {t.errorTitle}
    </h2>
    <OrderSummary phone={phone} orderNumber={orderNumber} t={t} />
    <p className="text-center text-gray-600">{t.errorDescription}</p>
    <div className="flex flex-col gap-3">
      <Button
        onClick={onRetry}
        disabled={loading}
        className="w-full"
      >
        {loading ? t.loading : t.retry}
      </Button>
      <Button variant="outline" onClick={onBack} className="w-full">
        {t.cancel}
      </Button>
    </div>
  </div>
);