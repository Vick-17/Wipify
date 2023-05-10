import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/ButtonArticle.css"

const buttonArticle = () => {
  return (
    <NavLink to="*" className="btnGoArticle">
      <button className="goToArticle">En voir plus</button>
    </NavLink>
  );
};

export default buttonArticle;
