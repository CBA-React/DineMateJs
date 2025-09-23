import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  event: null,
  status: "idle",
  error: null,

  confirmationOpen: false,
  confirmation: null,
};

export const confirmEventRegistration = createAsyncThunk(
  "events/confirmRegistration",
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (e) {
      return rejectWithValue(e.message || "Registration failed");
    }
  }
);

const eventRegistrationSlice = createSlice({
  name: "eventRegistration",
  initialState,
  reducers: {
    openRegister(state, action) {
      state.event = action.payload || null;
      state.isOpen = true;
      state.error = null;
    },
    closeRegister(state) {
      state.isOpen = false;
    },
    setEvent(state, action) {
      state.event = action.payload || null;
    },
    openConfirmation(state, action) {
      state.confirmationOpen = true;
      state.confirmation = action.payload;
    },
    closeConfirmation(state) {
      state.confirmationOpen = false;
      state.confirmation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmEventRegistration.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(confirmEventRegistration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isOpen = false;

        state.confirmationOpen = true;
        state.confirmation = {
          eventTitle: action.payload.eventTitle,
          venueName: action.payload.venueName,
          venueArea: action.payload.venueArea,
          date: action.payload.date,
          time: action.payload.time,
          ticketQty: action.payload.ticketQty,
        };
      })
      .addCase(confirmEventRegistration.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error?.message || "Registration failed";
      });
  },
});

export const {
  openRegister,
  closeRegister,
  setEvent,
  openConfirmation: openEventConfirmation,
  closeConfirmation: closeEventConfirmation,
} = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
export const selectEventRegistration = (state) => state.eventRegistration;
