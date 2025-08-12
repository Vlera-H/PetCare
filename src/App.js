import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/welcome" element={<WelcomePage />} />
        
        
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;
