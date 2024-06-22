import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlocLastArticle from "./BlocLastArticle";
import "../styles/components/Carrousel.css";
import { get } from "../ApiService/axios"
import Loading from "./Loading";

const CarrouselArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchVideoGames() {
    try {
      const data = await get('articles');
      setArticles(data)

      // Tri des articles par ordre décroissant de date
      const sortedArticles = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestArticles = sortedArticles.slice(0, 10);

      setArticles(latestArticles);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching video games:", error);
      setIsLoading(false)
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
    <Slider {...settings}>
      {isLoading ? (
        <Loading />
      ) : (
        articles.map((videoGame) => (
          <BlocLastArticle
            key={videoGame.id}
            id={videoGame.id}
            title={videoGame.title}
            date={formatDate(videoGame.date)}
            content={videoGame.resume}
            image={videoGame.imageUrl}
          />
        ))
      )}
    </Slider>
  );
};

export default CarrouselArticles;
