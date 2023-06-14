import React, { useEffect, useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";
import "../styles/components/Dashbord.css";

const Dashboard = () => {
  const [roles, setRoles] = useState([]);
  const token = useRef("");
  const [videoGames, setVideoGames] = useState([]);

  async function fetchVideoGames() {
    try {
      const response = await fetch(
        "https://apispringboot-production.up.railway.app/articles"
      );
      const data = await response.json();

      // Tri des articles par ordre décroissant de date
      const sortedArticles = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestArticles = sortedArticles.slice(0, 10);

      setVideoGames(latestArticles);
    } catch (error) {
      console.error("Error fetching video games:", error);
    }
  }

  useEffect(() => {
    token.current = localStorage.getItem("userToken");
    if (token.current !== null) {
      const decodedToken = jwtDecode(token.current);
      setRoles(decodedToken.roles);
    }
    fetchVideoGames();
  }, []);

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
      const response = await fetch(
        `https://apispringboot-production.up.railway.app/article/${id}`,
        {
          headers: headers,
          method: "DELETE",
        }
      );

      if (response.ok && roles[0] === "ROLE_ADMIN") {
        console.log("Article supprimé avec succès !");
        // Mettez à jour la liste des articles après la suppression
        fetchVideoGames();
      } else {
        console.error(
          "Erreur lors de la suppression de l'article :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
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
                <th>ID</th>
                <th>Nom de l'article</th>
                <th>Date de publication</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videoGames.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
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
                          stroke-width="2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M4.5 8H15s0 0 0 0 5 0 5 4.706C20 18 15 18 15 18H6.286"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.5 11.5L4 8l3.5-3.5"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#fff"
                      >
                        <path
                          d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
      <div className="block block2">Bloc 2</div>
      <div className="block block3">Bloc 3</div>
      <div className="block block4">Bloc 4</div>
      <div className="block block5">Bloc 5</div>
    </div>
  );
};

export default Dashboard;
