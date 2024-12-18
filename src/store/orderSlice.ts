// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderType, OrderItemType } from "../interfaces.ts";

const initialState: OrderType = {
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<OrderItemType>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity =
          Number(existingItem.quantity) + Number(action.payload.quantity);
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = orderSlice.actions;
export default orderSlice.reducer;
