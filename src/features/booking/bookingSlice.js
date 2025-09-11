import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  restaurant: null,   
  status: "idle",
  error: null,

  confirmationOpen: false,
  confirmation: null,
};

export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (payload, { rejectWithValue }) => {
    try {
      return payload; 
    } catch (e) {
      return rejectWithValue(e.message || "Booking failed");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    openBook(state, action) {
      state.restaurant = action.payload || null;
      state.isOpen = true;
      state.error = null;
    },
    closeBook(state) {
      state.isOpen = false;
    },
    setRestaurant(state, action) {
      state.restaurant = action.payload || null;
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
      .addCase(confirmBooking.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isOpen = false;

        state.confirmationOpen = true;
        state.confirmation = {
          restaurantName: action.payload.restaurantName,
          date: action.payload.date,
          time: action.payload.time,
          partySize: action.payload.partySize,
        };
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Booking failed";
      });
  },
});

export const { openBook, closeBook, setRestaurant, openConfirmation, closeConfirmation } = bookingSlice.actions;
export default bookingSlice.reducer;

export const selectBooking = (state) => state.booking;
