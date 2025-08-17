import client from './client';

// Users (api/User)
export const fetchUsers = () => client.get('/api/User').then(r => r.data);

export const createUser = (user) => {
	// Expects: { firstName, lastName, email, password, role }
	const payload = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
		role: user.role || 'User'
	};
	return client.post('/api/User', payload).then(r => r.data);
};

export const updateUser = (id, user) => {
	// Expects: { firstName, lastName, email, isActive, role }
	const payload = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		isActive: !!user.isActive,
		role: user.role || 'User'
	};
	return client.put(`/api/User/${id}`, payload).then(r => r.data);
};

export const deleteUser = (id) => client.delete(`/api/User/${id}`);