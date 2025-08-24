import React, { useState } from 'react';
import { Nav, Modal, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (to) => pathname === to;

  const confirmLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    setShowLogout(false);
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
        <div className="pc-divider" />
        <Nav.Link as={Link} to="/pets" className={isActive('/pets') ? 'active' : ''}>
          <span className="pc-icon">🐶</span>
          <span>Pets</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
          <span className="pc-icon">📝</span>
          <span>Care Tasks</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/visits" className={isActive('/visits') ? 'active' : ''}>
          <span className="pc-icon">🩺</span>
          <span>Visits</span>
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/admin')} className={isActive('/admin') ? 'active' : ''}>
          <span className="pc-icon">👥</span>
          <span>Users</span>
        </Nav.Link>
        <div className="pc-divider" />
        <Nav.Link onClick={() => setShowSettings(v => !v)}>
          <span className="pc-icon">⚙️</span>
          <span>Settings</span>
        </Nav.Link>
        {showSettings && (
          <div className="ms-4 d-flex flex-column">
            <Nav.Link onClick={() => navigate('/profile')} className="py-1">Edit Profile</Nav.Link>
            <Nav.Link onClick={() => setShowLogout(true)} className="py-1">Log out</Nav.Link>
          </div>
        )}
      </Nav>

      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowLogout(false)}>Cancel</Button>
          <Button variant="dark" onClick={confirmLogout}>Log out</Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
};

export default Sidebar;
