import { GetOrderPendingCart } from "@/pages/api/serverApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const PendingCartApi = createAsyncThunk(
  "/order-pending",
  async (user_id, token) => {
    const response = await GetOrderPendingCart(user_id, token);
    return response.data;
  }
);

const initialState = {
  loading: false,
  error: null,
  pendingCart: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(PendingCartApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PendingCartApi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pendingCart = action.payload;
      })

      .addCase(PendingCartApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
