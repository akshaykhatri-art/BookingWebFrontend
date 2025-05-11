import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingActions";
import {
  selectBookings,
  selectBookingLoading,
  selectBookingError,
} from "../features/booking/bookingSelectors";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function BookingListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch bookings: ${error}`);
    }
  }, [error]);

  const handleEdit = (id) => {
    navigate(`/booking/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteBooking(id));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Bookings</h2>
          <button
            onClick={() => navigate("/booking/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Booking
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="p-4 border rounded shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{booking.CustomerName}</div>
                  <div className="text-gray-600">{booking.BookingDate}</div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(booking._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
