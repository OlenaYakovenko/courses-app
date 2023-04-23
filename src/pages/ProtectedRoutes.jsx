import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import selectUser from 'store/user/userSelectors';

function ProtectedRoutes() {
	const user = useSelector(selectUser);

	if (!user.isAuth) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
}

export default ProtectedRoutes;
