import React, { useMemo, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, ProgressBar, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

  const selectedTasksTotal = tasksForPet.length;
  const selectedTasksCompleted = tasksForPet.filter(t => t.isCompleted).length;
  const selectedTasksPct = selectedTasksTotal ? Math.round((selectedTasksCompleted / selectedTasksTotal) * 100) : 0;
  const nextPendingTasks = tasksForPet.filter(t => !t.isCompleted).sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0,3);
  const nextVisits = visitsForPet.sort((a,b) => new Date(a.visitDate) - new Date(b.visitDate)).slice(0,3);

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
          <div />
          <div className="d-flex gap-2">
            <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/pets')}>Pets</Button>
            <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/tasks')}>Tasks</Button>
            <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/visits')}>Visits</Button>
            <Button variant="orange" className="custom-btn btn-orange" onClick={() => navigate('/care-guide')}>Care Guide</Button>
          </div>
        </div>

        <Container fluid className="px-0">
          {/* Hero section: welcome + big image */}
          <Row className="welcome-fullscreen align-items-center" style={{ paddingTop: 0, paddingBottom: '1.25rem' }}>
            <Col lg={6} className="welcome-text">
              <h1 className="welcome-title">Welcome{firstName ? `, ${firstName}` : ''}</h1>
              <p className="text-muted mb-4">
                Track pets, care tasks, and visits all in one place. Select a pet to focus or jump into managing details.
              </p>

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

              <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                <span className="text-brown">Wanna add a new pet?</span>
                <Button size="sm" className="custom-btn btn-orange" onClick={() => navigate('/pets')}>Add Pet</Button>
                <Button size="sm" variant="outline-brown" className="custom-btn" onClick={() => navigate('/care-guide')}>Care Guide</Button>
              </div>
            </Col>
            <Col lg={6} className="welcome-image text-center">
              <img src="/img/pets.png" alt="Happy pets" className="home-hero-img" />
            </Col>
          </Row>

          {/* Overall KPI cards */}
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

          {/* Focus pet status */}
          {selectedPet && (
            <Row className="g-3 mt-1">
              <Col lg={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{selectedPet.name} — {selectedPet.breed}</span>
                      <small className="text-muted">Born: {new Date(selectedPet.birthDate).toLocaleDateString()}</small>
                    </Card.Title>
                    <div className="mb-2">
                      <strong>Task Progress</strong>
                      <ProgressBar now={selectedTasksPct} label={`${selectedTasksPct}%`} className="mt-1" visuallyHidden={false} />
                      <div className="text-muted small mt-1">{selectedTasksCompleted} of {selectedTasksTotal} tasks completed</div>
                    </div>
                    <div>
                      <strong>Visits</strong>
                      <div className="text-muted small">{visitsForPet.length} total</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Row className="g-3">
                  <Col md={12}>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title>Next pending tasks</Card.Title>
                        {nextPendingTasks.length ? (
                          <ul className="mb-0">
                            {nextPendingTasks.map(t => (
                              <li key={t.id}>{t.description} — {new Date(t.dueDate).toLocaleDateString()}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-muted small">No pending tasks</div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title>Upcoming visits</Card.Title>
                        {nextVisits.length ? (
                          <ul className="mb-0">
                            {nextVisits.map(v => (
                              <li key={v.id}>{new Date(v.visitDate).toLocaleDateString()} — {v.reason}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-muted small">No upcoming visits</div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Home;

