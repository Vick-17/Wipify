import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./pages/Accueil";
import Jeux from "./pages/Jeux";
import Login from "./pages/LogIn";
import Actu from "./pages/Actualité";
import Test from "./pages/Test";
import Video from "./pages/Video";
import Streaming from "./pages/Streaming";
import AjoutArticle from "./pages/FormArticle";
import Article from "./pages/Article";
import AdminPage from "./pages/AdminPage";
import jwt_decode from "jwt-decode";

const App = () => {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(token);
  const role = decodedToken.roles;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Jeux/:id" element={<Article />} />
        <Route path="/" element={<Home />} />
        <Route path="/Jeux" element={<Jeux />} />
        <Route path="/news" element={<Actu />} />
        <Route path="/test" element={<Test />} />
        <Route path="/video" element={<Video />} />
        <Route path="/streaming" element={<Streaming />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/ajoutarticle"
          element={
            role[0] === "ROLE_ADMIN" ? (
              <AjoutArticle />
            ) : (
              <Navigate to="/test" replace />
            )
          }
        />
        <Route
          path="/updateArticle/:id"
          element={
            role[0] === "ROLE_ADMIN" ? (
              <AjoutArticle />
            ) : (
              <Navigate to="/test" />
            )
          }
        />
        <Route
          path="/Admin"
          element={
            role[0] === "ROLE_ADMIN" ? <AdminPage /> : <Navigate to="/test" />
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
