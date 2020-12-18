import { createSlice } from "@reduxjs/toolkit";

const seenList = createSlice({
	name: "seenList",
	initialState: [],
	reducers: {
		addSeenList: (state, action) => {
			const data = state.filter((item) => item._id === action.payload);
			if (!data || data.length <= 0) return [...state, action.payload];
			else return state;
		},
		removeSeenList: (state, action) => {
			return state.filter((st) => st._id !== action.payload);
		},
	},
});

const { reducer, actions } = seenList;
export default reducer;
export const { addSeenList, removeSeenList } = actions;
