import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		setProducts: (state, action) => {
			return {
				...state,
				products: action.payload,
			};
		},
	},
});

const { reducer, actions } = products;
export default reducer;
export const { setProducts } = actions;
