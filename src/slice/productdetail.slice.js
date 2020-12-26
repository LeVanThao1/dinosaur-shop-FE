import { createSlice } from "@reduxjs/toolkit";

const productDetail = createSlice({
	name: "productDetail",
	initialState: {
		product: null,
		comments: [],
	},
	reducers: {
		setProduct: (state, action) => {
			return {
				...state,
				product: action.payload,
			};
		},
		setComment: (state, action) => {
			return { ...state, comments: action.payload };
		},
		addComment: (state, action) => {
			return { ...state, comments: [...state.comments, action.payload] };
		},
	},
});

const { reducer, actions } = productDetail;
export default reducer;
export const { setProduct, setComment, addComment } = actions;
