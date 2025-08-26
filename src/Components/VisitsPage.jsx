import React, { useMemo, useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import { createVisit, deleteVisit as apiDeleteVisit } from '../api/petCare';
import './pet.css';
import './inlineForms.css';

const VisitsPage = () => {
  const navigate = useNavigate();
  const { pets, visits, setVisits } = useData();

  const [form, setForm] = useState({
    reason: '',
    visitDate: '',
    petId: pets[0]?.id ? String(pets[0].id) : '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const visitsForSelectedPet = useMemo(
    () => (form.petId ? visits.filter(v => v.petId === Number(form.petId)) : visits),
    [visits, form.petId]
  );

  const handleAdd = async () => {
    if (!form.reason || !form.visitDate || !form.petId) {
      setError('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const created = await createVisit({
        reason: form.reason,
        visitDate: form.visitDate,
        petId: form.petId,
      });

      const normalized = {
        ...created,
        id: Number(created.id),
        petId: Number(created.petId),
      };
      setVisits(prev => [...prev, normalized]);
      setForm(f => ({ ...f, reason: '', visitDate: '' }));
    } catch (e) {
      setError(`Gabim gjatë shtimit të vizitës: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteVisit = async (visitId) => {
    setLoading(true);
    try {
      await apiDeleteVisit(visitId);
      setVisits(prev => prev.filter(v => v.id !== visitId));
    } catch (e) {
      setError(`Gabim gjatë fshirjes së vizitës: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pets-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/home', { replace: true })}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>
          Visits
        </h1>

        <div className="pets-canvas">
          <img src="/img/c22.png" alt="" className="corner corner-tr" loading="lazy"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/img/c33.png" alt="" className="corner corner-bl" loading="lazy"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />

          <div className="pets-center">
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {!pets.length && (
              <Alert variant="warning" className="mb-3">
                You need at least one pet to add a visit.{" "}
                <Button variant="link" className="p-0" onClick={() => navigate('/pets')}>
                  Add a pet
                </Button>
              </Alert>
            )}

            <div className="pets-section-title mb-2">Add new visit</div>
            <Form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} autoComplete="off">
              <Row className="g-3 align-items-end mb-3 inline-form-row">
                <Col xs={12} md={4}>
                  <Form.Label className="fw-semibold">Reason</Form.Label>
                  <Form.Control
                    value={form.reason}
                    onChange={(e) => setForm(f => ({ ...f, reason: e.target.value }))}
                    disabled={loading}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Visit Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.visitDate}
                    onChange={(e) => setForm(f => ({ ...f, visitDate: e.target.value }))}
                    disabled={loading}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label className="fw-semibold">Pet</Form.Label>
                  <Form.Select
                    value={form.petId}
                    onChange={(e) => setForm(f => ({ ...f, petId: e.target.value }))}
                    disabled={loading}
                  >
                    <option value="">Select pet</option>
                    {pets.map(p => (
                      <option key={p.id} value={String(p.id)}>
                        {p.name} — {p.breed}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md="auto">
                  <Button
                    size="sm"
                    className="btn-orange"
                    type="submit"
                    disabled={!form.reason || !form.visitDate || !form.petId || loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : '+ Add Visit'}
                  </Button>
                </Col>
              </Row>
            </Form>

            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="m-0 pets-section-title">Your visits list ({visits.length})</h5>
            </div>
            <Table striped hover responsive className="pets-table">
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
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteVisit(visit.id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VisitsPage;





