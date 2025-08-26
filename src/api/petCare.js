import client from './client';

// Helpers për format datash (frontend → backend)
const toYYYYMMDD = (d) => {
  if (!d) return '';
  if (typeof d === 'string') {
    const s = d.trim();
    if (!s) return '';
    // yyyy-MM-dd or ISO
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    // dd-MM-yyyy
    const ddmmyyyy = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyy) {
      const [, dd, mm, yyyy] = ddmmyyyy;
      return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
    }
    // dd.MM.yyyy
    const ddmmyyyyDots = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (ddmmyyyyDots) {
      const [, dd, mm, yyyy] = ddmmyyyyDots;
      return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
    }
    // mm/dd/yyyy
    const mmddyyyy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (mmddyyyy) {
      const [, mm, dd, yyyy] = mmddyyyy;
      return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
    }
  }
  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

// Helper për të konvertuar në dd-MM-yyyy për backend updates
const toDDMMYYYY = (d) => {
  if (!d) return '';
  try {
    if (typeof d === 'string') {
      const s = d.trim();
      if (!s) return '';
      // yyyy-MM-dd or ISO
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
        const [y, m, dd] = s.slice(0,10).split('-');
        return `${String(dd).padStart(2,'0')}-${String(m).padStart(2,'0')}-${y}`;
      }
      // dd-MM-yyyy already
      if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(s)) return s;
      // dd.MM.yyyy
      const ddmmyyyyDots = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
      if (ddmmyyyyDots) {
        const [, dd, mm, yyyy] = ddmmyyyyDots;
        return `${String(dd).padStart(2,'0')}-${String(mm).padStart(2,'0')}-${yyyy}`;
      }
      // mm/dd/yyyy
      const mmddyyyy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (mmddyyyy) {
        const [, mm, dd, yyyy] = mmddyyyy;
        return `${String(dd).padStart(2,'0')}-${String(mm).padStart(2,'0')}-${yyyy}`;
      }
    }
    const date = typeof d === 'string' ? new Date(d) : d;
    if (isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${m}-${y}`;
  } catch {
    return '';
  }
};

// Helper për të marrë userId aktual
const getCurrentUserId = () => {
  const userId = localStorage.getItem('userId');
  return userId ? Number(userId) : null;
};

// Pets (api/Pet)
export const fetchPets = () => client.get('/api/Pet').then(r => r.data);

export const createPet = (pet) => {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) {
    throw new Error('User not authenticated');
  }
  const resolvedUserId = pet.userId != null && pet.userId !== '' ? Number(pet.userId) : currentUserId;
  const createDate = toYYYYMMDD(pet.birthDate);
  if (!createDate) {
    throw new Error('Invalid birth date format');
  }
  const payload = {
    name: pet.name,
    breed: pet.breed,
    birthDate: createDate, // yyyy-MM-dd
    userId: resolvedUserId
  };
  return client.post('/api/Pet', payload).then(r => r.data);
};

export const deletePet = (id) => client.delete(`/api/Pet/${id}`);
export const updatePet = (id, pet) => {
  const payload = {
    name: pet.name,
    breed: pet.breed,
    birthDate: toDDMMYYYY(pet.birthDate), // dd-MM-yyyy
    userId: pet.userId != null ? Number(pet.userId) : undefined
  };
  return client.put(`/api/Pet/${id}`, payload).then(r => r.data);
};

// CareTasks (api/CareTask)
export const fetchCareTasks = () => client.get('/api/CareTask').then(r => r.data);

export const createCareTask = (task) => {
  const createDate = toYYYYMMDD(task.dueDate);
  if (!createDate) {
    throw new Error('Invalid due date format');
  }
  const payload = {
    description: task.description,
    dueDate: createDate, // yyyy-MM-dd
    petId: Number(task.petId)
  };
  return client.post('/api/CareTask', payload).then(r => r.data);
};

export const updateCareTask = (id, task) => {
  const payload = {
    description: task.description,
    dueDate: toDDMMYYYY(task.dueDate), // dd-MM-yyyy
    isCompleted: task.isCompleted,
    petId: Number(task.petId)
  };
  return client.put(`/api/CareTask/${id}`, payload).then(r => r.data);
};

export const deleteCareTask = (id) => client.delete(`/api/CareTask/${id}`);

// Visits (api/Visit)
export const fetchVisits = () => client.get('/api/Visit').then(r => r.data);

export const createVisit = (visit) => {
  const createDate = toYYYYMMDD(visit.visitDate);
  if (!createDate) {
    throw new Error('Invalid visit date format');
  }
  const payload = {
    reason: visit.reason,
    visitDate: createDate, // yyyy-MM-dd
    petId: Number(visit.petId)
  };
  return client.post('/api/Visit', payload).then(r => r.data);
};

export const updateVisit = (id, visit) => {
  const payload = {
    reason: visit.reason,
    visitDate: toDDMMYYYY(visit.visitDate), // dd-MM-yyyy
    petId: Number(visit.petId)
  };
  return client.put(`/api/Visit/${id}`, payload).then(r => r.data);
};

export const deleteVisit = (id) => client.delete(`/api/Visit/${id}`);

