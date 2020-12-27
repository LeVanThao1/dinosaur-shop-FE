import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
const likeList = createSlice({
	name: "likeList",
	initialState: [],
	reducers: {
		setLikeList: (state, action) => {
			return action.payload;
		},
		addLikeList: (state, action) => {
			// cookie.save("likeList", [...state, action.payload]);
			localStorage.setItem(
				"likeList",
				JSON.stringify([...state, action.payload])
			);
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			const data = state.filter((st) => st._id !== action.payload);
			// cookie.save("likeList", [...state, data]);
			localStorage.setItem("likeList", JSON.stringify(data));
			return data;
		},
	},
});

const { reducer, actions } = likeList;
export default reducer;
export const { addLikeList, removeProduct, setLikeList } = actions;
