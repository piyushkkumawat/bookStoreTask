import { createSlice } from "@reduxjs/toolkit";
const navSlice = createSlice({
  name: "navSlice",
  initialState: {
    isnavOpen: false,
  },
  reducers: {
    navOpen: (state) => {
      state.isnavOpen = true;
    },
    navClose: (state) => {
      state.isnavOpen = false;
    },
  },
});
export const { navOpen, navClose } = navSlice.actions;
export default navSlice.reducer;
