import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
	name: "products",
<<<<<<< HEAD
	initialState: [],
=======
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
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
	reducers: {
		setProducts: (state, action) => {
			return {
				...state,
				products: action.payload,
<<<<<<< HEAD
=======
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
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
			};
		},
	},
});

const { reducer, actions } = products;
export default reducer;
<<<<<<< HEAD
export const { setProducts } = actions;
=======
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
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
