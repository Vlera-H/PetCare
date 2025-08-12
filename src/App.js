import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import { DataProvider } from './context/DataContext';
import PetsPage from './Components/PetsPage';
import CarePage from './Components/CarePage';
import VisitsPage from './Components/VisitsPage';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pets" element={<ProtectedRoute><PetsPage /></ProtectedRoute>} />
          <Route path="/care" element={<ProtectedRoute><CarePage /></ProtectedRoute>} />
          <Route path="/visits" element={<ProtectedRoute><VisitsPage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
