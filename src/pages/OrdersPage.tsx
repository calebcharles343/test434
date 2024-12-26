import UserOrders from "../features/order/UserOrders";
import { useUser } from "../features/authentication/useUser";
import { sessionStorageUser } from "../utils/sessionStorageUser";

const OrdersPage: React.FC = () => {
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
      <UserOrders />
    </div>
  );
};

export default OrdersPage;
