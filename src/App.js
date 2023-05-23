import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
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
        <Route path="/ajoutarticle" element={<AjoutArticle />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
