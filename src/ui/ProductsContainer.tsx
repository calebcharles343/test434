import React from "react";
import Cart from "../../src/features/cart/Cart.tsx";
import Products from "../../src/features/product/Products.tsx";
import { localStorageUser } from "../utils/localStorageUser.ts";

const ProductsContainer: React.FC = () => {
  const localStorageUserX = localStorageUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] pr-20 pb-20 overflow-y-scroll">
      <Products />
      <div
        className="hidden lg:block"
        style={{ marginTop: localStorageUserX?.role ? "54px" : undefined }}
      >
        <Cart />
      </div>
    </div>
  );
};

export default ProductsContainer;
