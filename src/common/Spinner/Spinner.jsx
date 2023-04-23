import styles from './Spinner.module.css';

function Spinner() {
	return (
		<div className={styles['loading-spinner-container']}>
			<div className={styles['loading-spinner']} />
		</div>
	);
}

export default Spinner;
