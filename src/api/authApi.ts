import apiClient, {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
} from './apiClient';

export type LoginPayload = {
  username: string;
  password: string;
  userType: number;
};

export type SendOtpPayload = {
  countryCode?: string;
  identifier: string;
  type: string;
};

export type VerifyOtpPayload = {
  countryCode?: string;
  identifier: string;
  otp: string;
  type: string;
};

// Login API
export const loginApi = async (payload: LoginPayload) => {
  const { data } = await apiClient.post('/auth/login', payload);

  if (data?.data[0]) {
    const { accessToken, refreshToken } = data.data[0];
    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);
  }
  return data;
};

// Refresh Token API
export const refreshTokenApi = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token found');

  const { data } = await apiClient.post('/auth/refresh-token', {
    refreshToken,
  });
  if (data?.accessToken) {
    await setAccessToken(data.accessToken);
  }
  return data;
};

// Send OTP API
export const sendOtpApi = async (payload: SendOtpPayload) => {
  const { data } = await apiClient.post('/users/send-otp', payload);
  return data;
};

// Verify OTP API
export const verifyOtpApi = async (payload: VerifyOtpPayload) => {
  const { data } = await apiClient.post('/users/verify-otp', payload);
  return data;
};

export interface CreateUserPayload {
  [key: string]: any; // can include strings, files, arrays, etc.
}
// Create User (Register)
export const createUserApi = async (payload: CreateUserPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays (e.g., documents[], documentTypes[], etc.)
      value.forEach(v => {
        formData.append(`${key}[]`, v);
      });
    } else if (typeof value === 'boolean') {
      // Convert booleans to string (API expects 'true'/'false')
      formData.append(key, value ? 'true' : 'false');
    } else if (value instanceof File || value?.uri) {
      // Handle file uploads (React Native file object or browser File)
      const file = value.uri
        ? {
            uri: value.uri,
            name: value.name || 'upload.jpg',
            type: value.type || 'image/jpeg',
          }
        : value;
      formData.append(key, file as any);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  const { data } = await apiClient.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// get user profile
export const getProfile = async (userId: number, userType: number) => {
  const { data } = await apiClient.get(`/users/${userId}/profile`, {
    params: { type: userType },
  });
  return data?.data?.[0];
};

// get user subscription
export const getUserSubscription = async (
  userId: number,
  search: string,
  exportSub: any,
) => {
  const { data } = await apiClient.get(`/user-subscriptions`, {
    params: { search: search, export: exportSub, userId: userId },
  });
  return data?.data;
};

// update profile
export const updateProfile = async (formData: FormData, userId: number) => {
  const { data } = await apiClient.put(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateBusinessDetail = async (
  formData: FormData,
  userId: number,
) => {
  const { data } = await apiClient.put(`users/${userId}/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getCountry = async () => {
  const { data } = await apiClient.get(`/common/countries`);
  return data?.data;
};

export const getCommon = async (type: string) => {
  const { data } = await apiClient.get(`/common/master?type=${type}`);
  return data?.data;
};

export const getLeadsList = async (search: string) => {
  const { data } = await apiClient.get(`/leads?search=${search}`);
  return data?.data;
};

export const getProjectList = async (search: string) => {
  const { data } = await apiClient.get(`/projects?search=${search}`);
  return data?.data?.[0]?.list;
};

export const getRequestList = async (search: string) => {
  const { data } = await apiClient.get(`/raise-requests?search=${search}`);
  return data;
};

export const getRequestDetail = async (id: number) => {
  const { data } = await apiClient.get(`/raise-requests/${id}`);
  return data?.data?.[0];
};

export const getCityList = async (search: string) => {
  const { data } = await apiClient.get(
    `/common/cities?countryId=101&search=${search}`,
  );
  return data?.data;
};
