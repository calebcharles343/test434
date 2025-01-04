import React from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUserNameForm from "./UpdateUserNameForm";
import { useCloseAccount } from "./useCloseAccount";

const UpdateUserForm: React.FC = () => {
  const { closeAccount, isPending } = useCloseAccount();

  const handleCloseAccount = async () => {
    const confirmClose = window.confirm(
      "Are you sure you want to close your account?"
    );
    if (confirmClose) {
      closeAccount();
    }
  };

  return (
    <div className="w-full">
      <UpdateUserNameForm />
      <UpdatePasswordForm />

      <div className="flex flex-col items-center w-full gap-2 mt-8">
        <h2 className="text-lg font-extrabold">Close Account</h2>
        <button
          className="text-white font-bold bg-red-500 px-4 py-1"
          onClick={handleCloseAccount}
        >
          {isPending ? <SpinnerMini /> : "Close"}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserForm;
