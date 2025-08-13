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
    <Navbar bg="light" expand="lg" className="shadow-sm header-tall w-100">
      <Container fluid className="align-items-center">
        {/* Far left brand */}
        <Navbar.Brand as={NavLink} to="/" className="brand-big">🐾 Pet Care</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="w-100">
          <div className="d-flex w-100 align-items-center">
            {/* Center links */}
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/pets">Pets</Nav.Link>
              <Nav.Link as={NavLink} to="/tasks">Care Tasks</Nav.Link>
              <Nav.Link as={NavLink} to="/visits">Visits</Nav.Link>
              <Nav.Link as={NavLink} to="/care-guide">Care Guide</Nav.Link>
            </Nav>

            {/* Far right settings */}
            <Nav className="ms-auto">
              <NavDropdown align="end" title="⋮" id="settings-menu">
                <NavDropdown.Item onClick={() => navigate('/profile')}>Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
