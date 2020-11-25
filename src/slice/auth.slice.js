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
		setLogout: (state, action) => {
			return { ...state, isLogged: false };
		},
	},
});

const { reducer, actions } = auth;
export default reducer;
export const { setLogout, setLogin, setUserInfo } = actions;
