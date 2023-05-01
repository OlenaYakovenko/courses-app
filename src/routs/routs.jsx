import {
	CourseForm,
	CourseInfo,
	Courses,
	Login,
	Registration,
} from 'components';
import MainLayout from 'layout/Main';
import NotFound from 'pages/NotFound';
import PrivateRouter from 'pages/PrivateRouter';
import { Routes, Route } from 'react-router-dom';

function AppRouter({ user }) {
	return (
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
	);
}

export default AppRouter;
