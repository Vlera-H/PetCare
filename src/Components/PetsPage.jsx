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
        <h3 className="m-0" style={{ color: '#5c4033', paddingLeft: '2rem' }}>Pets</h3>

        {/* Small intro and image (compact) */}
        <Row className="g-3 align-items-center mt-1">
          <Col md={8}>
            <p className="mb-0" style={{ color: '#6f5b50' }}>
              We’re happy you’re taking care of your pets. Keep profiles updated and track routines for a happier, healthier life together.
            </p>
          </Col>
          <Col md={4} className="text-md-end text-center">
            <img src="/img/pets-hero.png" alt="Pets" className="pets-hero-img-small" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </Col>
        </Row>

        {/* Main content: Add form (focus) + Pets table */}
        <Row className="g-3 mt-2">
          <Col md={4} lg={3}>
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

          <Col md={8} lg={9}>
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
    </div>
  );
};

export default PetsPage;