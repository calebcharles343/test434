import { OrderType } from "../../interfaces";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import OrderItem from "./OrderItem";
import { useCancelOrder } from "./useCancelOrder";

interface OrderProps {
  order: OrderType;
  refetchOrders: () => void;
}

const Order: React.FC<OrderProps> = ({ order, refetchOrders }) => {
  // const localStorageUserX = localStorageUser();

  const { cancelOrder, isPending } = useCancelOrder(order.id);

  const handleCancelOrder = () => {
    cancelOrder({ status: "cancelled" });
    refetchOrders();
  };

  return (
    // <div className={`w-full md:w-[500px] border-l-8 border-[#FFA82B] p-4 rounded-lg mb-4   bg-gray-100 shadow-lg`}>
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
            <p className="text-sm  md:text-base font-semibold">
              Order ID: {order.id}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm  md:text-base font-semibold">
                Status:{" "}
                <span
                  className={`text-xs text-center text-gray-50 px-2 py-1 rounded-lg ${
                    order.status === "pending" && "bg-yellow-500"
                  } ${order.status === "cancelled" && "bg-red-500"} ${
                    order.status === "completed" && "bg-green-500"
                  }`}
                >
                  {capitalizeFirstLetter(order.status)}
                </span>
              </p>

              <button
                className="text-xs text-gray-50 bg-red-500 px-2 rounded-md"
                onClick={handleCancelOrder}
                disabled={isPending}
              >
                X
              </button>
            </div>
          </div>
          <p className="text-xs md:text-base text-gray-700 mt-2">
            Total Price: {order.totalPrice}
          </p>
          <div className=" text-xs md:text-sm  font-bold mt-1">
            <p className="text-blue-500">Items:</p>
            <ul className="mt-2">
              {order.Items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
