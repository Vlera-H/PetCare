import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
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
        <Row className="g-3 align-items-center pets-hero">
          <Col lg={7}>
            <div className="pets-hero-text">
              <h2 className="pets-hero-title">We’re happy you’re taking care of your pets</h2>
              <p className="pets-hero-subtitle">Keep profiles updated and track care routines for a happier, healthier life together.</p>
            </div>
          </Col>
          <Col lg={5} className="text-center">
            <img src="/img/pets-hero.png" alt="Pets" className="pets-hero-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col md={5} lg={4} xl={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="fw-bold mb-2" style={{ color: '#5c4033' }}>Add new pet</div>
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Breed</Form.Label>
                    <Form.Control value={form.breed} onChange={(e) => setForm(f => ({ ...f, breed: e.target.value }))} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Birth Date</Form.Label>
                    <Form.Control type="date" value={form.birthDate} onChange={(e) => setForm(f => ({ ...f, birthDate: e.target.value }))} />
                  </Form.Group>
                  <Button className="w-100" onClick={handleAdd} disabled={!form.name || !form.breed || !form.birthDate}>+ Add Pet</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7} lg={8} xl={9}>
            <Row className="g-3">
              {pets.map(pet => (
                <Col key={pet.id} sm={6} md={6} lg={4} xl={3}>
                  <Card className="shadow-sm pet-card h-100">
                    <Card.Img variant="top" src="/img/pet-default.png" alt="Pet" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <Card.Body>
                      <div className="fw-bold text-brown">{pet.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>{pet.breed}</div>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>Born {new Date(pet.birthDate).toLocaleDateString()}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetsPage;