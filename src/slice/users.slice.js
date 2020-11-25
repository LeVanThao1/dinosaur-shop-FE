import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
});

const { reducer, actions } = users;
export default reducer;
export const { setUserAuth, setToken } = actions;
