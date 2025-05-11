import { loginRequest, signupRequest } from "./authSlice";

export const loginUser = (credentials) => loginRequest(credentials);
export const signupUser = (userData) => signupRequest(userData);
