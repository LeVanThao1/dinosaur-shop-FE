import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
const cart = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		setCart: (state, action) => {
			// cookie.save("cart", action.payload);
			localStorage.setItem("cart", JSON.stringify(action.payload));
			return action.payload;
		},
		addCart: (state, action) => {
			// cookie.save("cart", [...state, action.payload]);
			localStorage.setItem(
				"cart",
				JSON.stringify([...state, action.payload])
			);
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			const data = state.filter((st) => st.productId !== action.payload);
			// cookie.save("cart", data);
			localStorage.setItem("cart", JSON.stringify(data));
			return data;
		},
	},
});

const { reducer, actions } = cart;
export default reducer;
export const { addCart, removeProduct, setCart } = actions;
