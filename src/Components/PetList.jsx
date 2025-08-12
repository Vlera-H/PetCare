import React from 'react';

const PetList = ({ pets }) => {
  return (
    <ul>
      {pets.map(pet => (
        <li key={pet.id}>
          {pet.name} — {pet.breed} — {new Date(pet.birthDate).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

export default PetList;

