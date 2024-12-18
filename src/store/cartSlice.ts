import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType, ItemType } from "../interfaces.ts";

interface CartState extends CartType {
  isCartNotEmpty: boolean;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  isCartNotEmpty: false,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (action.payload.quantity === 0) {
        alert("Quantity cannot be zero.");
        return;
      }

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          totalPrice: action.payload.quantity * action.payload.price,
        });
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice!,
        0
      );
      state.isCartNotEmpty = state.items.length > 0;
    },

    removeItem: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );

      // Recalculate cart-level totalPrice
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice!,
        0
      );
      state.isCartNotEmpty = state.items.length > 0;
    },

    clearCart: (state) => {
      state.items = [];
      state.isCartNotEmpty = false;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
