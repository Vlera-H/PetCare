import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { clearData } = useData();
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    // Pastro të gjitha të dhënat e aplikacionit
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    
    // Pastro të dhënat e aplikacionit duke përdorur clearData
    clearData();
    
    setShowLogout(false);
    
    // Redirect në welcome dhe rifresko faqen për të pastruar state
    navigate('/welcome', { replace: true });
    window.location.reload(); // Rifresko për të pastruar të gjitha state-et
  };

  return (
    <Navbar expand="lg" className="shadow-sm header-tall w-100 pc-navbar">
      <Container fluid className="align-items-center">
        {/* Far left brand */}
        <Navbar.Brand as={NavLink} to="/" className="brand-big">🐾 Pet Care</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="w-100">
          <div className="d-flex w-100 align-items-center">
            {/* Center links */}
            <Nav className="mx-auto pc-nav-links">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/pets">Pets</Nav.Link>
              <Nav.Link as={NavLink} to="/tasks">Care Tasks</Nav.Link>
              <Nav.Link as={NavLink} to="/visits">Visits</Nav.Link>
              <Nav.Link as={NavLink} to="/care-guide">Care Guide</Nav.Link>
            </Nav>

            {/* Far right settings */}
            <Nav className="ms-auto pc-nav-right">
              <NavDropdown align="end" title="⋮" id="settings-menu">
                <NavDropdown.Item onClick={() => navigate('/profile')}>Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setShowLogout(true)}>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>

      {/* Styled logout confirmation modal */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowLogout(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={confirmLogout}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default AppNavbar;




