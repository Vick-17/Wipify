import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlocLastArticle from "./BlocLastArticle";
import secondImage from "../img/zelda-totk.jpg";
import thirdImage from "../img/amored.jpg";
import fourthImage from "../img/eldenring.jpg";
import fifthImage from "../img/mario.jpg";
import sixImage from "../img/soulframe.jpg";
import "../styles/components/Carrousel.css"

const CarrouselArticles = () => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 500);
  }, []);

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <Slider className={`slider ${showElement ? "show" : ""}`} {...settings}>
        <BlocLastArticle
          title="Critique de jeu : un scénario de qualité pour Zelda"
          date="03/11/19 CRITIQUE DE SORTIE"
          content="On vient d'apprendre une bonne nouvelle pour les joueurs Switch qui souhaitent se procurer le prochain Zelda !"
          image={secondImage}
        />

        <BlocLastArticle
          title="Armored Core 6 : Elden Ring dans le futur ? From Software nous dit tout ! "
          content="Alors qu’Elden Ring s’apprête à accueillir son 1er DLC - nous avons pu assister à une présentation exclusive d’Armored Core VI, nouveau projet du studio FromSoftware. 
          Du gameplay au multijoueur, en passant par les boss, l’aspect personnalisation, 
          les producteurs | le réalisateur nous disent tout."
          date="20/12/19"
          image={thirdImage}
        />

        <BlocLastArticle
          title="Elden Ring : Tuer des boss avec des avions de chasse ? C'est possible !"
          date="10/01/20"
          content="Si on vous disait qu’il était possible de contrôler un avion de chasse dans l’univers du soulslike de FromSoftware ? 
          Vous ne rêvez pas, Elden Ring peut désormais être joué d’une toute autre manière grâce à cette création plus qu’insolite ! "
          image={fourthImage}
        />

        <BlocLastArticle
          title="Super Mario Bros, le film qui valait un milliard"
          date="01/02/20"
          content="C'est plié : après avoir été le premier film tiré d'une licence jeu vidéo à dépasser les 500 millions de dollars au box office mondial, 
          le Super Mario Bros. de Nintendo, 
          Universal et Illumination rentre dans l'histoire du cinéma en dépassant la barre du milliard de dollars et ce en même pas un mois."
          image={fifthImage}
        />

        <BlocLastArticle
          title="Digital Extremes dévoile un premier extrait de gameplay de Soulframe"
          date="15/03/20"
          content="L'été dernier, Digital Extremes annonçait le développement de Soulframe, 
          un jeu d'action reposant sur des combats de mêlée « lents et lourds ». Le studio livre un premier extrait de gameplay en vidéo."
          image={sixImage}
        />

    </Slider>
  );
};

export default CarrouselArticles;
