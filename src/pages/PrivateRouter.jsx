import { Outlet, Navigate } from 'react-router-dom';

function PrivateRouter({ isAllowed, redirectPath = '/login', children }) {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}

	return children || <Outlet />;
}

export default PrivateRouter;
