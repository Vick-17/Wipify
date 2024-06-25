import React from "react";
import { NavLink } from "react-router-dom";
import'../styles/components/AdminSadebar.css'

const AdminSidebar = () => {
  return (
    <div className="Admin-sidebar">
        <h5>KingdomGame Administration</h5>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/link1" activeClassName="active">
              Statistique
            </NavLink>
          </li>
          <li>
            <NavLink to="/link2" activeClassName="active">
              Gestion articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/link3" activeClassName="active">
              Gestion utilisteur
            </NavLink>
          </li>
          <li>
            <NavLink to="/link4" activeClassName="active">
              Gestion site
            </NavLink>
          </li>
          <li>
            <NavLink to="/link5" activeClassName="active">
              Reclamation et message
            </NavLink>
          </li>
          <li>
            <NavLink to="/link6" activeClassName="active">
              Mise à jour
            </NavLink>
          </li>
          <li>
            <NavLink to="/link7" activeClassName="active">
              Logs
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
