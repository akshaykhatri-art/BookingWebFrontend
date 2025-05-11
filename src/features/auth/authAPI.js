import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5008/api";

export const apiLogin = async (payload) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, payload);
  return response.data;
};

export const apiSignup = async (payload) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, payload);
  return response.data;
};
