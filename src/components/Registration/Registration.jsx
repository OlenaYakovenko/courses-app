import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from 'common';
import {
	BASE_URL,
	EMAIL_INPUT_PLACEHOLDER_TEXT,
	EMAIL_LABEL_TEXT,
	NAME_INPUT_PLACEHOLDER_TEXT,
	NAME_LABEL_TEXT,
	PASSWORD_INPUT_PLACEHOLDER_TEXT,
	PASSWORD_LABEL_TEXT,
	REGISTRATION_BUTTON_TEXT,
} from 'constants.js';
import styles from 'components/Registration/Registration.module.css';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState('');
	const navigation = useNavigate();

	const handleRegistration = async (e) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
		};
		try {
			const response = await axios.post(`${BASE_URL}register`, user);
			console.log(response);
			navigation('/login');
		} catch (error) {
			console.log(error);
			setErrors(error.response.data.errors);
		}
	};

	return (
		<div className={styles['registration-form-container']}>
			<h2>Registration</h2>
			{errors && (
				<div className={styles.errors}>
					{errors.map((item, index) => (
						/* eslint-disable-next-line */
						<p key={index}>{item}</p>
					))}
				</div>
			)}
			<form
				className={styles['registration-form']}
				onSubmit={handleRegistration}
			>
				<div className={styles['input-container']}>
					<Input
						id='name'
						name='name'
						type='text'
						labelText={NAME_LABEL_TEXT}
						placeholderText={NAME_INPUT_PLACEHOLDER_TEXT}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles['input-container']}>
					<Input
						id='email'
						name='email'
						type='email'
						labelText={EMAIL_LABEL_TEXT}
						placeholderText={EMAIL_INPUT_PLACEHOLDER_TEXT}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={styles['input-container']}>
					<Input
						id='password'
						name='password'
						type='password'
						labelText={PASSWORD_LABEL_TEXT}
						placeholderText={PASSWORD_INPUT_PLACEHOLDER_TEXT}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className={styles['btn-container']}>
					<Button type='submit' text={REGISTRATION_BUTTON_TEXT} />
				</div>
			</form>
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</div>
	);
}

export default Registration;
