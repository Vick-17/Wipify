import React from "react";
import ButtonArticle from "./buttonArticle";
import "../styles/components/Article.css";

const Article = ({ title, date, image, content }) => {
  return (
    <div className="article-container">
      <div className="img-article">
        <img src={image} alt="img-title" className="content-img" />
      </div>
      <div className="content">
        <div className="publi-date">{date}</div>
        <div className="title-article"><h5>{title}</h5></div>
        <div className="descr">{content}</div>
        <div className="btn">
            <ButtonArticle />
        </div>
      </div>
    </div>
  );
};

export default Article;
