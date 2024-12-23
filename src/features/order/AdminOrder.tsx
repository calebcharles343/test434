import React, { useState } from "react";
import { OrderType, OrderItemType } from "../../interfaces";
import OrderItem from "./OrderItem";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";
import { useDeleteOrder } from "./useDeleteOrder";

interface OrderProps {
  order: OrderType;
}

const AdminOrder: React.FC<OrderProps> = ({ order }) => {
  const [status, setStatus] = useState(order.status);

  const { updateOrderStatus, isPending } = useUpdateOrderStatus(order.id);
  const { deleteOrder, isDeletingOrder } = useDeleteOrder();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    updateOrderStatus({ status: newStatus });
  };

  return (
    <div
      className={`w-full md:w-[500px] border-l-8 border-[#FFA82B] p-4 rounded-lg mb-4 bg-gray-100 shadow-lg ${
        order.status === "pending" && "border-[#FFA82B]"
      } ${order.status === "cancelled" && "border-red-500"} ${
        order.status === "completed" && "border-green-500"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base font-semibold">
              Order ID: {order.id}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-base font-semibold">
                User: {order.User?.name}
              </p>

              <button
                className="text-xs text-gray-50 bg-red-500 px-2 rounded-md"
                onClick={() => deleteOrder(order.id)}
                disabled={isDeletingOrder}
              >
                X
              </button>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700 mt-2">
            Total Price: {order.totalPrice}
          </p>
          <div className="text-xs md:text-sm text-blue-500 font-bold mt-1">
            Items:
            <ul className="mt-2">
              {order.Items.map((item: OrderItemType) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <label htmlFor={`status-${order.id}`} className="mr-2">
              Status:
            </label>
            <select
              id={`status-${order.id}`}
              value={status}
              onChange={handleStatusChange}
              className="border p-1 rounded"
              disabled={isPending}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
