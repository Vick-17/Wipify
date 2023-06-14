import React from "react";
import Navbar from "../components/NavBar";
import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "../components/Dashboard";
import "../styles/page/AdminPage.css";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div className="admin-container">
        <AdminSidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default AdminPage;
