import { FormEvent, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { PasswordForgotTypes } from "../../interfaces";
import { useforgotPassword } from "./useforgotPassword";

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<PasswordForgotTypes>({
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const { forgotPassword, isPending } = useforgotPassword();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData, "Form Data");

    const data = {
      data: formData,
    };

    forgotPassword(data);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-800 gap-4">
      <span
        className="Protest+Revolution text-[16px] text-[#ff9928] font-extrabold p-2 border border-[#ff9928] rounded-lg"
        style={{ fontFamily: "Syncopate" }}
      >
        Shopping List
      </span>
      <div className="flex flex-col items-center w-full md:w-[350px] p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg  mx-4 md:mx-0"
        >
          <div className="flex flex-col w-full gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-bold text-gray-700"
              >
                Email
              </label>
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
            disabled={isPending}
          >
            {isPending ? <SpinnerMini /> : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
