import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

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
    <div className="pets-background">
      <Container fluid className="py-3">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h3 className="m-0 text-center" style={{ color: '#5c4033' }}>Pets</h3>

        {/* Top: photo (left) + message (right) as medium rectangles */}
        <Row className="g-3 align-items-stretch mt-2">
          <Col md={4}>
            <Card className="shadow-sm h-100 pets-hero-card d-flex align-items-center justify-content-center">
              <Card.Body className="d-flex align-items-center justify-content-center">
                <img
                  src="/img/pets-hero.png"
                  alt="Pets"
                  className="pets-hero-img-medium"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="shadow-sm h-100 pets-hero-card">
              <Card.Body>
                <h5 className="m-0" style={{ color: '#5c4033' }}>We’re glad you’re caring for your pets</h5>
                <p className="mb-0" style={{ color: '#5c4033' }}>
                  Keep profiles up to date and track routines—small habits make a big difference every day.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pets list */}
        <Row className="g-2 mt-3">
          <Col>
            <h5 className="m-0" style={{ color: '#5c4033' }}>Your pets list</h5>
          </Col>
        </Row>
        <Row className="g-3 mt-1">
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

        {/* Bottom: horizontal add form */}
        <Row className="g-3 align-items-end mt-3">
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
      </Container>
    </div>
  );
};

export default PetsPage;