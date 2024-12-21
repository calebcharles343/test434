import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto p-6 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg border border-[rgba(255,153,40,1)]"
    >
      {children}
    </form>
  );
};

export default FormWrapper;
