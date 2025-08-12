import React, { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './Home.css';
import VisitList from './VisitList';
import { useData } from '../context/DataContext';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const VisitsPage = () => {
  const { pets, visits, setVisits } = useData();
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || null);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitForm, setVisitForm] = useState({ visitDate: '', reason: '' });

  const visitsForPet = useMemo(() => visits.filter(v => !selectedPetId || v.petId === selectedPetId), [visits, selectedPetId]);

  const handleAddVisit = () => {
    if (!selectedPetId) return;
    const newVisit = {
      id: generateNextId(visits),
      visitDate: visitForm.visitDate,
      reason: visitForm.reason,
      petId: selectedPetId,
    };
    setVisits(prev => [...prev, newVisit]);
    setVisitForm({ visitDate: '', reason: '' });
    setShowVisitModal(false);
  };

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Visits</h3>
          <div className="d-flex align-items-center gap-2">
            <Form.Select size="sm" value={selectedPetId || ''} onChange={(e) => setSelectedPetId(Number(e.target.value) || null)}>
              {pets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
            <Button variant="primary" onClick={() => setShowVisitModal(true)}>+ Add Visit</Button>
          </div>
        </div>

        <div className="pc-section-title">
          <h6 className="m-0">Visits for {pets.find(p => p.id === selectedPetId)?.name || 'All'}</h6>
        </div>
        <VisitList visits={visitsForPet} />

        <Modal show={showVisitModal} onHide={() => setShowVisitModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Visit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control value={visitForm.reason} onChange={(e) => setVisitForm(f => ({ ...f, reason: e.target.value }))} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Visit Date</Form.Label>
                <Form.Control type="date" value={visitForm.visitDate} onChange={(e) => setVisitForm(f => ({ ...f, visitDate: e.target.value }))} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVisitModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddVisit} disabled={!visitForm.reason || !visitForm.visitDate || !selectedPetId}>Add Visit</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default VisitsPage;
