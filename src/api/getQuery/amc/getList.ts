import { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import { getStoredUser, User } from '../../../utils/auth';

// --- Types ---
interface Subscription {
  id: number;
  name: string;
  title: string;
  price: string;
  period: string;
  planDays: number;
  keyPoints: string[];
  shortDescription: string;
  isMostPopular: boolean;
  tagLabel?: string | null;
  planImage?: string | null;
  stripePlanId?: string | null;
  stripePriceId?: string | null;
  sortOrder?: number;
  status?: number;
  createdat?: string;
  ctaLabel?: string;
  isSubscribed?: boolean; // ✅ Add this to handle subscribed status
}

interface SubscriptionsResponse {
  list: Subscription[];
}

// --- API FUNCTION ---
export const getSubscriptions = async (userId: number): Promise<SubscriptionsResponse> => {
  console.log('Fetching subscriptions for user:', userId);

  const response = await apiClient.get(`/subscriptions?userId=${userId}`);

  const resultsObj = response.data?.data?.find(
    (item: any) => item.id === 'results',
  );

  const list = resultsObj?.list || [];
  return { list };
};

// --- HOOK ---
export const useSubscriptions = () => {
  const [data, setData] = useState<SubscriptionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedUser = await getStoredUser();

        if (storedUser?.user?.id) {
          setUser(storedUser);
          const result = await getSubscriptions(storedUser.user.id);
          setData(result);
        } else {
          throw new Error('User not found');
        }
      } catch (err: any) {
        console.error('Error fetching subscriptions:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, user };
};
