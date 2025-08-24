import React, { createContext, useContext, useState, useEffect } from 'react';
import demoData from '../data/demoData';
import { fetchPets, fetchCareTasks, fetchVisits } from '../api/petCare';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [allPets, setAllPets] = useState([]);
  const [allCareTasks, setAllCareTasks] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [apiError, setApiError] = useState(false);

  const clearData = () => {
    setAllPets([]);
    setAllCareTasks([]);
    setAllVisits([]);
    setApiError(false);
    localStorage.removeItem('pets');
    localStorage.removeItem('careTasks');
    localStorage.removeItem('visits');
  };

  // Monitor userId changes
  useEffect(() => {
    const checkUserChange = () => {
      const userId = localStorage.getItem('userId');
      if (userId !== currentUserId) {
        if (currentUserId !== null) clearData();
        setCurrentUserId(userId);
      }
    };

    const interval = setInterval(checkUserChange, 1000);
    checkUserChange();
    return () => clearInterval(interval);
  }, [currentUserId]);

  // Load data on user change
  useEffect(() => {
    if (!currentUserId) {
      clearData();
      return;
    }

    const loadData = async () => {
      try {
        const [p, t, v] = await Promise.all([
          fetchPets(),
          fetchCareTasks(),
          fetchVisits()
        ]);

        setAllPets(p || []);
        setAllCareTasks(t || []);
        setAllVisits(v || []);
        setApiError(false);
      } catch {
        setAllPets(demoData.pets);
        setAllCareTasks(demoData.careTasks);
        setAllVisits(demoData.visits);
        setApiError(true);
      }
    };

    loadData();
  }, [currentUserId]);

  // Filter data by current user
  const uid = Number(currentUserId);
  const pets = allPets.filter(p => p.userId === uid);
  const careTasks = allCareTasks.filter(t => pets.some(p => p.id === t.petId));
  const visits = allVisits.filter(v => pets.some(p => p.id === v.petId));

  // Persist local data only if user is active
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem('pets', JSON.stringify(pets));
    }
  }, [pets, currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem('careTasks', JSON.stringify(careTasks));
    }
  }, [careTasks, currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem('visits', JSON.stringify(visits));
    }
  }, [visits, currentUserId]);

  const value = {
    pets,
    setPets: setAllPets,
    careTasks,
    setCareTasks: setAllCareTasks,
    visits,
    setVisits: setAllVisits,
    currentUserId,
    clearData,
    apiError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};
