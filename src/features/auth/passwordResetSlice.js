import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  code: "",      
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    clearResetData() {
      return initialState;
    },
  },
});

export const { setEmail, setCode, clearResetData } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
