import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogOutModalOpen: false,
    isNotificationsPopUpOpen: false,
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
        openNotificationsPopUp: (state) => {
            state.isNotificationsPopUpOpen = true;
        },
        closeNotificationsPopUp: (state) => {
            state.isNotificationsPopUpOpen = false;
        },
    },
});

export const { openLogOutModal, closeLogOutModal, openNotificationsPopUp, closeNotificationsPopUp } = uiSlice.actions;
export default uiSlice.reducer;