import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from 'store/user/userSelectors';
import { authorize } from 'store/user/userSlice';

import AppRouter from 'routs/routs';

import { getLocalStorage } from './helpers/localStorageHelper';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const token = getLocalStorage('userToken');
	const user = useSelector(selectUser);

	useEffect(() => {
		if (token) {
			dispatch(authorize(token));
		}
	}, [dispatch, token]);

	return (
		<BrowserRouter>
			<AppRouter user={user} />
		</BrowserRouter>
	);
}

export default App;
