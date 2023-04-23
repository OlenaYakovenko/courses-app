import { Button } from 'common';
import { LOGOUT_BUTTON_TEXT } from 'constants.js';
import Logo from './components/Logo/Logo';

import styles from './Header.module.css';

function Header() {
	const handleLogout = () => {};
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles['header-write']}>
				<p className={styles.name}>John</p>
				<Button text={LOGOUT_BUTTON_TEXT} onClick={handleLogout} />
			</div>
		</header>
	);
}

export default Header;
