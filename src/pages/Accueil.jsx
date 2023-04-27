import NavBar from "../components/NavBar";
import LiveTwitch from "../components/LiveTwitch";
import BlocLastArticle from "../components/BlocLastArticle";
import BannerTitle from "../components/BannerTitle";
import NewVideo from "../components/NewVideo";
import Footer from "../components/Footer";

const Accueil = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="article">
          <BlocLastArticle />
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
