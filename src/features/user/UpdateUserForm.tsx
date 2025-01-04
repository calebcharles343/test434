import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUserNameForm from "./UpdateUserNameForm";

const UpdateUserForm: React.FC = () => {
  return (
    <div className="w-full">
      <UpdateUserNameForm />
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdateUserForm;
