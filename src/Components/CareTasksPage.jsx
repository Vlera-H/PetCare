import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import './pet.css';
import './inlineForms.css';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const CareTasksPage = () => {
  const navigate = useNavigate();
  const { pets, careTasks, setCareTasks } = useData();

  const [form, setForm] = useState({ description: '', dueDate: '', petId: pets[0]?.id ? String(pets[0].id) : '' });

  const tasksForSelectedPet = useMemo(
    () => (form.petId ? careTasks.filter(t => t.petId === Number(form.petId)) : careTasks),
    [careTasks, form.petId]
  );

  const handleAdd = () => {
    if (!form.description || !form.dueDate || !form.petId) return;
    const newTask = {
      id: generateNextId(careTasks),
      description: form.description,
      dueDate: form.dueDate,
      isCompleted: false,
      petId: Number(form.petId),
    };
    setCareTasks(prev => [...prev, newTask]);
    setForm(f => ({ ...f, description: '', dueDate: '' }));
  };

  const toggleTask = (taskId) => {
    setCareTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (taskId) => {
    setCareTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div className="pets-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Care Tasks</h1>

        <div className="pets-canvas">
          {/* Use only two corners, like PetsPage example */}
          <img src="/img/c22.png" alt="" className="corner corner-tr" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/img/c33.png" alt="" className="corner corner-bl" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />

          <div className="pets-center">
            {/* Empty state if no pets */}
            {!pets.length && (
              <Alert variant="warning" className="mb-3">
                You need at least one pet to add a care task. <Button variant="link" className="p-0" onClick={() => navigate('/pets')}>Add a pet</Button>
              </Alert>
            )}

            {/* Add Care Task - full width */}
            <div className="pets-section-title mb-2">Add new care task</div>
            <Row className="g-3 align-items-end mb-3 inline-form-row">
              <Col xs={12} md={4}>
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold">Due Date</Form.Label>
                <Form.Control type="date" value={form.dueDate} onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))} />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold">Pet</Form.Label>
                <Form.Select value={form.petId} onChange={(e) => setForm(f => ({ ...f, petId: e.target.value }))}>
                  <option value="">Select pet</option>
                  {pets.map(p => (
                    <option key={p.id} value={String(p.id)}>{p.name} — {p.breed}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md="auto">
                <Button size="sm" className="btn-orange" onClick={handleAdd} disabled={!form.description || !form.dueDate || !form.petId}>+ Add Task</Button>
              </Col>
            </Row>

            {/* Care Tasks list - full width */}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="m-0 pets-section-title">Your care tasks list</h5>
            </div>
            <Table striped hover responsive className="pets-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Pet</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasksForSelectedPet.map(task => {
                  const pet = pets.find(p => p.id === task.petId);
                  return (
                    <tr key={task.id}>
                      <td>{task.description}</td>
                      <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td>{task.isCompleted ? 'Completed' : 'Pending'}</td>
                      <td>{pet ? pet.name : task.petId}</td>
                      <td className="d-flex gap-2">
                        <Button size="sm" variant={task.isCompleted ? 'secondary' : 'success'} onClick={() => toggleTask(task.id)}>
                          {task.isCompleted ? 'Mark Pending' : 'Mark Done'}
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => deleteTask(task.id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CareTasksPage;