import { createSlice } from "@reduxjs/toolkit";
const menu = createSlice({
	name: "menu",
	initialState: {
		categories: [],
		typeProducts: [],
		styles: [],
		materials: [],
	},
	reducers: {
		setCategories: (state, action) => {
			return { ...state, categories: action.payload };
		},
		setTypeProducts: (state, action) => {
			return { ...state, typeProducts: action.payload };
		},
		setStyles: (state, action) => {
			return { ...state, styles: action.payload };
		},
		setMaterials: (state, action) => {
			return { ...state, materials: action.payload };
		},
	},
});

const { reducer, actions } = menu;
export default reducer;
export const {
	setCategories,
	setTypeProducts,
	setStyles,
	setMaterials,
} = actions;
