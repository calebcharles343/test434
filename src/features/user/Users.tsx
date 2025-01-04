import React, { useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import SpinnerMini from "../../ui/SpinnerMini";
import { UserType } from "../../interfaces";
import Table from "../../ui/Table";
import TableModal from "../../ui/TableModal";
import User from "./User";

const Users: React.FC = () => {
  const { data: users, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (users?.data) {
      const term = searchTerm.toLowerCase();
      const filtered = users.data.filter(
        (user: UserType) =>
          user.id.toString().includes(term) ||
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleViewClick = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <SpinnerMini />
      </div>
    );
  }

  if (!users?.data?.length) {
    return (
      <div className="text-lg text-center pt-8">You have no users yet!</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="w-full max-w-[175px] mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-md placeholder:text-sm"
          placeholder="ID, Name, Email, or Role?"
        />
      </div>

      <Table columns="1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div className="text-[14px] md:text-base">ID</div>
          <div className="text-[12px] md:text-base">Name</div>
          <div className="text-[12px] md:text-base">Role</div>
          <div className="text-[12px] md:text-base">Actions</div>
        </Table.Header>
        <Table.Body
          data={filteredUsers}
          render={(user: UserType) => (
            <Table.Row key={user.id}>
              {/* User ID */}
              <div
                className={`text-[12px] md:text-base font-bold text-center 
               
                ${user.active === false ? "bg-red-500" : ""} ${
                  user.active === true ? "bg-green-500" : ""
                }`}
              >
                {user.id}
              </div>

              <div className="text-[10px] md:text-base">{user.name}</div>

              <div className="text-[10px] md:text-base">{user.role}</div>

              <div className="flex justify-center">
                <button
                  className="text-[10px] md:text-sm text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 px-1 md:px-2 py-1 rounded-md"
                  type="button"
                  onClick={() => handleViewClick(user)}
                >
                  View
                </button>
              </div>
            </Table.Row>
          )}
        />
      </Table>

      {selectedUser && (
        <TableModal onClose={handleCloseModal}>
          <div className="mt-2">
            <User user={selectedUser} />
          </div>
        </TableModal>
      )}
    </div>
  );
};

export default Users;
