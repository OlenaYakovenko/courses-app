import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from 'store/user/userSelectors';
import { logout } from 'store/user/userSlice';

import { Button } from 'common';
import { LOGOUT_BUTTON_TEXT } from 'constants.js';
import Logo from './components/Logo/Logo';

import styles from './Header.module.css';

function Header() {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleLogout = () => {
		dispatch(logout());
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

export default Header;
