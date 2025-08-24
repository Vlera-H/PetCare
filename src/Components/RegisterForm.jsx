import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  // Përdor të njëjtin CSS për login dhe register

const RegisterForm = () => {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSubmitting(false);
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      const res = await axios.post('https://localhost:7259/api/Auth/register', payload);
      setMessage(res.data.message);
      
      // Redirect në login page pas 2 sekondash për të parë mesazhin e suksesit
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError('Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="back-arrow" onClick={() => navigate('/login')}>
        &#8592;
      </div>

      <div className="login-box register-box">
        <div className="login-icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 4 6 4 0 1-1 1H3z" />
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <h3 className="login-title">SIGN UP</h3>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="form-label-custom">FIRST NAME</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="form-label-custom">LAST NAME</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="form-label-custom">EMAIL</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="form-label-custom">PASSWORD</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label className="form-label-custom">CONFIRM PASSWORD</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Button
            type="submit"
            className={`custom-btn ${submitting ? 'btn-invert' : ''}`}
            disabled={submitting || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword} 
          >
            {submitting ? 'Registering...' : 'CREATE ACCOUNT'}
          </Button>

          <Button variant="link" className="signup-btn" onClick={() => navigate('/login')}>
            Already have an account? <strong>Sign in</strong>
          </Button>
        </Form>

        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
