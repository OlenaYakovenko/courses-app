import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes({ token }) {
	if (!token) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
}
export default ProtectedRoutes;
