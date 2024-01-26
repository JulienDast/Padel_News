import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Article from '../../pages/Article';
import Navbar from '../Navbar';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/article' element={<Article/>} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
