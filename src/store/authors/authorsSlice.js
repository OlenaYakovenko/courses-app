import { createSlice } from '@reduxjs/toolkit';

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: [],
	reducers: {
		getAuthors: (state, action) => [...action.payload],
		saveNewAuthor: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { getAuthors, saveNewAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
