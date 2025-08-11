import React, { useState } from 'react';
import PetList from './PetList';
import CareTaskList from './CareTaskList';
import VisitsList from './VisitsList';
import demoData from '../data/demoData';
import Sidebar from './Sidebar';
import './Home.css';

const Dashboard = () => {
  const [pets] = useState(demoData.pets);
  const [careTasks] = useState(demoData.careTasks);
  const [visits] = useState(demoData.visits);

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Dashboard</h3>
        </div>

        <section className="mb-4">
          <div className="pc-section-title">
            <h6 className="m-0">Pets</h6>
          </div>
          <PetList pets={pets} />
        </section>

        <section className="mb-4">
          <div className="pc-section-title">
            <h6 className="m-0">Care Tasks</h6>
          </div>
          <CareTaskList tasks={careTasks} />
        </section>

        <section>
          <div className="pc-section-title">
            <h6 className="m-0">Visits</h6>
          </div>
          <VisitsList visits={visits} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
