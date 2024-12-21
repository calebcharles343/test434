import React from "react";
import SpinnerMini from "./SpinnerMini";

interface FormButtonProps {
  label: string;
  isLoading: boolean;
  disabled: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  isLoading,
  disabled,
}) => (
  <button
    type="submit"
    className={`w-full py-2 rounded-lg text-white font-semibold bg-gray-800 hover:bg-gray-700 shadow-md ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={disabled}
  >
    {isLoading ? <SpinnerMini /> : label}
  </button>
);

export default FormButton;
