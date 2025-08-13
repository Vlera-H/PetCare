import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const VisitsPage = () => {
  const navigate = useNavigate();
  const { pets, visits, setVisits } = useData();

  const [form, setForm] = useState({ reason: '', visitDate: '', petId: pets[0]?.id || '' });

  const visitsForSelectedPet = useMemo(
    () => (form.petId ? visits.filter(v => v.petId === Number(form.petId)) : visits),
    [visits, form.petId]
  );

  const handleAdd = () => {
    if (!form.reason || !form.visitDate || !form.petId) return;
    const newVisit = {
      id: generateNextId(visits),
      reason: form.reason,
      visitDate: form.visitDate,
      petId: Number(form.petId),
    };
    setVisits(prev => [...prev, newVisit]);
    setForm(f => ({ ...f, reason: '', visitDate: '' }));
  };

  const deleteVisit = (visitId) => {
    setVisits(prev => prev.filter(v => v.id !== visitId));
  };

  return (
    <div>
      <Container fluid className="py-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Button variant="link" className="p-0" onClick={() => navigate('/')}>← Back to Home</Button>
          <h3 className="m-0" style={{ color: '#5c4033' }}>Visits</h3>
        </div>

        <Row className="g-3 align-items-end">
          <Col xs={12} md={4}>
            <Form.Label className="fw-semibold">Reason</Form.Label>
            <Form.Control value={form.reason} onChange={(e) => setForm(f => ({ ...f, reason: e.target.value }))} />
          </Col>
          <Col xs={12} md={3}>
            <Form.Label className="fw-semibold">Visit Date</Form.Label>
            <Form.Control type="date" value={form.visitDate} onChange={(e) => setForm(f => ({ ...f, visitDate: e.target.value }))} />
          </Col>
          <Col xs={12} md={3}>
            <Form.Label className="fw-semibold">Pet</Form.Label>
            <Form.Select value={form.petId} onChange={(e) => setForm(f => ({ ...f, petId: e.target.value }))}>
              <option value="">Select pet</option>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name} — {p.breed}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md="auto">
            <Button onClick={handleAdd} disabled={!form.reason || !form.visitDate || !form.petId}>+ Add Visit</Button>
          </Col>
        </Row>

        <Row className="g-3 mt-3">
          <Col>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Visit Date</th>
                  <th>Reason</th>
                  <th>Pet</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitsForSelectedPet.map(visit => {
                  const pet = pets.find(p => p.id === visit.petId);
                  return (
                    <tr key={visit.id}>
                      <td>{new Date(visit.visitDate).toLocaleDateString()}</td>
                      <td>{visit.reason}</td>
                      <td>{pet ? pet.name : visit.petId}</td>
                      <td>
                        <Button size="sm" variant="outline-danger" onClick={() => deleteVisit(visit.id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisitsPage;