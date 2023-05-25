import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Article.css";

const Articles = ({ id, title, date, image, content }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/article/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Article supprimé avec succès !");
      } else {
        console.error("Erreur lors de la suppression de l'article :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
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
          <NavLink to={`/updateArticle/${id}`}>
            <button>Modifier</button>
          </NavLink>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default Articles;
