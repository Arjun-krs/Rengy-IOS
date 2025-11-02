import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  username: string;
  userType: number;
  accessToken: string;
  refreshToken: string;
}

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting accessToken:', error);
    return null;
  }
};


export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (error) {
    console.error('Error getting refreshToken:', error);
    return null;
  }
};


export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem('user');

    if (userJson) {
      // Parse the JSON string back into a User object
      const user: User = JSON.parse(userJson);
      return user;
    }

    return null;
  } catch (error) {
    console.error('Error getting and parsing user data:', error);
    return null;
  }
};