import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "./authSlice";
import { apiLogin, apiSignup } from "./authAPI";

function* handleLogin(action) {
  try {
    const data = yield call(apiLogin, action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Login failed";
    yield put(loginFailure(message));
  }
}

function* handleSignup(action) {
  try {
    const data = yield call(apiSignup, action.payload);

    yield put(signupSuccess(data.message));
  } catch (error) {
    const errorResponse = error.response?.data;

    if (errorResponse?.error && Array.isArray(errorResponse.error)) {
      const messages = errorResponse.error.map((err) => err.msg);
      yield put(signupFailure(messages));
    } else {
      const message =
        errorResponse?.error || errorResponse?.message || "Signup failed.";
      yield put(signupFailure(message));
    }
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}
