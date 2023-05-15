import React, { useState } from "react";
import "../styles/components/FormulaireArticle.css";

const FormulaireArticle = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [resume, setResume] = useState("");
  const [datePublication, setDatePublication] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleResumeChange = (e) => {
    const value = e.target.value;
    setResume(value);
    setWordCount(value.trim().length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      titre,
      contenu,
      resume,
      datePublication: new Date().toISOString(),
      imageUrl,
    };
  
    try {
      const response = await fetch("http://localhost:8000/videogames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Données envoyées avec succès !");
        // Réinitialiser les valeurs du formulaire après l'envoi
        setTitre("");
        setContenu("");
        setResume("");
        setDatePublication("");
        setImageUrl("");
        setWordCount(0);
      } else {
        console.error(
          "Erreur lors de l'envoi des données :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };
  

  const handleDelete = () => {
    setTitre("");
    setContenu("");
    setResume("");
    setDatePublication("");
    setImageUrl("");
    setWordCount(0);
  };

  const getWordCountColor = () => {
    if (wordCount >= 150) {
      return "invalid";
    } else if (wordCount >= 135) {
      return "invalid";
    } else if (wordCount >= 75) {
      return "warning";
    } else {
      return "";
    }
  };

  const isResumeValid = wordCount <= 150;

  return (
    <div>
      <div className="formulaire-container">
        <h1>Ajout d'article</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />

          <label htmlFor="contenu">Contenu :</label>
          <textarea
            id="contenu"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
          ></textarea>

          <label htmlFor="resume">Résumé (max 150 caractères) :</label>
          <div className="resume-container">
            <textarea
              id="resume"
              value={resume}
              onChange={handleResumeChange}
              maxLength={150}
              required
              className={!isResumeValid ? "invalid" : ""}
              disabled={!isResumeValid}
            ></textarea>
            <div
              className={`word-count ${getWordCountColor()}`}
            >{`${wordCount}/150`}</div>
          </div>

          <label htmlFor="image_url">URL de l'image :</label>
          <input
            type="text"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <div className="button-container">
            <input type="submit" value="Ajouter" disabled={!isResumeValid} />
            <button type="button" onClick={handleDelete}>
              Effacer le formulaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireArticle;
