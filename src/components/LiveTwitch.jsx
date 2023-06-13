import React from "react";
import { TwitchPlayer } from "react-twitch-embed";
import ButtonAllTwitch from "./ButtonAllTwitch";
import "../styles/components/LiveTwitch.css";

const LiveTwitch = () => {
  const twitchPlayer = {
    with: "50%",
    height: "480px"
  }
  return (
    <div>
      <div className="twitch-conatainer">
        <div className="twitch-player">
          <TwitchPlayer style={twitchPlayer} channel="savun" autoplay={false} muted />
        </div>
        <div className="live-info">
          <h3 className="live-title">Diffusions à venir</h3>
          <div className="live-calendar">
            <div className="day-list">
              <h5>LUNDI 18 AOÛT</h5>
              <span className="lien-live">Lien de la diffusion</span>
            </div>
            <div className="day-list">
              <h5>JEUDI 20 AOÛT</h5>
              <span className="lien-live">Lien de la diffusion</span>
            </div>
          </div>
          <ButtonAllTwitch />
        </div>
      </div>
    </div>
  );
};

export default LiveTwitch;
