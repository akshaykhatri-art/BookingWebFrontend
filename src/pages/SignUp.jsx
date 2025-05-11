import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signupUser } from "../features/auth/authActions";
import { selectAuth } from "../features/auth/authSelectors";
import { resetAuthState } from "../features/auth/authSlice";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector(selectAuth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isAlphanumeric = (str) => {
    return /[a-zA-Z]/.test(str) && /\d/.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!isAlphanumeric(password)) {
      toast.error("Password must contain both letters and numbers");
      return;
    }

    dispatch(signupUser(form));
  };

  useEffect(() => {
    if (Array.isArray(error)) {
      error.forEach((errMsg) => toast.error(errMsg));
      dispatch(resetAuthState());
    } else if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }

    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        dispatch(resetAuthState());
        navigate("/login");
      }, 1500);
    }
  }, [error, successMessage, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <FormInput
        label="First Name*"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />
      <FormInput
        label="Last Name*"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />
      <FormInput
        label="Email*"
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
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Sign Up
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
