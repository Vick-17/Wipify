import React, { useState, useEffect } from "react";
import ButtonArticle from "../components/buttonArticle";

const BlocLastArticle = ({ title, date, image,content }) => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 500);
  }, []);

  return (
    <div className="top-bloc">
      <div className={`bloc-title ${showElement ? "show" : ""}`}>
        <div className="content">
          <span className="publie-date">{date}</span>
          <h2>{title}</h2>
          <p className="title-descr">
            {content}
          </p>
            <ButtonArticle />
        </div>
        <img src={image} alt="img-title" className="img-title" />
      </div>
    </div>
  );
};

export default BlocLastArticle;
