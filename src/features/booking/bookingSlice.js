import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    success: false,
    currentBooking: null,
  },
  reducers: {
    fetchBookingsRequest: (state) => {
      state.loading = true;
    },
    fetchBookingsSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addOrUpdateBookingRequest: (state) => {
      state.loading = true;
    },
    addOrUpdateBookingSuccess: (state) => {
      state.loading = false;
    },
    addOrUpdateBookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteBookingRequest: (state) => {
      state.loading = true;
    },
    deleteBookingSuccess: (state) => {
      state.loading = false;
    },
    deleteBookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchBookingByIdRequest: (state) => {
      state.loading = true;
    },
    fetchBookingByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentBooking = action.payload;
    },
    fetchBookingByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearBookingError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchBookingsRequest,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  addOrUpdateBookingRequest,
  addOrUpdateBookingSuccess,
  addOrUpdateBookingFailure,
  deleteBookingRequest,
  deleteBookingSuccess,
  deleteBookingFailure,
  fetchBookingByIdRequest,
  fetchBookingByIdSuccess,
  fetchBookingByIdFailure,
  clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
