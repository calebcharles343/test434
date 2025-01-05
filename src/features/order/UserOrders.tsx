import React, { useEffect, useState } from "react";
import { OrderType } from "../../interfaces";
import { useFetchOrders } from "./useFetchOrders";
import { Link } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import UserOrder from "./UserOrder";
import { format, parseISO } from "date-fns";
import DatePicker from "react-datepicker";

const UserOrders: React.FC = () => {
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);

  const {
    data: orders,
    refetch: refetchOrders,
    isLoading: isLoadingOrders,
  } = useFetchOrders();

  useEffect(() => {
    if (orders?.data) {
      const filtered = orders.data
        .filter(
          (order: OrderType) =>
            !searchDate ||
            format(parseISO(order.createdAt), "yyyy-MM-dd") ===
              format(searchDate, "yyyy-MM-dd")
        )
        .sort(
          (a: OrderType, b: OrderType) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setFilteredOrders(filtered);
    }
  }, [searchDate, orders?.data]);

  const mainOrders = filteredOrders || [];

  if (isLoadingOrders) {
    return (
      <div className="relative flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm w-full h-full">
        <SpinnerMini />
      </div>
    );
  }

  if (orders?.data?.length < 1) {
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
    <div className="flex flex-col items-center py-8 gap-4">
      <div className="flex flex-col text-sm items-center w-full max-w-[140px]">
        <DatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 text-center border border-gray-500 rounded-md"
          placeholderText="Date (yyyy-mm-dd)"
        />
      </div>

      {mainOrders.map((order: OrderType) => (
        <UserOrder key={order.id} order={order} refetchOrders={refetchOrders} />
      ))}
    </div>
  );
};

export default UserOrders;
