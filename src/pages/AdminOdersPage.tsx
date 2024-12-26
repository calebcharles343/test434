import { localStorageUser } from "../utils/localStorageUser";
import AdminOrders from "../features/order/AdminOrders";
import { useUser } from "../features/authentication/useUser";

const AdminOrdersPage: React.FC = () => {
  const localStorageUserX = localStorageUser();

  const { data: user } = useUser(localStorageUserX?.id);

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
