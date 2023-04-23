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

import { Button, Input, Spinner } from 'common';

import { selectUserState } from 'store/user/userSelectors';

import { login, reset } from 'store/user/userSlice';
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

	const { user, isLoading, isSuccess, isError, message } =
		useSelector(selectUserState);

	useEffect(() => {
		if (user.isAuth) {
			navigation('/courses');
		}
		if (isError) {
			setErrorMessage(message);
		}
		dispatch(reset());
	}, [
		navigation,
		dispatch,
		setErrorMessage,
		user.isAuth,
		isSuccess,
		isError,
		message,
	]);

	const handleCredChange = useCallback((e) => {
		setLoginCredentials((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleLogin = useCallback(
		async (e) => {
			e.preventDefault();
			const userData = {
				email,
				password,
			};
			dispatch(login(userData));
		},
		[dispatch, email, password]
	);
	if (isLoading) {
		return <Spinner />;
	}
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
