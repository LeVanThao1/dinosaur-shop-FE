import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user.slice";
import authReducer from "../slice/auth.slice";
import tokenReducer from "../slice/token.slice";

const rootReducer = {
	user: userReducer,
	auth: authReducer,
	token: tokenReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
