import _ from "loadsh";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from "../constants/actionTypes";
import { updateObject } from "../utils";

const initialState = {
  token: null,
  userId: null,
  userData: {},
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: action.loading || true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: _.get(action, "data.results[0].name", null),
    userId: _.get(action, "data.results[0].name", null),
    userData: _.get(action, "data.results[0]", {}),
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: action.error || null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default auth;
