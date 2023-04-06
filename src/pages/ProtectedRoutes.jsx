import { Outlet, Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function ProtectedRoutes({ token = null }) {
	if (!token) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
}

ProtectedRoutes.propTypes = {
	token: PropTypes.string,
};
export default ProtectedRoutes;
