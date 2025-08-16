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
          {/* dy corner images si te Visits */}
          <img src="/img/c22.png" alt="" className="corner corner-tr" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/img/c33.png" alt="" className="corner corner-bl" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />

          <div className="pets-center">
            <div className="pets-section-title mb-2">Add new pet</div>
            <Form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} autoComplete="off">
              <Row className="g-3 align-items-end mb-3 inline-form-row">
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
                <Col xs={12} md="auto">
                  <Button size="sm" className="btn-orange" type="submit" disabled={!form.name || !form.breed || !form.birthDate}>
                    + Add Pet
                  </Button>
                </Col>
              </Row>
            </Form>

            {/* tabela e Pets si te Visits */}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="m-0 pets-section-title">Your pets list</h5>
            </div>
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PetsPage;








