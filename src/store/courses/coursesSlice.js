import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import coursesService from './coursesService';

const initialState = {
	courses: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllCourses = createAsyncThunk(
	'courses/getAll',
	async (_, thunkApi) => {
		try {
			return await coursesService.getRemoteCourses();
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const createCourse = createAsyncThunk(
	'courses/create',
	async (courseData, thunkApi) => {
		try {
			const { token } = thunkApi.getState().user.user;
			return await coursesService.createCourse(courseData, token);
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const removeCourse = createAsyncThunk(
	'courses/delete',
	async (courseId, thunkApi) => {
		try {
			const { token } = thunkApi.getState().user.user;
			const response = await coursesService.deleteCourse(courseId, token);
			if (!response) {
				throw new Error('An error occured. Could not delete a course');
			}
			return courseId;
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const updateCourse = createAsyncThunk(
	'courses/update',
	async (updCourse, thunkApi) => {
		try {
			const { courseId, currentCourse: courseData } = updCourse;
			const { token } = thunkApi.getState().user.user;
			return await coursesService.updateCourse(courseId, courseData, token);
		} catch (error) {
			const message =
				error.response?.data?.result || error.message || error.toString();
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,

	reducers: {
		setCourses: (state, action) => {
			state.courses = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses = action.payload;
			})
			.addCase(getAllCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses.push(action.payload);
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				state.isLoading = false;

				const updatedCourse = state.courses.find(
					(course) => course.id === action.payload.id
				);
				updatedCourse.id = action.payload.id;
				updatedCourse.title = action.payload.title;
				updatedCourse.duration = action.payload.duration;
				updatedCourse.description = action.payload.description;
				updatedCourse.authors = action.payload.authors;
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(removeCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses = state.courses.filter(({ id }) => id !== action.payload);
			})
			.addCase(removeCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
