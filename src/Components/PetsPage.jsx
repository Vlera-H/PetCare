import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AppNavbar from './AppNavbar';
import { useData } from './DataContext';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const PetsPage = () => {
  const { pets, setPets } = useData();
  const [form, setForm] = useState({ name: '', breed: '', birthDate: '' });

  const handleAdd = () => {
    if (!form.name || !form.breed || !form.birthDate) return;
    const newPet = { id: generateNextId(pets), ...form };
    setPets(prev => [...prev, newPet]);
    setForm({ name: '', breed: '', birthDate: '' });
  };

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Pets</h3>
          <AppNavbar />
        </div>
        <Container fluid>
          <Row className="g-3 align-items-end">
            <Col xs={12} md={4}>
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="fw-semibold">Breed</Form.Label>
              <Form.Control value={form.breed} onChange={(e) => setForm(f => ({ ...f, breed: e.target.value }))} />
            </Col>
            <Col xs={12} md={3}>
              <Form.Label className="fw-semibold">Birth Date</Form.Label>
              <Form.Control type="date" value={form.birthDate} onChange={(e) => setForm(f => ({ ...f, birthDate: e.target.value }))} />
            </Col>
            <Col xs={12} md="auto">
              <Button onClick={handleAdd} disabled={!form.name || !form.breed || !form.birthDate}>+ Add Pet</Button>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Birth Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map(pet => (
                    <tr key={pet.id}>
                      <td>{pet.name}</td>
                      <td>{pet.breed}</td>
                      <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default PetsPage;