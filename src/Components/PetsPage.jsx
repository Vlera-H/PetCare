import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
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

        {/* Full background area with content overlay */}
        <div className="pets-bg-wrap">
          <img
            src="/img/hero.png"
            alt=""
            className="pets-bg-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="pets-glass">
            {/* Add New Pet - full width */}
            <div className="pets-section-title mb-2">Add new pet</div>
            <Row className="g-3 align-items-end mb-3">
              <Col xs={12} md={4} lg={3}>
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </Col>
              <Col xs={12} md={4} lg={3}>
                <Form.Label className="fw-semibold">Breed</Form.Label>
                <Form.Control
                  value={form.breed}
                  onChange={(e) => setForm(f => ({ ...f, breed: e.target.value }))}
                />
              </Col>
              <Col xs={12} md={4} lg={3}>
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

            {/* Pets list - full width */}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="m-0 pets-section-title">Your pets list</h5>
            </div>
            <Row className="g-3">
              <Col xs={12}>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PetsPage;