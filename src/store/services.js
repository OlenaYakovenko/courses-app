import axios from 'axios';
import { setLocalStorage } from 'helpers/localStorageHelper';
import { BASE_URL } from 'constants.js';

const axiosApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const getRemoteCourses = async () => {
	const response = await axiosApi.get('/courses/all');
	return response.data.result;
};
const getRemoteAuthors = async () => {
	const response = await axiosApi.get('/authors/all');
	return response.data.result;
};

const login = async (userData) => {
	const response = await axiosApi.post('/login', userData);
	if (response.data?.result) {
		setLocalStorage('userToken', response.data.result);
	}
	return response.data;
};
const register = async (userData) => {
	const response = await axiosApi.post('/register', userData);
	return response.data;
};

const api = { getRemoteCourses, getRemoteAuthors, login, register };

export default api;
