import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getallproductDetails } from "../../utils/api";
export const getproductDetais = createAsyncThunk(
  "productDetailsapi",
  async (id) => {
    try {
      const { data } = await axios.get(`${getallproductDetails}/${id}`);
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

export const clearError = createAction("productDetailsSlice/clearError");

const productDetailsSlice = createSlice({
  name: "productDetailsSlice",
  initialState: {
    loading: false,
    product: {},
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproductDetais.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getproductDetais.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(getproductDetais.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
      });
  },
});

export default productDetailsSlice.reducer;
