import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavBar />
      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
