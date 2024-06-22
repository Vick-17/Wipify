import React from "react";
import "../styles/components/BannerTitle.css"

const BannerTitle = () => {
  return (
    <div>
      <div className="banniere-accueil">
        <h3>Bienvenue sur KingdomGame.</h3>
        <span className="content-banniere">
          Votre site de référence pour les tests, les diffusions et les
          tutoriels de vos jeux préférés.
        </span>
      </div>
    </div>
  );
};

export default BannerTitle;
