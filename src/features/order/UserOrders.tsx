import React from "react";
import { OrderType } from "../../interfaces";
import { useFetchOrders } from "./useFetchOrders";
// import { localStorageUser } from "../../utils/localStorageUser";
import { Link } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import UserOrder from "./UserOrder";
import { sessionStorageUser } from "../../utils/sessionStorageUser";
// import { useOrders } from "./hooks/useOrders";

const UserOrders: React.FC = () => {
  const sessionStorageUserX = sessionStorageUser();

  const { orders, refetchOrders, isLoadingOrders } = useFetchOrders(
    sessionStorageUserX?.id
  );

  // In UserOrders.tsx
  // const {
  //   data: orders,
  //   isLoading,
  //   refetch: refetchOrders,
  // } = useOrders(sessionStorageUserX.id);
  // sessionStorageUserX?.id;

  // const { data: orders, isLoading } = useOrders(sessionStorageUserX?.id);

  // Ensure we have a valid list of orders
  const mainOrders = orders?.data || [];

  if (isLoadingOrders) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <SpinnerMini />
      </div>
    );
  }

  if (mainOrders.length === 0) {
    return (
      <div className="text-lg text-center pt-8">
        You have no orders! Please explore our{" "}
        <span className="text-xl font-bold text-[#FFA82B] hover:underline">
          <Link to="/home">store</Link>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {mainOrders.map((order: OrderType) => (
        <UserOrder key={order.id} order={order} refetchOrders={refetchOrders} />
      ))}
    </div>
  );
};

export default UserOrders;
