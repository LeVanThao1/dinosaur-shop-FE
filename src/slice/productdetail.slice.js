import { createSlice } from "@reduxjs/toolkit";

const productDetail = createSlice({
	name: "productDetail",
	initialState: {
		product: null,
		comments: [],
		evalute: [],
		star: 0,
		value: 0,
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
		setEvalute: (state, action) => {
			return {
				...state,
				evalute: action.payload.evalute,
				star:
					Math.floor(
						(action.payload.evalute.reduce(
							(a, b) => a + b.star,
							0
						) |
							0) /
							action.payload.evalute.length
					) || 0,
				value:
					action.payload.evalute.filter(
						(cm) => cm.userId === action.payload.id
					)[0]?.star | 0,
			};
		},
		// id, value
		setValue: (state, action) => {
			const index = state.evalute.findIndex(
				(cm) => cm.userId === action.payload.id
			);
			let evalute = [];
			if (index < 0) {
				evalute = [
					...state.evalute,
					{
						star: action.payload.value,
						userId: action.payload.id,
					},
				];
				return {
					...state,
					evalute: evalute,
					value: action.payload.value,
					star: Math.round(
						(evalute.reduce((a, b) => a + b.star, 0) | 0) /
							evalute.length
					),
				};
			}

			evalute = [
				...state.evalute.slice(0, index),
				{
					...state.evalute[index],
					star: action.payload.value,
				},
				...state.evalute.slice(index + 1),
			];
			return {
				...state,
				evalute: evalute,
				value: action.payload.value,
				star:
					Math.round(
						((evalute.reduce((a, b) => a + b.star, 0) | 0) /
							evalute.length) *
							10
					) / 10,
			};
		},
	},
});

const { reducer, actions } = productDetail;
export default reducer;
export const {
	setProduct,
	setComment,
	addComment,
	setLike,
	setEvalute,
	setValue,
} = actions;
