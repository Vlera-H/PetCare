import React from 'react';

const PetList = ({ pets }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Birth Date</th>
        </tr>
      </thead>
      <tbody>
        {pets.map(pet => (
          <tr key={pet.id}>
            <td>{pet.name}</td>
            <td>{pet.breed}</td>
            <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PetList;
