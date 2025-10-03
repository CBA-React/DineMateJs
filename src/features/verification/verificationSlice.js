import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null, // created | started | submitted | approved | declined | resubmission_requested | expired | abandoned | review | unknown
  lastUpdateTs: null,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerificationStatus(state, action) {
      state.status = action.payload;
      state.lastUpdateTs = new Date().toISOString();
    },
    clearVerificationStatus(state) {
      state.status = null;
      state.lastUpdateTs = null;
    },
  },
});

export const { setVerificationStatus, clearVerificationStatus } = verificationSlice.actions;
export default verificationSlice.reducer;

