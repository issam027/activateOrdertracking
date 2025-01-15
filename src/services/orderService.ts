interface OrderRegistrationData {
  phone: string;
  orderNumber: string;
}

export const registerOrder = async (data: OrderRegistrationData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const isSuccess = Math.random() < 0.8;
  if (!isSuccess) {
    throw new Error('Service unavailable');
  }
  return { status: 'OK' };
};

export const processPayment = async (data: OrderRegistrationData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const isSuccess = Math.random() < 0.8;
  if (!isSuccess) {
    throw new Error('Payment failed');
  }
  return { status: 'OK' };
};