import AdminOrders from "../features/order/AdminOrders";
import { useUser } from "../features/users/useUser";
import { sessionStorageUser } from "../utils/sessionStorageUser";

const AdminOrdersPage: React.FC = () => {
  const sessionStorageUserX = sessionStorageUser();

  const { data: user } = useUser(sessionStorageUserX?.id);

  if (!user) {
    return (
      <div className="pb-20">
        <p className="text-center text-gray-500">
          You must be logged in to view orders.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;
