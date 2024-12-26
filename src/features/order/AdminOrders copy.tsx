import React from "react";
// import { useFetchAdminOrders } from "./useFetchAdminOrders";
import AdminOrder from "./AdminOrder";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAdminOrders } from "./hooks/useOrders";

const AdminOrders: React.FC = () => {
  const { data: adminOrders, isLoading, isError } = useAdminOrders();
  /*
  const {
    data: adminOrders,
    isLoading: isLoadingAdminOrders,
    isError: isErrorAdminOrders,
  } = useAdminOrders();

*/
  console.log(adminOrders, "❌❌❌❌");

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        role="status"
        aria-label="Loading orders"
      >
        <SpinnerMini />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-lg text-center pt-8 text-red-500">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  if (!adminOrders?.data?.length) {
    return <EmptyState message="You have no orders yet!" />;
  }

  return (
    <div className="flex flex-col items-center">
      {adminOrders.data.map((order: any) => (
        <AdminOrder key={order.id} order={order} />
      ))}
    </div>
  );
};

// Reusable Empty State Component
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-lg text-center pt-8 text-gray-500">{message}</div>
);

export default AdminOrders;
