import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import profileReducer from '/src/features/profile/profileSlice';
import registrationDraftReducer from "/src/features/auth/registrationDraftSlice";
import bookingReducer from '/src/features/booking/bookingSlice';
import chatUI from "/src/features/chats/chatUiSlice";
import chats from "/src/features/chats/chatsSlice";
import passwordResetReducer from '/src/features/auth/passwordResetSlice';
import uiReducer from '/src/features/ui/uiSlice';
import eventRegistrationReducer from "/src/features/booking/eventSlice";
import verificationReducer from "/src/features/verification/verificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    registrationDraft: registrationDraftReducer,
    booking: bookingReducer,
    eventRegistration: eventRegistrationReducer,
    chatUi: chatUI,
    chats,
    ui: uiReducer,
    passwordReset: passwordResetReducer,
    verification: verificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
