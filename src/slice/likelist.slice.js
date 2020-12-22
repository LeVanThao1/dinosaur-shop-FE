import { createSlice } from "@reduxjs/toolkit";

const likeList = createSlice({
	name: "likeList",
	initialState: [],
	reducers: {
		addLikeList: (state, action) => {
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			return state.filter((st) => st._id !== action.payload);
		},
	},
});

const { reducer, actions } = likeList;
export default reducer;
export const { addLikeList, removeProduct } = actions;
