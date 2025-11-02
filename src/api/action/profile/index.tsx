import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdateProfilePayload {
  type: string;
  identifier?: string;
  otp?: string;
  userId?: string;
  countryCode?: string
}

interface CheckExistsPayload {
  name: string;
  email?: string;
  mobileNumber?: string;
  countryId?: number
}

interface LoginPayload {
  username: string;
  password: string;
  userType: number;
};


export const loginUser = createAsyncThunk(
  'rengy/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      const user = res.data?.data?.[0];
      await AsyncStorage.setItem('accessToken', user.accessToken);
      await AsyncStorage.setItem('refreshToken', user.refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const sentOtp = createAsyncThunk(
  "rengy/sentOtp",
  async (data: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/users/send-otp`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "rengy/verifyOtp",
  async (data: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/users/verify-otp`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  'rengy/updateProfile',
  async (data: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/users/verify-otp`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: 'Something went wrong' },
      );
    }
  },
);

export const updateProfileMutate = createAsyncThunk(
  "rengy/updateProfile",
  async ({ formData, userId }: { formData: FormData; userId: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const checkExists = createAsyncThunk(
  "rengy/checkExists",
  async (payload: CheckExistsPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/users/check-verify`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updateNetmeter = createAsyncThunk(
  "rengy/updateNetmeter",
  async (payload: CheckExistsPayload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/common/already-using-solar`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updateBusinessDetails = createAsyncThunk(
  "rengy/updateProfile",
  async ({ formData, userId }: { formData: FormData; userId: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "rengy/updatePassword",
  async ({ formData, userId }: { formData: FormData; userId: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);