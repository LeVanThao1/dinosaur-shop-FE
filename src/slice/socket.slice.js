import { createSlice } from "@reduxjs/toolkit";

const socket = createSlice({
	name: "socket",
	initialState: null,
	reducers: {
		setSocket: (state, action) => {
			console.log(action.payload);
			return { ...action.payload };
		},
	},
});

const { reducer, actions } = socket;
export default reducer;
export const { setSocket } = actions;
