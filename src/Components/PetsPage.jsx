import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import { createPet } from '../api/petCare';
import './pet.css';

const PetsPage = () => {
  const navigate = useNavigate();
  const { pets, setPets } = useData();
  const [form, setForm] = useState({ name: '', breed: '', birthDate: '' });

  const handleAdd = async () => {
    if (!form.name || !form.breed || !form.birthDate) return;
    const created = await createPet({
      name: form.name,
      breed: form.breed,
      birthDate: form.birthDate
    });
    setPets(prev => [...prev, created]);
    setForm({ name: '', breed: '', birthDate: '' });
  };

  return (
    <div className="pets-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Pets</h1>

        <div className="pets-canvas">
          {/* corner images ... */}
          <div className="pets-center">
            <div className="pets-section-title mb-2">Add new pet</div>
            <Form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} autoComplete="off">
              <Row className="g-3 align-items-end mb-3">
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Name</Form.Label>
                  <Form.Control value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Breed</Form.Label>
                  <Form.Control value={form.breed} onChange={(e) => setForm(f => ({ ...f, breed: e.target.value }))} />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Birth Date</Form.Label>
                  <Form.Control type="date" value={form.birthDate} onChange={(e) => setForm(f => ({ ...f, birthDate: e.target.value }))} />
                </Col>
                <Col xs={12} md={3}>
                  <Button className="btn-orange w-100" type="submit">+ Add Pet</Button>
                </Col>
              </Row>
            </Form>

            {/* table ... */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PetsPage;







