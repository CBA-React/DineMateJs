import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogOutModalOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openLogOutModal: (state) => {
            state.isLogOutModalOpen = true;
        },
        closeLogOutModal: (state) => {
            state.isLogOutModalOpen = false;
        },
    },
});

export const { openLogOutModal, closeLogOutModal } = uiSlice.actions;
export default uiSlice.reducer;