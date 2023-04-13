import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
	const [user, setUser] = useState({
		isAuth: false,
		name: '',
		email: '',
		token: '',
	});

	useEffect(() => {
		const token = getLocalStorage('userToken');
		if (token) {
			setUser((prevState) => ({ ...prevState, isAuth: true }));
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout user={user} setUser={setUser} />}>
					<Route element={<ProtectedRoutes isAuth={user.isAuth} />}>
						<Route path='/courses'>
							<Route index element={<Courses />} />
							<Route path=':courseId' element={<CourseInfo />} />
							<Route path='add' element={<CreateCourse />} />
						</Route>
					</Route>
					<Route
						path='/login'
						element={<Login setUser={setUser} isAuth={user.isAuth} />}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
