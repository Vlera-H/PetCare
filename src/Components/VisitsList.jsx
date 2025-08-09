import React from 'react';

const VisitsList = ({ visits }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Visit Date</th>
          <th>Reason</th>
          <th>Pet ID</th>
        </tr>
      </thead>
      <tbody>
        {visits.map(visit => (
          <tr key={visit.id}>
            <td>{new Date(visit.visitDate).toLocaleDateString()}</td>
            <td>{visit.reason}</td>
            <td>{visit.petId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VisitsList;
