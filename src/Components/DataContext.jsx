import React, { createContext, useContext, useState, useEffect } from 'react';
import demoData from '../data/demoData';
import { fetchPets, fetchCareTasks, fetchVisits } from '../api/petCare';

const DataContext = createContext(null);

// Helpers to normalize dates and ids
const toIsoDate = (input) => {
  if (!input) return '';
  if (input instanceof Date) {
    if (isNaN(input.getTime())) return '';
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, '0');
    const d = String(input.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const s = String(input).trim();
  if (!s) return '';
  // ISO or yyyy-MM-dd
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  // dd-MM-yyyy
  const ddmmyyyy = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmyyyy) {
    const [, dd, mm, yyyy] = ddmmyyyy;
    return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }
  // dd.MM.yyyy
  const ddmmyyyyDots = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (ddmmyyyyDots) {
    const [, dd, mm, yyyy] = ddmmyyyyDots;
    return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }
  // mm/dd/yyyy
  const mmddyyyy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyy) {
    const [, mm, dd, yyyy] = mmddyyyy;
    return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }
  // Fallback: Date parse
  const d = new Date(s);
  if (!isNaN(d.getTime())) return toIsoDate(d);
  return '';
};

const normalizePets = (arr) => (arr || []).map(p => ({
  ...p,
  id: Number(p.id),
  userId: p.userId != null ? Number(p.userId) : undefined,
  birthDate: toIsoDate(p.birthDate)
}));

const normalizeTasks = (arr) => (arr || []).map(t => ({
  ...t,
  id: Number(t.id),
  petId: Number(t.petId),
  dueDate: toIsoDate(t.dueDate),
  isCompleted: !!t.isCompleted
}));

const normalizeVisits = (arr) => (arr || []).map(v => ({
  ...v,
  id: Number(v.id),
  petId: Number(v.petId),
  visitDate: toIsoDate(v.visitDate)
}));

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

        setAllPets(normalizePets(p || []));
        setAllCareTasks(normalizeTasks(t || []));
        setAllVisits(normalizeVisits(v || []));
        setApiError(false);
      } catch {
        setAllPets(normalizePets(demoData.pets));
        setAllCareTasks(normalizeTasks(demoData.careTasks));
        setAllVisits(normalizeVisits(demoData.visits));
        setApiError(true);
      }
    };

    loadData();
  }, [currentUserId]);

  // Filter data by current user
  const uid = Number(currentUserId);
  const pets = (allPets || []).filter(p => p.userId === uid);
  const careTasks = (allCareTasks || []).filter(t => pets.some(p => p.id === t.petId));
  const visits = (allVisits || []).filter(v => pets.some(p => p.id === v.petId));

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

  // Wrapped setters that normalize input
  const setPetsWrapped = (updater) => {
    setAllPets(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return normalizePets(next);
    });
  };

  const setCareTasksWrapped = (updater) => {
    setAllCareTasks(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return normalizeTasks(next);
    });
  };

  const setVisitsWrapped = (updater) => {
    setAllVisits(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return normalizeVisits(next);
    });
  };

  const value = {
    pets,
    setPets: setPetsWrapped,
    careTasks,
    setCareTasks: setCareTasksWrapped,
    visits,
    setVisits: setVisitsWrapped,
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
