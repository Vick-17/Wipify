import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/ButtonArticle.css";

const ButtonArticle = ({ articleId }) => {
  const handleClick = () => {
    console.log("Article ID:", articleId);
  };

  return (
    <NavLink to={`/Jeux/${articleId}`} className="btnGoArticle">
      <button className="goToArticle" onClick={handleClick}>
        En voir plus
      </button>
    </NavLink>
  );
};

export default ButtonArticle;
