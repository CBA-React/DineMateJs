import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteChatOpen: false,
  pendingChatId: null,
};

const chatUiSlice = createSlice({
  name: "chatUi",
  initialState,
  reducers: {
    openDeleteChatModal(state, action) {
      state.deleteChatOpen = true;
      state.pendingChatId = action.payload;
    },
    closeDeleteChatModal(state) {
      state.deleteChatOpen = false;
      state.pendingChatId = null;
    },
  },
});

export const { openDeleteChatModal, closeDeleteChatModal } = chatUiSlice.actions;
export default chatUiSlice.reducer;
