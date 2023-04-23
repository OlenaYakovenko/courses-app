import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
	BASE_URL,
	EMAIL_INPUT_PLACEHOLDER_TEXT,
	EMAIL_LABEL_TEXT,
	LOGIN_BUTTON_TEXT,
	PASSWORD_INPUT_PLACEHOLDER_TEXT,
	PASSWORD_LABEL_TEXT,
} from 'constants.js';

import { Button, Input } from 'common';

import { setLocalStorage } from 'helpers/localStorageHelper';

import styles from './Login.module.css';

function Login({ setUser, isAuth }) {
	const [errorMessage, setErrorMessage] = useState('');
	const [loginCredentials, setLoginCredentials] = useState({
		email: '',
		password: '',
	});
	const { email, password } = loginCredentials;
	const navigation = useNavigate();

	useEffect(() => {
		if (isAuth) navigation('/courses');
	}, [navigation, isAuth]);

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
				const response = await axios.post(`${BASE_URL}login`, user);
				setLocalStorage('userToken', response.data.result);

				const { name, email: userEmail } = response.data.user;
				setUser({ isAuth: true, name, userEmail, token: response.data.result });
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
		[navigation, setUser, email, password]
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

Login.propTypes = {
	setUser: PropTypes.func.isRequired,
	isAuth: PropTypes.bool.isRequired,
};
export default Login;
