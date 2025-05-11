import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    success: false,
    currentBooking: null,
    deleteSuccess: false,
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
      state.error = null;
      state.success = false;
    },
    addOrUpdateBookingSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addOrUpdateBookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    deleteBookingRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteBookingSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteBookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
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
      state.success = false;
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    resetDeleteSuccess: (state) => {
      state.deleteSuccess = false;
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
  resetDeleteSuccess,
  resetCurrentBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
