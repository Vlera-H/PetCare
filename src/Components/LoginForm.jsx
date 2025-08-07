import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const res = await axios.post('https://localhost:26590/Controllers/AuthController/Login', formData);
      setMessage('Login successful! Welcome ' + res.data.user.firstName);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="back-arrow" onClick={() => navigate('/welcome')}>
        &#8592;
      </div>

      <div className="login-box">
        <div className="login-icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 4 6 4 0 1-1 1H3z" />
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <h3 className="login-title">SIGN IN</h3>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="form-label-custom">EMAIL</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
              className="form-control-custom"
            />
          </Form.Group>

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

          <Button type="submit" className="custom-btn">
            SIGN IN
          </Button>
        </Form>

        <Button variant="link" className="signup-btn" onClick={() => navigate('/register')}>
          Don’t have an account? <strong>Sign up</strong>
        </Button>
      </div>
    </div>
  );
};
export default LoginForm; 