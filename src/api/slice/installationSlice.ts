import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../apiClient';

interface InstallationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  installations: any[]; // to store fetched installation requests
}

const initialState: InstallationState = {
  loading: false,
  success: false,
  error: null,
  installations: [],
};

// 🔹 GET API: Fetch user installation requests
export const fetchInstallationRequests = createAsyncThunk(
  'installation/fetchInstallationRequests',
  async (userId: number, { rejectWithValue }) => {
    try {
      console.log(userId,"userIduserId-->Installation List")
      const response = await apiClient.get(`/request-installations?userId=${userId}`);
      console.log(response,"-------------fetchInstallationRequests-----------------")
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch installation requests',
      );
    }
  },
);

// 🔹 POST API: Submit installation request
export const requestInstallation = createAsyncThunk(
  'installation/requestInstallation',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/request-installations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong',
      );
    }
  },
);

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    resetInstallationState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // 🔹 Fetch Installation Requests
      .addCase(fetchInstallationRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstallationRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.installations = action.payload?.data || [];
      })
      .addCase(fetchInstallationRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Request Installation
      .addCase(requestInstallation.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestInstallation.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(requestInstallation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetInstallationState } = installationSlice.actions;
export default installationSlice.reducer;
