import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './Home.css';
import PetList from './PetList';
import { useData } from '../context/DataContext';

const generateNextId = (items) => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);

const PetsPage = () => {
  const { pets, setPets } = useData();
  const [showPetModal, setShowPetModal] = useState(false);
  const [petForm, setPetForm] = useState({ name: '', breed: '', birthDate: '' });

  const handleAddPet = () => {
    const newPet = { id: generateNextId(pets), name: petForm.name, breed: petForm.breed, birthDate: petForm.birthDate };
    setPets(prev => [...prev, newPet]);
    setPetForm({ name: '', breed: '', birthDate: '' });
    setShowPetModal(false);
  };

  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Pets</h3>
          <Button variant="primary" onClick={() => setShowPetModal(true)}>+ Add Pet</Button>
        </div>

        <div className="pc-section-title">
          <h6 className="m-0">All Pets</h6>
        </div>
        <PetList pets={pets} />

        <Modal show={showPetModal} onHide={() => setShowPetModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={petForm.name} onChange={(e) => setPetForm(f => ({ ...f, name: e.target.value }))} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Breed</Form.Label>
                <Form.Control value={petForm.breed} onChange={(e) => setPetForm(f => ({ ...f, breed: e.target.value }))} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" value={petForm.birthDate} onChange={(e) => setPetForm(f => ({ ...f, birthDate: e.target.value }))} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPetModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddPet} disabled={!petForm.name || !petForm.breed || !petForm.birthDate}>Add Pet</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default PetsPage;