import { createSlice } from "@reduxjs/toolkit";

const photo = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLogged: false,
    token: "",
  },
  reducers: {
    setUserAuth: (state, action) => {
      const infor = action.payload;
      return { ...state, user: infor.user, isLogged: infor.isLogged };
    },
    // logout: (state, action) => {
    //   return { user: {}, isLogged: false };
    // },
    setToken: (state, action) => {
      console.log(action.payload);
      const token = action.payload;
      return { ...state, token };
    },
  },
});

const { reducer, actions } = photo;
export default reducer;
export const { setUserAuth, setToken } = actions;
