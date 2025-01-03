import { FormEvent, useState } from "react";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon";
import SpinnerMini from "../../ui/SpinnerMini"; // Assuming this component exists
import { useSignup } from "./useSignup";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { signup, isPending } = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signup(formData);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full bg-white bg-opacity-90 p-6  rounded-md shadow-xl backdrop-blur-lg  mx-4 md:mx-0"
      >
        <div className="flex flex-col w-full gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-bold text-gray-700"
            >
              Name
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

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

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-bold text-gray-700"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-bold text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
