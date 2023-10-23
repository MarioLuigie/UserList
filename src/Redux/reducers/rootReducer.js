import { combineReducers } from "redux";
import userListReducer from "./userListReducer";
import apiReducer from "./apiReducer";

const rootReducer = combineReducers({
  userList: userListReducer,
  api: apiReducer
});

export default rootReducer;