import React from "react";
import { NavLink } from 'react-router-dom';

const ButtonAllTwitch = () => {
  return (
    <div>
      <NavLink to="/twitch" className="btnGoLive">
        <button className="goToLive">Voir plus de vidéos</button>
      </NavLink>
    </div>
  );
};

export default ButtonAllTwitch;
