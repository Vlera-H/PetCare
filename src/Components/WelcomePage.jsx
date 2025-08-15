import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import './Buttons.css';

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
            <Button size="lg" className="custom-btn px-4 btn-cream">
              🔐 Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" className="custom-btn px-4 btn-orange">
              🐾 Sign up
            </Button>
          </Link>
        </div>
      </div>
      <div className="welcome-image">
        <img src="/img/8.png" alt="Dog and Cat" className="img-fluid" loading="lazy" />
      </div>
    </div>
  );
};

export default WelcomePage;
