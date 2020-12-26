import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD

const likeList = createSlice({
	name: "likeList",
	initialState: [],
	reducers: {
		addLikeList: (state, action) => {
			return [...state, action.payload];
		},
		removeProduct: (state, action) => {
			return state.filter((st) => st._id !== action.payload);
		},
	},
=======
const likeList = createSlice({
  name: "likeList",
  initialState: [],
  reducers: {
    setLikeList: (state, action) => {
      return action.payload;
    },
    addLikeList: (state, action) => {
      // cookie.save("likeList", [...state, action.payload]);
      localStorage.setItem(
        "likeList",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    },
    removeProduct: (state, action) => {
      const data = state.filter((st) => st._id !== action.payload);
      // cookie.save("likeList", [...state, data]);
      localStorage.setItem("likeList", JSON.stringify(data));
      return data;
    },
  },
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
});

const { reducer, actions } = likeList;
export default reducer;
<<<<<<< HEAD
export const { addLikeList, removeProduct } = actions;
=======
export const { addLikeList, removeProduct, setLikeList } = actions;
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
