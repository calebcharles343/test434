import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { PasswordResetTypes } from "../../interfaces";
import { useResetPassword } from "./useResetPassword";
import { useParams } from "react-router-dom";

const ResetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<PasswordResetTypes>({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { token } = useParams<{ token: string }>();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };
  const { resetPassword, isPending } = useResetPassword(token!);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { data: formData };
    resetPassword(data);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-800 gap-4">
      {" "}
      <span
        className="Protest+Revolution text-[16px] text-[#ff9928] font-extrabold p-2 border border-[#ff9928] rounded-lg"
        style={{ fontFamily: "Syncopate" }}
      >
        {" "}
        E-COMMERCE{" "}
      </span>{" "}
      <div className="flex flex-col items-center w-full md:w-[350px] p-2">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0"
        >
          {" "}
          <div className="flex flex-col w-full gap-4">
            {" "}
            <div>
              {" "}
              <label
                htmlFor="password"
                className="block mb-1 font-bold text-gray-700"
              >
                {" "}
                Password{" "}
              </label>{" "}
              <div className="relative w-full">
                {" "}
                <input
                  className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />{" "}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {" "}
                  <ShowPasswordIcon showPassword={showPassword} />{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <label
                htmlFor="passwordConfirm"
                className="block mb-1 font-bold text-gray-700"
              >
                {" "}
                Confirm Password{" "}
              </label>{" "}
              <div className="relative w-full">
                {" "}
                <input
                  className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                  id="confirm_password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  required
                />{" "}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {" "}
                  <ShowPasswordIcon showPassword={showPassword} />{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <button
            type="submit"
            className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
            disabled={isPending}
          >
            {" "}
            {isPending ? <SpinnerMini /> : "Reset password"}{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default ResetPasswordForm;
