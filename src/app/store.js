import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users.slice";
import authReducer from "../slice/auth.slice";
import tokenReducer from "../slice/token.slice";
import productReducer from "../slice/products.slice";
import socketReducer from "../slice/socket.slice";
import productDetailReducer from "../slice/productdetail.slice";
import likeListReducer from "../slice/likelist.slice";
import cartReducer from "../slice/cart.slice";
import seenListReducer from "../slice/seenlist.slice";
import menuReducer from "../slice/menu.slice";
import loadingReducer from "../slice/loading.slice";

const rootReducer = {
	users: usersReducer,
	auth: authReducer,
	token: tokenReducer,
	products: productReducer,
	socket: socketReducer,
	productDetail: productDetailReducer,
	likeList: likeListReducer,
	cart: cartReducer,
	seenlist: seenListReducer,
	menu: menuReducer,
	loading: loadingReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
