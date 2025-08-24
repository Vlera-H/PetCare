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
  const [pets, setPets] = useState([]);
  const [careTasks, setCareTasks] = useState([]);
  const [visits, setVisits] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Funksion për të pastruar të dhënat
  const clearData = () => {
    setPets([]);
    setCareTasks([]);
    setVisits([]);
    // Pastro localStorage për të dhënat e aplikacionit
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
          // Përdoruesi ka ndryshuar, pastro të dhënat
          clearData();
        }
        setCurrentUserId(userId);
      }
    };

    // Kontrollo çdo 1 sekondë
    const interval = setInterval(checkUserChange, 1000);
    
    // Kontrollo menjëherë
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
        const [p, t, v] = await Promise.all([
          fetchPets(),
          fetchCareTasks(),
          fetchVisits()
        ]);
        setPets(p || []);
        setCareTasks(t || []);
        setVisits(v || []);
      } catch (e) {
        console.error('Failed to load user data:', e);
        // Nëse API dështon, përdor demo data për këtë përdorues
        setPets(demoData.pets);
        setCareTasks(demoData.careTasks);
        setVisits(demoData.visits);
      }
    };

    loadData();
  }, [currentUserId]);

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
    setPets, 
    careTasks, 
    setCareTasks, 
    visits, 
    setVisits,
    currentUserId,
    clearData
  };
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};

