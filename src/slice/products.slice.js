import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
	name: "products",
	initialState: {
		products: [],
		productActive: {},
		comment: [],
	},
	reducers: {
		setProducts: (state, action) => {
			return {
				...state,
				products: action.payload,
			};
		},
		setProductActive: (state, action) => {
			return { ...state, productActive: { ...action.payload } };
		},
		setComment: (state, action) => {
			return { ...state, comment: action.payload };
		},
	},
});

const { reducer, actions } = products;
export default reducer;
export const { setProducts, setProductActive, setComment } = actions;
