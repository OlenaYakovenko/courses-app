import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	EMAIL_INPUT_PLACEHOLDER_TEXT,
	EMAIL_LABEL_TEXT,
	LOGIN_BUTTON_TEXT,
	PASSWORD_INPUT_PLACEHOLDER_TEXT,
	PASSWORD_LABEL_TEXT,
} from 'constants.js';

import { Button, Input } from 'common';

import selectUser from 'store/user/userSelectors';
import { setCurrentUser } from 'store/user/userSlice';
import api from 'store/services';
import styles from './Login.module.css';

function Login() {
	const [errorMessage, setErrorMessage] = useState('');
	const [loginCredentials, setLoginCredentials] = useState({
		email: '',
		password: '',
	});
	const { email, password } = loginCredentials;
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const currentUser = useSelector(selectUser);

	useEffect(() => {
		if (currentUser.isAuth) navigation('/courses');
	}, [navigation, currentUser.isAuth]);

	const handleCredChange = useCallback((e) => {
		setLoginCredentials((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleLogin = useCallback(
		async (e) => {
			e.preventDefault();

			const user = {
				email,
				password,
			};
			try {
				const response = await api.login(user);
				const { name, email: userEmail } = response.user;
				dispatch(
					setCurrentUser({
						isAuth: true,
						name,
						userEmail,
						token: response.result,
					})
				);
				navigation('/courses');
			} catch (err) {
				console.log(err);
				if (err.response) {
					if (err.response.status === 400) {
						setErrorMessage(err.response?.data.result);
						return;
					}
					setErrorMessage(err.message);
					return;
				}
				setErrorMessage(err.message);
			}
		},
		[navigation, dispatch, email, password]
	);

	return (
		<div className={styles['login-form-container']}>
			<h2>Login</h2>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
			<form className={styles['login-form']} onSubmit={handleLogin}>
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
					<Button type='submit' text={LOGIN_BUTTON_TEXT} />
				</div>
			</form>
			<p>
				If you do not have an account you can{' '}
				<Link to='/registration'>Registrate</Link>
			</p>
		</div>
	);
}

export default Login;
