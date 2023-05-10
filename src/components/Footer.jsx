import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="list-footer hiden-respon">
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
        <div className="list-footer responc-list">
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
      </div>
    </div>
  );
};

export default Footer;
