import React from "react";
import { UserType } from "../../interfaces";

interface ActiveUserProps {
  user: UserType;
}

const User: React.FC<ActiveUserProps> = ({ user }) => {
  return (
    <div className="min-w-[280px] p-4 bg-white border rounded-lg shadow-md">
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
      <div className="flex flex-col mt-4 text-sm text-gray-700 gap-2">
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
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
      </div>
    </div>
  );
};

export default User;
