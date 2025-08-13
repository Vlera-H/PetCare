import React, { useMemo, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Sidebar from './Sidebar';
import './Home.css';
import { useData } from './DataContext';

const Home = () => {
  const navigate = useNavigate();
  const { pets, careTasks, visits } = useData();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('firstName') || '';
    setFirstName(storedName);
  }, []);

  // Find closest upcoming visit across all pets
  const nextVisit = useMemo(() => {
    const today = new Date();
    const futureVisits = visits
      .filter(v => new Date(v.visitDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
    if (!futureVisits.length) return null;
    const v = futureVisits[0];
    const pet = pets.find(p => p.id === v.petId) || null;
    return { ...v, pet };
  }, [visits, pets]);

  const stats = useMemo(() => ({
    totalPets: pets.length,
    totalTasks: careTasks.length,
    totalVisits: visits.length,
  }), [pets.length, careTasks.length, visits.length]);

  return (
    <div className={`pc-layout ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      {isSidebarOpen && <Sidebar />}

      <button
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        className="pc-sidebar-toggle"
        onClick={() => setIsSidebarOpen(v => !v)}
      >
        {isSidebarOpen ? '←' : '→'}
      </button>

      <main className="pc-content">
        <div className="pc-header">
          <AppNavbar />
        </div>

        <Container fluid className="px-0">
          {/* Hero */}
          <Row className="welcome-fullscreen align-items-center" style={{ paddingTop: 0, paddingBottom: '1.25rem' }}>
            <Col lg={6} className="welcome-text">
              <h1 className="welcome-title">Welcome{firstName ? `, ${firstName}` : ''}</h1>
              <p className="text-muted mb-4">
                Manage your pets, care tasks, and visits with a clean, friendly dashboard.
              </p>
              <Row className="g-3">
                <Col md={4}>
                  <Card className="shadow-sm h-100 pc-card" role="button" onClick={() => navigate('/pets')}>
                    <Card.Body>
                      <Card.Title className="text-brown">🐶 Manage Pets</Card.Title>
                      <div className="text-muted small">{stats.totalPets} total</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm h-100 pc-card" role="button" onClick={() => navigate('/tasks')}>
                    <Card.Body>
                      <Card.Title className="text-brown">📝 Manage Care Tasks</Card.Title>
                      <div className="text-muted small">{stats.totalTasks} total</div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm h-100 pc-card" role="button" onClick={() => navigate('/visits')}>
                    <Card.Body>
                      <Card.Title className="text-brown">🩺 Manage Visits</Card.Title>
                      <div className="text-muted small">{stats.totalVisits} total</div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="welcome-image text-center">
              <img src="/img/pets.png" alt="Happy pets" className="home-hero-img" />
            </Col>
          </Row>

          {/* Next Vet Visit highlight */}
          <Row className="g-3 mt-1">
            <Col lg={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Next Vet Visit</Card.Title>
                  {nextVisit ? (
                    <div className="d-flex flex-wrap gap-3 align-items-center">
                      <div className="flex-grow-1">
                        <div className="fw-semibold text-brown">{nextVisit.pet ? nextVisit.pet.name : `Pet #${nextVisit.petId}`}</div>
                        <div className="text-muted small">{new Date(nextVisit.visitDate).toLocaleDateString()} — {nextVisit.reason}</div>
                      </div>
                      <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/visits')}>View all visits</Button>
                    </div>
                  ) : (
                    <div className="text-muted">No upcoming visits scheduled.</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;

