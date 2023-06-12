import React, { useState, useEffect } from "react";
import Image from "../img/LoadingCox.gif";
import Fond from "../img/fondPoke.jpg";
import "../styles/components/Loading.css";

const Loading = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleKeyDown = (event) => {
    const speed = 10; // Vitesse de déplacement
    const { keyCode } = event;

    if (keyCode === 37) {
      // Flèche gauche
      setPosition((prevPosition) => ({
        x: prevPosition.x - speed,
        y: prevPosition.y
      }));
    } else if (keyCode === 38) {
      // Flèche haut
      setPosition((prevPosition) => ({
        x: prevPosition.x,
        y: prevPosition.y - speed
      }));
    } else if (keyCode === 39) {
      // Flèche droite
      setPosition((prevPosition) => ({
        x: prevPosition.x + speed,
        y: prevPosition.y
      }));
    } else if (keyCode === 40) {
      // Flèche bas
      setPosition((prevPosition) => ({
        x: prevPosition.x,
        y: prevPosition.y + speed
      }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="loading">
      <img src={Image} alt="courtney qui dit non" className="gif-no" style={{ left: position.x, top: position.y }} />
      <div className="diaporama">
        <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
      </div>
      <p>Chargement...</p>
    </div>
  );
};

export default Loading;
