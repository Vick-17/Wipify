import React, { useState } from "react";

const strengthLabels = ["faible", "medium", "fort"];

export const FormLogin = () => {
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    let strengthIndic = -1,
      upper = false,
      lower = false,
      numbers = false;

    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndic++;
      }
      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndic++;
      }
      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndic++;
      }
    }
    setStrength(strengthLabels[strengthIndic]);
  };
  const handleChange = (event) => getStrength(event.target.value);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? ( // si showLogin est vrai, affiche la vue de connexion
        <div className="login-card">
          <h2>Connexion</h2>
          <form className="login-form">
            <div className="username">
              <input
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="email"
                placeholder="Email"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              name="password"
              spellCheck="false"
              className="control"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button className="control" type="button">
              SE CONNECTER
            </button>
            <button onClick={toggleForm}>Basculer vers l'inscription</button>
          </form>
        </div>
      ) : (
        // sinon, affiche la vue d'inscription
        <div className="login-card">
          <h2>Inscription</h2>
          <form className="login-form">
            <div className="name">
              <input
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="Nom"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="lastName">
              <input
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="Prenom"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="username">
              <input
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="email"
                placeholder="Email"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              name="password"
              spellCheck="false"
              className="control"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <div className={`bars ${strength}`}>
              <div></div>
            </div>
            <div className="strength">
              {strength && <>{strength} password</>}
            </div>
            <button className="control" type="button">
              M'INSCRIRE
            </button>
            <button className="goToLogSign" onClick={toggleForm}>Basculer vers la connexion</button>
          </form>
        </div>
      )}
    </>
  );
};

export default FormLogin;
