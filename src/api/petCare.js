import client from './client';

// Helpers për format datash
const toYYYYMMDD = (d) => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

const toDDMMYYYY = (d) => {
  if (!d) return '';
  const [y, m, dd] = d.split('-'); // pret 'yyyy-MM-dd'
  return `${dd}-${m}-${y}`;
};

// Pets (api/Pet)
export const fetchPets = () => client.get('/api/Pet').then(r => r.data);
export const createPet = (pet) => {
  const currentUserId = localStorage.getItem('userId');
  const resolvedUserId = pet.userId != null && pet.userId !== '' ? Number(pet.userId) : (currentUserId ? Number(currentUserId) : 0);
  const payload = {
    name: pet.name,
    breed: pet.breed,
    birthDate: toYYYYMMDD(pet.birthDate),
    userId: resolvedUserId
  };
  return client.post('/api/Pet', payload).then(r => r.data);
};
export const deletePet = (id) => client.delete(`/api/Pet/${id}`);

// CareTasks (api/CareTask)
export const fetchCareTasks = () => client.get('/api/CareTask').then(r => r.data);
export const createCareTask = (task) => {
  const payload = {
    description: task.description,
    dueDate: toYYYYMMDD(task.dueDate),
    petId: Number(task.petId)
  };
  return client.post('/api/CareTask', payload).then(r => r.data);
};
export const updateCareTask = (id, task) => {
  const payload = {
    description: task.description,
    dueDate: toDDMMYYYY(task.dueDate), // PUT pret "dd-MM-yyyy"
    isCompleted: task.isCompleted,
    petId: Number(task.petId)
  };
  return client.put(`/api/CareTask/${id}`, payload).then(r => r.data);
};
export const deleteCareTask = (id) => client.delete(`/api/CareTask/${id}`);

// Visits (api/Visit)
export const fetchVisits = () => client.get('/api/Visit').then(r => r.data);
export const createVisit = (visit) => {
  const payload = {
    reason: visit.reason,
    visitDate: toYYYYMMDD(visit.visitDate),
    petId: Number(visit.petId)
  };
  return client.post('/api/Visit', payload).then(r => r.data);
};
export const deleteVisit = (id) => client.delete(`/api/Visit/${id}`)
