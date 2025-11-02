import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { API_BASE_URL } from '@env';

interface UseRazorpayParams {
  amount: number; // in paise
  name?: string;
  description?: string;
  image?: string;
  prefill?: {
    email?: string;
    contact?: string;
    name?: string;
  };
  themeColor?: string;
}

export const useRazorpay = () => {
  const openRazorpay = async (params: UseRazorpayParams) => {
    const options = {
      description: params.description || 'Payment',
      image:
        params.image ||
        'https://res.cloudinary.com/darxldaqa/image/upload/v1760614305/playstore-icon_olphrs.png',
      currency: 'INR',
      key: 'rzp_test_RU7V8nzJRvWuSc',
      amount: params.amount,
      name: 'Rengy Mobile App',
      prefill: params.prefill || {
        email: 'customer@example.com',
        contact: '9876543210',
        name: 'Customer Name',
      },
      theme: { color: params.themeColor || '#EDFAEE' },
    };

    try {
      const data = await RazorpayCheckout.open(options);
      console.log('Razorpay Payment Success:', data);

      return data;
    } catch (error: any) {
      console.log('Razorpay Payment Error:', error);
      throw error;
    }
  };

  return { openRazorpay };
};
