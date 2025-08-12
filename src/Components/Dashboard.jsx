import React, { useMemo } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AppNavbar from './AppNavbar';
import { useData } from './DataContext';
import './Home.css';

const Dashboard = () => {
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

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Dashboard</h3>
          <AppNavbar />
        </div>

        <Container fluid>
          {/* KPI cards */}
          <Row className="g-3 mb-2">
            <Col md={4}>
              <div className="pc-card h-100">
                <h6>Total Pets</h6>
                <div className="pc-metric">{stats.totalPets}</div>
              </div>
            </Col>
            <Col md={4}>
              <div className="pc-card h-100">
                <h6>Tasks Completed</h6>
                <div className="pc-metric">{stats.completedTasks}/{stats.totalTasks}</div>
                <ProgressBar className="mt-2" now={stats.completionRate} label={`${stats.completionRate}%`} visuallyHidden={false} />
              </div>
            </Col>
            <Col md={4}>
              <div className="pc-card h-100">
                <h6>Total Visits</h6>
                <div className="pc-metric">{stats.totalVisits}</div>
              </div>
            </Col>
          </Row>

          {/* Per-pet progress */}
          <Row className="g-3">
            {perPet.map(({ pet, totalTasks, completedTasks, completionPct, visits }) => (
              <Col key={pet.id} lg={4} md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{pet.name}</span>
                      <small className="text-muted">{pet.breed}</small>
                    </Card.Title>
                    <div className="mb-2">
                      <strong>Task Progress</strong>
                      <ProgressBar now={completionPct} label={`${completionPct}%`} className="mt-1" visuallyHidden={false} />
                      <div className="text-muted small mt-1">{completedTasks} of {totalTasks} tasks completed</div>
                    </div>
                    <div>
                      <strong>Visits</strong>
                      <div className="text-muted small">{visits} total</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
