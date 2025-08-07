import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
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
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFA500 0%, #D2691E 100%)'
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(210, 105, 30, 0.3)',
          width: '380px',
          padding: '30px',
          position: 'relative',
          marginTop: '20px'
        }}
      >
        {/* Icon Circle */}
        <div
          style={{
            backgroundColor: '#D2691E',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '-30px',
            left: 'calc(50% - 30px)'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 4 6 4 0 1-1 1H3z" />
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <h3 className="text-center mb-4" style={{ color: '#D2691E', fontWeight: '700' }}>
          LOGIN
        </h3>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label style={{ color: '#D2691E', fontWeight: '600', fontSize: '0.8rem' }}>
              EMAIL
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
              style={{
                borderColor: '#FFA500',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(255, 165, 0, 0.3)'
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label style={{ color: '#D2691E', fontWeight: '600', fontSize: '0.8rem' }}>
              PASSWORD
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                borderColor: '#FFA500',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(255, 165, 0, 0.3)'
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: '#FFA500',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 0',
              fontWeight: '600',
              boxShadow: '0 4px 10px rgba(210, 105, 30, 0.4)',
              color: 'white',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#D2691E';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#FFA500';
            }}
          >
            LOGIN
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
