import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { UpdatePassword } from "./useUpdatePassword";
import { UpdatePasswordType } from "../../interfaces";

const UpdatePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<UpdatePasswordType>({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { updatePassword, isPending: isLoading } = UpdatePassword();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    updatePassword(formData);

    setFormData({
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-lg font-extrabold">Reset Password</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg  mx-4 md:mx-0 border-2"
      >
        <div className="flex flex-col w-full gap-4">
          <div>
            <label htmlFor="passwordCurrent" className="block mb-1 font-bold ">
              Current password
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm "
              id="passwordCurrent"
              type="text"
              placeholder="Enter your current password"
              value={formData.passwordCurrent}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-bold ">
              New Password
            </label>
            <div className="relative w-full">
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm "
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleShowPassword}
              >
                <ShowPasswordIcon showPassword={showPassword} />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block mb-1 font-bold ">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm "
                id="passwordConfirm"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                autoComplete="new-password"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleShowPassword}
              >
                <ShowPasswordIcon showPassword={showPassword} />
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
