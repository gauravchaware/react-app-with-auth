/**
 * Auther: Gaurav Chaware
 * Date: 02-02-2020
 * Desc: Add auth related action here
 */
import { GET_PLANET_START, SET_PLANET } from "../constants/actionTypes";

export const getPlanets = payload => {
  return {
    type: GET_PLANET_START,
    payload
  };
};

export const setPlanet = payload => {
  return {
    type: SET_PLANET,
    payload
  };
};
