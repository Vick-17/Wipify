import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const NavBar = () => {
  return (
<>
        <div className="navbar">
          <Logo />
          <ul>
            <NavLink to="/films" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              <li className="nav-list">Films</li>
            </NavLink>
            <NavLink to="/series" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              <li className="nav-list">Series</li>
            </NavLink>
            <NavLink to="/jeux" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              <li className="nav-list">Jeux-vidéos</li>
            </NavLink>
            <NavLink to="/livres" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              <li className="nav-list">Livres</li>
            </NavLink>
            <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
              <li className="nav-list">a propos</li>
            </NavLink>
          </ul>
        </div>
    </>
  );
};

export default NavBar;