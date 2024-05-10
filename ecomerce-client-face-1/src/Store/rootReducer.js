import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice.js";
import authSlice from "./Slice/authSlice.js";
import productSlice from "./Slice/productSlice.js";
import productDetailsSlice from "./Slice/productDetailsSlice.js";
import cartSlice from "./Slice/cartSlice.js";
import navSlice from "./Slice/navSlice.js";
import adminproductSlice from "./Slice/adminproductSlice.js";
import adminUpdateSlice from "./Slice/adminUpdateSlice.js";
import orderSlice from "./Slice/orderSlice.js";
import singalOrderStateSlice from "./Slice/singalOrderStateSlice.js";

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  product: productSlice,
  productdetails: productDetailsSlice,
  cart: cartSlice,
  nav: navSlice,
  adminproduct: adminproductSlice,
  adminupdate: adminUpdateSlice,
  order: orderSlice,
  singalOrder: singalOrderStateSlice,
});
export default rootReducer;
