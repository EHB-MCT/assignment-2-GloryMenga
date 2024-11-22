import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneratePage from './pages/GeneratePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/generate" element={<GeneratePage />} />
    </Routes>
  );
};

export default App;
