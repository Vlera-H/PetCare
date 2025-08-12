import React, { createContext, useContext, useState } from 'react';
import demoData from '../data/demoData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [pets, setPets] = useState(demoData.pets);
  const [careTasks, setCareTasks] = useState(demoData.careTasks);
  const [visits, setVisits] = useState(demoData.visits);

  const value = {
    pets,
    setPets,
    careTasks,
    setCareTasks,
    visits,
    setVisits,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
