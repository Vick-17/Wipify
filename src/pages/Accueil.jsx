import React from "react";
import NavBar from "../components/NavBar";
import LiveTwitch from "../components/LiveTwitch";
import BannerTitle from "../components/BannerTitle";
import NewVideo from "../components/NewVideo";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import ArticleAlaUne from "../components/ArticleAccueil";
import CarrouselArticles from "../components/Carrousel";
import "../styles/page/accueil.css";

const Accueil = () => {
  return (
    <div>
      <div className="login-title">
        <Logo />
      </div>
      <NavBar />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="container">
        <div className="article">
          <CarrouselArticles />
        </div>
        <div className="banner">
          <BannerTitle />
        </div>
        <div className="twicth">
          <LiveTwitch />
        </div>
        <div className="titre-bloc-article">
          <h5>Article à la une</h5>
        </div>
        <div className="article-a-la-une">
          <ArticleAlaUne />
        </div>
        <div className="new-video">
          <NewVideo />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Accueil;
