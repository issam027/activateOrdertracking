import { Translation } from '@/i18n/translations';

interface ValidationErrors {
  phone?: string;
  orderNumber?: string;
}

export const validateOrderForm = (
  phone: string,
  orderNumber: string,
  t: Translation
): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!phone) {
    errors.phone = t.phoneRequired;
  } else if (!/^\+?[\d\s-]{8,}$/.test(phone)) {
    errors.phone = t.phoneInvalid;
  }

  if (!orderNumber) {
    errors.orderNumber = t.orderRequired;
  } else if (!/^[A-Z0-9]{4,}$/.test(orderNumber)) {
    errors.orderNumber = t.orderInvalid;
  }

  return errors;
};