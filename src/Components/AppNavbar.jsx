import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/welcome');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">🐾 Pet Care</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/pets">Pets</Nav.Link>
            <Nav.Link as={NavLink} to="/tasks">Care Tasks</Nav.Link>
            <Nav.Link as={NavLink} to="/visits">Visits</Nav.Link>
            <Nav.Link as={NavLink} to="/care-guide">Care Guide</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown align="end" title="⋮" id="settings-menu">
              <NavDropdown.Item onClick={() => navigate('/profile')}>Edit Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
