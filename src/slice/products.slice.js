import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
	name: "products",
	initialState: {
		products: null,
		currentPage: 1,
		isFilter: false,
		pages: 1,
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
		productsFilter: null,
		data: null,
	},
	reducers: {
		setProducts: (state, action) => {
			return {
				...state,
				products: action.payload,
				data: action.payload.slice(0, 9),
			};
		},
		setCurrentPage: (state, action) => {
			return {
				...state,
				currentPage: action.payload,
				data: state.isFilter
					? state.productsFilter.slice(
							(action.payload - 1) * 9,
							action.payload * 9
					  )
					: state.products.slice(
							(action.payload - 1) * 9,
							action.payload * 9
					  ),
			};
		},
		setStyleFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					style: action.payload,
				},
			};
		},
		setCategogyFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					category: action.payload,
				},
			};
		},
		setTypeProductFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					typeProduct: action.payload,
				},
			};
		},
		setProductsFilter: (state, action) => {
			return {
				...state,
				currentPage: 1,
				productsFilter: action.payload,
				isFilter: true,
				data: action.payload.slice(0, 9),
			};
		},
		setIsFilter: (state, action) => {
			return {
				...state,
				isFilter: action.payload,
			};
		},
		setMaterialFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					material: action.payload,
				},
			};
		},
		setPages: (state, action) => {
			return {
				...state,
				pages: action.payload,
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
				},
			};
		},
		setTextSearchFT: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					textSearch: action.payload,
				},
			};
		},
		setSortPrice: (state, action) => {
			return {
				...state,
				currentPage: 1,
				filter: {
					...state.filter,
					sortPrice: action.payload,
				},
			};
		},
		setData: (state, action) => {
			return {
				...state,
				currentPage: 1,
				pages: Math.ceil(state.products.length / 9),
				data: state.products.slice(0, 9),
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
	setProductsFilter,
	setIsFilter,
	setData,
} = actions;
