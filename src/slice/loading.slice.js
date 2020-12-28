import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
	name: "loading",
	initialState: false,
	reducers: {
		setLoading: (state, action) => {
			return action.payload;
		},
	},
});

const { reducer, actions } = loading;
export default reducer;
export const { setLoading } = actions;
