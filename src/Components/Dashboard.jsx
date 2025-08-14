import React, { useMemo, useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import './Home.css';
import './pet.css';
import './careguide.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { pets, careTasks, visits } = useData();

  const stats = useMemo(() => {
    const totalPets = pets.length;
    const totalTasks = careTasks.length;
    const completedTasks = careTasks.filter(t => t.isCompleted).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const totalVisits = visits.length;

    return { totalPets, totalTasks, completedTasks, pendingTasks, completionRate, totalVisits };
  }, [pets, careTasks, visits]);

  const perPet = useMemo(() => {
    return pets.map(p => {
      const tasks = careTasks.filter(t => t.petId === p.id);
      const completed = tasks.filter(t => t.isCompleted).length;
      const total = tasks.length;
      const pct = total ? Math.round((completed / total) * 100) : 0;
      const petVisits = visits.filter(v => v.petId === p.id).length;
      return { pet: p, totalTasks: total, completedTasks: completed, completionPct: pct, visits: petVisits };
    });
  }, [pets, careTasks, visits]);

  const [prevStats, setPrevStats] = useState(null);
  useEffect(() => {
    const prev = JSON.parse(localStorage.getItem('insightsSnapshot') || 'null');
    setPrevStats(prev);
    localStorage.setItem('insightsSnapshot', JSON.stringify({
      totalPets: stats.totalPets,
      completionRate: stats.completionRate,
      totalVisits: stats.totalVisits,
    }));
  }, [stats.totalPets, stats.completionRate, stats.totalVisits]);

  const petsDelta = prevStats && typeof prevStats.totalPets === 'number' ? stats.totalPets - prevStats.totalPets : null;
  const visitsDelta = prevStats && typeof prevStats.totalVisits === 'number' ? stats.totalVisits - prevStats.totalVisits : null;
  const completionDelta = prevStats && typeof prevStats.completionRate === 'number' ? stats.completionRate - prevStats.completionRate : null;

  return (
    <div className="pets-page dashboard-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Insights</h1>

        <div className="pets-canvas">
          <div className="pets-center">
            {/* KPI cards with ring and trends */}
            <Row className="g-3 mb-2 insight-grid">
              <Col md={4}>
                <Card className="shadow-sm insight-card h-100">
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="insight-label">Total Pets</div>
                      <div className="insight-value">{stats.totalPets}</div>
                      <div className="insight-meta">Compared to last visit</div>
                      <div className={`delta-badge ${petsDelta == null ? '' : petsDelta >= 0 ? 'up' : 'down'}`}>
                        {petsDelta == null ? '—' : <>{petsDelta >= 0 ? '▲' : '▼'} {Math.abs(petsDelta)}</>}
                      </div>
                    </div>
                    <div className="insight-icon">🐾</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm insight-card h-100">
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="insight-label">Tasks Completed</div>
                      <div className="insight-sub">{stats.completedTasks}/{stats.totalTasks}</div>
                      <div className="insight-meta">Completion rate change</div>
                      <div className={`delta-badge ${completionDelta == null ? '' : completionDelta >= 0 ? 'up' : 'down'}`}>
                        {completionDelta == null ? '—' : <>{completionDelta >= 0 ? '▲' : '▼'} {Math.abs(completionDelta)}%</>}
                      </div>
                    </div>
                    <div className="ring" style={{ ['--pct']: stats.completionRate }}>
                      <div className="ring-inner">{stats.completionRate}%</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm insight-card h-100">
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="insight-label">Total Visits</div>
                      <div className="insight-value">{stats.totalVisits}</div>
                      <div className="insight-meta">Compared to last visit</div>
                      <div className={`delta-badge ${visitsDelta == null ? '' : visitsDelta >= 0 ? 'up' : 'down'}`}>
                        {visitsDelta == null ? '—' : <>{visitsDelta >= 0 ? '▲' : '▼'} {Math.abs(visitsDelta)}</>}
                      </div>
                    </div>
                    <div className="insight-icon">🩺</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Per-pet progress */}
            <Row className="g-3 insights-pets">
              {perPet.map(({ pet, totalTasks, completedTasks, completionPct, visits }) => (
                <Col key={pet.id} lg={4} md={6}>
                  <Card className="shadow-sm h-100 insight-card">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center">
                        <span>{pet.name}</span>
                        <small className="text-muted">{pet.breed}</small>
                      </Card.Title>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="small text-muted mb-1">Task Progress</div>
                          <ProgressBar now={completionPct} className="mb-1" visuallyHidden={false} />
                          <div className="text-muted small">{completedTasks} of {totalTasks} tasks</div>
                        </div>
                        <div className="ring ring-sm" style={{ ['--pct']: completionPct }}>
                          <div className="ring-inner">{completionPct}%</div>
                        </div>
                      </div>
                      <div className="mt-2 d-flex align-items-center gap-2">
                        <span className="badge-pill">Visits</span>
                        <span className="text-muted small">{visits} total</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
