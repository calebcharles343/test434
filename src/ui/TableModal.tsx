import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const TableModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-5 relative rounded shadow-lg p-7">
        <button
          className="text-xs md:text-sm bg-white absolute top-0 right-0 m-2 text-red-500 px-2"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default TableModal;
