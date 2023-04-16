import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteLocalStorage } from 'helpers/localStorageHelper';

import { Button } from 'common';
import Logo from 'components/Header/components/Logo/Logo';
import { LOGOUT_BUTTON_TEXT } from 'constants.js';

import selectUser from 'store/user/userSelectors';
import { logout } from 'store/user/userSlice';
import styles from './Header.module.css';

function Header() {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleLogout = () => {
		deleteLocalStorage({ key: 'userToken' });
		dispatch(logout({ isAuth: false, name: '', email: '', token: '' }));
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
