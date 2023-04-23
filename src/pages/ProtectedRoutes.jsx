import { Outlet, Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function ProtectedRoutes({ isAuth }) {
	if (!isAuth) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
}

ProtectedRoutes.propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
