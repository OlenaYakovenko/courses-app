import axios from 'axios';
import {
	deleteLocalStorage,
	setLocalStorage,
} from 'helpers/localStorageHelper';
import { BASE_URL } from 'constants.js';

const axiosApi = axios.create({
	baseURL: BASE_URL,
});

const login = async (userData) => {
	const response = await axiosApi.post('/login', userData);
	if (response.data?.result) {
		setLocalStorage('userToken', response.data.result);
	}
	return response.data.result;
};

const register = async (userData) => {
	const response = await axiosApi.post('/register', userData);
	return response.data;
};

const logout = async (token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const response = await axiosApi.delete('/logout', config);
	if (response.statusText === 'OK') {
		deleteLocalStorage({ key: 'userToken' });
	}
	return response;
};

const authorizeUser = async (token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const { data } = await axiosApi.get('/users/me', config);
	return data.result;
};

const userService = {
	login,
	register,
	logout,
	authorizeUser,
};

export default userService;
