import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users.slice";
import authReducer from "../slice/auth.slice";
import tokenReducer from "../slice/token.slice";
import productReducer from "../slice/products.slice";
import socketReducer from "../slice/socket.slice";

const rootReducer = {
	users: usersReducer,
	auth: authReducer,
	token: tokenReducer,
	products: productReducer,
	socket: socketReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
