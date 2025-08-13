import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const isActive = (to) => pathname === to;

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/welcome');
  };

  return (
    <aside className="pc-sidebar">
      <div className="pc-brand">🐾 Pet Care</div>
      <Nav className="flex-column pc-nav">
        <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
          <span className="pc-icon">🏠</span>
          <span>Home</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
          <span className="pc-icon">📊</span>
          <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/pets" className={isActive('/pets') ? 'active' : ''}>
          <span className="pc-icon">🐶</span>
          <span>Pets</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
          <span className="pc-icon">📝</span>
          <span>Tasks</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/visits" className={isActive('/visits') ? 'active' : ''}>
          <span className="pc-icon">🩺</span>
          <span>Visits</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/care-guide" className={isActive('/care-guide') ? 'active' : ''}>
          <span className="pc-icon">📘</span>
          <span>Care Guide</span>
        </Nav.Link>
        <div className="pc-divider" />
        <Nav.Link onClick={() => setShowSettings(v => !v)}>
          <span className="pc-icon">⚙️</span>
          <span>Settings</span>
        </Nav.Link>
        {showSettings && (
          <div className="ms-4 d-flex flex-column">
            <Nav.Link onClick={() => navigate('/profile')} className="py-1">Edit Profile</Nav.Link>
            <Nav.Link onClick={handleLogout} className="py-1">Log out</Nav.Link>
          </div>
        )}
      </Nav>
    </aside>
  );
};

export default Sidebar;