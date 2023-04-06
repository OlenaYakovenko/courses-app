import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { getLocalStorage } from 'helpers/localStorageHelper';
import { Header } from 'components';

import styles from 'layout/Main.module.css';

function Main({ user, setUser }) {
	const navigation = useNavigate();
	const token = getLocalStorage('userToken');

	useEffect(() => {
		if (user.isAuth || token) {
			navigation('/courses');
		} else {
			navigation('/login');
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<Header user={user} token={token} setUser={setUser} />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}

Main.propTypes = {
	user: PropTypes.shape({
		isAuth: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	}).isRequired,
	setUser: PropTypes.func.isRequired,
};
export default Main;
