import React from 'react';

const LogoutBtn = () => {
  const handleLogout = () => {
    // Supprimer le token du local storage
    localStorage.removeItem('userToken');
    
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout}>
      Se déconnecter
    </button>
  );
};

export default LogoutBtn;
