import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Generate from './pages/Generate.jsx';
import TimeTracker from './components/tracking/TimeTracker.jsx';
import Community from './pages/Community.jsx';
import SessionTracker from './components/tracking/SessionTracker.jsx';
import DashboardTab from './components/common/DashboardTab.jsx';
import Dashboard from './pages/Dashboard.jsx';

/**
 * Root Application Component
 *
 * This component defines the main structure of the application.
 * - Includes global trackers (TimeTracker & SessionTracker)
 * - Displays the floating dashboard tab
 * - Manages all route definitions using React Router
 */

const App = () => {
  return (
    <>
      {/* Global Trackers */}
      <TimeTracker /> {/* Tracks total time spent on the site */}
      <SessionTracker /> {/* Tracks session start and end */}

      {/* Floating Dashboard Navigation */}
      <DashboardTab />

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/generate" element={<Generate/>} /> {/* Melody Generation Page */}
        <Route path="/community" element={<Community/>} /> {/* Community Page */}
        <Route path="/dashboard" element={<Dashboard/>} /> {/* Analytics Dashboard */}
      </Routes>
    </>
  );
};

export default App;