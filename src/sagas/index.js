/**
 * Auther: Gaurav Chaware
 * Date: 02-02-2020
 * Desc: Combine all sagas files here
 */
import { all } from "redux-saga/effects";
import { postAuthWatcher } from "./auth";
import { getPlanetsWatcher } from "./common";

export default function* rootSaga() {
  yield all([postAuthWatcher(), getPlanetsWatcher()]);
}
