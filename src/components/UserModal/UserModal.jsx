import { Link } from "react-router-dom";
import "./UserModal.css";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import userAvatar from "../../assets/avatar.png";
import { GoPackage } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export default function UserModal({ isUserOpen, setIsUserOpen, user }) {
  return (
    <div className={`user__modal ${isUserOpen ? "user__modal-open" : ""}`}>
      <div
        className={`user__modal-container ${
          isUserOpen ? "user__modal-container-open" : ""
        }`}
      >
        <div className="user__modal-close">
          <h2 className="user__modal-title">Mi Perfil</h2>
          <button
            className="user__modal-close-btn"
            type="button"
            onClick={() => {
              setIsUserOpen(false);
            }}
          >
            {" "}
            <AiOutlineClose />
          </button>
        </div>

        <div className="user__modal-user-info">
          <img
            className="user__modal-avatar"
            src={userAvatar}
            alt="User Avatar"
          />
          <div className="user__modal-user-details">
            <h2 className="user__modal-username">Lenin Miranda</h2>
            <p className="user__modal-email">Lenin9073@gmail.com</p>
          </div>
        </div>

        <ul className="user__modal-list">
          <li className="user__modal-item">
            <CiUser style={{ fontSize: "20px" }} />

            <div className="user__modal-container-links">
              <Link to="/profile" className="user__modal-link">
                Mi Informacion
              </Link>

              <span className="user__modal-span">Editar datos personales</span>
            </div>
          </li>
          <li className="user__modal-item">
            <CiHeart style={{ fontSize: "20px" }} />
            <div className="user__modal-container-links">
              <Link to="/orders" className="user__modal-link">
                Mis Pedidos
              </Link>

              <span className="user__modal-span">Ver Historial de compras</span>
            </div>
          </li>
          <li className="user__modal-item">
            {" "}
            <GoPackage />
            <div className="user__modal-container-links">
              <Link to="/settings" className="user__modal-link">
                Favoritos
              </Link>

              <span className="user__modal-span">Productos guardados</span>
            </div>
          </li>
          <li className="user__modal-item">
            <button className="user__modal-btn">Cerrar Sesion</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
