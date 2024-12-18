import React from "react";
import Cart from "../../src/features/cart/Cart.tsx";
import Products from "../../src/features/product/Products.tsx";

const ProductsContainer: React.FC = () => {
  // Get user
  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] pr-20 pb-20 overflow-y-scroll">
      <Products />
      <div
        className="hidden lg:block"
        style={{ marginTop: storedUser?.role ? "54px" : undefined }}
      >
        <Cart />
      </div>
    </div>
  );
};

export default ProductsContainer;
