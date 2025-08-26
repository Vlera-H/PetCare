import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import { createCareTask, updateCareTask, deleteCareTask as apiDeleteTask } from '../api/petCare';
import './pet.css';
import './inlineForms.css';

const CareTasksPage = () => {
  const navigate = useNavigate();
  const { pets, careTasks, setCareTasks } = useData();

  const [form, setForm] = useState({
    description: '',
    dueDate: '',
    petId: '', // default: show all tasks
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tasksForSelectedPet = useMemo(
    () => (form.petId ? careTasks.filter(t => t.petId === Number(form.petId)) : careTasks),
    [careTasks, form.petId]
  );

  const handleAdd = async () => {
    if (!form.description || !form.dueDate || !form.petId) {
      setError('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const created = await createCareTask({
        description: form.description,
        dueDate: form.dueDate,
        petId: form.petId,
      });

      // Ensure new task is normalized for immediate display
      const normalized = {
        ...created,
        id: Number(created.id),
        petId: Number(created.petId),
        isCompleted: !!created.isCompleted,
      };
      setCareTasks(prev => [...prev, normalized]);
      setForm(f => ({ ...f, description: '', dueDate: '' }));
    } catch (e) {
      setError(`Gabim gjatë shtimit të detyrës: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId) => {
    const current = careTasks.find(t => t.id === taskId);
    if (!current) return;

    setLoading(true);
    try {
      await updateCareTask(taskId, {
        description: current.description,
        dueDate: current.dueDate,
        isCompleted: !current.isCompleted,
        petId: current.petId,
      });

      setCareTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
      );
    } catch (e) {
      setError(`Gabim gjatë përditësimit të statusit: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await apiDeleteTask(taskId);
      setCareTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (e) {
      setError(`Gabim gjatë fshirjes së detyrës: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pets-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/home', { replace: true })}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>
          Care Tasks
        </h1>

        <div className="pets-canvas">
          <img src="/img/c22.png" alt="" className="corner corner-tr" loading="lazy"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/img/c33.png" alt="" className="corner corner-bl" loading="lazy"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />

          <div className="pets-center">
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {!pets.length && (
              <Alert variant="warning" className="mb-3">
                You need at least one pet to add a care task.{" "}
                <Button variant="link" className="p-0" onClick={() => navigate('/pets')}>
                  Add a pet
                </Button>
              </Alert>
            )}

            <div className="pets-section-title mb-2">Add new care task</div>
            <Form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} autoComplete="off">
              <Row className="g-3 align-items-end mb-3 inline-form-row">
                <Col xs={12} md={4}>
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <Form.Control
                    value={form.description}
                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                    disabled={loading}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))}
                    disabled={loading}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Pet</Form.Label>
                  <Form.Select
                    value={form.petId}
                    onChange={(e) => setForm(f => ({ ...f, petId: e.target.value }))}
                    disabled={loading}
                  >
                    <option value="">All pets</option>
                    {pets.map(p => (
                      <option key={p.id} value={String(p.id)}>
                        {p.name} — {p.breed}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md="auto">
                  <Button
                    size="sm"
                    className="btn-orange"
                    type="submit"
                    disabled={!form.description || !form.dueDate || !form.petId || loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : '+ Add Task'}
                  </Button>
                </Col>
              </Row>
            </Form>

            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="m-0 pets-section-title">Your care tasks list ({tasksForSelectedPet.length})</h5>
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
                        <Button
                          size="sm"
                          variant={task.isCompleted ? 'secondary' : 'success'}
                          onClick={() => toggleTask(task.id)}
                          disabled={loading}
                        >
                          {task.isCompleted ? 'Mark Pending' : 'Mark Done'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteTask(task.id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
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
