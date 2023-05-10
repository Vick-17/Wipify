import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import tinycolor from 'tinycolor2';
import "../styles/components/sidebar.css"

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const sidebarRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseMove = (event) => {
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const target = elements.find((element) => {
      return element.getBoundingClientRect().top > 0;
    });

    if (target) {
      const elementStyle = window.getComputedStyle(target);
      const backgroundColor =
        elementStyle.getPropertyValue("background-color");
      const isLightColor =
        backgroundColor &&
        backgroundColor !== "transparent" &&
        tinycolor(backgroundColor).getLuminance() > 0.5;
      setBackgroundColor(isLightColor ? "#000" : "#fff");
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        onMouseMove={handleMouseMove}
        className={isSidebarOpen ? "open-sidebar" : "close-sidebar"}
      >
        <svg
          ref={svgRef}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill={backgroundColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="svg-background-color"
            d="M3 5h18M3 12h18M3 19h18"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
      >
        <ul>
          <NavLink to="/films" className="sideNav">
            <li className="side-list">Jeux-vidéos</li>
          </NavLink>
          <NavLink to="/series" className="sideNav">
            <li className="side-list">News</li>
          </NavLink>
          <NavLink to="/jeux" className="sideNav">
            <li className="side-list">Test</li>
          </NavLink>
          <NavLink to="/livres" className="sideNav">
            <li className="side-list">Video</li>
          </NavLink>
          <NavLink to="/about" className="sideNav">
            <li className="side-list">Streaming</li>
          </NavLink>
          <NavLink to="/login" className="sideNav">
            <li className="side-list btn-login">Login / Sign in</li>
          </NavLink>
        </ul>
      </div>
      {isSidebarOpen && <div className="overlay"></div>}
    </>
  );
}

export default Sidebar;
