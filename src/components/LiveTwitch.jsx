import React from "react";
import ButtonAllTwitch from "./ButtonAllTwitch";
import "../styles/components/LiveTwitch.css";

const LiveTwitch = () => {
  return (
    <div>
      <div className="twitch-conatainer">
        <div className="twitch-player">
          <iframe
          className="live"
            src="https://player.twitch.tv/?channel=laink&parent=localhost"
            frameborder="0"
            allowfullscreen="true"
          ></iframe>
        </div>
        <div className="live-info">
          <h3 className="live-title">Diffusions à venir</h3>
          <div className="live-calendar">
            <div className="day-list">
              <h5>LUNDI 17 AOÛT</h5> <span className="lien-live">Lien de la diffusion</span> 
            </div>
            <div className="day-list">
              <h5>JEUDI 20 AOÛT</h5> <span className="lien-live">Lien de la diffusion</span> 
            </div>
          </div>
          <ButtonAllTwitch />
        </div>
      </div>
    </div>
  );
};

export default LiveTwitch;
