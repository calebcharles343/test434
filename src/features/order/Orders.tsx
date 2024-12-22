import React, { useEffect } from "react";
import { OrderType } from "../../interfaces";
import Order from "./Order";
import { useOrders } from "./useFetchOrders";
import { localStorageUser } from "../../utils/localStorageUser";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const localStorageUserX = localStorageUser();

  const {
    // data: freshOrder,
    refetch: refetchOrders,
    // isLoading,
  } = useOrders(localStorageUserX.id);

  useEffect(() => {
    refetchOrders();
  }, [refetchOrders]);

  console.log(localStorageUserX.Orders);

  if (localStorageUserX.Orders.length === 0)
    return (
      <div className="text-center pt-8">
        No orders! Please explore our{" "}
        <span className="text-[]">
          <Link to={"/home"}>store </Link>
        </span>
      </div>
    );

  return (
    // <div></div>
    <div className="flex flex-col items-center">
      {localStorageUserX.Orders.map((order: OrderType) => (
        <Order key={order.id} order={order} refetchOrders={refetchOrders} />
      ))}
    </div>
  );
};

export default Orders;
