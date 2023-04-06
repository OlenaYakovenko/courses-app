import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

export default Main;
