import _ from "loadsh";
import {
  GET_PLANET_START,
  GET_PLANET_SUCCESS,
  GET_PLANET_FAIL,
  SET_PLANET
} from "../constants/actionTypes";
import { updateObject } from "../utils";

const initialState = {
  error: null,
  loading: false,
  planetData: [],
  selectedPlanet: {}
};

const planetStart = (state, action) => {
  return updateObject(state, { error: null, loading: action.loading || true });
};

const planetSuccess = (state, action) => {
  return updateObject(state, {
    planetData: _.get(action, "data.results", null),
    loading: false
  });
};

const planetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const setPlanet = (state, action) => {
  return updateObject(state, {
    selectedPlanet: action.payload
  });
};

const common = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANET_START:
      return planetStart(state, action);
    case GET_PLANET_SUCCESS:
      return planetSuccess(state, action);
    case GET_PLANET_FAIL:
      return planetFail(state, action);
    case SET_PLANET:
      return setPlanet(state, action);
    default:
      return state;
  }
};

export default common;
