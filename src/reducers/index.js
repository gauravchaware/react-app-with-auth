/**
 * Auther: Gaurav Chaware
 * Date: 02-02-2020
 * Desc: Combine all reducer files here
 */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import commonReducer from "./common";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    common: commonReducer
  });

export default createRootReducer;
