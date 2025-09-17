import { createSlice } from "@reduxjs/toolkit";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES_BY_ID } from "/src/constants";

const initialState = {
  conversations: MOCK_CONVERSATIONS,
  messagesById: MOCK_MESSAGES_BY_ID,
  activeId: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat(state, action) {
      state.activeId = action.payload;
    },
    sendMessage(state, action) {
      const { chatId, message } = action.payload;
      const arr = state.messagesById[chatId] || (state.messagesById[chatId] = []);
      arr.push(message);
    },
    deleteChat(state, action) {
      const id = action.payload;
      state.conversations = state.conversations.filter((c) => c.id !== id);
      delete state.messagesById[id];
      if (state.activeId === id) state.activeId = null;
    },
  },
});

export const { setActiveChat, sendMessage, deleteChat } = chatsSlice.actions;
export default chatsSlice.reducer;
