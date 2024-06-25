import React, { useEffect, useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import "../styles/components/Dashbord.css";
import { get, post, del } from "../ApiService/axios";

const Dashboard = () => {
  const [roles, setRoles] = useState([]);
  const token = useRef("");
  const [videoGames, setVideoGames] = useState([]);
  const [videoYt, setVideoYt] = useState([]);
  const [videoData, setVideoData] = useState({
    name: "",
    url: ""
  });

  const handleAddUrl = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.current}`,
    };

    try {
      const response = await post('youtubevideo', videoData, headers);
      console.log('Réponse de l\'API: ', response);
      fetchVideoUrl(); // Refresh video list after adding new video
    } catch (error) {
      console.error('Erreur lors de l\'appel POST à l\'API:', error.message);
    }

    setVideoData({
      name: "",
      url: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    token.current = localStorage.getItem("userToken");
    if (token.current !== null) {
      const decodedToken = jwtDecode(token.current);
      setRoles(decodedToken.roles);
    }
    fetchVideoGames();
    fetchVideoUrl();
  }, []);

  async function fetchVideoGames() {
    try {
      const response = await get("articles");
      const data = await response;

      const sortedArticles = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestArticles = sortedArticles.slice(0, 10);

      setVideoGames(latestArticles);
    } catch (error) {
      console.error("Error fetching video games:", error);
    }
  }

  async function fetchVideoUrl() {
    try {
      const response = await get("youtubeVideo");
      const data = await response;

      const sortedVideo = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestVideo = sortedVideo.slice(0, 10);

      setVideoYt(latestVideo);
    } catch (error) {
      console.error("Error fetching video games:", error);
    }
  }

  function formatDate(stringDate) {
    let newDate = new Date(stringDate);
    return newDate.toLocaleDateString("fr");
  }

  const handleDelete = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      };
      const response = await del(`articles/${id}`, headers);

      if (response.status === 204) {
        console.log("Vidéo supprimée avec succès !");
        fetchVideoGames(); // Rafraîchir la liste des vidéos
      } else if (response.status === 404) {
        console.error("Vidéo non trouvée. ID:", id);
      } else {
        console.error("Erreur lors de la suppression de la vidéo :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      console.error("Vous ne possédez pas les droits");
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      };

      const response = await del(`youtubeVideo/${id}`, headers);

      if (response.status === 204) {
        console.log("Vidéo supprimée avec succès !");
        fetchVideoUrl(); // Rafraîchir la liste des vidéos
      } else if (response.status === 404) {
        console.error("Vidéo non trouvée. ID:", id);
      } else {
        console.error("Erreur lors de la suppression de la vidéo :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la vidéo :", error);
      console.error("Vous ne possédez pas les droits");
    }
  };


  return (
    <div className="dashboard">
      <div className="block block1">
        <h5>Liste des articles</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nom de l'article</th>
                <th>Date de publication</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videoGames.map((article) => (
                <tr key={article.id}>
                  <td>
                    <NavLink
                      style={{ color: "black" }}
                      to={`/Jeux/${article.id}`}
                    >
                      {article.title}
                    </NavLink>
                  </td>
                  <td>{formatDate(article.date)}</td>
                  <td>
                    <NavLink to={`/updateArticle/${article.id}`}>
                      <button className="update-btn">
                        <span className="btn-content">Modifier</span>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          strokeWitdth="2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M4.5 8H15s0 0 0 0 5 0 5 4.706C20 18 15 18 15 18H6.286"
                            stroke="#fff"
                            strokeWitdth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M7.5 11.5L4 8l3.5-3.5"
                            stroke="#fff"
                            strokeWitdth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </NavLink>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(article.id)}
                    >
                      <span className="btn-content">Supprimer</span>
                      <svg
                        width="20px"
                        height="20px"
                        strokeWitdth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#fff"
                      >
                        <path
                          d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                          stroke="#fff"
                          strokeWitdth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <NavLink to="/ajoutarticle">
            <button className="add-article-button">Ajouter un article</button>
          </NavLink>
        </div>
      </div>
      <div className="block block2">
        <h5>Ajouter une video youtube</h5>
        <div className="input-container">
          <input
            type="text"
            placeholder="Entrez une URL"
            name="url"
            value={videoData.url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Entrez un nom"
            name="name"
            value={videoData.name}
            onChange={handleInputChange}
          />
          <button onClick={handleAddUrl}>Ajouter</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nom de la vidéo</th>
                <th>Date de publication</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {videoYt.map((video) => (
                <tr key={video.id}>
                  <td>{video.name}</td>
                  <td>{formatDate(video.date)}</td>
                  <td>                    
                    <button
                    className="delete-btn"
                      onClick={() => handleDeleteVideo(video.id)}
                  >
                    <span className="btn-content">Supprimer</span>
                    <svg
                      width="20px"
                      height="20px"
                      strokeWitdth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#fff"
                    >
                      <path
                        d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                        stroke="#fff"
                        strokeWitdth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button></td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="block block3">Bloc 3</div>
      <div className="block block4">Bloc 4</div>
      <div className="block block5">Bloc 5</div>
    </div>
  );
};

export default Dashboard;
