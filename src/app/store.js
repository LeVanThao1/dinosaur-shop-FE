import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user.slice";
const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
