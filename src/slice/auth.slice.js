import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
	name: "auth",
	initialState: {
		user: {},
		isLogged: false,
		isAdmin: false,
	},
	reducers: {
		setUserInfo: (state, action) => {
			const user = action.payload;
			return {
				...state,
				user: user,
				isAdmin: user.role === 0 ? false : true,
			};
		},
		setLogin: (state, action) => {
			return { ...state, isLogged: true };
		},
		logout: (state, action) => {
			return { isLogged: false, user: {}, isAdmin: false };
		},
		changeCart: (state, action) => {
			return { ...state, user: { ...state.user, cart: action.payload } };
		},
		updateUser: (state, action) => {
			return { ...state, user: { ...state.user, ...action.payload } };
		},
	},
});

const { reducer, actions } = auth;
export default reducer;
export const {
	logout,
	setLogin,
	setUserInfo,
	changeCart,
	updateUser,
} = actions;
