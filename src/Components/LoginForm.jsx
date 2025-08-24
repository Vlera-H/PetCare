import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import tokenService from '../services/tokenService';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7259/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Use TokenService to set tokens
      tokenService.setTokens(data.accessToken, data.refreshToken);
      
      // Set other user data
      if (data.user?.firstName) {
        localStorage.setItem('firstName', data.user.firstName);
      }
      if (data.user?.id) {
        localStorage.setItem('userId', data.user.id);
      }
      if (data.user?.role) {
        localStorage.setItem('role', data.user.role);
      }

      // Navigate based on role
      const role = data.user?.role || '';
      navigate(role.toLowerCase() === 'admin' ? '/admin' : '/');

    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="back-arrow" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
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

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="form-label-custom">EMAIL</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
              className="form-control-custom"
            />
          </Form.Group>

          <div className="row-between mb-3">
            <Button variant="link" className="link-forgot" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </Button>
            <Form.Check
              type="checkbox"
              id="rememberMe"
              label="Remember me"
              checked={false}
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem('rememberedEmail', formData.email);
                } else {
                  localStorage.removeItem('rememberedEmail');
                }
              }}
            />
          </div>

          <Button
            type="submit"
            className={`custom-btn ${loading ? 'btn-invert' : ''}`}
            disabled={loading || !formData.email || !formData.password}
          >
            {loading ? 'Signing in...' : 'SIGN IN'}
          </Button>
        </Form>

        <Button variant="link" className="signup-btn" onClick={() => navigate('/register')}>
          Don't have an account? <strong>Sign up</strong>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

