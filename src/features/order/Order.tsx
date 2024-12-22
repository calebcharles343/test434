import { OrderType } from "../../interfaces";
import OrderItem from "./OrderItem";
import { localStorageUser } from "../../utils/localStorageUser";

interface OrderProps {
  order: OrderType;
  refetchOrders: () => void;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const localStorageUserX = localStorageUser();

  console.log(order.Items);

  return (
    // <div className={`w-full md:w-[500px] border-l-8 border-[#FFA82B] p-4 rounded-lg mb-4   bg-gray-100 shadow-lg`}>
    <div
      className={`w-full md:w-[500px] border-l-8 border-[#FFA82B] p-4 rounded-lg mb-4 bg-gray-100 shadow-lg ${
        order.status === "pending" && "border-[#FFA82B]"
      } ${order.status === "canceled" && "border-red-500"} ${
        order.status === "completed" && "border-green-500"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold">Order ID: {order.id}</p>
            <p className="text-base font-semibold">
              Status:{" "}
              <span
                className={`text-center text-gray-50 px-2 py-1 rounded-lg ${
                  order.status === "pending" && "bg-yellow-500"
                } ${order.status === "canceled" && "bg-red-500"} ${
                  order.status === "completed" && "bg-green-500"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
          <p className="text-gray-700 mt-2">Total Price: {order.totalPrice}</p>
          <div className="text-sm  font-bold mt-1">
            <p className="text-blue-500">Items:</p>
            <ul className="mt-2">
              {order.Items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {localStorageUserX.role === "Admin" && (
        <button
          type="submit"
          className="p-2 text-xs bg-blue-500 text-white rounded-lg"
        >
          Change Status
        </button>
      )}
    </div>
  );
};

export default Order;
