import apiClient from "./apiClient";
import { clearTokens } from './apiClient';
import { refreshTokenApi } from "./authApi";
import { useNavigation } from "@react-navigation/native";


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigation = useNavigation(); 
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshTokenApi();
        console.log('data',data);
        
        const newToken = data?.accessToken;
        if (!newToken) throw new Error('Failed to refresh token');

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err: any) {
        if (err.message === 'No refresh token found') {
          await clearTokens(); // remove any stored tokens
          navigation.navigate('Login');
           
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
