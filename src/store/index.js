import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';
import userReducer from './user/userSlice';

const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		user: userReducer,
	},
});

export default store;
