import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
	name: "products",
	initialState: {
		products: [],
		pages: 1,
		currentPage: 1,
		filter: {
			category: "",
			typeProduct: "",
			style: "",
			material: "",
			min: 0,
			max: 1000000,
			textSearch: "",
			price: "",
			sortPrice: "",
		},
	},
	reducers: {
		setProducts: (state, action) => {
			return {
				...state,
				products: action.payload,
				// pages: Math.ceil(action.payload.length / 9),
			};
		},
		setCurrentPage: (state, action) => {
			return { ...state, currentPage: action.payload };
		},
		setStyleFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					style: action.payload ? `style=${action.payload}` : "",
				},
			};
		},
		setCategogyFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					category: action.payload
						? `category=${action.payload}`
						: "",
				},
			};
		},
		setTypeProductFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					typeProduct: action.payload
						? `type_product=${action.payload}`
						: "",
				},
			};
		},
		setMaterialFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					material: action.payload
						? `material=${action.payload}`
						: "",
				},
			};
		},
		setPages: (state, action) => {
			return {
				...state,
				pages: Math.ceil(action.payload.total / action.payload.limit),
			};
		},
		setPriceFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					min: action.payload.min,
					max: action.payload.max,
					price: `salePrice[gte]=${action.payload.min}&salePrice[lte]=${action.payload.max}`,
				},
			};
		},
		setTextSearchFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					textSearch: action.payload
						? `name[regex]=${action.payload}`
						: "",
				},
			};
		},
		setSortPrice: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					sortPrice: action.payload ? `sort=${action.payload}` : "",
				},
			};
		},
	},
});

const { reducer, actions } = products;
export default reducer;
export const {
	setProducts,
	setCurrentPage,
	setPages,
	setStyleFT,
	setMaterialFT,
	setTypeProductFT,
	setCategogyFT,
	setPriceFT,
	setTextSearchFT,
	setSortPrice,
} = actions;
