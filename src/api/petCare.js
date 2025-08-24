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

// Helper për të konvertuar yyyy-MM-dd në dd-MM-yyyy për backend
const toDDMMYYYY = (d) => {
  if (!d) return '';
  
  try {
    // Nëse është string në formatin yyyy-MM-dd
    if (typeof d === 'string' && d.includes('-')) {
      const parts = d.split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}-${month}-${year}`;
      }
    }
    
    // Nëse është Date object
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
  console.log('🔍 getCurrentUserId called');
  console.log('🔍 localStorage userId:', userId);
  console.log('🔍 userId type:', typeof userId);
  console.log('🔍 userId parsed:', userId ? Number(userId) : null);
  return userId ? Number(userId) : null;
};

// Pets (api/Pet) - përdor endpoints origjinale
export const fetchPets = () => client.get('/api/Pet').then(r => r.data);

export const createPet = (pet) => {
  console.log('🔍 CREATE PET STARTED');
  console.log('🔍 Pet data received:', pet);
  
  const currentUserId = getCurrentUserId();
  console.log('🔍 Current user ID:', currentUserId);
  
  if (!currentUserId) {
    console.log('❌ No user ID found');
    throw new Error('User not authenticated');
  }
  
  const resolvedUserId = pet.userId != null && pet.userId !== '' ? Number(pet.userId) : currentUserId;
  console.log('🔍 Resolved user ID:', resolvedUserId);
  
  // Për CREATE endpoint, dërgo yyyy-MM-dd (backend pret DateTime)
  const createDate = toYYYYMMDD(pet.birthDate);
  console.log('🔍 Original date:', pet.birthDate);
  console.log('🔍 Date for CREATE (yyyy-MM-dd):', createDate);
  
  if (!createDate) {
    console.log('❌ Date conversion failed');
    throw new Error('Invalid birth date format');
  }
  
  const payload = {
    name: pet.name,
    breed: pet.breed,
    birthDate: createDate, // Dërgo yyyy-MM-dd për CREATE
    userId: resolvedUserId
  };
  
  console.log('🔍 Final payload:', payload);
  console.log('🔍 Sending to API...');
  
  return client.post('/api/Pet', payload)
    .then(response => {
      console.log('✅ API success:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log('❌ API ERROR:');
      console.log('❌ Status:', error.response?.status);
      console.log('❌ Data:', error.response?.data);
      console.log('❌ Message:', error.message);
      throw error;
    });
};

export const deletePet = (id) => client.delete(`/api/Pet/${id}`);
export const updatePet = (id, pet) => {
  const payload = {
    name: pet.name,
    breed: pet.breed,
    birthDate: toDDMMYYYY(pet.birthDate), // Konverto në dd-MM-yyyy për backend
    userId: pet.userId != null ? Number(pet.userId) : undefined
  };
  return client.put(`/api/Pet/${id}`, payload).then(r => r.data);
};

// CareTasks (api/CareTask) - përdor endpoints origjinale
export const fetchCareTasks = () => client.get('/api/CareTask').then(r => r.data);

export const createCareTask = (task) => {
  console.log('🔍 CREATE CARE TASK STARTED');
  console.log('🔍 Task data received:', task);
  
  // Për CREATE endpoint, dërgo yyyy-MM-dd (backend pret DateOnly)
  const createDate = toYYYYMMDD(task.dueDate);
  console.log('🔍 Original date:', task.dueDate);
  console.log('🔍 Date for CREATE (yyyy-MM-dd):', createDate);
  
  if (!createDate) {
    console.log('❌ Date conversion failed');
    throw new Error('Invalid due date format');
  }
  
  const payload = {
    description: task.description,
    dueDate: createDate, // Dërgo yyyy-MM-dd për CREATE
    petId: Number(task.petId)
  };
  
  console.log('🔍 Final payload:', payload);
  console.log('🔍 Sending to API...');
  
  return client.post('/api/CareTask', payload)
    .then(response => {
      console.log('✅ API success:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log('❌ API ERROR:');
      console.log('❌ Status:', error.response?.status);
      console.log('❌ Data:', error.response?.data);
      console.log('❌ Message:', error.message);
      throw error;
    });
};

export const updateCareTask = (id, task) => {
  const payload = {
    description: task.description,
    dueDate: toDDMMYYYY(task.dueDate), // Konverto në dd-MM-yyyy për backend
    isCompleted: task.isCompleted,
    petId: Number(task.petId)
  };
  return client.put(`/api/CareTask/${id}`, payload).then(r => r.data);
};

export const deleteCareTask = (id) => client.delete(`/api/CareTask/${id}`);

// Visits (api/Visit) - përdor endpoints origjinale
export const fetchVisits = () => client.get('/api/Visit').then(r => r.data);

export const createVisit = (visit) => {
  console.log('🔍 CREATE VISIT STARTED');
  console.log('🔍 Visit data received:', visit);
  
  // Për CREATE endpoint, dërgo yyyy-MM-dd (backend pret DateOnly)
  const createDate = toYYYYMMDD(visit.visitDate);
  console.log('🔍 Original date:', visit.visitDate);
  console.log('🔍 Date for CREATE (yyyy-MM-dd):', createDate);
  
  if (!createDate) {
    console.log('❌ Date conversion failed');
    throw new Error('Invalid visit date format');
  }
  
  const payload = {
    reason: visit.reason,
    visitDate: createDate, // Dërgo yyyy-MM-dd për CREATE
    petId: Number(visit.petId)
  };
  
  console.log('🔍 Final payload:', payload);
  console.log('🔍 Sending to API...');
  
  return client.post('/api/Visit', payload)
    .then(response => {
      console.log('✅ API success:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log('❌ API ERROR:');
      console.log('❌ Status:', error.response?.status);
      console.log('❌ Data:', error.response?.data);
      console.log('❌ Message:', error.message);
      throw error;
    });
};

export const updateVisit = (id, visit) => {
  const payload = {
    reason: visit.reason,
    visitDate: toDDMMYYYY(visit.visitDate), // Konverto në dd-MM-yyyy për backend
    petId: Number(visit.petId)
  };
  return client.put(`/api/Visit/${id}`, payload).then(r => r.data);
};

export const deleteVisit = (id) => {
  console.log('🔍 DELETE VISIT: Attempting to delete visit with ID:', id);
  console.log('🔍 DELETE VISIT: ID type:', typeof id);
  console.log('🔍 DELETE VISIT: ID value:', id);
  
  return client.delete(`/api/Visit/${id}`)
    .then(response => {
      console.log('✅ Visit deleted successfully:', id);
      return response.data;
    })
    .catch(error => {
      console.log('❌ Failed to delete visit:', id);
      console.log('❌ Error:', error.response?.status, error.response?.data);
      throw error;
    });
};