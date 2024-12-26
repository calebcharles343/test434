import { localStorageUser } from "../utils/localStorageUser";
import UserOrders from "../features/order/UserOrders";
import { useUser } from "../features/authentication/useUser";

const OrdersPage: React.FC = () => {
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
      <UserOrders />
    </div>
  );
};

export default OrdersPage;
