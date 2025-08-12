import React from 'react';

const CareTaskList = ({ tasks }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Pet ID</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.description}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.isCompleted ? 'Completed' : 'Pending'}</td>
            <td>{task.petId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CareTaskList;
