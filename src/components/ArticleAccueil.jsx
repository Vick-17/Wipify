import React, { useState, useEffect } from "react";
import Article from "../components/ArticleUne";

const ArticleAccueil = () => {
  const [articles, setArticle] = useState([]);

  async function fetchVideoGames() {
    try {
      const response = await fetch(
        "https://apispringboot-production.up.railway.app/articles"
      );
      const data = await response.json();

      //Tri des aticles par ordre décroissant de date
      const sortedArticle = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const lastestArticle = sortedArticle.slice(0, 10);

      setArticle(lastestArticle);
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
    <>
      {articles.length === 0 ? (
        <>Chargement...</>
      ) : (
        articles.map((game) => {
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
    </>
  );
};

export default ArticleAccueil;
