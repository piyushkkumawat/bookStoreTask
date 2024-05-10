import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getallproduct } from "../../utils/api";
import Cookies from "js-cookie";
export const getproducts = createAsyncThunk("getallproductapi", async () => {
  try {
    const access_token = Cookies.get("access_token");
    const { data } = await axios.get(getallproduct, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});
export const clearError = createAction("productSlice/clearError");
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    loading: false,
    product: [],
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
      });
  },
});
export default productSlice.reducer;
