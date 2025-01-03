import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Generate from './pages/Generate.jsx';
import TimeTracker from './components/tracking/TimeTracker.jsx';
import Community from './pages/Community.jsx';
import SessionTracker from './components/tracking/SessionTracker.jsx';
import DashboardTab from './components/common/DashboardTab.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App = () => {
  return (
    <>
      <TimeTracker />
      <SessionTracker />
      <DashboardTab />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
};

export default App;