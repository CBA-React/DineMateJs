import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import profileReducer from '/src/features/profile/profileSlice';
import registrationDraftReducer from "/src/features/auth/registrationDraftSlice";
import bookingReducer from '/src/features/booking/bookingSlice';
import chatUI from "/src/features/chats/chatUiSlice";
import chats from "/src/features/chats/chatsSlice";
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    registrationDraft: registrationDraftReducer,
    booking: bookingReducer,
    chatUi: chatUI,
    chats,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
