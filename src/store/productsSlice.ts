import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../interfaces.ts";

// Explicitly type the state structure
interface ProductsState {
  products: ProductType[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set the entire products array
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    // Add a single product
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
    },
    // Update a specific product by ID
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    // Remove a product by ID
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (p) => (p.id as number) !== Number(action.payload)
      );
    },
  },
});

// Export actions and reducer
export const { setProducts, addProduct, updateProduct, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
