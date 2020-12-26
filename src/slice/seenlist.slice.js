import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD

const seenList = createSlice({
	name: "seenList",
	initialState: [],
	reducers: {
		addSeenList: (state, action) => {
			const data = state.filter((item) => item._id === action.payload);
			if (!data || data.length <= 0) return [...state, action.payload];
			else return state;
		},
		removeSeenList: (state, action) => {
			return state.filter((st) => st._id !== action.payload);
		},
	},
=======
const seenList = createSlice({
  name: "seenList",
  initialState: [],
  reducers: {
    setSeenList: (state, action) => {
      return action.payload;
    },
    addSeenList: (state, action) => {
      const data = state.filter((item) => item._id === action.payload._id);
      if (!data || data.length <= 0) {
        // cookie.save("seenList", [...state, action.payload]);
        localStorage.setItem(
          "seenList",
          JSON.stringify([...state, action.payload])
        );
        return [...state, action.payload];
      } else return state;
    },
    removeSeenList: (state, action) => {
      const data = state.filter((st) => st._id !== action.payload);
      // cookie.save("seenList", data);
      localStorage.setItem("seenList", JSON.stringify(data));
      return data;
    },
  },
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
});

const { reducer, actions } = seenList;
export default reducer;
<<<<<<< HEAD
export const { addSeenList, removeSeenList } = actions;
=======
export const { addSeenList, removeSeenList, setSeenList } = actions;
>>>>>>> 12151109bb075c8d4b026b60e28237c5eb614e1f
