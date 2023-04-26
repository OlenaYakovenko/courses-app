import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';

const userInitialState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
};

export const authorize = createAsyncThunk(
	'user/authorize',
	async (token, thunkApi) => {
		try {
			const { name, email, role } = await userService.authorizeUser(token);
			return { name, email, role, token };
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (userData, thunkApi) => {
		try {
			return await userService.login(userData);
		} catch (error) {
			const message =
				error.response?.data?.result ||
				error.response?.data?.errors ||
				error.message ||
				error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const register = createAsyncThunk(
	'user/register',
	async (userData, thunkApi) => {
		try {
			await userService.register(userData);
			return 'User was successfully registered';
		} catch (error) {
			const message =
				error.response?.data?.errors || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
	try {
		const { token } = thunkApi.getState().user.user;
		await userService.logout(token);
		return 'User was successfully loged out';
	} catch (error) {
		const message =
			error.response?.data?.result || error.message || error.toString();
		return thunkApi.rejectWithValue(message);
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authorize.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authorize.fulfilled, (state, action) => {
				state.isLoading = false;
				const { name, email, role, token } = action.payload;
				state.user.isAuth = true;
				state.user.name = name;
				state.user.email = email;
				state.user.token = token;
				state.user.role = role;
			})
			.addCase(authorize.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.token = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = userInitialState.user;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
