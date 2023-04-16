import { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from 'store/services';
import { getCourses } from 'store/courses/coursesSlice';
import { getAuthors } from 'store/authors/authorsSlice';
import { setCurrentUser } from 'store/user/userSlice';

import {
	Courses,
	CreateCourse,
	Login,
	CourseInfo,
	Registration,
} from 'components';
import MainLayout from 'layout/Main';
import ProtectedRoutes from 'pages/ProtectedRoutes';
import NotFound from 'pages/NotFound';

import { getLocalStorage } from './helpers/localStorageHelper';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const token = getLocalStorage('userToken');

	const fetchCourses = useCallback(async () => {
		try {
			const response = await api.getRemoteCourses();
			dispatch(getCourses(response));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	const fetchAuthors = useCallback(async () => {
		try {
			const response = await api.getRemoteAuthors();
			dispatch(getAuthors(response));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		if (token) {
			dispatch(setCurrentUser({ isAuth: true }));
		}
	}, [dispatch, token]);

	useEffect(() => {
		fetchCourses();
		fetchAuthors();
	}, [fetchCourses, fetchAuthors, token]);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route element={<ProtectedRoutes />}>
						<Route path='/courses'>
							<Route index element={<Courses />} />
							<Route path=':courseId' element={<CourseInfo />} />
							<Route path='add' element={<CreateCourse />} />
						</Route>
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
