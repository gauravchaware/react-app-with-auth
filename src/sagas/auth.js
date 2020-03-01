import { put, takeLatest } from "redux-saga/effects";
import { setUserSession } from "../utils";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../constants/actionTypes";
import { postAuthService } from "../services/auth";

function* postAuth(data) {
  const response = yield postAuthService(data.payload);
  // set login expiration
  const session = yield setUserSession(data.payload, response);
  if (response && session) {
    yield put({ type: AUTH_SUCCESS, data: response.data });
  } else {
    yield put({
      type: AUTH_FAIL,
      error: response.error || "Invalid username or password."
    });
  }
}

function* postAuthWatcher() {
  yield takeLatest(AUTH_START, postAuth);
}

export { postAuthWatcher };
