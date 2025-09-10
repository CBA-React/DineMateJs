import { createSlice } from "@reduxjs/toolkit";

const persisted = JSON.parse(localStorage.getItem("registrationDraft") || "null");

const initialState = persisted || {
    email: "", password1: "", password2: "",
    fullName: "", age: 18, gender: "male", city: "",
    location: [0, 0],
    description: "",
    search_gender: "female",
    interests: [], tags: [], habits: [],
    distance: 50, ageMin: 18, ageMax: 28,
    quiz: {},
    photos: [],
  };

  const slice = createSlice({
    name: "registrationDraft",
    initialState,
    reducers: {
      upsertDraft(state, action) {
        Object.assign(state, action.payload);
        localStorage.setItem("registrationDraft", JSON.stringify(state));
      },
      resetDraft() {
        localStorage.removeItem("registrationDraft");
        return { ...initialState };
      },
    },
  });
  
  export const { upsertDraft, resetDraft } = slice.actions;
  export default slice.reducer;