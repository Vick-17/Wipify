import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlocLastArticle from "./BlocLastArticle";
import "../styles/components/Carrousel.css";

const CarrouselArticles = () => {
  const [videoGames, setVideoGames] = useState([]);

  async function fetchVideoGames() {
    try {
      const response = await fetch("https://apispringboot-production.up.railway.app/articles");
      const data = await response.json();

      // Tri des articles par ordre décroissant de date
      const sortedArticles = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestArticles = sortedArticles.slice(0, 10);

      setVideoGames(latestArticles);
    } catch (error) {
      console.error("Error fetching video games:", error);
    }
  }

  useEffect(() => {
    fetchVideoGames();
  }, []);

  // État pour afficher ou masquer le carrousel
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    // Utilisation de setTimeout pour afficher le carrousel après un délai de 500 millisecondes
    setTimeout(() => {
      setShowElement(true);
    }, 500);
  }, []);

  function formatDate(stringDate) {
    let newDate = new Date(stringDate);
    return newDate.toLocaleDateString("fr");
  }

  // État pour gérer l'index de la diapositive active
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
      {videoGames.map((videoGame) => (
        <BlocLastArticle
          key={videoGame.id}
          title={videoGame.title}
          date={formatDate(videoGame.date)}
          content={videoGame.resume}
          image={videoGame.imageUrl}
        />
      ))}
    </Slider>
  );
};

export default CarrouselArticles;
