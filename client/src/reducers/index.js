import { combineReducers } from "redux";
import obsReducer from "./entriesReducers";

export default combineReducers({
  obs: obsReducer,
});
