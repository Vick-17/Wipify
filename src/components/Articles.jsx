import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Article.css";
import jwt_decode from "jwt-decode";

const Articles = ({ id, title, date, image, content }) => {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(token);
  const role = decodedToken.roles;
  const handleDelete = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8000/article/${id}`, {
        headers: headers,
        method: "DELETE",
      });

      if (response.ok && role[0] === "ROLE_ADMIN") {
        console.log("Article supprimé avec succès !");
      } else {
        console.error(
          "Erreur lors de la suppression de l'article :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      console.error("Vous ne posserder pas les droit");
    }
  };

  return (
    <div className="article-contain">
      <div className="img-article">
        <img src={image} alt="img-title" className="content-img" />
      </div>
      <div className="article-contenu">
        <div className="publi-date">{date}</div>
        <div className="title-article">
          <h5>{title}</h5>
        </div>
        <div className="descr">{content}</div>
        <div className="btn">
          <NavLink to={`/Jeux/${id}`} className="btnGoArticle">
            <button className="goToArticle">En voir plus</button>
          </NavLink>
          {role[0] === "ROLE_ADMIN" && (
            <>
              <NavLink to={`/updateArticle/${id}`}>
                <button>Modifier</button>
              </NavLink>
              <button onClick={handleDelete}>Supprimer</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
