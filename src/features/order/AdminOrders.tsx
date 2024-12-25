import React from "react";
import { useAdminOrders } from "./useFetchAdminOrders";
import AdminOrder from "./AdminOrder";
import SpinnerMini from "../../ui/SpinnerMini";

const AdminOrders: React.FC = () => {
  const { data: adminOrders, isLoading } = useAdminOrders();

  // console.log(adminOrders);

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <SpinnerMini />;
      </div>
    );
  if (adminOrders?.data.length === 0)
    return (
      <div className="text-lg text-center pt-8">You have no orders yet!</div>
    );

  return (
    // <></>
    <div className="flex flex-col items-center">
      {adminOrders?.data.map((order) => (
        <AdminOrder
          key={order.id}
          order={order}
          // onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default AdminOrders;
