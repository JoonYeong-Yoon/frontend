import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* X 버튼 표시 */}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("root") // 모달이 렌더링될 DOM 노드
  );
};

export default Modal;
