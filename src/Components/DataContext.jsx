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

  // Funksion për të pastruar të dhënat
  const clearData = () => {
    setAllPets([]);
    setAllCareTasks([]);
    setAllVisits([]);
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
        setAllPets(p || []);
        setAllCareTasks(t || []);
        setAllVisits(v || []);
      } catch (e) {
        console.error('Failed to load user data:', e);
        // Nëse API dështon, përdor demo data për këtë përdorues
        setAllPets(demoData.pets);
        setAllCareTasks(demoData.careTasks);
        setAllVisits(demoData.visits);
      }
    };

    loadData();
  }, [currentUserId]);

  // Filtro të dhënat sipas userId aktual
  const pets = allPets.filter(pet => pet.userId === currentUserId);
  const careTasks = allCareTasks.filter(task => {
    // Gjej pet-in për këtë task dhe kontrollo nëse i përket përdoruesit aktual
    const pet = allPets.find(p => p.id === task.petId);
    return pet && pet.userId === currentUserId;
  });
  const visits = allVisits.filter(visit => {
    // Gjej pet-in për këtë visit dhe kontrollo nëse i përket përdoruesit aktual
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
    setPets: setAllPets, // Përdor setAllPets për të përditësuar të gjitha të dhënat
    careTasks, 
    setCareTasks: setAllCareTasks,
    visits, 
    setVisits: setAllVisits,
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

