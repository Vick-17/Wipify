import React, {useState, useEffect} from 'react';
import ButtonAllTwitch from './ButtonAllTwitch';


const LiveTwitch = () => {
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
        // User is scrolling up, do nothing
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
    return (
      <div>
        <div className="twitch-conatainer">
          <iframe className={`imframeTwitch ${isVisible ? "visible" : ""}`}
            src="https://player.twitch.tv/?video=1801469639&parent=www.example.com"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            height="378"
            width="620"
          ></iframe>
          <div className={`live-info ${isVisible ? "visible" : ""}`}>
            <h3 className="live-title">Diffusions à venir</h3>
            <div className="live-calendar">
              <div className="day-list"><h5>LUNDI 17 AOÛT</h5> Lien de la diffusion</div>
              <div className="day-list"><h5>JEUDI 20 AOÛT</h5> Lien de la diffusion</div>
            </div>
            <ButtonAllTwitch />
          </div>
        </div>
      </div>
    );
};

export default LiveTwitch;