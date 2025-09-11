import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import profileReducer from '/src/features/profile/profileSlice';
import registrationDraftReducer from "/src/features/auth/registrationDraftSlice";
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    registrationDraft: registrationDraftReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
