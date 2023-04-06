import styles from 'pages/NotFound.module.css';

function NotFound() {
	return (
		<section className={styles['section-error']}>
			<h1>Ooops!</h1>
			<p>Something went wrong</p>
			<p>Page is not found</p>
		</section>
	);
}

export default NotFound;
