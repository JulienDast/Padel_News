import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Articles from '../../pages/Articles';
import Navbar from '../Navbar';
import Article from '../../pages/Article';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/articles' element={<Articles/>} />
          <Route path='*' element={<Navigate to="/" />} />
          <Route path='/articles/:id' element={<Article/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
