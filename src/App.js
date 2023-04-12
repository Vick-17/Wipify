import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Accueil';
import Films from './pages/Films';
import Series from './pages/Series';
import Jeux from './pages/Jeux';
import Livres from './pages/Livres';
import About from './pages/About';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/films' element={<Films />}/>
                <Route path='/series' element={<Series />}/>
                <Route path='/jeux' element={<Jeux />}/>
                <Route path='/livres' element={<Livres />}/>
                <Route path='/about' element={<About />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;