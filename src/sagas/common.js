import { put, takeLatest } from "redux-saga/effects";
import {
  GET_PLANET_START,
  GET_PLANET_SUCCESS,
  GET_PLANET_FAIL
} from "../constants/actionTypes";
import { getPlanetsService } from "../services/common";

function* getPlanets(data) {
  try {
    const response = yield getPlanetsService(data.payload.requestData);
    if (response) {
      yield put({ type: GET_PLANET_SUCCESS, data: response.data });
      data.payload.onSuccess(response.data);
    } else {
      yield put({ type: GET_PLANET_FAIL, data: response.error });
      data.payload.onError(response.error);
    }
  } catch (error) {
    yield put({ type: GET_PLANET_FAIL, error: 'Network Error!' });
    data.payload.onError(null);
  }

}

function* getPlanetsWatcher() {
  yield takeLatest(GET_PLANET_START, getPlanets);
}

export { getPlanetsWatcher };
