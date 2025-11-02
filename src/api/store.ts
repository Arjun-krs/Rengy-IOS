import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './slice/uploadSlice';
import authReducer from './slice/authSlice';
import cityReducer from './slice/citySlice';
import masterReducer from './slice/masterSlice';
import installationReducer from './slice/installationSlice';
import userSubscriptionReducer from './slice/userSubscriptionSlice';
import amcReducer from './slice/amcSlice';

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
    cities: cityReducer,
    master: masterReducer,
    installation: installationReducer,
    userSubscription: userSubscriptionReducer,
    amc: amcReducer, 
  },
});

// ✅ Type helpers for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
