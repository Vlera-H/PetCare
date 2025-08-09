import React, { useState } from 'react';
import PetList from './PetList';
import CareTaskList from './CareTaskList';
import VisitsList from './VisitsList';

const Dashboard = () => {
  // Të dhëna demo për pets, tasks dhe visits
  const [pets] = useState([
    { id: 1, name: 'Luna', breed: 'Golden Retriever', birthDate: '2019-05-10' },
    { id: 2, name: 'Max', breed: 'Bulldog', birthDate: '2020-11-22' },
  ]);

  const [careTasks] = useState([
    { id: 1, description: 'Give Luna vaccination', dueDate: '2025-08-15', isCompleted: false, petId: 1 },
    { id: 2, description: 'Walk Max', dueDate: '2025-08-08', isCompleted: true, petId: 2 },
  ]);

  const [visits] = useState([
    { id: 1, visitDate: '2025-07-01', reason: 'Checkup', petId: 1 },
    { id: 2, visitDate: '2025-07-20', reason: 'Grooming', petId: 2 },
  ]);

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
