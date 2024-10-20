import React, { ReactNode } from "react";
import "./_modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-container-overlay" onClick={onClose}></div>
      <div className="modal-container-content">{children}</div>
    </div>
  );
};

export default Modal;
