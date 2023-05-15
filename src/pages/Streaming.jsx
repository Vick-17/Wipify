import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const Streaming = () => {
  return (
    <div>
      <NavBar />
      <div className="sidebar-container">
        <Sidebar />
      </div>
    </div>
  );
};

export default Streaming;
