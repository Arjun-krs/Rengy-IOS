import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apiClient';

export interface MasterItem {
  id: number;
  name: string;
}

interface MasterState {
  data: Record<string, MasterItem[]>; // store data per type
  loading: boolean;
  error: string | null;
}

const initialState: MasterState = {
  data: {},
  loading: false,
  error: null,
};

// 🔹 Dynamic thunk with `type` parameter
export const fetchMaster = createAsyncThunk(
  'master/fetchMaster',
  async (type: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/common/master?type=${type}`);
      return { type, data: response.data }; // return both type and data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaster.fulfilled, (state, action) => {
        state.loading = false;
        const { type, data } = action.payload;
        state.data[type] = data; // store based on type (purpose, city, etc.)
      })
      .addCase(fetchMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default masterSlice.reducer;
