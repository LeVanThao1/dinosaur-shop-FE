import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD

const cart = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		setCart: (state, action) => {
			return action.payload;
		},
		addCart: (state, action) => {
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			return state.filter((st) => st.productId !== action.payload);
		},
	},
=======
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
      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    },
    removeProduct: (state, action) => {
      const data = state.filter((st) => st.productId !== action.payload);
      // cookie.save("cart", data);
      localStorage.setItem("cart", JSON.stringify(data));
      return data;
    },
  },
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
});

const { reducer, actions } = cart;
export default reducer;
export const { addCart, removeProduct, setCart } = actions;
