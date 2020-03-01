import { put, takeLatest } from "redux-saga/effects";
import {
  GET_PLANET_START,
  GET_PLANET_SUCCESS,
  GET_PLANET_FAIL
} from "../constants/actionTypes";
import { getPlanetsService } from "../services/common";

function* getPlanets(data) {
  const response = yield getPlanetsService(data.payload);
  if (response) {
    yield put({ type: GET_PLANET_SUCCESS, data: response.data });
  } else {
    yield put({ type: GET_PLANET_FAIL, data: response.error });
  }
}

function* getPlanetsWatcher() {
  yield takeLatest(GET_PLANET_START, getPlanets);
}

export { getPlanetsWatcher };
