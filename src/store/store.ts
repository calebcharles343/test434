import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.ts";
import modalReducer from "./modalSlice.ts"; // Import the modal slice
import productsReducer from "./productsSlice.ts"; // Import the modal slice
import SearchBarReducer from "./searchBarSlice.ts"; // Import the modal slice
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    modal: modalReducer,
    products: productsReducer,
    SearchBarQuery: SearchBarReducer, // Add modal reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
