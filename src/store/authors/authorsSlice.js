import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authorsService from './authorsService';

const initialState = {
	authors: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllAuthors = createAsyncThunk(
	'authors/getAll',
	async (_, thunkApi) => {
		try {
			return await authorsService.getRemoteAuthors();
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const createAuthor = createAsyncThunk(
	'authors/create',
	async (authorData, thunkApi) => {
		try {
			const { token } = thunkApi.getState().user.user;
			return await authorsService.createAuthor(authorData, token);
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllAuthors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllAuthors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.authors = action.payload;
			})
			.addCase(getAllAuthors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createAuthor.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAuthor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.authors.push(action.payload);
			})
			.addCase(createAuthor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { getAuthors, saveNewAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
