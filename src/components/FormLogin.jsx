import React, { useState } from "react";
import "../styles/components/FormLogin.css";
import "setimmediate";
import emailjs from "emailjs-com";

export const FormLogin = () => {
  // États des champs du formulaire
  const [strength, setStrength] = useState("");
  const [nom, setName] = useState("");
  const [prenom, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [telephone, setNumero] = useState("");
  const [error, setError] = useState("");
  const [confirmationCode] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formData, setFormData] = useState([]);



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: pseudo,
      password: password,
    };

    try {
      const response = await fetch("https://jeuxvideosnews.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Connexion réussie
        const token = response.headers.get("access_token");
        localStorage.setItem("userToken", token);
        window.location.href = '/';
        console.log(token)
      } else {
        // Erreur de connexion
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jeuxvideosnews.com/api/user", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href("/")
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error);
    }
  };

  // État du formulaire de connexion/inscription
  const [showLogin, setShowLogin] = useState(true);

  // Basculer entre le formulaire de connexion et d'inscription
  const toggleFormHide = () => {
    setShowLogin(!showLogin);
  };

  const handleChangeValue = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {showLogin ? (
        <div className="login-card">
          <h2>Connexion</h2>
          {error && <p style={{ color: 'red' }} >Erreur de connexion</p>}
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="username">
              <input
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="Pseudo"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              spellCheck="false"
              className="control"
              type="password"
              placeholder="Mot de passe"
            />
            <button id="button-formlogin" className="control" type="submit">
              SE CONNECTER
            </button>
            <button onClick={toggleFormHide}>
              Basculer vers l'inscription
            </button>
          </form>
        </div>
      ) : (
        // sinon, affiche la vue d'inscription
        <div className="login-card">
          <h2>Inscription</h2>
          <form className="login-form" onSubmit={handleSignupSubmit}>
            {/* <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => setSelectedPhoto(e.target.files[0])}
            /> */}
            <div className="name">
              <input
                value={formData.nom}
                onChange={handleChangeValue}
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
                value={formData.prenom}
                onChange={handleChangeValue}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="Prenom"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="pseudo">
              <input
                value={formData.pseudo}
                onChange={handleChangeValue}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="pseudo"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="username">
              <input
                value={formData.email}
                onChange={handleChangeValue}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="email"
                placeholder="Email"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              value={formData.password}
              onChange={handleChangeValue}
              name="password"
              spellCheck="false"
              className="control"
              type="password"
              placeholder="Password"
            />
            <button className="control" type="submit">
              M'INSCRIRE
            </button>
            <button className="goToLogSign" onClick={toggleFormHide}>
              Basculer vers la connexion
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FormLogin;
