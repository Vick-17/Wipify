import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/page/PageArticle.css";
import jwt_decode from "jwt-decode";

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
          const response = await fetch(`https://apispringboot-production.up.railway.app/article/${id}`);
          const data = await response.json();
          setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
  
    fetchArticle();
  }, [id, navigate]);
  


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

      {article ? (
        <div className="article-container">
          <div className="article-head">
            <div className="article-date">{formatDate(article.date)}</div>
            <div className="article-title">
              <h5>{article.title}</h5>
            </div>
          </div>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
      ) : (
        <div>Loading article...</div>
      )}

      <Footer />
    </>
  );
};

export default Article;
