import React from 'react';
import ButtonAllTwitch from './ButtonAllTwitch';


const LiveTwitch = () => {
    return (
      <div>
        <div className="twitch-conatainer">
          <iframe
            src="https://player.twitch.tv/?video=1801469639&parent=www.example.com"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            height="378"
            width="620"
          ></iframe>
          <div className="live-info">
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