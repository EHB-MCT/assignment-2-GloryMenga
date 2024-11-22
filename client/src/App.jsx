import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Generate from './pages/Generate.jsx';
import AboutUs from './pages/AboutUs.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<Generate/>} />
      <Route path="/aboutus" element={<AboutUs/>} />
    </Routes>
  );
};

export default App;
