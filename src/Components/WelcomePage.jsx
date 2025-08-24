import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-fullscreen d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start">
      <div className="welcome-text p-4">
        <h1 className="display-3 fw-bold text-brown">Welcome to</h1>
        <h1 className="display-2 fw-bold text-orange mb-3">Pet Care</h1>
        <p className="lead text-muted mb-5">Smart care tasks and visit tracking – for happier pets.
</p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
          <Link to="/login">
            <Button className="btn-cream custom-btn px-4" size="lg">
              🔐 Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="orange" size="lg" className="custom-btn px-4">
              🐾 Sign up
            </Button>
          </Link>
        </div>
      </div>
      <div className="welcome-image">
        <img src="/img/pets.png" alt="Dog and Cat" className="img-fluid" />
      </div>
    </div>
  );
};

export default WelcomePage;


