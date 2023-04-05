import logo from 'assets/logo.svg';
import styles from 'components/Header/components/Logo/Logo.module.css';

export default function Logo() {
	return <img src={logo} alt='logo' className={styles['logo-img']} />;
}
