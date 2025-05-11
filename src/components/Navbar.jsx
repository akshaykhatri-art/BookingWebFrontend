import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="w-1/3" />
      <div className="text-xl font-semibold w-1/3 text-center">Booking App</div>
      <div className="w-1/3 text-right">
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
