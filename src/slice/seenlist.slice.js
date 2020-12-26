import { createSlice } from "@reduxjs/toolkit";
const seenList = createSlice({
	name: "seenList",
	initialState: [],
	reducers: {
		setSeenList: (state, action) => {
			return action.payload;
		},
		addSeenList: (state, action) => {
			const data = state.filter(
				(item) => item._id === action.payload._id
			);
			if (!data || data.length <= 0) {
				// cookie.save("seenList", [...state, action.payload]);
				localStorage.setItem(
					"seenList",
					JSON.stringify([...state, action.payload])
				);
				return [...state, action.payload];
			} else return state;
		},
		removeSeenList: (state, action) => {
			const data = state.filter((st) => st._id !== action.payload);
			// cookie.save("seenList", data);
			localStorage.setItem("seenList", JSON.stringify(data));
			return data;
		},
	},
});

const { reducer, actions } = seenList;
export default reducer;
export const { addSeenList, removeSeenList, setSeenList } = actions;
