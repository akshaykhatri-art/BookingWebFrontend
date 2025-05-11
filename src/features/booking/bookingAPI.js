import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5008/api/booking";

export const apiGetBookings = async () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  const res = await axios.get(`${BASE_URL}/booking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const apiGetBookingById = async (id) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  const res = await axios.get(`${BASE_URL}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const apiAddOrUpdateBooking = async (payload) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  const res = await axios.post(`${BASE_URL}/booking`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const apiDeleteBooking = async (id) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = authUser?.token;

  const res = await axios.delete(`${BASE_URL}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
