import React from 'react';
import { Button } from '@/components/ui/button';
import { Translation } from '@/i18n/translations';
import { OrderSummary } from '@/components/OrderSummary';

interface WelcomePageProps {
  phone: string;
  orderNumber: string;
  t: Translation;
  onExit: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  phone,
  orderNumber,
  t,
  onExit,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-2">
      {t.welcomeTitle}
    </h2>
    <OrderSummary phone={phone} orderNumber={orderNumber} t={t} />
    <p className="text-center text-gray-600">{t.welcomeMessage}</p>
    <div className="flex flex-col gap-3">
      <Button variant="outline" onClick={onExit} className="w-full">
        {t.cancel}
      </Button>
    </div>
  </div>
);