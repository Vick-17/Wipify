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

  const sendEmail = (formData) => {
    const serviceId = "service_o8p8oku";
    const templateId = "template_hr9q6ek";
    const userId = "c6rkYaZsGbNS0Yd6Z";

    const templateParams = {
      to_name: formData.nom,
      from_name: "Wipify",
      confirmationCode: formData.confirmationCode,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("email Envoyé", response.status, response.text);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
      });
  };

  // Labels de force du mot de passe
  const strengthLabels = ["faible", "moyenne", "forte"];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: pseudo,
      password: password,
    };

    try {
      const response = await fetch("https://apispringboot-production.up.railway.app/login", {
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
      } else {
        // Erreur de connexion
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const formDataPhotoPath = e.target.elements.imageFile.files[0]; // Récupérer le fichier photo à partir du formulaire
    const formData = new FormData();
    formData.append('imageFile', formDataPhotoPath); // Ajouter la photo à l'objet FormData

    // Ajouter les autres champs du formulaire à l'objet FormData
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("pseudo", pseudo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("telephone", telephone);
    formData.append("confirmationCode", confirmationCode);

    try {
      const response = await fetch("https://apispringboot-production.up.railway.app/user", {
        method: "POST",
        body: formData, // Utiliser l'objet FormData comme corps de la requête
      });

      if (response.ok) {
        const responceText = await response.text();
        console.log("Inscription réussie");
        formData.set("confirmationCode", responceText);
        sendEmail(formData);
        console.log(formData);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  // Calcul de la force du mot de passe
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

  // Gestion du changement de valeur des champs de mot de passe
  const handleChange = (event) => getStrength(event.target.value);

  // État du formulaire de connexion/inscription
  const [showLogin, setShowLogin] = useState(true);

  // Basculer entre le formulaire de connexion et d'inscription
  const toggleFormHide = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? (
        <div className="login-card">
          <h2>Connexion</h2>
          {error && <p>{error}</p>}
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
            <button className="control" type="submit">
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
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => setSelectedPhoto(e.target.files[0])}
            />
            <div className="name">
              <input
                value={nom}
                onChange={(e) => setName(e.target.value)}
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
                value={prenom}
                onChange={(e) => setLastName(e.target.value)}
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
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="email"
                placeholder="Email"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="username">
              <input
                value={telephone}
                onChange={(e) => setNumero(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                className="control"
                type="text"
                placeholder="Téléphone"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              value={password}
              name="password"
              spellCheck="false"
              className="control"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange(e);
              }}
            />
            <div className={`bars ${strength}`}>
              <div></div>
            </div>
            <div className="strength">
              {strength && <>{strength} password</>}
            </div>
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
