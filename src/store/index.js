import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import profileReducer from '/src/features/profile/profileSlice';
import registrationDraftReducer from "/src/features/auth/registrationDraftSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    registrationDraft: registrationDraftReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
