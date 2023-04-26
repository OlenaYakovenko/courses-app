import axios from 'axios';
import { BASE_URL } from 'constants.js';

const axiosApi = axios.create({
	baseURL: BASE_URL,
});

const getRemoteCourses = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axiosApi.get('/courses/all', config);
	return response.data.result;
};

const createCourse = async (courseData, token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const response = await axiosApi.post('/courses/add', courseData, config);
	return response.data.result;
};

const deleteCourse = async (courseId, token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const response = await axiosApi.delete(`/courses/${courseId}`, config);
	return response.data.result;
};

const updateCourse = async (courseId, courseData, token) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};
	const response = await axiosApi.put(
		`/courses/${courseId}`,
		courseData,
		config
	);
	return response.data.result;
};

const coursesService = {
	getRemoteCourses,
	createCourse,
	deleteCourse,
	updateCourse,
};

export default coursesService;
