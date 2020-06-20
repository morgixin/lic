import { combineReducers } from "redux";
import entryReducer from "./entryReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  entry: entryReducer,
  error: errorReducer,
  auth: authReducer,
});
