import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

/**
 * DashboardTab Component
 * 
 * This floating tab serves as a shortcut to the dashboard page.
 * It expands when hovered and is hidden when the user is already on the dashboard.
 */
function DashboardTab() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Hide the dashboard tab if the user is already on the dashboard page
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <Link 
      to="/dashboard"
      className={`dashboard-tab ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LayoutDashboard size={24} />
      {isHovered && <span>Dashboard</span>}
    </Link>
  );
}

export default DashboardTab;