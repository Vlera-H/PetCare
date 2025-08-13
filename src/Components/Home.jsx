import React, { useMemo, useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
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
    setFirstName(localStorage.getItem('firstName') || '');
  }, []);

  const totalPets = pets.length;
  const totalTasks = careTasks.length;
  const completedTasks = careTasks.filter(t => t.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const upcomingVisitsCount = useMemo(() => {
    const today = new Date();
    return visits.filter(v => new Date(v.visitDate) >= new Date(today.toDateString())).length;
  }, [visits]);

  const nextVisit = useMemo(() => {
    const today = new Date();
    const f = visits
      .filter(v => new Date(v.visitDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));
    if (!f.length) return null;
    const v = f[0];
    return { ...v, pet: pets.find(p => p.id === v.petId) || null };
  }, [visits, pets]);

  const nextTask = useMemo(() => {
    const today = new Date();
    const f = careTasks
      .filter(t => !t.isCompleted && new Date(t.dueDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    if (!f.length) return null;
    const t = f[0];
    return { ...t, pet: pets.find(p => p.id === t.petId) || null };
  }, [careTasks, pets]);

  const timeline = useMemo(() => {
    const today = new Date();
    const taskEvents = careTasks
      .filter(t => new Date(t.dueDate) >= new Date(today.toDateString()))
      .map(t => ({
        kind: 'task',
        date: new Date(t.dueDate),
        label: t.description,
        pet: pets.find(p => p.id === t.petId) || null,
      }));
    const visitEvents = visits
      .filter(v => new Date(v.visitDate) >= new Date(today.toDateString()))
      .map(v => ({
        kind: 'visit',
        date: new Date(v.visitDate),
        label: v.reason,
        pet: pets.find(p => p.id === v.petId) || null,
      }));
    return [...taskEvents, ...visitEvents]
      .sort((a, b) => a.date - b.date)
      .slice(0, 6);
  }, [careTasks, visits, pets]);

  const tipOfDay = tips[(new Date().getDate()) % tips.length];
  const spotlightPet = pets[0] || null;

  return (
    <div>
      <AppNavbar />
      <Container fluid className="px-0">
        {/* Overview band */}
        <Row className="g-3 mb-2">
          <Col lg={12}>
            <div className="overview-band d-flex flex-wrap align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-circle">🐾</div>
                <div>
                  <div className="overview-title">Welcome{firstName ? `, ${firstName}` : ''}</div>
                  <div className="overview-subtitle">Your pet care overview at a glance</div>
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge-pill">{totalPets} Pets</span>
                <span className="badge-pill orange">{pendingTasks} Pending Tasks</span>
                <span className="badge-pill">{upcomingVisitsCount} Upcoming Visits</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Metrics */}
        <Row className="g-3">
          <Col md={4}>
            <Card className="shadow-sm metric-card h-100">
              <Card.Body>
                <div className="metric-header">
                  <div className="icon-circle">📝</div>
                  <div>
                    <div className="metric-label">Tasks Completed</div>
                    <div className="metric-value">{completedTasks}/{totalTasks}</div>
                  </div>
                </div>
                <ProgressBar className="mt-2" now={completionRate} label={`${completionRate}%`} visuallyHidden={false} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm metric-card h-100">
              <Card.Body>
                <div className="metric-header">
                  <div className="icon-circle">📅</div>
                  <div>
                    <div className="metric-label">Upcoming Visits</div>
                    <div className="metric-value">{upcomingVisitsCount}</div>
                  </div>
                </div>
                <div className="metric-foot text-muted small">Next: {nextVisit ? new Date(nextVisit.visitDate).toLocaleDateString() : '—'}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm metric-card h-100">
              <Card.Body>
                <div className="metric-header">
                  <div className="icon-circle">🐶</div>
                  <div>
                    <div className="metric-label">Total Pets</div>
                    <div className="metric-value">{totalPets}</div>
                  </div>
                </div>
                <div className="metric-foot text-muted small">Keep profiles updated for better care</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Timeline + Quick Actions */}
        <Row className="g-3 mt-1">
          <Col lg={7}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-section-title"><span>Today & Upcoming</span></div>
                {timeline.length ? (
                  <div className="timeline">
                    {timeline.map((e, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className={`timeline-dot ${e.kind === 'visit' ? 'visit' : 'task'}`}>{e.kind === 'visit' ? '🩺' : '📝'}</div>
                        <div className="timeline-content">
                          <div className="fw-semibold text-brown">{e.label}</div>
                          <div className="activity-meta">{e.pet ? e.pet.name : ''} • {e.date.toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted">Nothing upcoming. Enjoy your day!</div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-section-title"><span>Quick Actions</span></div>
                <div className="quick-actions">
                  <Button className="quick-action-btn" onClick={() => navigate('/pets')}>+ Add Pet</Button>
                  <Button className="quick-action-btn" onClick={() => navigate('/tasks')}>+ Add Care Task</Button>
                  <Button className="quick-action-btn" onClick={() => navigate('/visits')}>+ Add Visit</Button>
                  <Button className="quick-action-btn" onClick={() => navigate('/care-guide')}>Open Care Guide</Button>
                </div>
                <div className="home-section-title mt-3"><span>Highlights</span></div>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge-pill green">Next task</span>
                    <span className="text-brown fw-semibold">{nextTask ? nextTask.description : '—'}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge-pill">Next visit</span>
                    <span className="text-brown fw-semibold">{nextVisit ? nextVisit.reason : '—'}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Discover + Tip */}
        <Row className="g-3 mt-1">
          <Col lg={7}>
            <Row className="g-3">
              <Col md={6}>
                <Card className="shadow-sm discover-card h-100" role="button" onClick={() => navigate('/care-guide')}>
                  <Card.Img variant="top" src="/img/guide-bathing.png" alt="Bathing Guide" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <Card.Body>
                    <div className="fw-semibold text-brown">Bathing your pet</div>
                    <div className="activity-meta">Safe and stress-free tips</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm discover-card h-100" role="button" onClick={() => navigate('/care-guide')}>
                  <Card.Img variant="top" src="/img/guide-walking.png" alt="Walking Guide" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <Card.Body>
                    <div className="fw-semibold text-brown">Walking routines</div>
                    <div className="activity-meta">Healthy habits for daily walks</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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

        {/* Spotlight */}
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

