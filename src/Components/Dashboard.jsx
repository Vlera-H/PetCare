import React, { useState } from 'react';
import PetList from './PetList';
import CareTaskList from './CareTaskList';
import VisitsList from './VisitsList';
import demoData from '../data/demoData';

const Dashboard = () => {
  // Të dhëna demo për pets, tasks dhe visits
  const [pets] = useState(demoData.pets);
  const [careTasks] = useState(demoData.careTasks);
  const [visits] = useState(demoData.visits);

return (
    <div className="container my-4">
      <h1 className="mb-4">Dashboard - Pet Care</h1>

      <section className="mb-5">
        <h2>Pets</h2>
        <PetList pets={pets} />
      </section>

      <section className="mb-5">
        <h2>Care Tasks</h2>
        <CareTaskList tasks={careTasks} />
      </section>

      <section>
        <h2>Visits</h2>
        <VisitsList visits={visits} />
      </section>
    </div>
  );
};

export default Dashboard;
