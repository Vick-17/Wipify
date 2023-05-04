import NavBar from "../components/NavBar";
import LiveTwitch from "../components/LiveTwitch";
import BannerTitle from "../components/BannerTitle";
import NewVideo from "../components/NewVideo";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import CarrouselArticles from "../components/Carrousel";

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
