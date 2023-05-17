import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/page/PageArticle.css";

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/article/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);
  function formatDate(stringDate) {
    let newDate = new Date(stringDate);
    return newDate.toLocaleDateString("fr");
  }
  return (
    <>
      <NavBar />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="article-container">
        {article ? (
          <>
            <div className="article-container">
              <div className="article-head">
                <div className="article-date">{formatDate(article.date)}</div>
                <div className="article-title">
                  <h5>{article.title}</h5>
                </div>
              </div>
              <div className="article-image">
                <img src={article.imageUrl} alt="Article" />
                <p>{article.content}</p>
              </div>
              <div className="article-content"></div>
            </div>
          </>
        ) : (
          <div>Loading article...</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Article;
