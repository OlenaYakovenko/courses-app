import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
});

const setupStore = (preloadedState) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
	});

export default setupStore;
