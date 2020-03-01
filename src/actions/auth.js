/**
 * Auther: Gaurav Chaware
 * Date: 02-02-2020
 * Desc: Add auth related action here
 */
import {
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT_PATH,
  AUTH_LOGOUT
} from "../constants/actionTypes";

export const postAuth = payload => {
  return {
    type: AUTH_START,
    payload
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId,
    data: { results: [{ name: userId }] }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};
