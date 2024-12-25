import React from "react";
import { OrderItemType } from "../../interfaces";

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <li className="flex justify-between items-center border-b py-2 shadow-sm">
      <span>{item.Product.name}</span>
      <span>Quantity: {item.quantity}</span>
      <div>
        <span>Price: $</span>
        <span className="text-green-700">{item.pricePerItem}</span>
      </div>
    </li>
  );
};

export default OrderItem;
