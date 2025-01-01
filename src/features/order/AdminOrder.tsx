import React, { useState } from "react";
import { OrderType, OrderItemType } from "../../interfaces";
import OrderItem from "./OrderItem";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";
import { useDeleteOrder } from "./useDeleteOrder";
import { dateformat } from "../../utils/dateFormat";

interface OrderProps {
  order: OrderType;
}

const AdminOrder: React.FC<OrderProps> = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const [isError, setIsError] = useState(false);

  const { updateOrderStatus, isPending } = useUpdateOrderStatus(order.id);
  const { deleteOrder, isDeletingOrder } = useDeleteOrder();

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;

    // Optimistically update the UI
    setStatus(newStatus);
    setIsError(false);

    try {
      updateOrderStatus({ status: newStatus });
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert the status if the API call fails
      setStatus(order.status);
      setIsError(true);
    }
  };

  const handleDeleteOrder = async () => {
    setIsError(false);

    try {
      await deleteOrder(order.id);
    } catch (error) {
      console.error("Failed to delete order:", error);
      setIsError(true);
    }
  };

  return (
    <div
      className={`relative w-full md:w-[500px] border-l-8 p-4 rounded-lg mb-4 bg-white shadow-lg ${
        status === "pending" ? "border-[#FFA82B]" : ""
      } ${status === "cancelled" ? "border-red-500" : ""} ${
        status === "completed" ? "border-green-500" : ""
      }`}
    >
      <button
        className="absolute top-2 right-2 text-xs text-gray-50 bg-red-500 px-2 rounded-md"
        onClick={handleDeleteOrder}
        disabled={isDeletingOrder}
      >
        {isDeletingOrder ? "Deleting..." : "X"}
      </button>
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row items-center justify-between pt-2">
            <p className="text-sm md:text-base font-semibold">
              Order ID: {order.id}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-base font-semibold">
                User: {order.User?.email || "Unknown"}
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700 mt-2">
            Total Price: ${order.totalPrice}
          </p>
          <div className="text-xs md:text-sm text-blue-500 font-bold mt-1">
            Items:
            <ul className="mt-2">
              {order.Items?.map((item: OrderItemType) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <label
                htmlFor={`status-${order.id}`}
                className="text-sm md:text-base mr-2"
              >
                Status:
              </label>
              <select
                id={`status-${order.id}`}
                value={status}
                onChange={handleStatusChange}
                className="text-xs md:text-sm border p-1 rounded"
                disabled={isPending}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <span className="text-[9px] md:text-base">
              {dateformat(order.createdAt)}
            </span>
          </div>
        </div>
      </div>
      {isError && (
        <div className="text-red-500 text-sm mt-2">
          An error occurred. Please try again.
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
