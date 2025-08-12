const pets = [
  { id: 1, name: 'Luna', breed: 'Golden Retriever', birthDate: '2019-05-10' },
  { id: 2, name: 'Max', breed: 'Bulldog', birthDate: '2020-11-22' },
  { id: 3, name: 'Bella', breed: 'Poodle', birthDate: '2021-03-15' },
];

const careTasks = [
  { id: 1, description: 'Give Luna vaccination', dueDate: '2025-08-15', isCompleted: false, petId: 1 },
  { id: 2, description: 'Walk Max', dueDate: '2025-08-08', isCompleted: true, petId: 2 },
  { id: 3, description: 'Groom Bella', dueDate: '2025-08-12', isCompleted: false, petId: 3 },
];

const visits = [
  { id: 1, visitDate: '2025-07-01', reason: 'Checkup', petId: 1 },
  { id: 2, visitDate: '2025-07-20', reason: 'Grooming', petId: 2 },
  { id: 3, visitDate: '2025-08-05', reason: 'Vaccination', petId: 3 },
];

export default { pets, careTasks, visits };

