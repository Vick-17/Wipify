import React, { useEffect, useState } from "react";
import Image from "../img/LoadingCox.gif";
import Fond from "../img/fondPoke.jpg";
import "../styles/components/Loading.css";

const Loading = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleJump();
          break;
        case "ArrowLeft":
          handleMoveLeft();
          break;
        case "ArrowRight":
          handleMoveRight();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleJump = () => {
    // Logique pour faire sauter le personnage
    setPosition(position - 50);
  };

  const handleMoveLeft = () => {
    // Logique pour déplacer le personnage vers la gauche
    setPosition(position - 10);
  };

  const handleMoveRight = () => {
    // Logique pour déplacer le personnage vers la droite
    setPosition(position + 10);
  };

  return (
    <>
      <div className="loading">
        <img
          src={Image}
          alt="courtney qui dit non"
          className="gif-no"
          style={{ bottom: position + "px" }}
        />
        <div className="diaporama">
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
        </div>
        <p>Chargement...</p>
      </div>
    </>
  );
};

export default Loading;
