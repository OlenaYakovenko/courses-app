import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({
	type = 'button',
	className = '',
	text = '',
	icon = '',
	onClick = null,
	...otherProps
}) {
	return (
		<button
			type={type}
			className={`${icon ? styles['icon-btn'] : styles.btn} ${className}`}
			onClick={onClick}
			{...otherProps}
		>
			{text && <span className={styles['button-text']}>{text}</span>}

			{icon && (
				<span className={styles['button-icon']}>
					<img src={icon} alt='' />
				</span>
			)}
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
