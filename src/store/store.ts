import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.ts";
import modalReducer from "./modalSlice.ts"; // Import the modal slice
import productsReducer from "./productsSlice.ts"; // Import the modal slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    products: productsReducer, // Add modal reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
