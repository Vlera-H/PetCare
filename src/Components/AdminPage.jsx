import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPets, createPet, updatePet, deletePet, fetchCareTasks, createCareTask, updateCareTask, deleteCareTask, fetchVisits, createVisit, updateVisit, deleteVisit } from '../api/petCare';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users';
import './Home.css';
import './pet.css';
import './careguide.css';

const AdminPage = () => {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [careTasks, setCareTasks] = useState([]);
  const [visits, setVisits] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('loading');

  const [activeSection, setActiveSection] = useState('overview');
  const [showLogout, setShowLogout] = useState(false);

  // Minimal create forms
  const [newPet, setNewPet] = useState({ name: '', breed: '', birthDate: '', userId: '' });
  const [newTask, setNewTask] = useState({ description: '', dueDate: '', petId: '' });
  const [newVisit, setNewVisit] = useState({ reason: '', visitDate: '', petId: '' });
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'User' });

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [p, t, v, u] = await Promise.all([
        fetchPets(),
        fetchCareTasks(),
        fetchVisits(),
        fetchUsers(),
      ]);
      setPets(p);
      setCareTasks(t);
      setVisits(v);
      setUsers(u);
      setApiStatus('ok');
    } catch (e) {
      setError('Failed to load admin data');
      setPets([]);
      setCareTasks([]);
      setVisits([]);
      setUsers([]);
      setApiStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const insights = useMemo(() => {
    const totalPets = pets.length;
    const totalTasks = careTasks.length;
    const completedTasks = careTasks.filter(t => t.isCompleted).length;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const totalVisits = visits.length;
    return { totalPets, totalTasks, completedTasks, completionRate, totalVisits };
  }, [pets, careTasks, visits]);

  const handleCreatePet = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const created = await createPet(newPet);
      setPets(prev => [...prev, created]);
      setNewPet({ name: '', breed: '', birthDate: '', userId: '' });
    } catch (e) {
      setError('Failed to create pet');
    }
  };

  const handleUpdatePet = async (p) => {
    try {
      await updatePet(p.id, p);
      setPets(prev => prev.map(x => x.id === p.id ? { ...x, ...p } : x));
    } catch (e) {
      setError('Failed to update pet');
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await deletePet(id);
      setPets(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      setError('Failed to delete pet');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const created = await createCareTask(newTask);
      setCareTasks(prev => [...prev, created]);
      setNewTask({ description: '', dueDate: '', petId: '' });
    } catch (e) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (t) => {
    try {
      await updateCareTask(t.id, t);
      setCareTasks(prev => prev.map(x => x.id === t.id ? { ...x, ...t } : x));
    } catch (e) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteCareTask(id);
      setCareTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      setError('Failed to delete task');
    }
  };

  const handleCreateVisit = async (e) => {
    e.preventDefault();
    try {
      const created = await createVisit(newVisit);
      setVisits(prev => [...prev, created]);
      setNewVisit({ reason: '', visitDate: '', petId: '' });
    } catch (e) {
      setError('Failed to create visit');
    }
  };

  const handleUpdateVisit = async (v) => {
    try {
      await updateVisit(v.id, v);
      setVisits(prev => prev.map(x => x.id === v.id ? { ...x, ...v } : x));
    } catch (e) {
      setError('Failed to update visit');
    }
  };

  const handleDeleteVisit = async (id) => {
    try {
      await deleteVisit(id);
      setVisits(prev => prev.filter(v => v.id !== id));
    } catch (e) {
      setError('Failed to delete visit');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const created = await createUser(newUser);
      setUsers(prev => [...prev, created]);
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'User' });
    } catch (e) {
      setError('Failed to create user');
    }
  };

  const handleUpdateUser = async (u) => {
    try {
      await updateUser(u.id, u);
      setUsers(prev => prev.map(x => x.id === u.id ? { ...x, ...u } : x));
    } catch (e) {
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (e) {
      setError('Failed to delete user');
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    setShowLogout(false);
    navigate('/welcome');
  };

  return (
    <div className="pc-layout">
      {/* Sidebar */}
      <aside className="pc-sidebar">
        <div className="pc-brand">🐾 Admin</div>
        <div className="pc-nav nav flex-column">
          <button className={`nav-link btn btn-link text-start ${activeSection === 'overview' ? 'active' : ''}`} onClick={() => setActiveSection('overview')}>
            <span className="pc-icon">📊</span>
            <span>Overview</span>
          </button>
          <div className="pc-divider" />
          <button className={`nav-link btn btn-link text-start ${activeSection === 'pets' ? 'active' : ''}`} onClick={() => setActiveSection('pets')}>
            <span className="pc-icon">🐶</span>
            <span>Pets</span>
          </button>
          <button className={`nav-link btn btn-link text-start ${activeSection === 'tasks' ? 'active' : ''}`} onClick={() => setActiveSection('tasks')}>
            <span className="pc-icon">📝</span>
            <span>Care Tasks</span>
          </button>
          <button className={`nav-link btn btn-link text-start ${activeSection === 'visits' ? 'active' : ''}`} onClick={() => setActiveSection('visits')}>
            <span className="pc-icon">🩺</span>
            <span>Visits</span>
          </button>
          <button className={`nav-link btn btn-link text-start ${activeSection === 'users' ? 'active' : ''}`} onClick={() => setActiveSection('users')}>
            <span className="pc-icon">👥</span>
            <span>Users</span>
          </button>
          <div className="pc-divider" />
          <button className="nav-link btn btn-link text-start" onClick={() => setShowLogout(true)}>
            <span className="pc-icon">🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="pc-content">
        <Container fluid className="py-3 px-0">
          <div className="pc-header">
            <h1 className="pets-header-title pets-header-large m-0">Admin</h1>
          </div>

          {loading && <div>Loading…</div>}
          {error && <Alert variant="danger" className="mb-2">{error}</Alert>}

          {/* Insights */}
          <Row className="g-3 mb-2 insights-row">
            <Col md={3}>
              <Card className="shadow-sm pc-card h-100 metric-card">
                <Card.Body>
                  <div className="metric-header">
                    <div className="icon-circle">🐾</div>
                    <div className="metric-label">Total Pets</div>
                  </div>
                  <div className="metric-value">{insights.totalPets}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm pc-card h-100 metric-card">
                <Card.Body>
                  <div className="metric-header">
                    <div className="icon-circle">📝</div>
                    <div className="metric-label">Tasks</div>
                  </div>
                  <div className="metric-value">{insights.completionRate}%</div>
                  <div className="metric-foot small text-muted">{insights.completedTasks}/{insights.totalTasks} done</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm pc-card h-100 metric-card">
                <Card.Body>
                  <div className="metric-header">
                    <div className="icon-circle">🩺</div>
                    <div className="metric-label">Visits</div>
                  </div>
                  <div className="metric-value">{insights.totalVisits}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm pc-card h-100 metric-card">
                <Card.Body>
                  <div className="metric-header">
                    <div className="icon-circle">👥</div>
                    <div className="metric-label">Users</div>
                  </div>
                  <div className="metric-value">{users.length}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Sections */}
          {activeSection === 'overview' && (
            <div className="pc-section-title">Overview</div>
          )}

          {activeSection === 'pets' && (
            <>
              <Form onSubmit={handleCreatePet} className="mb-3" autoComplete="off">
                <Row className="g-2 align-items-end">
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control value={newPet.name} onChange={(e) => setNewPet(p => ({ ...p, name: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Breed</Form.Label>
                    <Form.Control value={newPet.breed} onChange={(e) => setNewPet(p => ({ ...p, breed: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Birth Date</Form.Label>
                    <Form.Control type="date" value={newPet.birthDate} onChange={(e) => setNewPet(p => ({ ...p, birthDate: e.target.value }))} />
                  </Col>
                  <Col md={2}>
                    <Form.Label className="fw-semibold">User ID</Form.Label>
                    <Form.Control value={newPet.userId} onChange={(e) => setNewPet(p => ({ ...p, userId: e.target.value }))} />
                  </Col>
                  <Col md="auto">
                    <Button className="btn-orange" type="submit" disabled={!newPet.name || !newPet.breed || !newPet.birthDate}>+ Create</Button>
                  </Col>
                </Row>
              </Form>
              <Table striped hover responsive className="pets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Birth Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <Form.Control size="sm" value={p.name} onChange={(e) => setPets(prev => prev.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Control size="sm" value={p.breed} onChange={(e) => setPets(prev => prev.map(x => x.id === p.id ? { ...x, breed: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Control type="date" size="sm" value={(p.birthDate || '').slice(0,10)} onChange={(e) => setPets(prev => prev.map(x => x.id === p.id ? { ...x, birthDate: e.target.value } : x))} />
                      </td>
                      <td className="d-flex gap-2">
                        <Button size="sm" variant="success" onClick={() => handleUpdatePet(p)}>Save</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeletePet(p.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {activeSection === 'tasks' && (
            <>
              <Form onSubmit={handleCreateTask} className="mb-2" autoComplete="off">
                <Row className="g-2 align-items-end">
                  <Col md={4}>
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control value={newTask.description} onChange={(e) => setNewTask(t => ({ ...t, description: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Due Date</Form.Label>
                    <Form.Control type="date" value={newTask.dueDate} onChange={(e) => setNewTask(t => ({ ...t, dueDate: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Pet ID</Form.Label>
                    <Form.Control value={newTask.petId} onChange={(e) => setNewTask(t => ({ ...t, petId: e.target.value }))} />
                  </Col>
                  <Col md="auto">
                    <Button className="btn-orange" type="submit" disabled={!newTask.description || !newTask.dueDate || !newTask.petId}>+ Create</Button>
                  </Col>
                </Row>
              </Form>
              <Table striped hover responsive className="pets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Pet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careTasks.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>
                        <Form.Control size="sm" value={t.description} onChange={(e) => setCareTasks(prev => prev.map(x => x.id === t.id ? { ...x, description: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Control type="date" size="sm" value={(t.dueDate || '').slice(0,10)} onChange={(e) => setCareTasks(prev => prev.map(x => x.id === t.id ? { ...x, dueDate: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Check type="checkbox" checked={!!t.isCompleted} onChange={(e) => setCareTasks(prev => prev.map(x => x.id === t.id ? { ...x, isCompleted: e.target.checked } : x))} />
                      </td>
                      <td>
                        <Form.Control size="sm" value={t.petId} onChange={(e) => setCareTasks(prev => prev.map(x => x.id === t.id ? { ...x, petId: Number(e.target.value) } : x))} />
                      </td>
                      <td className="d-flex gap-2">
                        <Button size="sm" variant="success" onClick={() => handleUpdateTask(t)}>Save</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteTask(t.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {activeSection === 'visits' && (
            <>
              <Form onSubmit={handleCreateVisit} className="mb-2" autoComplete="off">
                <Row className="g-2 align-items-end">
                  <Col md={4}>
                    <Form.Label className="fw-semibold">Reason</Form.Label>
                    <Form.Control value={newVisit.reason} onChange={(e) => setNewVisit(v => ({ ...v, reason: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Visit Date</Form.Label>
                    <Form.Control type="date" value={newVisit.visitDate} onChange={(e) => setNewVisit(v => ({ ...v, visitDate: e.target.value }))} />
                  </Col>
                  <Col md={3}>
                    <Form.Label className="fw-semibold">Pet ID</Form.Label>
                    <Form.Control value={newVisit.petId} onChange={(e) => setNewVisit(v => ({ ...v, petId: e.target.value }))} />
                  </Col>
                  <Col md="auto">
                    <Button className="btn-orange" type="submit" disabled={!newVisit.reason || !newVisit.visitDate || !newVisit.petId}>+ Create</Button>
                  </Col>
                </Row>
              </Form>
              <Table striped hover responsive className="pets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th>Pet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map(v => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>
                        <Form.Control type="date" size="sm" value={(v.visitDate || '').slice(0,10)} onChange={(e) => setVisits(prev => prev.map(x => x.id === v.id ? { ...x, visitDate: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Control size="sm" value={v.reason} onChange={(e) => setVisits(prev => prev.map(x => x.id === v.id ? { ...x, reason: e.target.value } : x))} />
                      </td>
                      <td>
                        <Form.Control size="sm" value={v.petId} onChange={(e) => setVisits(prev => prev.map(x => x.id === v.id ? { ...x, petId: Number(e.target.value) } : x))} />
                      </td>
                      <td className="d-flex gap-2">
                        <Button size="sm" variant="success" onClick={() => handleUpdateVisit(v)}>Save</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteVisit(v.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {activeSection === 'users' && (
            <>
              <Form onSubmit={handleCreateUser} className="mb-2" autoComplete="off">
                <Row className="g-2 align-items-end">
                  <Col md={2}><Form.Label>First</Form.Label><Form.Control value={newUser.firstName} onChange={(e) => setNewUser(u => ({ ...u, firstName: e.target.value }))} /></Col>
                  <Col md={2}><Form.Label>Last</Form.Label><Form.Control value={newUser.lastName} onChange={(e) => setNewUser(u => ({ ...u, lastName: e.target.value }))} /></Col>
                  <Col md={3}><Form.Label>Email</Form.Label><Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser(u => ({ ...u, email: e.target.value }))} /></Col>
                  <Col md={2}><Form.Label>Password</Form.Label><Form.Control type="password" value={newUser.password} onChange={(e) => setNewUser(u => ({ ...u, password: e.target.value }))} /></Col>
                  <Col md={2}><Form.Label>Role</Form.Label><Form.Select value={newUser.role} onChange={(e) => setNewUser(u => ({ ...u, role: e.target.value }))}><option>User</option><option>Admin</option></Form.Select></Col>
                  <Col md="auto"><Button className="btn-orange" type="submit" disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password}>+ Create</Button></Col>
                </Row>
              </Form>
              <Table striped hover responsive className="pets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td><Form.Control size="sm" value={u.firstName || u.FirstName || ''} onChange={(e) => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, firstName: e.target.value } : x))} /></td>
                      <td><Form.Control size="sm" value={u.lastName || u.LastName || ''} onChange={(e) => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, lastName: e.target.value } : x))} /></td>
                      <td><Form.Control size="sm" value={u.email || u.Email || ''} onChange={(e) => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, email: e.target.value } : x))} /></td>
                      <td>
                        <Form.Select size="sm" value={(u.role || u.Role || 'User')} onChange={(e) => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: e.target.value } : x))}>
                          <option>User</option>
                          <option>Admin</option>
                        </Form.Select>
                      </td>
                      <td className="text-center"><Form.Check type="checkbox" checked={!!(u.isActive ?? u.IsActive)} onChange={(e) => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, isActive: e.target.checked } : x))} /></td>
                      <td className="d-flex gap-2">
                        <Button size="sm" variant="success" onClick={() => handleUpdateUser(u)}>Save</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteUser(u.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Container>
      </div>

      {/* Logout Modal */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Logout</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowLogout(false)}>Cancel</Button>
          <Button variant="dark" onClick={confirmLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPage;