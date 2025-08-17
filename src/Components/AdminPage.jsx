import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Tabs, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchPets, createPet, updatePet, deletePet, fetchCareTasks, createCareTask, updateCareTask, deleteCareTask, fetchVisits, createVisit, updateVisit, deleteVisit } from '../api/petCare';
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
	const [newTask, setNewTask] = useState({ description: '', dueDate: '', petId: '' });
	const [newVisit, setNewVisit] = useState({ reason: '', visitDate: '', petId: '' });

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

	const handleUpdatePet = async (p) => {
		try {
			const updated = await updatePet(p.id, p);
			setPets(prev => prev.map(x => x.id === p.id ? updated : x));
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
			const updated = await updateCareTask(t.id, t);
			setCareTasks(prev => prev.map(x => x.id === t.id ? updated : x));
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
			const updated = await updateVisit(v.id, v);
			setVisits(prev => prev.map(x => x.id === v.id ? updated : x));
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

	return (
		<div className="pets-page">
			<Container fluid className="py-3 px-0">
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
							{/* Pets Tab */}
							...
							{/* Tasks Tab */}
							...
							{/* Visits Tab */}
							...
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

