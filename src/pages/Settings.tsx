import React from "react";
import UpdateUserForm from "../features/user/UpdateUserForm";

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col items-center overflow-y-scroll py-8">
      <h1>SETTINGS</h1>
      <UpdateUserForm />
    </div>
  );
};

export default Settings;
