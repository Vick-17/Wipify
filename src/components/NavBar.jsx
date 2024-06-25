import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "../styles/components/navbar.css";
import jwtDecode from "jwt-decode";

const NavBar = () => {
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("userToken");
  //annimation navbar chargement
  const [showElement, setShowElement] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 500);
    const tokenRole = localStorage.getItem("userToken");
    if (tokenRole !== null) {
      const decodedToken = jwtDecode(tokenRole);
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

  const handleLogout = () => {
    // Supprimer le token du local storage
    localStorage.removeItem("userToken");

    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "/";
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
            to="/video"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Video</li>
          </NavLink>
         {/*} <NavLink
            to="/streaming"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="nav-list">Streaming</li>
          </NavLink>*/}
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
          {token === null && (
            <NavLink
              to="/login"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="logout-login">Connexion</li>
            </NavLink>
          )}
          {token !== null && (
            <>
              <NavLink
                to="/Deconnexion"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                <li>
                  <button className="logout-login" onClick={handleLogout}>
                    Deconnexion
                  </button>
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
