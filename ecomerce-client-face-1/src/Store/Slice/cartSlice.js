import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {
  _removetoCart,
  _updateQuantity,
  addtoCartproductapi,
  getCartproductapi,
} from "../../utils/api";

export const getCartproduct = createAsyncThunk(
  "getallproductapi/cartSlice",
  async () => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.get(getCartproductapi, {
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
export const addtoCartproduct = createAsyncThunk(
  "addtoCartproduct/cartSlice",
  async (id) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.post(
        addtoCartproductapi,
        { productId: id, quantity: "1" },
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

export const removeFromCart = createAsyncThunk(
  "removecard/cartSlice",
  async (id) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.delete(`${_removetoCart}/${id}`, {
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

export const updateQuantityApi = createAsyncThunk(
  "updateQuantity/cartSlice",
  async ({ productId, quantity }) => {
    try {
      const access_token = Cookies.get("access_token");
      const { data } = await axios.patch(
        `${_updateQuantity}/${productId}`,
        { newQuantity: quantity },
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

export const clearError = createAction("getallproductapi/clearError");

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    loading: false,
    isOpen: false,
    cartItems: [],
    totalPrice: 0,
    error: null,
    success: null,
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    handletotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },

    addtoCart: (state, action) => {
      const newItem = action.payload;
      const { _id } = newItem;
      const existingItem = state.cartItems?.find((item) => item._id === _id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        if (state.cartItems?.length > 0) {
          state.cartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
        } else {
          state.cartItems = [{ ...newItem, quantity: 1 }];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartproduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data.items;
        state.success = action.payload.message;
      })
      .addCase(getCartproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addtoCartproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addtoCartproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(addtoCartproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data.items;
        state.success = action.payload.message;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantityApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantityApi.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data.items;
        state.success = action.payload.message;
      })
      .addCase(updateQuantityApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
      });
  },
});
export const { openCart, closeCart, addtoCart, handletotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
