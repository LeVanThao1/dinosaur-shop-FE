import { createSlice } from "@reduxjs/toolkit";
const cart = createSlice({
	name: "cart",
	initialState: null,
	reducers: {
		setCart: (state, action) => {
			// cookie.save("cart", action.payload);
			if (!action.payload.type)
				localStorage.setItem(
					"cart",
					JSON.stringify(action.payload.cart)
				);
			return action.payload.cart;
		},
		addCart: (state, action) => {
			// cookie.save("cart", [...state, action.payload]);
			if (!action.payload.type)
				localStorage.setItem(
					"cart",
					JSON.stringify([...state, action.payload.product])
				);
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			const data = state.filter(
				(st) => st.productId !== action.payload.product
			);
			// cookie.save("cart", data);
			if (!action.payload.type)
				localStorage.setItem("cart", JSON.stringify(data));
			return data;
		},
	},
});

const { reducer, actions } = cart;
export default reducer;
export const { addCart, removeProduct, setCart } = actions;
