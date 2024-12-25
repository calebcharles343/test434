import React from "react";
import Orders from "../features/order/Orders";
import { localStorageUser } from "../utils/localStorageUser";
import AdminOrders from "../features/order/AdminOrders";

const Oders: React.FC = () => {
  const localStorageUserX = localStorageUser();

  return (
    <div className="pb-20">
      {localStorageUserX.role !== "Admin" ? <Orders /> : <AdminOrders />}
    </div>
  );
};

export default Oders;
