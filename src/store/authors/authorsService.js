import axios from 'axios';
import { BASE_URL } from 'constants.js';

const axiosApi = axios.create({
	baseURL: BASE_URL,
});

const getRemoteAuthors = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axiosApi.get('/authors/all', config);
	return response.data.result;
};

const createAuthor = async (authorData, token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const response = await axiosApi.post('/authors/add', authorData, config);
	return response.data.result;
};

const authorsService = {
	getRemoteAuthors,
	createAuthor,
};

export default authorsService;
