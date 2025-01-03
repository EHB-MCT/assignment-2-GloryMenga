import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

function DashboardTab() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

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