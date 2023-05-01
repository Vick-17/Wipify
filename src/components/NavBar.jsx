import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const NavBar = () => {
    //annimation navbar chargement
    const [showElement, setShowElement] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setShowElement(true);
      }, 500);
    }, []);

  //annimation navbar scroll
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-100%";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <>
      <div className={`navbar ${showElement ? "show" : ""}`} id="navbar">
        <Logo />
        <ul>
          <NavLink
            to="/films"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Jeux-vidéos</li>
          </NavLink>
          <NavLink
            to="/series"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">News</li>
          </NavLink>
          <NavLink
            to="/jeux"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Test</li>
          </NavLink>
          <NavLink
            to="/livres"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Console</li>
          </NavLink>
          <NavLink
            to="/about"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">a propos</li>
          </NavLink>
          <NavLink
            to="login"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Login</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
