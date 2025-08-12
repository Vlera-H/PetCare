import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './WelcomePage.css';
import PetList from './PetList';
import CareTaskList from './CareTaskList';
import VisitsList from './VisitsList';
import { pets, careTasks, visits } from '../data/demoData';

const Home = () => {
  const totalPets = pets.length;
  const pendingTasks = careTasks.filter(t => !t.isCompleted).length;
  const upcomingVisits = visits.length;

  return (
    <div>
      <section className="welcome-fullscreen d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start">
        <div className="welcome-text p-4">
          <h1 className="display-3 fw-bold text-brown">Welcome to</h1>
          <h1 className="display-2 fw-bold text-orange mb-3">Pet Care</h1>
          <p className="lead text-muted mb-4">Smart care tasks and visit tracking – for happier pets.</p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-3">
            <Link to="/login">
              <Button variant="outline-brown" size="lg" className="custom-btn px-4">🔐 Sign in</Button>
            </Link>
            <Link to="/register">
              <Button variant="orange" size="lg" className="custom-btn px-4">🐾 Sign up</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="custom-btn px-4">📊 Open Dashboard</Button>
            </Link>
          </div>
        </div>
        <div className="welcome-image">
          <img src="/img/pets.png" alt="Pets" className="img-fluid" />
        </div>
      </section>

      <section className="container my-5">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Total Pets</h5>
                <p className="display-6 m-0">{totalPets}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                <p className="display-6 m-0">{pendingTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Upcoming Visits</h5>
                <p className="display-6 m-0">{upcomingVisits}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="m-0">Quick glance</h3>
          <Link to="/dashboard" className="btn btn-link p-0">View full dashboard →</Link>
        </div>
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <h5>Pets</h5>
            <PetList pets={pets.slice(0, 3)} />
          </div>
          <div className="col-12 col-lg-4">
            <h5>Care Tasks</h5>
            <CareTaskList tasks={careTasks.slice(0, 3)} />
          </div>
          <div className="col-12 col-lg-4">
            <h5>Visits</h5>
            <VisitsList visits={visits.slice(0, 3)} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
