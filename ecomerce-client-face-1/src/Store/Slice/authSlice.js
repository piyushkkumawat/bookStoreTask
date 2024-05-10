import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginapi, signupapi } from "../../utils/api";

export const signup = createAsyncThunk("signupapi", async (userdate) => {
  try {
    const { data } = await axios.post(signupapi, userdate);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});
export const login = createAsyncThunk("loginapi", async (userdate) => {
  try {
    const { data } = await axios.post(loginapi, userdate);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
});

export const clearError = createAction("authSlice/clearError");
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    user: null,
    error: null,
    access_token: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.access_token = action.payload.access_token;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearError, (state) => {
        state.error = null;
        state.success = null;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
