import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage. After success login - value from API /login response.
};

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setCurrentUser: (state, action) => ({ ...action.payload }),
		logout: (state, action) => ({ ...action.payload }),
	},
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
