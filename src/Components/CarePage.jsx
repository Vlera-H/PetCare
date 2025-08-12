import React, { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './Home.css';
import CareTaskList from './CareTaskList';
import { useData } from '../context/DataContext';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const CarePage = () => {
  const { pets, careTasks, setCareTasks } = useData();
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({ description: '', dueDate: '' });

  const tasksForPet = useMemo(() => careTasks.filter(t => !selectedPetId || t.petId === selectedPetId), [careTasks, selectedPetId]);

  const handleAddTask = () => {
    if (!selectedPetId) return;
    const newTask = {
      id: generateNextId(careTasks),
      description: taskForm.description,
      dueDate: taskForm.dueDate,
      isCompleted: false,
      petId: selectedPetId,
    };
    setCareTasks(prev => [...prev, newTask]);
    setTaskForm({ description: '', dueDate: '' });
    setShowTaskModal(false);
  };

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Care Tasks</h3>
          <div className="d-flex align-items-center gap-2">
            <Form.Select size="sm" value={selectedPetId || ''} onChange={(e) => setSelectedPetId(Number(e.target.value) || null)}>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
            <Button variant="primary" onClick={() => setShowTaskModal(true)}>+ Add Task</Button>
          </div>
        </div>

        <div className="pc-section-title">
          <h6 className="m-0">Tasks for {pets.find(p => p.id === selectedPetId)?.name || 'All'}</h6>
        </div>
        <CareTaskList tasks={tasksForPet} />

        <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Care Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control value={taskForm.description} onChange={(e) => setTaskForm(f => ({ ...f, description: e.target.value }))} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm(f => ({ ...f, dueDate: e.target.value }))} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTaskModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddTask} disabled={!taskForm.description || !taskForm.dueDate || !selectedPetId}>Add Task</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default CarePage;