import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Translation } from '@/i18n/translations';

interface RegistrationFormProps {
  phone: string;
  orderNumber: string;
  errors: Record<string, string>;
  loading: boolean;
  t: Translation;
  onPhoneChange: (value: string) => void;
  onOrderNumberChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  phone,
  orderNumber,
  errors,
  loading,
  t,
  onPhoneChange,
  onOrderNumberChange,
  onSubmit,
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    onPhoneChange(value);
  };

  const handleOrderNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    onOrderNumberChange(value);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2">{t.title}</h2>
      <p className="text-gray-600 text-center mb-6">{t.subtitle}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            type="tel"
            placeholder={t.phoneNumber}
            value={phone}
            onChange={handlePhoneChange}
            className={errors.phone ? 'border-red-500' : ''}
            disabled={loading}
            inputMode="numeric"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder={t.orderNumber}
            value={orderNumber}
            onChange={handleOrderNumberChange}
            className={errors.orderNumber ? 'border-red-500' : ''}
            disabled={loading}
          />
          {errors.orderNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.orderNumber}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t.loading : t.subscribe}
        </Button>
      </form>
    </>
  );
};