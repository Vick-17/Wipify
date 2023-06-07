import React from "react";
import Image from "../img/LoadingCox.gif";
import Fond from "../img/fondPoke.jpg";
import "../styles/components/Loading.css";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <img src={Image} alt="courtney qui dit non" className="gif-no" />
        <div className="diaporama">
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
          <img src={Fond} alt="fond ville qui defile" className="fond-ville" />
        </div>
        <p>Chargment...</p>
      </div>
    </>
  );
};

export default Loading;
