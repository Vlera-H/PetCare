import React, { createContext, useContext, useState, useEffect } from 'react';
import demoData from '../data/demoData';

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
	const [pets, setPets] = useState(() => loadFromStorage('pets', demoData.pets));
	const [careTasks, setCareTasks] = useState(() => loadFromStorage('careTasks', demoData.careTasks));
	const [visits, setVisits] = useState(() => loadFromStorage('visits', demoData.visits));

	useEffect(() => {
		localStorage.setItem('pets', JSON.stringify(pets));
	}, [pets]);

	useEffect(() => {
		localStorage.setItem('careTasks', JSON.stringify(careTasks));
	}, [careTasks]);

	useEffect(() => {
		localStorage.setItem('visits', JSON.stringify(visits));
	}, [visits]);

	const value = { pets, setPets, careTasks, setCareTasks, visits, setVisits };
	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
	const ctx = useContext(DataContext);
	if (!ctx) throw new Error('useData must be used within a DataProvider');
	return ctx;
};
