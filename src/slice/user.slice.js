import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUserAuth: (state, action) => {
			const infor = action.payload;
			return { ...state, user: infor.user, isLogged: infor.isLogged };
		},
		// logout: (state, action) => {
		//   return { user: {}, isLogged: false };
		// },
		setToken: (state, action) => {
			const token = action.payload;
			return { ...state, token };
		},
	},
});

const { reducer, actions } = user;
export default reducer;
export const { setUserAuth, setToken } = actions;
