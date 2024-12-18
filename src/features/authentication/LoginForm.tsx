import { FormEvent, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini.tsx";
import ShowPasswordIcon from "../../ui/ShowPasswordIcon.tsx";
import { useLogin } from "./useLogin.ts";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, isPending: isLoading, errorMessage } = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
    >
      <div className="flex flex-col w-full max-w-sm border rounded-md px-4 py-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-[6.2px] border-[rgba(255,153,40,1)] text-gray-700 font-medium gap-4 shadow-xl sm:max-w-md sm:px-6 sm:py-8 md:max-w-lg md:px-8 md:py-10">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-bold"
            style={{ letterSpacing: "2px" }}
          >
            Email
          </label>
          <input
            className="placeholder:text-sm w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-bold"
            style={{ letterSpacing: "2px" }}
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              className="placeholder:text-sm w-full h-10 px-2 rounded-md shadow-md bg-gray-100 border focus:border-[#B97743] focus:outline-none sm:h-10 sm:px-4 md:h-10 md:px-5 lg:h-10 lg:px-6"
              id="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your password"
              autoComplete="current-password"
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

        {errorMessage && (
          <span
            className="text-[12px] text-center text-red-500"
            aria-live="polite"
          >
            {errorMessage}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-20 flex justify-center items-center bg-gray-800 text-white px-3 py-2 rounded-md shadow-md"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
