import React, { useEffect, useState } from "react";
import { TwitchPlayer } from "react-twitch-embed";
import ButtonAllTwitch from "./ButtonAllTwitch";
import "../styles/components/LiveTwitch.css";

const LiveTwitch = () => {
  const streamers = ["damdamlive", "savun", "rakoon_lv", "kalimbastar", "ligefeu", "forsa", "malosenpai", "sweetlouve", "mynthos"];
  const [streamer, setStreamer] = useState("");

  const twitchPlayer = {
    with: "50%",
    height: "480px"
  }

  useEffect(() => {
    selectRandomStreamer();
  }, [])

  const selectRandomStreamer = () => {
    const randomStreamer = streamers[Math.floor(Math.random() * streamers.length)];
    setStreamer(randomStreamer);
  };

  return (
    <div>
      <div className="twitch-conatainer">
        <div className="twitch-player">
          <TwitchPlayer style={twitchPlayer} channel={streamer} autoplay={true} muted />
        </div>
        <div className="live-info">
          <h3 className="live-title">Diffusions à venir</h3>
          <div className="live-calendar">
            <div className="day-list">
              <h5> <a href="https://www.twitch.tv/rakoon_lv">Rakoon_IV</a> </h5>
              <span className="lien-live"> Mercredi, Vendredi et Samedi</span>
            </div>
            <div className="day-list">
              <h5><a href="https://www.twitch.tv/Kalimbastar">Kalimbastar</a></h5>
              <span className="lien-live">Des fois</span>
            </div>
          </div>
          <ButtonAllTwitch />
        </div>
      </div>
    </div>
  );
};

export default LiveTwitch;
