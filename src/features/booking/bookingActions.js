import {
  fetchBookingsRequest,
  addOrUpdateBookingRequest,
  deleteBookingRequest,
  fetchBookingByIdRequest,
} from "./bookingSlice";

export const fetchBookings = () => fetchBookingsRequest();
export const addOrUpdateBooking = (data) => addOrUpdateBookingRequest(data);
export const deleteBooking = (id) => deleteBookingRequest(id);
export const fetchBookingById = (id) => fetchBookingByIdRequest(id);
