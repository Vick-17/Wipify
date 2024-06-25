import React, { useEffect, useState } from "react";
import "../styles/page/Jeux.css";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Article from "../components/Articles";
import Loading from "../components/Loading";
import { get } from "../ApiService/axios";

const Jeux = () => {
  const [videoGames, setVideoGames] = useState([]);

  async function fetchVideoGames() {
    try {
      const response = await get("articles");
      const data = await response;

      //Tri des aticles par ordre décroissant de date
      const sortedArticle = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const lastestArticle = sortedArticle.slice(0, 10);

      setVideoGames(lastestArticle);
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
          <>
            <Loading />
          </>
        ) : (
          videoGames.map((game) => {
            return (
              <Article
                key={game.id}
                id={game.id}
                title={game.title}
                date={formatDate(game.date)}
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