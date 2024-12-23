import React, { useEffect } from "react";
import { OrderType } from "../../interfaces";
import Order from "./Order";
import { useOrders } from "./useFetchOrders";
import { localStorageUser } from "../../utils/localStorageUser";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const localStorageUserX = localStorageUser();

  const {
    data: freshOrder,
    refetch: refetchOrders,
    // isLoading,
  } = useOrders(localStorageUserX.id);

  // const { data: adminOrders } = useAdminOrders();

  console.log(freshOrder);

  useEffect(() => {
    refetchOrders();
  }, [refetchOrders]);

  const mainOrders = freshOrder?.data || localStorageUserX.Orders;

  if (mainOrders.length === 0)
    return (
      <div className="text-lg text-center pt-8">
        You have no orders! Please explore our{" "}
        <span className="text-xl font-bold text-[#FFA82B] hover:underline">
          <Link to={"/home"}>store </Link>
        </span>
      </div>
    );

  return (
    // <div></div>
    <div className="flex flex-col items-center">
      {mainOrders.map((order: OrderType) => (
        <Order key={order.id} order={order} refetchOrders={refetchOrders} />
      ))}
    </div>
  );
};

export default Orders;
