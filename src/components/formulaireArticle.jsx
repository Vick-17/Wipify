import React, { useState } from "react";
import "../styles/components/FormulaireArticle.css";

const FormulaireArticle = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [resume, setResume] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [champs, setChamps] = useState([{ photo: "", texte: "" }]);

  const handleResumeChange = (e) => {
    const value = e.target.value;
    setResume(value);
    setWordCount(value.trim().length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: titre,
      content: contenu,
      resume: resume,
      date: Date.now(),
      imageUrl: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:8000/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Données envoyées avec succès !");
        setTitre("");
        setContenu("");
        setResume("");
        setImageUrl("");
        setWordCount(0);
        setChamps([{ photo: "", texte: "" }]);
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
    setImageUrl("");
    setWordCount(0);
    setChamps([{ photo: "", texte: "" }]);
  };

  const handleAddField = () => {
    setChamps([...champs, { photo: "", texte: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedChamps = [...champs];
    updatedChamps.splice(index, 1);
    setChamps(updatedChamps);
  };

  const handlePhotoChange = (index, e) => {
    const value = e.target.value;
    const updatedChamps = [...champs];
    updatedChamps[index].photo = value;
    setChamps(updatedChamps);
  };

  const handleTexteChange = (index, e) => {
    const value = e.target.value;
    const updatedChamps = [...champs];
    updatedChamps[index].texte = value;
    setChamps(updatedChamps);
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

          <label htmlFor="contenu">Premier paragraphe :</label>
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
              style={{ whiteSpace: "pre-wrap" }}
              value={resume}
              onChange={handleResumeChange}
              maxLength={150}
              required
              className={!isResumeValid ? "invalid" : ""}
              disabled={!isResumeValid}
            ></textarea>
            <div className={`word-count ${getWordCountColor()}`}>
              {`${wordCount}/150`}
            </div>
          </div>

          <label htmlFor="image_url">URL de l'image :</label>
          <input
            type="text"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          {champs.map((champ, index) => (
            <div key={index} className="champ-container">
              <label htmlFor={`photo_${index}`}>url photo :</label>
              <input
                type="text"
                id={`photo_${index}`}
                value={champ.photo}
                onChange={(e) => handlePhotoChange(index, e)}
              />

              <label htmlFor={`texte_${index}`}>Paragraphe :</label>
              <textarea
                id={`texte_${index}`}
                value={champ.texte}
                onChange={(e) => handleTexteChange(index, e)}
              ></textarea>

              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="remove-button"
              >
                Supprimer
              </button>
            </div>
          ))}

          <div className="button-container">
            <div>
              <button type="button" onClick={handleDelete}>
                Effacer le formulaire
              </button>
              <button type="button" onClick={handleAddField}>
                Ajouter un champ
              </button>
            </div>
            <input type="submit" value="Ajouter" disabled={!isResumeValid} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireArticle;
