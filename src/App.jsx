import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
	Courses,
	CreateCourse,
	Login,
	CourseInfo,
	Registration,
} from 'components';
import Main from 'layout/Main';
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
	const token = getLocalStorage('userToken');

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main user={user} setUser={setUser} />}>
					<Route path='login' element={<Login setUser={setUser} />} />
					<Route path='registration' element={<Registration />} />
					<Route element={<ProtectedRoutes token={token} />}>
						<Route path='courses'>
							<Route index element={<Courses />} />
							<Route path=':courseId' element={<CourseInfo />} />
							<Route path='add' element={<CreateCourse />} />
						</Route>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
