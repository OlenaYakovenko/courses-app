import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({
	type = 'button',
	className = '',
	text = '',
	icon = '',
	onClick = null,
}) {
	return (
		<button
			// eslint-disable-next-line react/button-has-type
			type={type}
			className={`${icon ? styles['icon-btn'] : styles.btn} ${className}`}
			onClick={onClick}
		>
			<span className={styles['button-text']}>{text}</span>
			<span className={styles['button-icon']}>
				<i>{icon}</i>
			</span>
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
	text: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
