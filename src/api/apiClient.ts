import axios from "axios";
import { API_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
console.log("API Base URL:", API_BASE_URL);
// Create Axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL, // use the imported variable directly
  headers: { "Content-Type": "application/json" },
});

// Get/Set Tokens in AsyncStorage
export const setAccessToken = async (token) =>
  AsyncStorage.setItem('accessToken', token);

export const setRefreshToken = async (token) =>
  AsyncStorage.setItem('refreshToken', token);

export const getAccessToken = async () =>
  AsyncStorage.getItem('accessToken');

export const getRefreshToken = async () =>
  AsyncStorage.getItem('refreshToken');

export const clearTokens = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
};

// Attach AccessToken before each request
apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

