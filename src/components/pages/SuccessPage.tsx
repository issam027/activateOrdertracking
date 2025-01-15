import React from 'react';
import { Button } from '@/components/ui/button';
import { Euro } from 'lucide-react';
import { Translation } from '@/i18n/translations';
import { OrderSummary } from '@/components/OrderSummary';

interface SuccessPageProps {
  phone: string;
  orderNumber: string;
  loading: boolean;
  t: Translation;
  onPayment: () => void;
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  phone,
  orderNumber,
  loading,
  t,
  onPayment,
  onBack,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-2">
      {t.paymentTitle}
    </h2>
    <OrderSummary phone={phone} orderNumber={orderNumber} t={t} />
    <p className="text-center text-gray-600">{t.paymentDescription}</p>
    <div className="flex flex-col gap-3">
      <Button
        onClick={onPayment}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          t.loading
        ) : (
          <>
            <Euro className="mr-2 h-4 w-4" />
            {t.confirm}
          </>
        )}
      </Button>
      <Button variant="outline" onClick={onBack} className="w-full">
        {t.cancel}
      </Button>
    </div>
  </div>
);