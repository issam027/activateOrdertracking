import React from 'react';
import { Translation } from '@/i18n/translations';

interface OrderSummaryProps {
  phone: string;
  orderNumber: string;
  t: Translation;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  phone,
  orderNumber,
  t,
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-medium mb-2">{t.orderSummary}</h3>
    <div className="space-y-1 text-sm">
      <p>
        {t.phoneLabel} {phone}
      </p>
      <p>
        {t.orderLabel} {orderNumber}
      </p>
    </div>
  </div>
);
