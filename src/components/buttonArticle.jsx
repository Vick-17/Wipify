import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/ButtonArticle.css";

const ButtonArticle = ({ articleId }) => {
  const handleClick = () => {
    console.log("Article ID:", articleId); // Vérification de l'ID dans la console
  };

  return (
    <NavLink to={`/Article/${articleId}`} className="btnGoArticle">
      <button className="goToArticle" onClick={handleClick}>
        En voir plus
      </button>
    </NavLink>
  );
};

export default ButtonArticle;
