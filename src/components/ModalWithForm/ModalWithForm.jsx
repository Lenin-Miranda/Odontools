import { IoClose } from "react-icons/io5";
import "./ModalWithForm.css";
export default function ModalWithForm({ children, setIsClose, isOpen }) {
  const handleClose = () => {
    setIsClose(false);
  };

  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <form className={`modal__form `}>
        {" "}
        <button className="modal__form-close-btn" onClick={handleClose}>
          <IoClose style={{ fontSize: "24px" }} />
        </button>
        {children}
      </form>
    </div>
  );
}
