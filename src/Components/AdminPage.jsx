import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Tabs, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPets, createPet, deletePet, fetchCareTasks, deleteCareTask, fetchVisits, deleteVisit } from '../api/petCare';
import './pet.css';
import './careguide.css';

const AdminPage = () => {
	const navigate = useNavigate();
	const [pets, setPets] = useState([]);
	const [careTasks, setCareTasks] = useState([]);
	const [visits, setVisits] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Minimal create form for pet (admin can assign to userId)
	const [newPet, setNewPet] = useState({ name: '', breed: '', birthDate: '', userId: '' });

	useEffect(() => {
		(async () => {
			try {
				const [p, t, v] = await Promise.all([
					fetchPets(),
					fetchCareTasks(),
					fetchVisits(),
				]);
				setPets(p);
				setCareTasks(t);
				setVisits(v);
			} catch (e) {
				setError('Failed to load admin data');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

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

	const handleDeletePet = async (id) => {
		try {
			await deletePet(id);
			setPets(prev => prev.filter(p => p.id !== id));
		} catch (e) {
			setError('Failed to delete pet');
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

	const handleDeleteVisit = async (id) => {
		try {
			await deleteVisit(id);
			setVisits(prev => prev.filter(v => v.id !== id));
		} catch (e) {
			setError('Failed to delete visit');
		}
	};

	return (
		<div className="pets-page">
			<Container fluid className="py-3 px-0">
				<span className="back-arrow" onClick={() => navigate('/')}>←</span>
				<h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Admin</h1>

				<div className="pets-canvas">
					<div className="pets-center">
						{loading && <div>Loading…</div>}
						{error && <Alert variant="danger" className="mb-2">{error}</Alert>}

						<Row className="g-3 mb-2">
							<Col md={3}>
								<Card className="shadow-sm insight-card h-100">
									<Card.Body>
										<div className="insight-label">Total Pets</div>
										<div className="insight-value">{insights.totalPets}</div>
									</Card.Body>
								</Card>
							</Col>
							<Col md={3}>
								<Card className="shadow-sm insight-card h-100">
									<Card.Body>
										<div className="insight-label">Tasks</div>
										<div className="insight-sub">{insights.completedTasks}/{insights.totalTasks} done</div>
										<div className="insight-value" style={{ fontSize: '1.6rem' }}>{insights.completionRate}%</div>
									</Card.Body>
								</Card>
							</Col>
							<Col md={3}>
								<Card className="shadow-sm insight-card h-100">
									<Card.Body>
										<div className="insight-label">Visits</div>
										<div className="insight-value">{insights.totalVisits}</div>
									</Card.Body>
								</Card>
							</Col>
							<Col md={3}>
								<Card className="shadow-sm insight-card h-100">
									<Card.Body>
										<div className="insight-label">Users</div>
										<div className="insight-value">—</div>
										<div className="small text-muted">Hook up when user API is available</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>

						<Tabs defaultActiveKey="pets" className="mb-3">
							<Tab eventKey="pets" title="Pets">
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
												<td>{p.name}</td>
												<td>{p.breed}</td>
												<td>{new Date(p.birthDate).toLocaleDateString()}</td>
												<td>
													<Button size="sm" variant="outline-danger" onClick={() => handleDeletePet(p.id)}>Delete</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Tab>

							<Tab eventKey="tasks" title="Care Tasks">
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
												<td>{t.description}</td>
												<td>{new Date(t.dueDate).toLocaleDateString()}</td>
												<td>{t.isCompleted ? 'Yes' : 'No'}</td>
												<td>{t.petId}</td>
												<td>
													<Button size="sm" variant="outline-danger" onClick={() => handleDeleteTask(t.id)}>Delete</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Tab>

							<Tab eventKey="visits" title="Visits">
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
												<td>{new Date(v.visitDate).toLocaleDateString()}</td>
												<td>{v.reason}</td>
												<td>{v.petId}</td>
												<td>
													<Button size="sm" variant="outline-danger" onClick={() => handleDeleteVisit(v.id)}>Delete</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Tab>

							<Tab eventKey="users" title="Users (Preview)">
								<Alert variant="info">Connect to your Users API to manage users and roles here. Persist role as 'Admin' or 'User' in localStorage after login.</Alert>
							</Tab>
						</Tabs>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AdminPage;