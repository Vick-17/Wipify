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
  const token = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(token);
  const role = decodedToken.roles;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        if (role[0] === "[ROLE_ADMIN]") {
          const response = await fetch(`http://localhost:8000/article/${id}`, {
            headers: headers,
          });
          const data = await response.json();
          setArticle(data);
        } else {
          navigate("/");
          console.error("Accès non autorisé");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
  
    fetchArticle();
  }, [id, role, navigate]);
  


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
