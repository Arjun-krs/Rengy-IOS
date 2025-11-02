import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@env';

export const raiseReq = createAsyncThunk(
    "rengy/raiseReq",
    async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
        try {
            console.log(formData, 'formData');

            const res = await axios.post(`${API_BASE_URL}/raise-requests`, formData, {
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