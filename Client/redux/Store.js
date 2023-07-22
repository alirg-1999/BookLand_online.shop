import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./Authslice";
import ProductSlice from "./ProductSlice";
import OrderSlice from "./OrderSlice";

const store = configureStore({
  reducer: {
    auth: Authslice,
    product: ProductSlice,
    order: OrderSlice,
  },
});

export default store;
