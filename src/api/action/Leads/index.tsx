import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@env';

export const addLeads = createAsyncThunk(
    "rengy/addLeads",
    async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/leads`, formData, {
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