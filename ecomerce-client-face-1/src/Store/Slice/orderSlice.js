import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { _createorderapi, _createsingaleorderapi } from "../../utils/api";

export const createOrder = createAsyncThunk(
  "createorderapi/orderSlice",
  async (order) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.post(_createorderapi, order, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.datae;
      } else {
        throw error;
      }
    }
  }
);
export const createSingaleOrder = createAsyncThunk(
  "createSingaleOrder/orderSlice",
  async (order) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.post(_createsingaleorderapi, order, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.datae;
      } else {
        throw error;
      }
    }
  }
);

export const clearError = createAction("orderSlice/cleaeError");
const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    loading: false,
    orders: [],
    isSingle: false,
    error: null,
    success: null,
  },
  reducers: {
    handleSingleOrder: (state) => {
      state.isSingle = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSingaleOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSingaleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(createSingaleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
        state.isSingle = false;
      });
  },
});

export const { handleSingleOrder } = orderSlice.actions;
export default orderSlice.reducer;
