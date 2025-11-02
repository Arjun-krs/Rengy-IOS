import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../apiClient';

// Define the interface for subscription data
export interface UserSubscriptionPayload {
  userId: number;
  subscriptionId: number;
  paidAmount: number;
  transactionId: string;
  address: string;
  isNewAddress: boolean;
  isActive: boolean;
}

// Define state interface
interface UserSubscriptionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: any | null;
}

// Initial state
const initialState: UserSubscriptionState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

// Async thunk for POST /api/v1/user-subscriptions
export const createUserSubscription = createAsyncThunk(
  'userSubscription/create',
  async (payload: UserSubscriptionPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/user-subscriptions`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create subscription'
      );
    }
  }
);

const userSubscriptionSlice = createSlice({
  name: 'userSubscription',
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserSubscription.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createUserSubscription.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createUserSubscription.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubscriptionState } = userSubscriptionSlice.actions;
export default userSubscriptionSlice.reducer;
