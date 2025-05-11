import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchBookingsRequest,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  addOrUpdateBookingRequest,
  addOrUpdateBookingSuccess,
  addOrUpdateBookingFailure,
  deleteBookingRequest,
  deleteBookingSuccess,
  deleteBookingFailure,
  fetchBookingByIdRequest,
  fetchBookingByIdSuccess,
  fetchBookingByIdFailure,
} from "./bookingSlice";

import {
  apiGetBookings,
  apiAddOrUpdateBooking,
  apiDeleteBooking,
  apiGetBookingById,
} from "./bookingAPI";

function* fetchBookingsSaga() {
  debugger;
  try {
    const data = yield call(apiGetBookings);
    yield put(fetchBookingsSuccess(data));
  } catch (error) {
    const errorResponse = error.response?.data;
    const message =
      errorResponse?.error ||
      errorResponse?.message ||
      "Unable to fetch booking list";
    yield put(fetchBookingsFailure(message));
  }
}

function* addOrUpdateBookingSaga(action) {
  try {
    yield call(apiAddOrUpdateBooking, action.payload);
    yield put(addOrUpdateBookingSuccess());
    yield put(fetchBookingsRequest());
  } catch (error) {
    yield put(addOrUpdateBookingFailure(error.message));
  }
}

function* deleteBookingSaga(action) {
  try {
    yield call(apiDeleteBooking, action.payload);
    yield put(deleteBookingSuccess());
    yield put(fetchBookingsRequest());
  } catch (error) {
    yield put(deleteBookingFailure(error.message));
  }
}

function* fetchBookingByIdSaga(action) {
  try {
    const data = yield call(apiGetBookingById, action.payload);
    yield put(fetchBookingByIdSuccess(data));
  } catch (error) {
    yield put(fetchBookingByIdFailure(error.message));
  }
}

export default function* bookingSaga() {
  yield takeLatest(fetchBookingsRequest.type, fetchBookingsSaga);
  yield takeLatest(addOrUpdateBookingRequest.type, addOrUpdateBookingSaga);
  yield takeLatest(deleteBookingRequest.type, deleteBookingSaga);
  yield takeLatest(fetchBookingByIdRequest.type, fetchBookingByIdSaga);
}
