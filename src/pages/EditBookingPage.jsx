import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import Navbar from "../components/Navbar";

export default function EditBookingPage() {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
        <BookingForm bookingId={id} />
      </div>
    </div>
  );
}
