// src/redux/slices/citySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../apiClient';

// --- Types ---
export interface City {
  id: number;
  name: string;
  stateId?: number;
  countryId?: number;
  [key: string]: any; // for flexibility
}

export interface CitiesResponse {
  list: City[];
}

interface CityState {
  data: CitiesResponse | null;
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: CityState = {
  data: null,
  loading: false,
  error: null,
};

// --- Async Thunk ---
export const fetchCities = createAsyncThunk<CitiesResponse, number>(
  'cities/fetchCities',
  async (countryId = 101, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/common/cities?countryId=${countryId}`);
      const list = response.data?.data || []; 
      return { list };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// --- Slice ---
const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    clearCities: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch cities';
      });
  },
});

export const { clearCities } = citySlice.actions;
export default citySlice.reducer;
