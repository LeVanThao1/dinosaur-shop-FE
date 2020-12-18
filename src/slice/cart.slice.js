import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		setCart: (state, action) => {
			return action.payload;
		},
		addCart: (state, action) => {
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			return state.filter((st) => st.productId !== action.payload);
		},
	},
});

const { reducer, actions } = cart;
export default reducer;
export const { addCart, removeProduct, setCart } = actions;
