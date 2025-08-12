import React, { useMemo, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Sidebar from './Sidebar';
import './Home.css';
import { useData } from './DataContext';

const Home = () => {
  const navigate = useNavigate();
  const { pets, careTasks, visits } = useData();

  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('firstName') || '';
    setFirstName(storedName);
  }, []);

  const selectedPet = useMemo(
    () => pets.find(p => p.id === selectedPetId) || null,
    [pets, selectedPetId]
  );

  const tasksForPet = useMemo(
    () => careTasks.filter(t => !selectedPetId || t.petId === selectedPetId),
    [careTasks, selectedPetId]
  );

  const visitsForPet = useMemo(
    () => visits.filter(v => !selectedPetId || v.petId === selectedPetId),
    [visits, selectedPetId]
  );

  const totalPets = pets.length;
  const pendingTasksCount = tasksForPet.filter(t => !t.isCompleted).length;
  const upcomingVisitsCount = visitsForPet.length;

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
          <h3 className="m-0" style={{ color: '#5c4033' }}>Home</h3>
          <AppNavbar />
        </div>

        <Container fluid className="px-0">
          {/* Hero section: welcome + big image */}
          <Row className="welcome-fullscreen align-items-center" style={{ paddingTop: 0, paddingBottom: '1.25rem' }}>
            <Col lg={6} className="welcome-text">
              <h1 className="welcome-title">Welcome{firstName ? `, ${firstName}` : ''}</h1>
              {/*<h2 className="welcome-subtitle">Your Pet Care Dashboard</h2>*/}
              <p className="text-muted mb-4">
                Track pets, care tasks, and visits all in one place. Select a pet to focus or jump into managing details.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/pets')}>Manage Pets</Button>
                <Button variant="orange" className="custom-btn btn-orange" onClick={() => navigate('/tasks')} disabled={!pets.length}>Manage Tasks</Button>
                <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/visits')} disabled={!pets.length}>Manage Visits</Button>
              </div>

              <Form.Group className="mb-3" style={{ maxWidth: 420 }}>
                <Form.Label className="fw-semibold">Focus Pet</Form.Label>
                <Form.Select
                  value={selectedPetId || ''}
                  onChange={(e) => setSelectedPetId(Number(e.target.value) || null)}
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name} — {p.breed}</option>
                  ))}
                  {!pets.length && <option value="">No pets yet</option>}
                </Form.Select>
              </Form.Group>

              {/* <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                <span className="text-brown">Wanna add a new pet?</span>
                <Button size="sm" className="custom-btn btn-orange" onClick={() => navigate('/pets')}>Add Pet</Button>
                <Button size="sm" variant="outline-brown" className="custom-btn" onClick={() => navigate('/care-guide')}>Care Guide</Button>
              </div> */}
            </Col>
            <Col lg={6} className="welcome-image text-center">
              <img src="/img/pets.png" alt="Happy pets" className="home-hero-img" />
            </Col>
          </Row>

          {/* KPI cards */}
          <div className="home-kpis my-3">
            <div className="pc-card">
              <h6>Total Pets</h6>
              <div className="pc-metric">{totalPets}</div>
            </div>
            <div className="pc-card">
              <h6>Pending Tasks</h6>
              <div className="pc-metric">{pendingTasksCount}</div>
            </div>
            <div className="pc-card">
              <h6>Upcoming Visits</h6>
              <div className="pc-metric">{upcomingVisitsCount}</div>
            </div>
          </div>

          {/* Quick glance of selected pet */}
          {selectedPet && (
            <Row className="align-items-center mb-2">
              <Col>
                <h5 className="m-0" style={{ color: '#5c4033' }}>{selectedPet.name} — {selectedPet.breed}</h5>
                <small className="text-muted">Born: {new Date(selectedPet.birthDate).toLocaleDateString()}</small>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Home;



