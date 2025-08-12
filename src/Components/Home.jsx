import React, { useMemo, useState } from 'react';
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
    <div className="pc-layout">
      <Sidebar />

      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Home</h3>
          <AppNavbar />
        </div>

        <Container fluid className="px-0">
          <Row className="align-items-end g-3">
            <Col xs={12} md={6}>
              <Form.Label className="fw-semibold">Select Pet</Form.Label>
              <Form.Select
                value={selectedPetId || ''}
                onChange={(e) => setSelectedPetId(Number(e.target.value) || null)}
              >
                {pets.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — {p.breed}</option>
                ))}
                {!pets.length && <option value="">No pets yet</option>}
              </Form.Select>
            </Col>
            <Col xs={12} md="auto" className="d-flex gap-2 flex-wrap">
              <Button variant="primary" onClick={() => navigate('/pets')}>Manage Pets</Button>
              <Button variant="outline-primary" onClick={() => navigate('/tasks')} disabled={!pets.length}>Manage Tasks</Button>
              <Button variant="outline-secondary" onClick={() => navigate('/visits')} disabled={!pets.length}>Manage Visits</Button>
            </Col>
          </Row>

          <div className="pc-kpis my-3">
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

          {selectedPet && (
            <Row className="align-items-center mb-2">
              <Col>
                <h5 className="m-0" style={{ color: '#5c4033' }}>{selectedPet.name} — {selectedPet.breed}</h5>
                <small className="text-muted">Born: {new Date(selectedPet.birthDate).toLocaleDateString()}</small>
              </Col>
            </Row>
          )}

          {/* Keep Home clean: no long tables. Quick links below. */}
          <Row className="g-3 mt-2">
            <Col xs="12" md="auto" className="d-flex gap-2 flex-wrap">
              <Button size="sm" variant="success" onClick={() => navigate('/pets')}>+ Add Pet</Button>
              <Button size="sm" variant="success" onClick={() => navigate('/tasks')} disabled={!pets.length}>+ Add Task</Button>
              <Button size="sm" variant="success" onClick={() => navigate('/visits')} disabled={!pets.length}>+ Add Visit</Button>
              <Button size="sm" variant="outline-dark" onClick={() => navigate('/care-guide')}>📘 Care Guide</Button>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;

