import React from 'react';
import Sidebar from './Sidebar';
import './Home.css';

const SettingsPage = () => {
  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Settings</h3>
        </div>
        <p className="text-muted">Coming soon: profile, password, and preferences.</p>
      </main>
    </div>
  );
};

export default SettingsPage;
