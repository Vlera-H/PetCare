import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import './pet.css';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const PetsPage = () => {
  const navigate = useNavigate();
  const { pets, setPets } = useData();
  const [form, setForm] = useState({ name: '', breed: '', birthDate: '' });

  const handleAdd = () => {
    if (!form.name || !form.breed || !form.birthDate) return;
    const newPet = { id: generateNextId(pets), ...form };
    setPets(prev => [...prev, newPet]);
    setForm({ name: '', breed: '', birthDate: '' });
  };

  return (
    <div className="pets-page">
      <Container fluid className="py-3">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h3 className="m-0 text-center pets-header-title">Pets</h3>

        {/* Top info banner: small photo left + short message right */}
        <Card className="pets-info-card shadow-sm mt-2">
          <Card.Body>
            <Row className="align-items-center g-3">
              <Col sm={3} className="text-center text-sm-start">
                <img
                  src="/img/pets-hero.png"
                  alt="Pets"
                  className="pets-info-img"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </Col>
              <Col sm={9}>
                <div className="pets-info-text">
                  Keep your pets’ profiles up to date and track their care routines — small habits make a big difference every day.
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Pets list */}
        <Row className="g-2 mt-3">
          <Col>
            <h5 className="m-0 pets-section-title">Your pets list</h5>
          </Col>
        </Row>
        <Row className="g-3 mt-1">
          <Col>
            <Table striped hover responsive className="pets-table">
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

        {/* Bottom: add new pet (horizontal) inside a card */}
        <Card className="pets-add-card shadow-sm mt-3">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col xs={12} md={4}>
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </Col>
              <Col xs={12} md={4}>
                <Form.Label className="fw-semibold">Breed</Form.Label>
                <Form.Control
                  value={form.breed}
                  onChange={(e) => setForm(f => ({ ...f, breed: e.target.value }))}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold">Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm(f => ({ ...f, birthDate: e.target.value }))}
                />
              </Col>
              <Col xs={12} md="auto">
                <Button onClick={handleAdd} disabled={!form.name || !form.breed || !form.birthDate}>
                  + Add Pet
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PetsPage;