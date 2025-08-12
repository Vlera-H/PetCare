import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Card, Form, Modal } from 'react-bootstrap';
import AppNavbar from './AppNavbar';
import Sidebar from './Sidebar';
import './Home.css';
import PetList from './PetList';
import CareTaskList from './CareTaskList';
import VisitsList from './VisitsList';
import demoData from '../data/demoData';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const Home = () => {
  const [pets, setPets] = useState(demoData.pets);
  const [careTasks, setCareTasks] = useState(demoData.careTasks);
  const [visits, setVisits] = useState(demoData.visits);
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || null);

  const selectedPet = useMemo(() => pets.find(p => p.id === selectedPetId) || null, [pets, selectedPetId]);
  const tasksForPet = useMemo(() => careTasks.filter(t => !selectedPetId || t.petId === selectedPetId), [careTasks, selectedPetId]);
  const visitsForPet = useMemo(() => visits.filter(v => !selectedPetId || v.petId === selectedPetId), [visits, selectedPetId]);

  const totalPets = pets.length;
  const pendingTasksCount = tasksForPet.filter(t => !t.isCompleted).length;
  const upcomingVisitsCount = visitsForPet.length;

  // Pet modal state
  const [showPetModal, setShowPetModal] = useState(false);
  const [petForm, setPetForm] = useState({ name: '', breed: '', birthDate: '' });

  // Task modal state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({ description: '', dueDate: '' });

  // Visit modal state
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitForm, setVisitForm] = useState({ visitDate: '', reason: '' });

  const handleAddPet = () => {
    const newPet = { id: generateNextId(pets), name: petForm.name, breed: petForm.breed, birthDate: petForm.birthDate };
    setPets(prev => [...prev, newPet]);
    setSelectedPetId(newPet.id);
    setPetForm({ name: '', breed: '', birthDate: '' });
    setShowPetModal(false);
  };

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

  const handleToggleTask = (taskId) => {
    setCareTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleDeleteTask = (taskId) => {
    setCareTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleAddVisit = () => {
    if (!selectedPetId) return;
    const newVisit = {
      id: generateNextId(visits),
      visitDate: visitForm.visitDate,
      reason: visitForm.reason,
      petId: selectedPetId,
    };
    setVisits(prev => [...prev, newVisit]);
    setVisitForm({ visitDate: '', reason: '' });
    setShowVisitModal(false);
  };

  return (
    <div className="pc-layout">
      <Sidebar />

      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Home</h3>
          <AppNavbar />
        </div>

        <Container fluid className="px-0">
          <Row className="align-items-end g-3">
            <Col xs={12} md={6}>
              <Form.Label className="fw-semibold">Select Pet</Form.Label>
              <Form.Select value={selectedPetId || ''} onChange={(e) => setSelectedPetId(Number(e.target.value) || null)}>
                {pets.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — {p.breed}</option>
                ))}
                {!pets.length && <option value="">No pets yet</option>}
              </Form.Select>
            </Col>
            <Col xs={12} md="auto" className="d-flex gap-2">
              <Button variant="primary" onClick={() => setShowPetModal(true)}>+ Add Pet</Button>
              <Button variant="outline-primary" disabled={!selectedPetId} onClick={() => setShowTaskModal(true)}>+ Add Task</Button>
              <Button variant="outline-secondary" disabled={!selectedPetId} onClick={() => setShowVisitModal(true)}>+ Add Visit</Button>
            </Col>
          </Row>

          <div className="pc-kpis my-3">
            <div className="pc-card">
              <h6>Total Pets</h6>
              <div className="pc-metric">{totalPets}</div>
            </div>
            <div className="pc-card">
              <h6>Pending Tasks</h6>
              <div className="pc-metric">{pendingTasksCount}</div>
            </div>
            <div className="pc-card">
              <h6>Upcoming Visits</h6>
              <div className="pc-metric">{upcomingVisitsCount}</div>
            </div>
          </div>

          {selectedPet && (
            <Row className="align-items-center mb-2">
              <Col>
                <h5 className="m-0" style={{ color: '#5c4033' }}>{selectedPet.name} — {selectedPet.breed}</h5>
                <small className="text-muted">Born: {new Date(selectedPet.birthDate).toLocaleDateString()}</small>
              </Col>
            </Row>
          )}

          <Row className="g-4">
            <Col lg={6}>
              <div className="pc-section-title">
                <h6 className="m-0">Care Tasks</h6>
              </div>
              <CareTaskList tasks={tasksForPet} />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {tasksForPet.map(t => (
                  <div key={t.id} className="d-flex align-items-center gap-2">
                    <Button size="sm" variant={t.isCompleted ? 'secondary' : 'success'} onClick={() => handleToggleTask(t.id)}>
                      {t.isCompleted ? 'Mark Pending' : 'Mark Done'}
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDeleteTask(t.id)}>Delete</Button>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div className="pc-section-title">
                <h6 className="m-0">Visits</h6>
              </div>
              <VisitsList visits={visitsForPet} />
            </Col>
          </Row>

          <Row className="g-4 mt-3">
            <Col>
              <div className="pc-section-title">
                <h6 className="m-0">All Pets</h6>
              </div>
              <PetList pets={pets} />
            </Col>
          </Row>
        </Container>
      </main>

      {/* Add Pet Modal */}
      <Modal show={showPetModal} onHide={() => setShowPetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={petForm.name} onChange={(e) => setPetForm(f => ({ ...f, name: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control value={petForm.breed} onChange={(e) => setPetForm(f => ({ ...f, breed: e.target.value }))} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="date" value={petForm.birthDate} onChange={(e) => setPetForm(f => ({ ...f, birthDate: e.target.value }))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPetModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddPet} disabled={!petForm.name || !petForm.breed || !petForm.birthDate}>Add Pet</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Task Modal */}
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

      {/* Add Visit Modal */}
      <Modal show={showVisitModal} onHide={() => setShowVisitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control value={visitForm.reason} onChange={(e) => setVisitForm(f => ({ ...f, reason: e.target.value }))} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Visit Date</Form.Label>
              <Form.Control type="date" value={visitForm.visitDate} onChange={(e) => setVisitForm(f => ({ ...f, visitDate: e.target.value }))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVisitModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddVisit} disabled={!visitForm.reason || !visitForm.visitDate || !selectedPetId}>Add Visit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;

