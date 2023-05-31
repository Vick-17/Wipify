import React, { useState } from "react";

const Test = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création de l'objet représentant les données de connexion
    const formData = {
      username: pseudo,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        // Connexion réussie
        console.log("Connexion réussie", formData);
      } else {
        // Erreur de connexion
        const errorMessage = await response.text();
        setError(errorMessage);
        console.log(formData);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Test;
