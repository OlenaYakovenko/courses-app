import styles from './Button.module.css';

function Button({
	type = 'button',
	className,
	text,
	icon,
	onClick,
	...otherProps
}) {
	return (
		<button
			type={type}
			className={`${icon ? styles['icon-btn'] : styles.btn} ${className}`}
			onClick={onClick}
			{...otherProps}
		>
			<span className={styles['button-text']}>{text}</span>
			<span className={styles['button-icon']}>
				<i>{icon}</i>
			</span>
		</button>
	);
}

export default Button;
