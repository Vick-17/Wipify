import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Accueil';
import Jeux from './pages/Jeux';
import Login from './pages/LogIn';
import Actu from './pages/Actualité';
import Test from './pages/Test';
import Video from './pages/Video';
import Streaming from './pages/Streaming';
import AjoutArticle from './pages/FormArticle';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Jeux' element={<Jeux />}/>
                <Route path='/news' element={<Actu />}/>
                <Route path='/test' element={<Test />}/>
                <Route path='/video' element={<Video />}/>
                <Route path='/streaming' element={<Streaming />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/ajoutarticle' element={<AjoutArticle />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;