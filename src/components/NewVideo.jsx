import React, {useState, useEffect} from "react";
import "../styles/components/NewVideo.css";

const NewVideo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const triggerPosition = window.innerHeight / 5;

      if (currentScrollPos > triggerPosition && isScrollingDown) {
        setIsVisible(true);
      } else if (currentScrollPos < prevScrollPos) {
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  return (
    <div className="video-container">
      <div className="title-dance">
        <h5>Vidéos présentées</h5>
      </div>
      <div className="newVideo">
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            width="559"
            height="314"
            src="https://www.youtube.com/embed/7wwglDzRTZY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            width="559"
            height="314"
            src="https://www.youtube.com/embed/Dv-7K_m589I"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            width="559"
            height="314"
            src="https://www.youtube.com/embed/Dv-7K_m589I"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            width="559"
            height="314"
            src="https://www.youtube.com/embed/Dv-7K_m589I"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            width="559"
            height="314"
            src="https://www.youtube.com/embed/Dv-7K_m589I"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`video ${isVisible ? "visible" : ""}`}>
          <iframe
          className="youtube"
            src="https://www.youtube.com/embed/Dv-7K_m589I"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
