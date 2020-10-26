import { put, takeLatest } from "redux-saga/effects";
import { setUserSession } from "../utils";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../constants/actionTypes";
import { postAuthService } from "../services/auth";

function* postAuth(data) {
  try {
    const response = yield postAuthService(data.payload.requestData);
    // set login expiration
    const session = yield setUserSession(data.payload.requestData, response);
    if (response && session) {
      yield put({ type: AUTH_SUCCESS, data: response.data });
      data.payload.onSuccess(response.data);
    } else {
      yield put({ type: AUTH_FAIL, error: response.error || "Invalid username or password." });
      data.payload.onError(response.error);
    }

  } catch (error) {
    yield put({ type: AUTH_FAIL, error: 'Network Error!' });
    data.payload.onError(null);
  }

}

function* postAuthWatcher() {
  yield takeLatest(AUTH_START, postAuth);
}

export { postAuthWatcher };
