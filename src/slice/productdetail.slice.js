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
		setLike: (state, action) => {
			const index = state.comments.findIndex(
				(comment) => comment._id === action.payload.id
			);
			if (index < 0) return state;

			const comment = {
				...state.comments[index],
				like: action.payload.like,
				disLike: action.payload.disLike,
			};
			const comments = [
				...state.comments.slice(0, index),
				comment,
				...state.comments.slice(index + 1),
			];
			return {
				...state,
				comments,
			};
		},
	},
});

const { reducer, actions } = productDetail;
export default reducer;
export const { setProduct, setComment, addComment, setLike } = actions;
