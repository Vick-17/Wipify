import React, { useEffect, useState } from "react";
import "../styles/page/PageArticle.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Article from "../components/Article";

const Jeux = () => {
  const [videoGames, setVideoGames] = useState([]);

  async function fetchVideoGames() {
    try {
      const response = await fetch("http://localhost:8000/videogames");
      const data = await response.json();
      setVideoGames(data);
    } catch (error) {
      console.error("Error fetching video games:", error);
    }
  }

  useEffect(() => {
    fetchVideoGames();
  }, []);

  function formatDate(stringDate) {
    let newDate = new Date(stringDate);
    return newDate.toLocaleDateString("fr");
  }
  return (
    <div>
      <NavBar />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="article-body">
        {videoGames.length === 0 ? (
          <p>Loading...</p>
        ) : (
          videoGames.map((game) => {
            return (
              <Article
                key={game.id}
                title={game.titre}
                date={formatDate(game.publiDate)}
                content={game.resume}
                image={game.imageUrl}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Jeux;
