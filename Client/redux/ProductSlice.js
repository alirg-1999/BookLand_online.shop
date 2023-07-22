import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProductApi } from "@/pages/api/serverApi";

export const All_Products = createAsyncThunk("/all-product", async () => {
  const res = await GetAllProductApi();
  return res.data;
});

const initialState = {
  products: [],
  bestBook: [],
  newBook: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    GetBestBookHandler: (state, action) => {
      state.bestBook = action.payload;
    },
    SetCategory: (state, action) => {
      state.products = action.payload;
    },

    SearchHandler: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(All_Products.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(All_Products.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.newBook = action.payload.slice(0, 5);
      })
      .addCase(All_Products.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { GetBestBookHandler, SetCategory, SearchHandler } =
  productSlice.actions;
export default productSlice.reducer;
