import { useNavigate } from 'react-router-dom';

import { deleteLocalStorage } from 'helpers/localStorageHelper';

import { Button } from 'common';
import Logo from 'components/Header/components/Logo/Logo';
import { LOGOUT_BUTTON_TEXT } from 'constants.js';

import styles from 'components/Header/Header.module.css';

function Header({ user, token, setUser }) {
	const navigation = useNavigate();

	const handleLogout = () => {
		deleteLocalStorage({ key: 'userToken' });
		setUser({ isAuth: false, name: '', email: '', token: '' });
		navigation('/login');
	};
	return (
		<header className={styles.header}>
			<Logo />
			{(user.isAuth || token) && (
				<div className={styles['header-write']}>
					<p className={styles.name}>{user.name}</p>
					<Button text={LOGOUT_BUTTON_TEXT} onClick={handleLogout} />
				</div>
			)}
		</header>
	);
}

export default Header;
