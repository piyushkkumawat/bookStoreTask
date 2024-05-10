import { createSlice } from "@reduxjs/toolkit";

const singalOrderSlice = createSlice({
  name: "singalOrderSlice",
  initialState: {
    products: [],
    address: "",
    totalAmount: 0,
    name: "",
    mobile: "",
  },
  reducers: {
    handleAddress: (state, action) => {
      state.address = action.payload;
    },
    handleAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    handleName: (state, action) => {
      state.name = action.payload;
    },
    handleMobile: (state, action) => {
      state.mobile = action.payload;
    },
    handleProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === newProduct._id
      );

      if (existingProductIndex === -1) {
        state.products.push(newProduct);
      } else {
        state.products[existingProductIndex].quantity = newProduct.quantity;
      }
    },
    handleResetState: (state) => {
      return {
        products: [],
        address: "",
        totalAmount: 0,
        name: "",
        mobile: "",
      };
    },
  },
});

export const {
  handleAddress,
  handleAmount,
  handleName,
  handleProduct,
  handleMobile,
  handleResetState,
} = singalOrderSlice.actions;
export default singalOrderSlice.reducer;
