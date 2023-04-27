import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="list-footer">
            <h5>A voir</h5>
          <ul className="voir list-prop">
          <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">Test</li>
            </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">Streaming</li>
            </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">Video</li>
            </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">News</li>
            </NavLink>
          </ul>
        </div>
        <div className="list-footer">
            <h5>Assistance</h5>
          <ul className="assist list-prop">
          <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
           <li className="foot-list">A propos</li>
          </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">F.A.Q</li>
            </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">Nous contacter</li>
            </NavLink>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "foot-active" : "")}> 
            <li className="foot-list">Signalement</li>
            </NavLink>
          </ul>
        </div>
        <div className="newsletter">
            <h5>SE TENIR INFORMÉ</h5>
            <input type="text" className="news-email" placeholder="adresse email" />
            <button className="btn-news">S'abonner</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
