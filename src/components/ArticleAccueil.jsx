import React, { useState, useEffect } from "react";
import Article from "../components/ArticleUne";
import { get } from "../ApiService/axios"
import Loading from "./Loading";

const ArticleAccueil = () => {
  const [articles, setArticle] = useState([]);

  async function fetchVideoGames() {
    try {
      const data = await get('articles');
      setArticle(data)
    } catch (error) {
      console.error(error);
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
        <Loading />
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
