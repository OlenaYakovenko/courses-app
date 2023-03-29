import styles from './Input.module.css';

function Input({
	id,
	type = 'text',
	labelText,
	placeholderText,
	value,
	onChange,
	required = false,
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
			/>
		</div>
	);
}

export default Input;
