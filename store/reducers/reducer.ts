import { user } from "./user";
import { notification } from "./notification";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer = combineReducers({
  user,
  notification
});
