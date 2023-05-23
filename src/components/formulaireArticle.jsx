// Importation des librairies et composants nécessaires.
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/components/FormulaireArticle.css";

// Déclaration du composant FormulaireArticle.
const FormulaireArticle = () => {
  // Utilisation de useRef pour accéder au contenu de l'éditeur de texte.
  const editorRef = useRef(null);
  
  // Fonction pour logger le contenu de l'éditeur.
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Définition des états pour le titre, le résumé, l'url de l'image et le compte de mots du résumé.
  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Gestionnaire d'événements pour changer le résumé et le nombre de mots.
  const handleResumeChange = (e) => {
    const value = e.target.value;
    setResume(value);
    setWordCount(value.trim().length);
  };

  // Fonction pour gérer la soumission du formulaire.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: titre,
      content: editorRef.current.getContent(),
      resume: resume,
      date: Date.now(),
      imageUrl: imageUrl,
    };

    // Envoi des données du formulaire à l'API.
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
        // Réinitialisation des champs du formulaire après soumission réussie.
        setTitre("");
        setResume("");
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

  // Fonction pour obtenir la couleur de l'indicateur du compte de mots en fonction du nombre de mots.
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

  // Vérifie si le résumé est valide (moins de 150 caractères).
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
          <div className="form-editor">
            <Editor
              ref={editorRef}
              id="contenu"
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 600,
                menubar: "insert",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "image | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                images_file_types: "jpg,svg,webp",
              }}
            />
            <button onClick={log}>Log editor content</button>
          </div>

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

          <div className="button-container">
            <input type="submit" value="Ajouter" disabled={!isResumeValid} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireArticle;
