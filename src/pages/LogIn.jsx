import React from "react";
import NavBar from "../components/NavBar";
import FormLogin from "../components/FormLogin";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

const LogIn = () => {
  return (
    <>
    <div className="login-title">
        <Logo />
    </div>
      <div className="nav">
        <NavBar />
      </div>
      <div className="form">
        <FormLogin />
      </div>
      <div className="foot">
        <Footer />
      </div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
    
    </>
  );
};

export default LogIn;
