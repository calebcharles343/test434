import React from "react";
import { BiCart } from "react-icons/bi"; // Import the cart icon

type CartIconProps = {
  length: number; // Number of items in the cart
};

const CartIcon: React.FC<CartIconProps> = ({ length }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {/* Cart Icon */}
      <BiCart
        className="mr-2"
        style={{
          fontSize: "24px",
          color: "#333",
        }}
      />

      {/* Counter Badge */}
      {length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "red",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "50%",
            padding: "2px 6px",
            minWidth: "20px",
            textAlign: "center",
          }}
        >
          {length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
