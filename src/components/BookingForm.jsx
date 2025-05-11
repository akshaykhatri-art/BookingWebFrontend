import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrUpdateBooking,
  fetchBookingById,
} from "../features/booking/bookingActions";
import {
  selectCurrentBooking,
  selectBookingLoading,
  selectBookingError,
} from "../features/booking/bookingSelectors";
import { clearBookingError } from "../features/booking/bookingSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ bookingId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEditMode = Boolean(bookingId);
  const existingBooking = useSelector(selectCurrentBooking);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  const [formData, setFormData] = useState({
    CustomerName: "",
    CustomerEmail: "",
    BookingDate: "",
    BookingType: "Full Day",
    BookingSlot: "",
    FromTime: "",
    ToTime: "",
  });

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchBookingById(bookingId));
    }
  }, [dispatch, bookingId, isEditMode]);

  useEffect(() => {
    if (existingBooking) {
      setFormData({
        CustomerName: existingBooking.CustomerName || "",
        CustomerEmail: existingBooking.CustomerEmail || "",
        BookingDate: existingBooking.BookingDate || "",
        BookingType: existingBooking.BookingType || "Full Day",
        BookingSlot: existingBooking.BookingSlot || "",
        FromTime: existingBooking.FromTime || "",
        ToTime: existingBooking.ToTime || "",
      });
    }
  }, [existingBooking]);

  useEffect(() => {
    if (error) {
      toast.error(`Booking Error: ${error}`);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(clearBookingError());
      dispatch(addOrUpdateBooking({ BookingId: bookingId, data: formData }));
    } else {
      dispatch(clearBookingError());
      dispatch(addOrUpdateBooking(formData));
    }

    navigate("/booking");
  };

  const showSlot = formData.BookingType === "Half Day";
  const showTime = formData.BookingType === "Custom";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block font-semibold">Customer Name</label>
        <input
          type="text"
          name="CustomerName"
          value={formData.CustomerName}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Customer Email</label>
        <input
          type="email"
          name="CustomerEmail"
          value={formData.CustomerEmail}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Booking Date</label>
        <input
          type="date"
          name="BookingDate"
          value={formData.BookingDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Booking Type</label>
        <select
          name="BookingType"
          value={formData.BookingType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Full Day">Full Day</option>
          <option value="Half Day">Half Day</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {showSlot && (
        <div>
          <label className="block font-semibold">Booking Slot</label>
          <select
            name="BookingSlot"
            value={formData.BookingSlot}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select Slot --</option>
            <option value="First Half">First Half</option>
            <option value="Second Half">Second Half</option>
          </select>
        </div>
      )}

      {showTime && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Booking From Time</label>
            <input
              type="time"
              name="FromTime"
              value={formData.FromTime}
              onChange={handleChange}
              required={showTime}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Booking To Time</label>
            <input
              type="time"
              name="ToTime"
              value={formData.ToTime}
              onChange={handleChange}
              required={showTime}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {isEditMode ? "Update Booking" : "Create Booking"}
      </button>
    </form>
  );
}
