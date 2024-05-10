import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createproduct, deleteproduct, getallproduct } from "../../utils/api";
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
export const createproductapi = createAsyncThunk(
  "createproductapi",
  async (myForm) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.post(createproduct, myForm, {
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
  }
);
export const deleteproductapi = createAsyncThunk(
  "deleteproductapi",
  async (id) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.delete(`${deleteproduct}/${id}`, {
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
  }
);
export const clearError = createAction("adminproductSlice/clearError");

const adminproductSlice = createSlice({
  name: "adminproductSlice",
  initialState: {
    loading: false,
    product: [],
    error: null,
    success: null,
    isdeleted: null,
  },
  reducers: {
    handledeleteProduct: (state, action) => {
      state.product = state.product.filter(
        (item) => item._id !== action.payload
      );
    },
  },
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
      .addCase(createproductapi.pending, (state) => {
        state.loading = true;
      })
      .addCase(createproductapi.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(createproductapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteproductapi.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteproductapi.fulfilled, (state, action) => {
        state.loading = false;
        state.isdeleted = action.payload.message;
      })
      .addCase(deleteproductapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
        state.isdeleted = null;
      });
  },
});

export const { handledeleteProduct } = adminproductSlice.actions;
export default adminproductSlice.reducer;
