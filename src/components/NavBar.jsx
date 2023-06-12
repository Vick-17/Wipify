import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "../styles/components/navbar.css";
import jwtDecode from "jwt-decode";

const NavBar = () => {
  const [roles, setRoles] = useState([]);
  //annimation navbar chargement
  const [showElement, setShowElement] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 500);
    const token = localStorage.getItem("userToken");
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setRoles(decodedToken.roles);
    }
  }, []);

  //annimation navbar scroll
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
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
            to="/Jeux"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Les articles</li>
          </NavLink>
          <NavLink
            to="/news"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">News</li>
          </NavLink>
          <NavLink
            to="/test"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Test</li>
          </NavLink>
          <NavLink
            to="/video"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Video</li>
          </NavLink>
          <NavLink
            to="/streaming"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Streaming</li>
          </NavLink>
          <NavLink
            to="/login"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Login</li>
          </NavLink>
          {roles.length > 0 && roles[0] !== null && (
            <>
              <NavLink
                to="/Deconnexion"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                <li className="nav-list">Deconnexion</li>
              </NavLink>
            </>
          )}
          {roles.length > 0 && roles[0] === "ROLE_ADMIN" && (
            <>
              <NavLink
                to="/ajoutarticle"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                <li className="nav-list">Ajouter un article</li>
              </NavLink>
            </>
          )}
          {roles.length > 0 && roles[0] === "ROLE_ADMIN" && (
            <>
              <NavLink
                to="/Admin"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                <li className="nav-list">Admin</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
