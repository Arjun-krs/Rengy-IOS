import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../apiClient';

interface AMCState {
  loading: boolean;
  success: boolean;
  error: string | null;
  amcRequests: any[];
}

const initialState: AMCState = {
  loading: false,
  success: false,
  error: null,
  amcRequests: [],
};

// 🔹 GET: Fetch AMC requests by userId
export const fetchAMCRequests = createAsyncThunk(
  'amc/fetchAMCRequests',
  async (userId: number, { rejectWithValue }) => {
    try {
    
      const response = await apiClient.get(`/amc-requests?userId=${userId}`);
      console.log(response,"-------------fetchAMCRequests-----------------")
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch AMC requests'
      );
    }
  }
);

// 🔹 POST: Create new AMC request
export const createAMCRequest = createAsyncThunk(
  'amc/createAMCRequest',
  async (
    payload: { userId: number; serviceId: number; siteVisitDate: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post('/amc-requests', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create AMC request'
      );
    }
  }
);

const amcSlice = createSlice({
  name: 'amc',
  initialState,
  reducers: {
    resetAMCState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // 🔹 Fetch AMC Requests
      .addCase(fetchAMCRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAMCRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.amcRequests = action.payload?.data || action.payload || [];
      })
      .addCase(fetchAMCRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Create AMC Request
      .addCase(createAMCRequest.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAMCRequest.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAMCRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAMCState } = amcSlice.actions;
export default amcSlice.reducer;
