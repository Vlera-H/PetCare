import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import WelcomePage from './Components/WelcomePage';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import PetsPage from './Components/PetsPage';
//import CareTasksPage from './Components/CareTaskPage';
import VisitsPage from './Components/VisitsPage';
import { DataProvider } from './Components/DataContext';
import CareTasksList from './Components/CareTaskList';
import CareGuide from './Components/CareGuide';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/pets" element={<PetsPage />} />
          <Route path="/tasks" element={<CareTasksList />} />
          <Route path="/visits" element={<VisitsPage />} />
           <Route path="/care-guide" element={<CareGuide />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
