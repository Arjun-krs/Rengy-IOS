import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UploadState {
  progress: number;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Define the initial state using that type
const initialState: UploadState = {
  progress: 0,
  isLoading: false,
  error: null,
  success: false,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    startUpload: (state) => {
      state.isLoading = true;
      state.progress = 0;
      state.error = null;
      state.success = false;
    },
    uploadSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
      state.progress = 100;
    },
    uploadError: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetUpload: () => initialState,
  },
});

export const {
  setUploadProgress,
  startUpload,
  uploadSuccess,
  uploadError,
  resetUpload,
} = uploadSlice.actions;

// Export the reducer, selector, and types for use in other files
export const selectUpload = (state: { upload: UploadState }) => state.upload;
export default uploadSlice.reducer;