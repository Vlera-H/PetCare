import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
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

        {/* (Small message and photo moved below the table) */}

        {/* Horizontal add form */}
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

        {/* Small brown message and small photo */}
        <Row className="align-items-center mt-2">
          <Col md={8}>
            <div style={{ color: '#5c4033', fontSize: '0.95rem' }}>
              We’re glad you’re caring for your pets. Keep profiles up to date to make daily care easier.
            </div>
          </Col>
          <Col md={4} className="text-md-end text-center">
            <img 
              src="/img/pets-hero.png" 
              alt="Pets" 
              style={{ maxWidth: '160px', width: '100%', height: 'auto' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetsPage;