import React, { useState } from "react";
import { UserType } from "../../interfaces";
import { useUpdateUserRole } from "./useUpdateUserRole";

interface ActiveUserProps {
  user: UserType;
}

const User: React.FC<ActiveUserProps> = ({ user }) => {
  const [role, setRole] = useState(user.role);

  const { UpdateUserRole, isPending } = useUpdateUserRole(user.id);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRole = e.target.value;
    setRole(newRole);

    UpdateUserRole({ role: newRole });

    setRole(user.role);
  };

  return (
    <div className="min-w-[280px] p-4 bg-white border rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
        </div>

        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-700 gap-2">
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`text-center px-2 py-1 rounded-full text-xs ${
              user.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.active ? "Active" : "Inactive"}
          </span>
        </p>

        <div>
          <label
            htmlFor={`status-${user.id}`}
            className="text-sm md:text-base mr-2"
          >
            Role:
          </label>

          <select
            id={`status-${user.id}`}
            value={role}
            onChange={handleStatusChange}
            className="text-xs md:text-sm border p-1 rounded"
            disabled={isPending}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default User;
