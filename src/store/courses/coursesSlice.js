import { createSlice } from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: [],
	reducers: {
		getCourses: (state, action) => [...action.payload],

		deleteCourse: (state, action) => [
			...state.filter(({ id }) => id !== action.payload),
		],

		saveNewCourse: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { getCourses, deleteCourse, saveNewCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
