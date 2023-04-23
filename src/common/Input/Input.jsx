import { PropTypes } from 'prop-types';
import styles from './Input.module.css';

function Input({
	id = '',
	type = 'text',
	labelText = '',
	placeholderText = '',
	value = '',
	onChange = null,
	required = false,
	...otherProps
}) {
	return (
		<div className={styles['input-group']}>
			<label htmlFor={id} className={styles['input-label']}>
				{labelText}
			</label>
			<input
				type={type}
				id={id}
				placeholder={placeholderText}
				onChange={onChange}
				className={styles.input}
				required={required}
				value={value}
				{...otherProps}
			/>
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	required: PropTypes.bool,
};

export default Input;
