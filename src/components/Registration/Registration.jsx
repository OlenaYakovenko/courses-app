import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input } from 'common';
import {
	EMAIL_INPUT_PLACEHOLDER_TEXT,
	EMAIL_LABEL_TEXT,
	NAME_INPUT_PLACEHOLDER_TEXT,
	NAME_LABEL_TEXT,
	PASSWORD_INPUT_PLACEHOLDER_TEXT,
	PASSWORD_LABEL_TEXT,
	REGISTRATION_BUTTON_TEXT,
} from 'constants.js';

import { register, reset } from 'store/user/userSlice';
import styles from './Registration.module.css';

function Registration() {
	const [registrationCredentials, setRegistrationCredentials] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = registrationCredentials;
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const errors = useSelector(
		(state) => Array.isArray(state.user.message) && state.user.message
	);

	useEffect(() => {
		if (userState.isSuccess) {
			navigation('/login');
		}
		dispatch(reset());
	}, [navigation, dispatch, userState.isSuccess]);

	const handleCredChange = useCallback((e) => {
		setRegistrationCredentials((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleRegistration = useCallback(
		async (e) => {
			e.preventDefault();

			const userData = {
				name,
				email,
				password,
			};

			dispatch(register(userData));
		},
		[name, email, password, dispatch]
	);

	return (
		<div className={styles['registration-form-container']}>
			<h2>Registration</h2>
			{errors && (
				<div className={styles.errors}>
					{errors.map((item) => (
						<p key={item}>{item}</p>
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
						onChange={handleCredChange}
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
						onChange={handleCredChange}
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
						onChange={handleCredChange}
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
