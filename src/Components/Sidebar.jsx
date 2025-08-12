import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => pathname === to;

  const handleLogout = () => {
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
        <Nav.Link as={Link} to="/care" className={isActive('/care') ? 'active' : ''}>
          <span className="pc-icon">📝</span>
          <span>Care</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/visits" className={isActive('/visits') ? 'active' : ''}>
          <span className="pc-icon">🩺</span>
          <span>Visits</span>
        </Nav.Link>
      </Nav>

      <div className="pc-sidebar-footer">
        <Nav className="flex-column pc-nav">
          <Nav.Link as={Link} to="/settings" className={isActive('/settings') ? 'active' : ''}>
            <span className="pc-icon">⚙️</span>
            <span>Settings</span>
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <span className="pc-icon">🚪</span>
            <span>Logout</span>
          </Nav.Link>
        </Nav>
      </div>
    </aside>
  );
};

export default Sidebar;



