import React, { useState, createContext } from "react";

// Créez le contexte de session
export const SessionContext = createContext();

// Composant SessionProvider
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  // Méthode pour ouvrir une session
  const login = (userData) => {
    // Effectuez les vérifications d'authentification nécessaires avec le serveur
    // et mettez à jour l'état de session avec les informations d'authentification
    setSession(userData);
  };

  // Méthode pour fermer la session
  const logout = () => {
    // Effectuez les opérations nécessaires pour fermer la session, telles que
    // l'invalidation du jeton d'authentification, la suppression des cookies, etc.
    // et mettez à jour l'état de session en le réinitialisant à null
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

