import renderWithProviders from 'helpers/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { mockStore, mockedCoursesList } from 'constants.js';
import AppRouter from 'routs/routs';
import Courses from './Courses';

describe('Courses component', () => {
	const storeWithCourses = {
		...mockStore,
		courses: {
			courses: mockedCoursesList,
		},
	};
	test('should display amount of CourseCard equal length of courses array', async () => {
		renderWithProviders(
			<BrowserRouter>
				<Courses />
			</BrowserRouter>,
			{ preloadedState: storeWithCourses }
		);
		expect(screen.queryAllByTestId('courseCardComponent').length).toBe(2);
	});

	test('should display Empty container if courses array length is 0', () => {
		renderWithProviders(
			<BrowserRouter>
				<Courses />
			</BrowserRouter>,
			{ preloadedState: mockStore }
		);
		expect(screen.queryAllByTestId('courseCardComponent').length).toBe(0);
	});

	test('CourseForm should be shown after a click on a button "Add new course"', async () => {
		const fakeUser = {
			isAuth: true,
			name: 'Alice',
			email: 'alice@test.com',
			token: '123456789',
			role: 'admin',
		};

		renderWithProviders(
			<MemoryRouter>
				<AppRouter user={fakeUser} />
				<Courses />
			</MemoryRouter>,
			{ preloadedState: storeWithCourses }
		);
		expect(screen.getByText(/Add new course/i)).toBeInTheDocument();
		fireEvent.click(screen.getByText(/Add new course/i));
		expect(screen.getByTestId(/courseFormComponent/i)).toBeInTheDocument();
	});
});
