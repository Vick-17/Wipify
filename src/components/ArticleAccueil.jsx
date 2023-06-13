import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Article.css";
import jwtDecode from "jwt-decode";

const ArticleAccueil = ({ id, title, date, image, content }) => {
  const [roles, setRoles] = useState([]);
  const token = useRef("");
  useEffect(() => {
    token.current = localStorage.getItem("userToken");
    if (token.current !== null) {
      const decodedToken = jwtDecode(token.current);
      setRoles(decodedToken.roles);
    }
  }, []);

  
  const handleDelete = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      };
      const response = await fetch(
        `https://apispringboot-production.up.railway.app/article/${id}`,
        {
          headers: headers,
          method: "DELETE",
        }
      );

      if (response.ok && roles[0] === "ROLE_ADMIN") {
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
          {roles.length > 0 && roles[0] === "ROLE_ADMIN" && (
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

export default ArticleAccueil;
