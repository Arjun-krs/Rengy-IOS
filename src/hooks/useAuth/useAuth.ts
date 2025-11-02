import { useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginApi,
  refreshTokenApi,
  sendOtpApi,
  updateProfile,
  updateBusinessDetail,
} from '../../api/authApi';
import { useAuthContext } from '../../context/userContext';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUserAndStore } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (payload: {
      username: string;
      password: string;
      userType: number;
    }) => loginApi(payload),
    onSuccess: async data => {
      const user = data?.data?.[0];
      if (user) {
        await AsyncStorage.setItem('accessToken', user.accessToken);
        await AsyncStorage.setItem('refreshToken', user.refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUserAndStore(user);
      }
      queryClient.setQueryData(['user'], user || null);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: () => refreshTokenApi(),
    onSuccess: async data => {
      if (data?.accessToken) {
        await AsyncStorage.setItem('accessToken', data.accessToken);
      }
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: (payload: {
      identifier: string;
      type: string;
      countryCode?: string;
    }) => sendOtpApi(payload),
  });



  const updateProfileMutation = useMutation({
    mutationFn: (payload: { formData: FormData; userId: number }) =>
      updateProfile(payload?.formData, payload?.userId),
  });

  const updateBusinessDetailMutation = useMutation({
    mutationFn: (payload: { formData: FormData; userId: number }) =>
      updateBusinessDetail(payload?.formData, payload?.userId),
  });

  return {
    loginMutation,
    refreshTokenMutation,
    sendOtpMutation,
    updateProfileMutation,
    updateBusinessDetailMutation,
  };
};
