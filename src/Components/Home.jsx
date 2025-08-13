import React, { useMemo, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './Home.css';
import { useData } from './DataContext';

const tips = [
  'Brush your pet regularly to reduce shedding and mats.',
  'Use positive reinforcement with small, healthy treats.',
  'Keep fresh water available at all times.',
  'Schedule regular vet check-ups to stay ahead of issues.',
  'Rotate toys weekly to keep playtime engaging.',
];

const Home = () => {
  const navigate = useNavigate();
  const { pets, careTasks, visits } = useData();

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('firstName') || '';
    setFirstName(storedName);
  }, []);

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

  const nextCareTask = useMemo(() => {
    const today = new Date();
    const futureTasks = careTasks
      .filter(t => !t.isCompleted && new Date(t.dueDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    if (!futureTasks.length) return null;
    const t = futureTasks[0];
    const pet = pets.find(p => p.id === t.petId) || null;
    return { ...t, pet };
  }, [careTasks, pets]);

  const stats = useMemo(() => ({
    totalPets: pets.length,
    totalTasks: careTasks.length,
    totalVisits: visits.length,
  }), [pets.length, careTasks.length, visits.length]);

  const recentActivity = useMemo(() => {
    const taskActs = careTasks.slice(-3).map(t => ({
      id: `t-${t.id}`,
      label: `Task: ${t.description}`,
      when: new Date(t.dueDate).toLocaleDateString(),
    }));
    const visitActs = visits.slice(-3).map(v => ({
      id: `v-${v.id}`,
      label: `Visit: ${v.reason}`,
      when: new Date(v.visitDate).toLocaleDateString(),
    }));
    return [...taskActs, ...visitActs].slice(0, 5);
  }, [careTasks, visits]);

  const spotlightPet = pets[0] || null;
  const tipOfDay = tips[(new Date().getDate()) % tips.length];

  return (
    <div>
      <AppNavbar />

      <Container fluid className="px-0">
        {/* Quick Actions */}
        <Row className="g-3">
          <Col lg={12}>
            <div className="home-band">
              <div className="home-section-title">
                <span>Quick Actions</span>
              </div>
              <div className="quick-actions">
                <Button className="quick-action-btn" onClick={() => navigate('/pets')}>+ Add Pet</Button>
                <Button className="quick-action-btn" onClick={() => navigate('/tasks')}>+ Add Care Task</Button>
                <Button className="quick-action-btn" onClick={() => navigate('/visits')}>+ Add Visit</Button>
                <Button className="quick-action-btn" onClick={() => navigate('/care-guide')}>Open Care Guide</Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Highlights row */}
        <Row className="g-3 mt-1">
          <Col lg={6}>
            <Card className="shadow-sm h-100">
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
          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Next Care Task</Card.Title>
                {nextCareTask ? (
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-brown">{nextCareTask.description}</div>
                      <div className="text-muted small">Due {new Date(nextCareTask.dueDate).toLocaleDateString()} — {nextCareTask.pet ? nextCareTask.pet.name : `Pet #${nextCareTask.petId}`}</div>
                    </div>
                    <Button variant="orange" className="custom-btn btn-orange" onClick={() => navigate('/tasks')}>View tasks</Button>
                  </div>
                ) : (
                  <div className="text-muted">No pending tasks.</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Activity + Tips */}
        <Row className="g-3 mt-1">
          <Col lg={7}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-section-title"><span>Recent Activity</span></div>
                {recentActivity.length ? (
                  <ul className="activity-list">
                    {recentActivity.map(a => (
                      <li key={a.id} className="activity-item">
                        <span>{a.label}</span>
                        <span className="activity-meta">{a.when}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted">No recent activity.</div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-section-title"><span>Care Tip of the Day</span></div>
                <div className="badge-pill orange mb-2">Daily tip</div>
                <div className="text-brown fw-semibold">{tipOfDay}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pet Spotlight */}
        {spotlightPet && (
          <Row className="g-3 mt-1">
            <Col lg={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="home-section-title"><span>Pet Spotlight</span></div>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <img src="/img/pet-spotlight.png" alt="Pet" style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ead9c7' }} />
                    <div className="flex-grow-1">
                      <div className="fw-bold text-brown" style={{ fontSize: 18 }}>{spotlightPet.name}</div>
                      <div className="activity-meta">{spotlightPet.breed} — Born {new Date(spotlightPet.birthDate).toLocaleDateString()}</div>
                    </div>
                    <Button className="quick-action-btn" onClick={() => navigate('/pets')}>View details</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;

