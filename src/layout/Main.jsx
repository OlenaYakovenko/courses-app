import { Outlet } from 'react-router-dom';

import { Header } from 'components';

import styles from 'layout/Main.module.css';

function MainLayout() {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
