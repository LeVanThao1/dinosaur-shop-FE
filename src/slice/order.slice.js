import { createSlice } from "@reduxjs/toolkit";

const orders = createSlice({
	name: "orders",
	initialState: {
		listOrder: null,
		currentOrder: null,
		ordering: null,
	},
	reducers: {
		setListOrder: (state, action) => {
			return { ...state, listOrder: action.payload };
		},
		setCurrentOrder: (state, action) => {
			return { ...state, currentOrder: action.payload };
		},
		setOrdering: (state, action) => {
			return { ...state, ordering: action.payload };
		},
	},
});

const { reducer, actions } = orders;
export default reducer;
export const { setListOrder, setCurrentOrder, setOrdering } = actions;
