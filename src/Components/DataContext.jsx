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
        console.log('🔍 Visit IDs from API:', v?.map(visit => visit.id));
        
        setAllPets(p || []);
        setAllCareTasks(t || []);
        setAllVisits(v || []);
        setApiError(false);
      } catch (e) {
        console.error('Failed to load user data:', e);
        console.log('Using demo data instead...');
        
        // Përdor demo data për këtë përdorues
        setAllPets(demoData.pets);
        setAllCareTasks(demoData.careTasks);
        setAllVisits(demoData.visits);
        setApiError(true);
      }
    };

    loadData();
  }, [currentUserId]);

  // Filtro të dhënat sipas userId aktual
  const pets = allPets.filter(pet => {
    const currentUserIdNum = Number(currentUserId);
    console.log(`🔍 PET FILTER: pet.id=${pet.id}, pet.userId=${pet.userId} (${typeof pet.userId}), currentUserId=${currentUserId} (${typeof currentUserId}), currentUserIdNum=${currentUserIdNum}, match=${pet.userId === currentUserIdNum}`);
    return pet.userId === currentUserIdNum;
  });
  
  const careTasks = allCareTasks.filter(task => {
    // Gjej pet-in për këtë task dhe kontrollo nëse i përket përdoruesit aktual
    const pet = allPets.find(p => p.id === task.petId);
    const currentUserIdNum = Number(currentUserId);
    const isUserPet = pet && pet.userId === currentUserIdNum;
    console.log(`🔍 TASK FILTER: task.id=${task.id}, petId=${task.petId}, pet=${pet?.name}, pet.userId=${pet?.userId}, currentUserIdNum=${currentUserIdNum}, isUserPet=${isUserPet}`);
    return isUserPet;
  });
  
  const visits = allVisits.filter(visit => {
    // Gjej pet-in për këtë visit dhe kontrollo nëse i përket përdoruesit aktual
    const pet = allPets.find(p => p.id === visit.petId);
    const currentUserIdNum = Number(currentUserId);
    const isUserPet = pet && pet.userId === currentUserIdNum;
    
    if (!pet) {
      console.log(`⚠️ VISIT ORPHANED: visit.id=${visit.id}, petId=${visit.petId} - Pet doesn't exist!`);
    }
    
    console.log(`🔍 VISIT FILTER: visit.id=${visit.id}, petId=${visit.petId}, pet=${pet?.name}, pet.userId=${pet?.userId}, currentUserIdNum=${currentUserIdNum}, isUserPet=${isUserPet}`);
    return isUserPet;
  });

  console.log('Filtered data:', { 
    allPets: allPets.length, 
    pets: pets.length, 
    allCareTasks: allCareTasks.length, 
    careTasks: careTasks.length,
    allVisits: allVisits.length,
    visits: visits.length,
    currentUserId 
  });

  // Persistim lokal vetëm kur ka përdorues aktive
  useEffect(() => {
    if (currentUserId && pets.length > 0) {
      console.log('Saving pets to localStorage:', pets);
      localStorage.setItem('pets', JSON.stringify(pets));
    }
  }, [pets, currentUserId]);

  useEffect(() => {
    if (currentUserId && careTasks.length > 0) {
      console.log('Saving careTasks to localStorage:', careTasks);
      localStorage.setItem('careTasks', JSON.stringify(careTasks));
    }
  }, [careTasks, currentUserId]);

  useEffect(() => {
    if (currentUserId && visits.length > 0) {
      console.log('Saving visits to localStorage:', visits);
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

