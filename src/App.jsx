import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	Courses,
	CourseForm,
	Login,
	CourseInfo,
	Registration,
} from 'components';
import MainLayout from 'layout/Main';
import PrivateRouter from 'pages/PrivateRouter';
import NotFound from 'pages/NotFound';

import { selectUser } from 'store/user/userSelectors';
import { authorize } from 'store/user/userSlice';
import { getLocalStorage } from './helpers/localStorageHelper';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const token = getLocalStorage('userToken');
	const user = useSelector(selectUser);

	useEffect(() => {
		if (token) {
			dispatch(authorize(token));
		}
	}, [dispatch, token]);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path='/' element={<PrivateRouter isAllowed={user.isAuth} />}>
						<Route path='/courses' element={<Courses />} />
						<Route path='/courses/:courseId' element={<CourseInfo />} />
					</Route>
					<Route
						path='/courses/add'
						element={
							<PrivateRouter
								isAllowed={user.isAuth && user.role === 'admin'}
								redirectPath='/courses'
							>
								<CourseForm mode='create' />
							</PrivateRouter>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRouter
								isAllowed={user.isAuth && user.role === 'admin'}
								redirectPath='/courses'
							>
								<CourseForm mode='update' />
							</PrivateRouter>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
