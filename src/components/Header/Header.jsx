import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { deleteLocalStorage } from 'helpers/localStorageHelper';

import { Button } from 'common';
import { LOGOUT_BUTTON_TEXT } from 'constants.js';
import Logo from './components/Logo/Logo';

import styles from './Header.module.css';

function Header({ user = {}, setUser }) {
	const navigation = useNavigate();

	const handleLogout = () => {
		deleteLocalStorage({ key: 'userToken' });
		setUser({ isAuth: false, name: '', email: '', token: '' });
		navigation('/login');
	};
	return (
		<header className={styles.header}>
			<Logo />
			{user.isAuth && (
				<div className={styles['header-write']}>
					<p className={styles.name}>{user.name}</p>
					<Button text={LOGOUT_BUTTON_TEXT} onClick={handleLogout} />
				</div>
			)}
		</header>
	);
}

Header.propTypes = {
	user: PropTypes.shape({
		isAuth: PropTypes.bool.isRequired,
		name: PropTypes.string,
		email: PropTypes.string,
		token: PropTypes.string,
	}),
	setUser: PropTypes.func.isRequired,
};
export default Header;
