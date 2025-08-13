import React, { useMemo, useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './Home.css';
import { useData } from './DataContext';

const Home = () => {
  const navigate = useNavigate();
  const { pets, careTasks, visits } = useData();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    setFirstName(localStorage.getItem('firstName') || '');
  }, []);

  const upcomingVisits = useMemo(() => {
    const today = new Date();
    return visits
      .filter(v => new Date(v.visitDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
      .slice(0, 5)
      .map(v => ({
        id: v.id,
        date: new Date(v.visitDate),
        reason: v.reason,
        pet: pets.find(p => p.id === v.petId) || null,
      }));
  }, [visits, pets]);

  const upcomingTasks = useMemo(() => {
    const today = new Date();
    return careTasks
      .filter(t => !t.isCompleted && new Date(t.dueDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
      .map(t => ({
        id: t.id,
        date: new Date(t.dueDate),
        description: t.description,
        pet: pets.find(p => p.id === t.petId) || null,
      }));
  }, [careTasks, pets]);

  return (
    <div>
      <AppNavbar />

      <Container fluid className="px-0">
        {/* Welcome band with image */}
        <Row className="g-3 align-items-center home-hero">
          <Col lg={7} className="home-hero-content">
            <h1 className="home-hero-title">Welcome{firstName ? `, ${firstName}` : ''}</h1>
            <p className="home-hero-subtitle">Keep your pets happy and healthy. Track their upcoming visits and care tasks in one place.</p>
          </Col>
          <Col lg={5} className="home-hero-image text-center">
            <img
              src="/img/home-dog.png"
              alt="Happy dog"
              className="home-hero-img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </Col>
        </Row>

        {/* Upcoming panels */}
        <Row className="g-3 mt-1">
          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-card-title">Upcoming Visits</div>
                {upcomingVisits.length ? (
                  <ul className="home-list">
                    {upcomingVisits.map(v => (
                      <li key={v.id} className="home-list-item">
                        <div>
                          <div className="text-brown fw-semibold">{v.pet ? v.pet.name : `Pet #${v.id}`} — {v.reason}</div>
                          <div className="home-muted">{v.date.toLocaleDateString()}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="home-muted">No upcoming visits.</div>
                )}
                <div className="mt-3 d-flex justify-content-end">
                  <Button variant="outline-brown" className="custom-btn" onClick={() => navigate('/visits')}>View all</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="home-card-title">Upcoming Care Tasks</div>
                {upcomingTasks.length ? (
                  <ul className="home-list">
                    {upcomingTasks.map(t => (
                      <li key={t.id} className="home-list-item">
                        <div>
                          <div className="text-brown fw-semibold">{t.description}</div>
                          <div className="home-muted">Due {t.date.toLocaleDateString()} • {t.pet ? t.pet.name : ''}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="home-muted">No upcoming tasks.</div>
                )}
                <div className="mt-3 d-flex justify-content-end">
                  <Button variant="orange" className="custom-btn btn-orange" onClick={() => navigate('/tasks')}>View all</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

