import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FormulaireArticle from "../components/formulaireArticle";
import Footer from "../components/Footer";

const FormArticle = () => {
  return (
    <div>
      <NavBar />
      <div className="sidebar-container">
        <Sidebar />
      </div>
        <FormulaireArticle />
        <Footer />
    </div>
  );
};

export default FormArticle;
