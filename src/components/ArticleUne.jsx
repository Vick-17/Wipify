import React, { useEffect, useState } from "react";
import ArticleAccueil from "./Articles";
import Loading from "../components/Loading";

const ArticleUne = () => {
  const [articles, setArticle] = useState([]);

  async function fetchArticle() {
    try {
      const responce = await fetch(
        "https://apispringboot-production.up.railway.app/articles"
      );
      const data = await responce.json();

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
    fetchArticle();
  }, []);

  function formatDate(stringDate) {
    let newDate = new Date(stringDate);
    return newDate.toLocaleDateString("fr");
  }
  return (
    <>
      {articles.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        articles.map((article) => {
          return (
            <div className="newsArticle" key={article.id}>
              <ArticleAccueil
                id={article.id}
                title={article.title}
                date={formatDate(article.date)}
                content={article.resume}
                image={article.imageUrl}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default ArticleUne;
