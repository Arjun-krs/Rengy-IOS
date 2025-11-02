import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from "@env";
import { 
  startUpload, 
  setUploadProgress, 
  uploadSuccess, 
  uploadError 
} from '../../slice/uploadSlice';

// 🚨 IMPORTANT CHANGE: Type the formData argument as FormData
interface RegisterThunkArgs {
  formData: FormData; 
}

interface RegisterResponse {
  message: string;
}

const VENDOR_REGISTRATION_URL = `${API_BASE_URL}/users`;

export const VendorRegisterMutate = createAsyncThunk<
  RegisterResponse, 
  RegisterThunkArgs,
  { rejectValue: string } 
>(
  'vendor/register',
  async ({ formData }, { dispatch, rejectWithValue }) => { 
    try {
      dispatch(startUpload());

      // ✅ Use the formData object directly from the component
      const response = await axios.post<RegisterResponse>(VENDOR_REGISTRATION_URL, formData, {
        headers: {
          // This is essential for FormData submissions
          'Content-Type': 'multipart/form-data', 
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(setUploadProgress(percentCompleted));
          }
        },
      });

      dispatch(uploadSuccess());
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      dispatch(uploadError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);