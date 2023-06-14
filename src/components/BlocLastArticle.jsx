import React from "react";
import ButtonArticle from "../components/buttonArticle";
import "../styles/components/BlocLastArticle.css"

const BlocLastArticle = ({id, title, date, image, content }) => {
  return (
    <div className="top-bloc">
      <div className="bloc-title">
        <div className="content">
          <span className="publie-date">{date}</span>
          <h2>{title}</h2>
          <p className="title-descr">{content}</p>
          <ButtonArticle articleId={id} />
        </div>
        <img src={image} alt="img-title" className="img-title" />
      </div>
    </div>
  );
};

export default BlocLastArticle;
