import React, { useState } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <button onClick={handleSidebarToggle}>Afficher la barre latérale</button>
      <div className="sidebar-content">
        <h2>Titre de la barre latérale</h2>
        <p>Contenu de la barre latérale</p>
      </div>
    </div>
  );
};

export default Sidebar;
