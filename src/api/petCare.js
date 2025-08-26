import client from './client';

// Helpers për format datash
const toYYYYMMDD = (d) => {
  if (!d) return '';
  // Accept strings in multiple formats
  if (typeof d === 'string') {
    const s = d.trim();
    if (!s) return '';
    // yyyy-MM-dd or ISO
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    // dd-MM-yyyy
    const ddmmyyyy = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyy) {
      const [, dd, mm, yyyy] = ddmmyyyy;
      return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
    }
    // mm/dd/yyyy
    const mmddyyyy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (mmddyyyy) {
      const [, mm, dd, yyyy] = mmddyyyy;
      return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
    }
  }
  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) {
    return '';
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const result = `${y}-${m}-${dd}`;
  return result;
};

// Helper për të konvertuar yyyy-MM-dd në dd-MM-yyyy për backend
const toDDMMYYYY = (d) => {
  if (!d) return '';
  try {
    // yyyy-MM-dd or ISO
    if (typeof d === 'string' && /\d{4}-\d{2}-\d{2}/.test(d)) {
      const parts = d.slice(0,10).split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}-${month}-${year}`;
      }
    }
    // dd-MM-yyyy
    if (typeof d === 'string' && /\d{1,2}-\d{1,2}-\d{4}/.test(d)) {
      return d;
    }
    // mm/dd/yyyy
    if (typeof d === 'string' && /\d{1,2}\/\d{1,2}\/\d{4}/.test(d)) {
      const [, mm, dd, yyyy] = d.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      return `${String(dd).padStart(2,'0')}-${String(mm).padStart(2,'0')}-${yyyy}`;
    }
    // Date object or fallback
    const date = typeof d === 'string' ? new Date(d) : d;
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${m}-${y}`;
  } catch (error) {
    console.error('Error converting date:', d, error);
    return '';
  }
};

// Helper për të marrë userId aktual
const getCurrentUserId = () => {
  const userId = localStorage.getItem('userId');
  return userId ? Number(userId) : null;
};

// Pets (api/Pet) - përdor endpoints origjinale
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
    birthDate: toDDMMYYYY(pet.birthDate),
    userId: pet.userId != null ? Number(pet.userId) : undefined
  };
  return client.put(`/api/Pet/${id}`, payload).then(r => r.data);
};

// CareTasks (api/CareTask) - përdor endpoints origjinale
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
    dueDate: toDDMMYYYY(task.dueDate),
    isCompleted: task.isCompleted,
    petId: Number(task.petId)
  };
  return client.put(`/api/CareTask/${id}`, payload).then(r => r.data);
};

export const deleteCareTask = (id) => client.delete(`/api/CareTask/${id}`);

// Visits (api/Visit) - përdor endpoints origjinale
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
    visitDate: toDDMMYYYY(visit.visitDate),
    petId: Number(visit.petId)
  };
  return client.put(`/api/Visit/${id}`, payload).then(r => r.data);
};

export const deleteVisit = (id) => client.delete(`/api/Visit/${id}`);

