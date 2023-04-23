import { Outlet } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Header } from 'components';

import styles from 'layout/Main.module.css';

function MainLayout({ user = {}, setUser }) {
	return (
		<div className={styles.wrapper}>
			<Header user={user} setUser={setUser} />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}

MainLayout.propTypes = {
	user: PropTypes.shape({
		isAuth: PropTypes.bool.isRequired,
		name: PropTypes.string,
		email: PropTypes.string,
		token: PropTypes.string,
	}).isRequired,
	setUser: PropTypes.func.isRequired,
};
export default MainLayout;
