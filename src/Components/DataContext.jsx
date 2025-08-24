import React, { createContext, useContext, useState, useEffect } from 'react';
import demoData from '../data/demoData';
import { fetchPets, fetchCareTasks, fetchVisits } from '../api/petCare';

const DataContext = createContext(null);

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const DataProvider = ({ children }) => {
  const [allPets, setAllPets] = useState([]);
  const [allCareTasks, setAllCareTasks] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [apiError, setApiError] = useState(false);

  // Funksion për të pastruar të dhënat
  const clearData = () => {
    setAllPets([]);
    setAllCareTasks([]);
    setAllVisits([]);
    setApiError(false);
    localStorage.removeItem('pets');
    localStorage.removeItem('careTasks');
    localStorage.removeItem('visits');
  };

  // Kontrollo nëse përdoruesi ka ndryshuar
  useEffect(() => {
    const checkUserChange = () => {
      const userId = localStorage.getItem('userId');
      if (userId !== currentUserId) {
        if (currentUserId !== null) {
          clearData();
        }
        setCurrentUserId(userId);
      }
    };

    const interval = setInterval(checkUserChange, 1000);
    checkUserChange();
    return () => clearInterval(interval);
  }, [currentUserId]);

  // Ngarko të dhënat kur përdoruesi ndryshon
  useEffect(() => {
    if (!currentUserId) {
      clearData();
      return;
    }

    const loadData = async () => {
      try {
        console.log('Loading data for user:', currentUserId);
        const [p, t, v] = await Promise.all([
          fetchPets(),
          fetchCareTasks(),
          fetchVisits()
        ]);

        console.log('API data loaded:', { pets: p?.length, tasks: t?.length, visits: v?.length });
        console.log('Raw pets data:', p);
        console.log('Raw tasks data:', t);
        console.log('Raw visits data:', v);

        setAllPets(p || []);
        setAllCareTasks(t || []);
        setAllVisits(v || []);
        setApiError(false);
      } catch (e) {
        console.error('Failed to load user data:', e);
        console.log('Using demo data instead...');
        setAllPets(demoData.pets);
        setAllCareTasks(demoData.careTasks);
        setAllVisits(demoData.visits);
        setApiError(true);
      }
    };

    loadData();
  }, [currentUserId]);

  // Filtro të dhënat sipas userId aktual
  const pets = allPets.filter(pet => pet.userId === currentUserId);

  const careTasks = allCareTasks.filter(task => {
    const pet = allPets.find(p => p.id === task.petId);
    return pet && pet.userId === currentUserId;
  });

  const visits = allVisits.filter(visit => {
    const pet = allPets.find(p => p.id === visit.petId);
    return pet && pet.userId === currentUserId;
  });

  // Persistim lokal vetëm kur ka përdorues aktive
  useEffect(() => {
    if (currentUserId && pets.length > 0) {
      localStorage.setItem('pets', JSON.stringify(pets));
    }
  }, [pets, currentUserId]);

  useEffect(() => {
    if (currentUserId && careTasks.length > 0) {
      localStorage.setItem('careTasks', JSON.stringify(careTasks));
    }
  }, [careTasks, currentUserId]);

  useEffect(() => {
    if (currentUserId && visits.length > 0) {
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
    apiError
  };
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};
