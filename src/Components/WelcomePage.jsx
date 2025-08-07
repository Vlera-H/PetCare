import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // ky është për stilin që e shtojmë më poshtë

const WelcomePage = () => {
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center">
      <Container className="text-center p-4 rounded shadow welcome-box">
        <h2 className="mb-3 text-brown">Welcome to</h2>
        <h1 className="mb-3 fw-bold text-orange">Pet Care</h1>
        <p className="mb-4 text-muted">Healthy pet care at your fingertips…</p>
        <img
          src="/img/dog.png"
          alt="Cute Dog"
          className="img-fluid rounded mb-4"
          style={{ maxWidth: '250px' }}
        />
        <div className="d-grid gap-3">
          <Link to="/login">
            <Button variant="outline-brown" size="lg" className="custom-btn">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="orange" size="lg" className="custom-btn">
              Sign up
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default WelcomePage;
