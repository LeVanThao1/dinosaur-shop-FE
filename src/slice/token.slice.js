import { createSlice } from "@reduxjs/toolkit";

const token = createSlice({
	name: "token",
	initialState: "",
	reducers: {
		setToken: (state, action) => {
			return action.payload;
		},
		resetToken: (state, action) => {
			return "";
		},
	},
});

const { reducer, actions } = token;
export default reducer;
export const { setToken, resetToken } = actions;
