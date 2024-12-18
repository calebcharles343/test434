import React from "react";
import Cart from "../features/cart/Cart.tsx";

const CartPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mid:w-[400px] lg:w-[600px]">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
