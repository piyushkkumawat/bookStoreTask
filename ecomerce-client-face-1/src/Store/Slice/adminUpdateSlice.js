import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { updateproductapipath } from "../../utils/api";
export const updateproductapi = createAsyncThunk(
  "products/updateProduct",
  async ({ productdata, id }) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.patch(
        `${updateproductapipath}/${id}`,
        productdata,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  }
);
export const clearError = createAction("updateproductSlice/clearError");

const updateproduct = createSlice({
  name: "updateSlice",
  initialState: {
    loading: false,
    product: {},
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateproductapi.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateproductapi.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(updateproductapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
      });
  },
});
export default updateproduct.reducer;
