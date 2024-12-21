import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-800 mb-1 tracking-wide"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B97743] bg-gray-100"
    />
  </div>
);

export default FormInput;
