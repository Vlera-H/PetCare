import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  // Përdor të njëjtin CSS për login dhe register

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      const res = await axios.post('https://localhost:7259/api/Auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
  const data = err.response?.data;

  if (!data) {
    setError('Registration failed');
  } else if (typeof data === 'string') {
    setError(data);
  } else if (typeof data === 'object') {
    if (data.errors) {
      const messages = Object.values(data.errors).flat().join(' ');
      setError(messages);
    } else if (data.title) {
      setError(data.title);
    } else {
      setError('Registration failed');
    }
  } else {
    setError('Registration failed');
  }
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
  {/* FIRST NAME */}
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

  {/* LAST NAME */}
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

  {/* EMAIL */}
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

  {/* PASSWORD */}
  <Form.Group className="mb-4" controlId="formPassword">
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

  {/* Forgot Password link */}
  <div style={{ textAlign: 'right', marginBottom: '0.8rem' }}>
    <Button
      variant="link"
      style={{ color: '#007bff', padding: 0, fontSize: '0.85rem' }}
      onClick={() => navigate('/forgot-password')}
    >
      Forgot Password?
    </Button>
  </div>

  {/* Butoni Create Account */}
  <Button type="submit" className="custom-btn mb-3">
    CREATE ACCOUNT
  </Button>

  {/* Terms & Privacy */}
  <Form.Group controlId="formBasicCheckbox" className="mb-3 text-start">
    <Form.Check
      type="checkbox"
      label={
        <span style={{ fontSize: '0.85rem' }}>
          I agree to the{' '}
          <a href="/privacy-policy" style={{ color: '#007bff' }}>
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms-of-service" style={{ color: '#007bff' }}>
            Terms of Service
          </a>
        </span>
      }
      required
    />
  </Form.Group>

  {/* Sign In link */}
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
