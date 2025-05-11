import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingActions";
import {
  selectBookings,
  selectBookingLoading,
  selectBookingError,
  selectDeleteSuccess,
} from "../features/booking/bookingSelectors";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { resetDeleteSuccess } from "../features/booking/bookingSlice";

export default function BookingListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const deleteSuccess = useSelector(selectDeleteSuccess);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch bookings: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Booking deleted successfully");
      dispatch(resetDeleteSuccess());
    }
  }, [deleteSuccess, dispatch]);

  const handleEdit = (id) => {
    navigate(`/booking/edit/${id}`);
  };

  const formatBookingDetail = (booking) => {
    if (booking.BookingType === "Full Day") {
      return <div className="whitespace-pre-line">Full Day</div>;
    } else if (booking.BookingType === "Half Day") {
      return (
        <div className="whitespace-pre-line">
          Half Day
          {"\n"}
          {booking.BookingSlot}
        </div>
      );
    } else if (booking.BookingType === "Custom") {
      return (
        <div className="whitespace-pre-line">
          Custom
          {"\n"}
          {booking.FromTime} - {booking.ToTime}
        </div>
      );
    }
    return "-";
  };

  const formatISTDateOnly = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  const handleDelete = (id) => {
    setSelectedBookingId(id);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Bookings</h2>
          <button
            onClick={() => {
              navigate("/booking/add");
              dispatch({ type: "booking/resetCurrentBooking" });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Booking
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Customer Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Booking Detail
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.CustomerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.CustomerEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatISTDateOnly(booking.BookingDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-700">
                      {formatBookingDetail(booking)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.CreatedByName}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      {booking.IsOwnBooking === 1 && (
                        <>
                          <button
                            onClick={() => handleEdit(booking.BookingId)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(booking.BookingId)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this booking?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(deleteBooking(selectedBookingId));
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
