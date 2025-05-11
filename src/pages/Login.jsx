import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authActions";
import { selectAuth } from "../features/auth/authSelectors";
import { resetAuthState } from "../features/auth/authSlice";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, loading } = useSelector(selectAuth);

  const [form, setForm] = useState({
    email: "akshaykhatri22@gmail.com",
    password: "Akshay@22",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }

    if (isAuthenticated) {
      toast.success("Login successful");
      dispatch(resetAuthState());
      navigate("/booking");
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormInput
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
      />
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded"
      >
        Login
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
