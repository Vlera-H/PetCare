import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;