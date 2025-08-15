import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './Components/DataContext';
import AppRoutesLazy from './Components/AppRoutesLazy';

function App() {
  return (
    <Router>
      <DataProvider>
        <AppRoutesLazy />
      </DataProvider>
    </Router>
  );
}

export default App;
