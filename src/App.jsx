import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookingListPage from "./pages/BookingListPage";
import AddBookingPage from "./pages/AddBookingPage";
import EditBookingPage from "./pages/EditBookingPage";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./features/auth/authSelectors";

export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/booking" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/booking"
        element={
          isAuthenticated ? <BookingListPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/booking/add"
        element={
          isAuthenticated ? <AddBookingPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/booking/edit/:id"
        element={
          isAuthenticated ? <EditBookingPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-red-500">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}
