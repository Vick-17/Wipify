import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Image from "../img/GifCourtNo.gif";
import "../styles/page/test.css";

const Test = () => {
  return (
    <div>
      <NavBar />
        <div className="you-would-not-pass">
          <img src={Image} alt="courtney qui dit non" />
        </div>
      <Footer />
    </div>
  );
};

export default Test;