import React from "react";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import "../styles/page/AdminPage.css";

const AdminPage = () => {


  return (
    <>
    <Navbar />
    <div className="sidebar-container">
        <Sidebar />
    </div>
    <div className="admin-page">
      <div className="admin-sidebar"></div>
      <div className="admin-body"></div>
    </div>
    </>
  );
};

export default AdminPage;
