import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users.slice";
import authReducer from "../slice/auth.slice";
import tokenReducer from "../slice/token.slice";

const rootReducer = {
  users: usersReducer,
  auth: authReducer,
  token: tokenReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
