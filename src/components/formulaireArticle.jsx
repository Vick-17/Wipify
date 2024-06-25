// Importation des librairies et composants nécessaires.
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/components/FormulaireArticle.css";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { put, post, get } from "../ApiService/axios"

const FormulaireArticle = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Définition des états pour le titre, le résumé, l'url de l'image et le compte de mots du résumé.
  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const token = useRef("");

  useEffect(() => {
    token.current = localStorage.getItem("userToken");
    if (token.current !== null) {
      const decodedToken = jwtDecode(token.current);
      setRoles(decodedToken.roles);
    }
  }, []);

  // Gestionnaire d'événements pour changer le résumé et le nombre de mots.
  const handleResumeChange = (e) => {
    const value = e.target.value;
    setResume(value);
    setWordCount(value.trim().length);
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.current}`,
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = {
      id: id,
      title: titre,
      content: editorRef.current.getContent(),
      resume: resume,
      imageUrl: imageUrl,
    };

    try {
      const response = await put(`articles/${id}`, formData, headers);
      if (response.ok && roles.includes("ROLE_ADMIN")) {
        console.log("Données mises à jour avec succès !");
        navigate(`/Jeux/${id}`);
      } else {
        console.error("Erreur lors de la mise à jour des données :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
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

    try {
      const response = await post("articles", formData, headers);

      if (response) {
        console.log("Données envoyées avec succès !");
        const newArticleId = response.id;

        setTitre("");
        setResume("");
        setImageUrl("");
        setWordCount(0);

        navigate(`/Jeux/${newArticleId}`);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error.message);
    }
  };



  useEffect(() => {
    if (id !== undefined) {
      setIsEditMode(true);
      const fetchArticle = async () => {
        try {
          const response = await get(`articles/${id}`)
          const data = await response;

          setArticle(data);
          setTitre(data.title);
          setResume(data.resume);
          setImageUrl(data.imageUrl);
          setEditorContent(data.content);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de l'article :",
            error
          );
        }
      };
      fetchArticle();
    }
  }, [id]);

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
        <form onSubmit={isEditMode ? handleEdit : handleSubmit}>
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            id="titre"
            value={titre || (article && article.title) || ""}
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
              initialValue={editorContent}
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
              value={resume || (article && article.resume) || ""}
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
            value={imageUrl || (article && article.imageUrl) || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <div className="button-container">
            <input
              type="submit"
              value={isEditMode ? "Modifier" : "Ajouter"}
              disabled={!isResumeValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireArticle;
