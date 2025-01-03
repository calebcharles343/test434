import React, { useState, useEffect } from "react";
import { useAdminOrders } from "./useFetchAdminOrders";
import SpinnerMini from "../../ui/SpinnerMini";
import { OrderType } from "../../interfaces";
import AdminOrder from "./AdminOrder";
import Table from "../../ui/Table";
import TableModal from "../../ui/TableModal";
import { format, parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminOrders: React.FC = () => {
  const { data: adminOrders, isLoading } = useAdminOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [searchId, setSearchId] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (adminOrders?.data) {
      const filtered = adminOrders.data
        .filter(
          (order: OrderType) =>
            (!searchDate ||
              format(parseISO(order.createdAt), "yyyy-MM-dd") ===
                format(searchDate, "yyyy-MM-dd")) &&
            order.id.toString().includes(searchId) &&
            (order.User?.email || "")
              .toLowerCase()
              .includes(searchEmail.toLowerCase())
        )
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setFilteredOrders(filtered);
    }
  }, [searchDate, searchId, searchEmail, adminOrders]);

  const handleViewClick = (order: OrderType) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <SpinnerMini />
      </div>
    );
  }

  if (!adminOrders?.data?.length) {
    return (
      <div className="text-lg text-center pt-8">You have no orders yet!</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full max-w-[218px] mb-4">
        <DatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded-md"
          placeholderText="Date (yyyy-mm-dd)"
        />
      </div>

      <div className="flex flex-col gap-0 md:flex-row md:gap-4">
        <div className="w-full max-w-[218px] mb-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Search by Order ID"
          />
        </div>

        <div className="w-full max-w-[218px] mb-4">
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Search by Email"
          />
        </div>
      </div>

      <Table columns="1fr 2fr 1fr 1fr">
        <Table.Header>
          <div className="text-[14px] md:text-base">ID</div>
          <div className="text-[12px] md:text-base">Email</div>
          <div className="text-[12px] md:text-base">Date</div>
          <div className="text-[12px] md:text-base">Actions</div>
        </Table.Header>

        <Table.Body
          data={filteredOrders}
          render={(order: OrderType) => (
            <Table.Row key={order.id}>
              <div
                className={`flex items-center justify-center text-[12px] md:text-base font-bold text-center ${
                  order.status === "pending" ? "bg-[#FFA82B]" : ""
                } ${order.status === "cancelled" ? "bg-red-500" : ""} ${
                  order.status === "completed" ? "bg-green-500" : ""
                } min-w-8`}
              >
                {order.id}
              </div>
              <div className="text-[10px] md:text-base">
                {order.User?.email || "Unknown"}
              </div>
              <div className="text-[8px] md:text-base">
                {format(new Date(order.createdAt), "yyyy-MM-dd")}
              </div>
              <div>
                <button
                  className="text-[8px] md:text-sm text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 px-1 md:px-2 py-1 rounded-md"
                  type="button"
                  onClick={() => handleViewClick(order)}
                >
                  View
                </button>
              </div>
            </Table.Row>
          )}
        />
      </Table>

      {/* Modal for viewing the selected order */}
      {selectedOrder && (
        <TableModal onClose={handleCloseModal}>
          <AdminOrder
            order={selectedOrder}
            handleCloseModal={handleCloseModal}
          />
        </TableModal>
      )}
    </div>
  );
};

export default AdminOrders;
