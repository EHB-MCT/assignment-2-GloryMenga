import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Generate from './pages/Generate.jsx';
import TimeTracker from './components/TimeTracker.jsx';
import Community from './pages/Community.jsx';

const App = () => {
  return (
    <>
      <TimeTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate/>} />
        <Route path="/community" element={<Community/>} />
      </Routes>
    </>
  );
};

export default App;