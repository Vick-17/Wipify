import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/ArticleUne.css";

const ArticleUne = ({ id, title, date, image, content }) => {
  return (
    <div className="content-articles">
      <div className="article-img">
        <img src={image} alt="img-title" className="image-content" />
      </div>
      <div className="content-article">
        <div className="date-publie">{date}</div>
        <div className="article-name">
          <h5>{title}</h5>
        </div>
        <br />
        <div className="description">{content}</div>
        <div className="btn-une">
          <NavLink to={`/Jeux/${id}`} className="toArticle">
            <button className="goArticle">En voir plus</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ArticleUne;
