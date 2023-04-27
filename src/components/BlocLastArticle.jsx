import React, {useState, useEffect} from "react";
import ButtonArticle from "../components/buttonArticle";
import firstImage from "../img/zelda totk.jpg";

const BlocLastArticle = () => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    // Mettez à jour l'état pour afficher l'élément après un court délai.
    setTimeout(() => {
      setShowElement(true);
    }, 500);
  }, []);

  return (
    <div>
      <div className="top-bloc">
        <div className={`bloc-title ${showElement ? "show" : ""}`} >
          <span className="publie-date">03/11/19 CRITIQUE DE SORTIE</span>
          <h2>Critique de jeu : un scénario de qualité pour Zelda</h2>
          <ButtonArticle />
        </div>
        <div className={`img-title ${showElement ? "show" : ""}`}>
          <img src={firstImage} alt="first-img" className="first-img" />
        </div>
      </div>
    </div>
  );
};

export default BlocLastArticle;
