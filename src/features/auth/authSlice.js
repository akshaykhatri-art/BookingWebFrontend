import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("authUser");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
  isAuthenticated: !!storedUser,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      if (!state.error || !Array.isArray(state.error)) {
        state.error = [];
      }
      if (Array.isArray(action.payload)) {
        state.error = action.payload;
      } else {
        state.error.push(action.payload);
      }
    },
    logout: (state) => {
      localStorage.removeItem("authUser");
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
    resetAuthState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
